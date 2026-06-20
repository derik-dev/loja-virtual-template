'use client'

import { useEffect, useState } from 'react'
import { use } from 'react'
import Link from 'next/link'
import { supabaseAdmin } from '@/lib/supabase'

type Order = {
  id: string
  product_name: string
  status: string
  tracking_code?: string
  created_at: string
}

const STATUS_STEPS = ['Novo', 'Processando', 'Enviado']

function getStepIndex(status: string) {
  const i = STATUS_STEPS.indexOf(status)
  return i === -1 ? 0 : i
}

const TIMELINE: { status: string; label: string; desc: string }[] = [
  { status: 'Novo', label: 'Pedido recebido', desc: 'Seu pedido foi registrado e aguarda confirmação.' },
  { status: 'Processando', label: 'Pedido confirmado', desc: 'Estamos separando e embalando seu pedido.' },
  { status: 'Enviado', label: 'Pedido enviado', desc: 'Seu pedido foi enviado e está a caminho.' },
]

export default function RastreioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    supabaseAdmin
      .from('orders')
      .select('id, product_name, status, tracking_code, created_at')
      .eq('id', decodeURIComponent(id))
      .single()
      .then(({ data, error }) => {
        if (error || !data) setNotFound(true)
        else setOrder(data)
        setLoading(false)
      })
  }, [id])

  const stepIndex = order ? getStepIndex(order.status) : 0
  const cancelled = order?.status === 'Cancelado'

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        <Link href="/" className="block mb-8">
          <img src="/logo-preta.png" alt="VERO" className="h-7 w-auto object-contain" />
        </Link>

        {loading && (
          <div className="bg-white rounded-xl p-8 text-center text-sm text-zinc-400">Carregando...</div>
        )}

        {notFound && (
          <div className="bg-white rounded-xl p-8 text-center">
            <p className="text-sm text-zinc-500 mb-4">Pedido não encontrado.</p>
            <Link href="/" className="text-xs font-bold uppercase tracking-widest underline text-zinc-700">Voltar à loja</Link>
          </div>
        )}

        {order && (
          <div className="bg-white rounded-xl p-8 space-y-8">
            <div>
              <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">Rastreio do pedido</p>
              <h1 className="text-xl font-black text-zinc-900">{order.id}</h1>
              <p className="text-sm text-zinc-500 mt-1">{order.product_name}</p>
            </div>

            {cancelled ? (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <span className="text-red-500 text-lg">✕</span>
                <div>
                  <p className="text-sm font-bold text-red-700">Pedido cancelado</p>
                  <p className="text-xs text-red-500">Este pedido foi cancelado.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-0">
                {TIMELINE.map((t, i) => {
                  const done = i <= stepIndex
                  const active = i === stepIndex
                  return (
                    <div key={t.status} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${done ? 'bg-zinc-900' : 'bg-zinc-200'}`}>
                          {done
                            ? <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                            : <span className="w-2 h-2 rounded-full bg-zinc-400" />
                          }
                        </div>
                        {i < TIMELINE.length - 1 && (
                          <div className={`w-0.5 h-10 mt-1 ${i < stepIndex ? 'bg-zinc-900' : 'bg-zinc-200'}`} />
                        )}
                      </div>
                      <div className="pb-8">
                        <p className={`text-sm font-semibold ${done ? 'text-zinc-900' : 'text-zinc-400'}`}>{t.label}</p>
                        {active && <p className="text-xs text-zinc-500 mt-0.5">{t.desc}</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {order.tracking_code && (
              <div className="border border-zinc-200 rounded-lg px-4 py-3">
                <p className="text-xs text-zinc-400 mb-1">Código de rastreio (Correios)</p>
                <p className="font-mono font-bold text-zinc-900 tracking-wider">{order.tracking_code}</p>
                <a
                  href={`https://rastreamento.correios.com.br/app/index.php`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                >
                  Rastrear no site dos Correios →
                </a>
              </div>
            )}

            <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
              <p className="text-xs text-zinc-400">Pedido realizado em {new Date(order.created_at).toLocaleDateString('pt-BR')}</p>
              <Link href="/conta" className="text-xs font-bold uppercase tracking-widest text-zinc-600 hover:text-zinc-900 underline">
                Minha conta
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
