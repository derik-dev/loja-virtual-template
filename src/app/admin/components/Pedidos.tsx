'use client'

import { useState } from 'react'

const mockOrders = [
  { id: '#10045', cliente: 'Maria Silva', email: 'maria@email.com', produto: 'Smartphone Pro Ultra', valor: 3499.99, status: 'Pago', data: '18/06/2026', items: 1 },
  { id: '#10044', cliente: 'João Pereira', email: 'joao@email.com', produto: 'Fone Bluetooth Premium', valor: 599.99, status: 'Enviado', data: '18/06/2026', items: 1 },
  { id: '#10043', cliente: 'Ana Costa', email: 'ana@email.com', produto: 'Camiseta Premium Algodão', valor: 89.99, status: 'Pago', data: '17/06/2026', items: 2 },
  { id: '#10042', cliente: 'Rafael Lima', email: 'rafael@email.com', produto: 'Tênis Running Pro', valor: 349.99, status: 'Processando', data: '17/06/2026', items: 1 },
  { id: '#10041', cliente: 'Carla Mendes', email: 'carla@email.com', produto: 'Bolsa Couro Clássica', valor: 459.99, status: 'Pago', data: '16/06/2026', items: 1 },
  { id: '#10040', cliente: 'Bruno Alves', email: 'bruno@email.com', produto: 'Calça Alfaiataria', valor: 299.99, status: 'Enviado', data: '16/06/2026', items: 1 },
  { id: '#10039', cliente: 'Fernanda Rocha', email: 'fernanda@email.com', produto: 'Vestido Midi Linho', valor: 389.99, status: 'Cancelado', data: '15/06/2026', items: 1 },
  { id: '#10038', cliente: 'Lucas Martins', email: 'lucas@email.com', produto: 'Blazer Slim Fit', valor: 549.99, status: 'Pago', data: '15/06/2026', items: 1 },
  { id: '#10037', cliente: 'Isabela Santos', email: 'isabela@email.com', produto: 'Camiseta Premium Algodão', valor: 179.98, status: 'Pago', data: '14/06/2026', items: 2 },
  { id: '#10036', cliente: 'Pedro Oliveira', email: 'pedro@email.com', produto: 'Tênis Running Pro', valor: 349.99, status: 'Enviado', data: '14/06/2026', items: 1 },
]

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

export default function Pedidos() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')

  const filtered = mockOrders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.cliente.toLowerCase().includes(search.toLowerCase()) ||
      o.produto.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'Todos' || o.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalReceita = filtered.reduce((s, o) => s + o.valor, 0)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-black text-zinc-900 uppercase tracking-wide">Pedidos</h1>
          <p className="text-sm text-zinc-400 mt-0.5">{filtered.length} pedidos encontrados</p>
        </div>
      </div>

      {/* Filters */}
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
        <div className="ml-auto text-sm font-semibold text-zinc-700">
          Total: <span className="text-zinc-900">{fmt(totalReceita)}</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-zinc-200 rounded">
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
                  <p className="text-sm text-zinc-800 font-medium">{o.cliente}</p>
                  <p className="text-xs text-zinc-400">{o.email}</p>
                </td>
                <td className="px-5 py-3 text-sm text-zinc-500 max-w-[200px] truncate">{o.produto}</td>
                <td className="px-5 py-3 text-sm text-zinc-500">{o.items}</td>
                <td className="px-5 py-3 text-sm font-semibold text-zinc-800">{fmt(o.valor)}</td>
                <td className="px-5 py-3">
                  <span className={`text-[10px] font-bold uppercase tracking-[0.1em] px-2 py-1 rounded ${STATUS_COLOR[o.status]}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm text-zinc-400">{o.data}</td>
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
      </div>
    </div>
  )
}
