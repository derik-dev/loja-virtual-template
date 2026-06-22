'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

type OrderDetail = {
  id: string
  customer_name: string
  customer_email: string
  product_name: string
  items: number
  total: number
  status: string
  created_at: string
  tracking_code?: string
  carrier?: string
  product_image?: string | null
  product_slug?: string | null
}

const STATUS_STEPS = ['Novo', 'Processando', 'A caminho', 'Entregue']

const STATUS_COLOR: Record<string, string> = {
  Novo: 'bg-violet-50 text-violet-700 border-violet-200',
  'A caminho': 'bg-blue-50 text-blue-700 border-blue-200',
  Processando: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  Entregue: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Cancelado: 'bg-red-50 text-red-700 border-red-200',
}

function fmt(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function PedidoDetalhe({ orderId, onBack }: { orderId: string; onBack: () => void }) {
  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [trackingVal, setTrackingVal] = useState('')
  const [carrierVal, setCarrierVal] = useState('')
  const [editTracking, setEditTracking] = useState(false)
  const [editCarrier, setEditCarrier] = useState(false)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    setLoading(true)
    fetch(`/api/admin/orders?id=${encodeURIComponent(orderId)}`)
      .then(r => r.json())
      .then(data => {
        setOrder(data)
        setTrackingVal(data.tracking_code ?? '')
        setCarrierVal(data.carrier ?? '')
        setLoading(false)
      })
  }, [orderId])

  async function patch(update: Record<string, string>) {
    setSaving(true)
    await fetch('/api/admin/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: orderId, ...update }),
    })
    setOrder(prev => prev ? { ...prev, ...update } : prev)
    setSaving(false)
    setFeedback('Salvo!')
    setTimeout(() => setFeedback(''), 2000)
  }

  async function handleStatus(newStatus: string) {
    await patch({ status: newStatus })
  }

  async function saveTracking() {
    await patch({ tracking_code: trackingVal.trim() })
    setEditTracking(false)
  }

  async function saveCarrier() {
    await patch({ carrier: carrierVal.trim() })
    setEditCarrier(false)
  }

  if (loading) {
    return (
      <div className="p-8">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-900 mb-8 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Pedidos
        </button>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-zinc-100 rounded w-48" />
          <div className="h-64 bg-zinc-100 rounded" />
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="p-8">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-900 mb-8 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Pedidos
        </button>
        <p className="text-zinc-400">Pedido não encontrado.</p>
      </div>
    )
  }

  const stepIndex = STATUS_STEPS.indexOf(order.status)
  const isCancelled = order.status === 'Cancelado'
  const unitPrice = order.total / order.items

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Pedidos
          </button>
          <span className="text-zinc-200">/</span>
          <h1 className="text-xl font-black text-zinc-900 uppercase tracking-wide">{order.id}</h1>
          <span className={`text-[10px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded border ${STATUS_COLOR[order.status] ?? 'bg-zinc-100 text-zinc-500 border-zinc-200'}`}>
            {order.status}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {feedback && <span className="text-xs text-emerald-600 font-medium">{feedback}</span>}
          {saving && <span className="text-xs text-zinc-400">Salvando...</span>}
        </div>
      </div>

      {/* Timeline de status */}
      {!isCancelled && (
        <div className="bg-white border border-zinc-200 rounded p-6 mb-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400 mb-4">Progresso do pedido</p>
          <div className="flex items-center gap-0">
            {STATUS_STEPS.map((step, i) => (
              <div key={step} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                    i < stepIndex ? 'bg-zinc-900 border-zinc-900 text-white'
                    : i === stepIndex ? 'bg-zinc-900 border-zinc-900 text-white'
                    : 'bg-white border-zinc-200 text-zinc-300'
                  }`}>
                    {i < stepIndex ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span className={`text-[10px] font-semibold mt-1.5 whitespace-nowrap ${i <= stepIndex ? 'text-zinc-900' : 'text-zinc-300'}`}>
                    {step}
                  </span>
                </div>
                {i < STATUS_STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 mb-4 ${i < stepIndex ? 'bg-zinc-900' : 'bg-zinc-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Coluna esquerda: produto */}
        <div className="col-span-2 space-y-6">
          {/* Card do produto */}
          <div className="bg-white border border-zinc-200 rounded overflow-hidden">
            <div className="px-5 py-3 border-b border-zinc-100">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Produto</p>
            </div>
            <div className="flex gap-5 p-5">
              {/* Foto */}
              <div className="w-28 h-36 flex-shrink-0 bg-zinc-50 rounded overflow-hidden relative">
                {order.product_image ? (
                  <Image
                    src={order.product_image}
                    alt={order.product_name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-zinc-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="flex-1">
                <p className="font-bold text-zinc-900 text-sm uppercase tracking-wide leading-tight">{order.product_name}</p>
                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Quantidade</span>
                    <span className="font-semibold text-zinc-700">{order.items} unidade{order.items > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Preço unitário</span>
                    <span className="font-semibold text-zinc-700">{fmt(unitPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-zinc-100 pt-1.5 mt-1.5">
                    <span className="text-zinc-700 font-semibold">Subtotal</span>
                    <span className="font-black text-zinc-900">{fmt(order.total)}</span>
                  </div>
                </div>
                {order.product_slug && (
                  <a
                    href={`/produto/${order.product_slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-900 transition-colors"
                  >
                    Ver produto na loja
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Cliente */}
          <div className="bg-white border border-zinc-200 rounded">
            <div className="px-5 py-3 border-b border-zinc-100">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Cliente</p>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-sm font-bold text-zinc-500 flex-shrink-0">
                  {order.customer_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-zinc-900 text-sm">{order.customer_name}</p>
                  <p className="text-xs text-zinc-400">{order.customer_email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna direita: resumo + ações */}
        <div className="space-y-6">
          {/* Resumo financeiro */}
          <div className="bg-white border border-zinc-200 rounded">
            <div className="px-5 py-3 border-b border-zinc-100">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Resumo</p>
            </div>
            <div className="p-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Subtotal</span>
                <span className="text-zinc-700">{fmt(order.total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Frete</span>
                <span className="text-emerald-600 font-medium">Grátis</span>
              </div>
              <div className="flex justify-between text-sm font-black border-t border-zinc-100 pt-2 mt-1">
                <span className="text-zinc-900">Total</span>
                <span className="text-zinc-900">{fmt(order.total)}</span>
              </div>
              <p className="text-[10px] text-zinc-400 pt-1">{fmtDate(order.created_at)}</p>
            </div>
          </div>

          {/* Status */}
          <div className="bg-white border border-zinc-200 rounded">
            <div className="px-5 py-3 border-b border-zinc-100">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Status do pedido</p>
            </div>
            <div className="p-5 space-y-2">
              {order.status === 'Novo' && (
                <button
                  onClick={() => handleStatus('Processando')}
                  disabled={saving}
                  className="w-full py-2.5 bg-violet-600 text-white text-xs font-bold uppercase tracking-[0.1em] rounded hover:bg-violet-700 transition-colors disabled:opacity-50"
                >
                  Confirmar pedido
                </button>
              )}
              {order.status === 'Processando' && (
                <button
                  onClick={() => handleStatus('A caminho')}
                  disabled={saving}
                  className="w-full py-2.5 bg-blue-600 text-white text-xs font-bold uppercase tracking-[0.1em] rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  Marcar como enviado
                </button>
              )}
              {order.status === 'A caminho' && (
                <button
                  onClick={() => handleStatus('Entregue')}
                  disabled={saving}
                  className="w-full py-2.5 bg-emerald-600 text-white text-xs font-bold uppercase tracking-[0.1em] rounded hover:bg-emerald-700 transition-colors disabled:opacity-50"
                >
                  Confirmar entrega
                </button>
              )}
              {order.status === 'Entregue' && (
                <div className="flex items-center gap-2 text-emerald-700 text-sm font-semibold">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Pedido entregue
                </div>
              )}
              {!isCancelled && order.status !== 'Entregue' && (
                <button
                  onClick={() => handleStatus('Cancelado')}
                  disabled={saving}
                  className="w-full py-2 text-xs font-semibold text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                >
                  Cancelar pedido
                </button>
              )}
              {isCancelled && (
                <div className="flex items-center gap-2 text-red-500 text-sm font-semibold">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Pedido cancelado
                </div>
              )}
            </div>
          </div>

          {/* Transportadora */}
          <div className="bg-white border border-zinc-200 rounded">
            <div className="px-5 py-3 border-b border-zinc-100">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Envio</p>
            </div>
            <div className="p-5 space-y-4">
              {/* Transportadora */}
              <div>
                <p className="text-xs text-zinc-400 mb-1.5">Transportadora</p>
                {editCarrier ? (
                  <div className="flex gap-2">
                    <input
                      autoFocus
                      value={carrierVal}
                      onChange={e => setCarrierVal(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && saveCarrier()}
                      placeholder="Ex: Correios, Jadlog..."
                      className="flex-1 border border-zinc-300 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-zinc-600"
                    />
                    <button onClick={saveCarrier} className="text-xs text-white bg-zinc-900 px-3 py-1.5 rounded hover:bg-zinc-700">OK</button>
                    <button onClick={() => { setEditCarrier(false); setCarrierVal(order.carrier ?? '') }} className="text-xs text-zinc-400 hover:text-zinc-700">✕</button>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditCarrier(true)}
                    className="text-sm text-left w-full hover:text-zinc-900 transition-colors"
                  >
                    {order.carrier
                      ? <span className="font-medium text-zinc-800">{order.carrier}</span>
                      : <span className="text-zinc-300 text-xs">+ Adicionar transportadora</span>
                    }
                  </button>
                )}
              </div>

              {/* Código de rastreio */}
              <div>
                <p className="text-xs text-zinc-400 mb-1.5">Código de rastreio</p>
                {editTracking ? (
                  <div className="flex gap-2">
                    <input
                      autoFocus
                      value={trackingVal}
                      onChange={e => setTrackingVal(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && saveTracking()}
                      placeholder="Ex: AA123456789BR"
                      className="flex-1 border border-zinc-300 rounded px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-zinc-600"
                    />
                    <button onClick={saveTracking} className="text-xs text-white bg-zinc-900 px-3 py-1.5 rounded hover:bg-zinc-700">OK</button>
                    <button onClick={() => { setEditTracking(false); setTrackingVal(order.tracking_code ?? '') }} className="text-xs text-zinc-400 hover:text-zinc-700">✕</button>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditTracking(true)}
                    className="text-sm text-left w-full hover:text-zinc-900 transition-colors"
                  >
                    {order.tracking_code
                      ? <span className="font-mono font-medium text-zinc-800">{order.tracking_code}</span>
                      : <span className="text-zinc-300 text-xs">+ Adicionar código</span>
                    }
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
