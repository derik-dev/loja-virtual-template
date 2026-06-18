'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Order = {
  id: string
  customer_name: string
  customer_email: string
  product_name: string
  items: number
  total: number
  status: string
  created_at: string
}

const STATUS_COLOR: Record<string, string> = {
  Pago: 'bg-emerald-50 text-emerald-700',
  Enviado: 'bg-blue-50 text-blue-700',
  Processando: 'bg-yellow-50 text-yellow-700',
  Cancelado: 'bg-red-50 text-red-700',
}

const STATUSES = ['Todos', 'Pago', 'Enviado', 'Processando', 'Cancelado']

function fmt(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR')
}

export default function Pedidos() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')

  useEffect(() => {
    supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setOrders(data ?? [])
        setLoading(false)
      })
  }, [])

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.product_name.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'Todos' || o.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalReceita = filtered.reduce((s, o) => s + o.total, 0)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-black text-zinc-900 uppercase tracking-wide">Pedidos</h1>
          <p className="text-sm text-zinc-400 mt-0.5">
            {loading ? 'Carregando...' : `${filtered.length} pedidos encontrados`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar pedido, cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-zinc-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-zinc-400"
          />
        </div>
        <div className="flex items-center gap-1 bg-white border border-zinc-200 rounded p-1">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                statusFilter === s ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        {!loading && (
          <div className="ml-auto text-sm font-semibold text-zinc-700">
            Total: <span className="text-zinc-900">{fmt(totalReceita)}</span>
          </div>
        )}
      </div>

      <div className="bg-white border border-zinc-200 rounded">
        {loading ? (
          <div className="px-5 py-16 text-center text-sm text-zinc-400">Carregando pedidos...</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Pedido</th>
                <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Cliente</th>
                <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Produto</th>
                <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Itens</th>
                <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Valor</th>
                <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Status</th>
                <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Data</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors last:border-0">
                  <td className="px-5 py-3 text-sm font-mono font-semibold text-zinc-700">{o.id}</td>
                  <td className="px-5 py-3">
                    <p className="text-sm text-zinc-800 font-medium">{o.customer_name}</p>
                    <p className="text-xs text-zinc-400">{o.customer_email}</p>
                  </td>
                  <td className="px-5 py-3 text-sm text-zinc-500 max-w-[200px] truncate">{o.product_name}</td>
                  <td className="px-5 py-3 text-sm text-zinc-500">{o.items}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-zinc-800">{fmt(o.total)}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] font-bold uppercase tracking-[0.1em] px-2 py-1 rounded ${STATUS_COLOR[o.status] ?? 'bg-zinc-100 text-zinc-500'}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-zinc-400">{fmtDate(o.created_at)}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sm text-zinc-400">
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
