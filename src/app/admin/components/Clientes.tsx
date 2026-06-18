'use client'

import { useState } from 'react'

const mockClientes = [
  { id: 1, nome: 'Maria Silva', email: 'maria@email.com', telefone: '(11) 99999-1234', pedidos: 5, totalGasto: 8749.95, ultimoPedido: '18/06/2026' },
  { id: 2, nome: 'João Pereira', email: 'joao@email.com', telefone: '(21) 98888-5678', pedidos: 3, totalGasto: 1849.97, ultimoPedido: '18/06/2026' },
  { id: 3, nome: 'Ana Costa', email: 'ana@email.com', telefone: '(11) 97777-4321', pedidos: 7, totalGasto: 3129.93, ultimoPedido: '17/06/2026' },
  { id: 4, nome: 'Rafael Lima', email: 'rafael@email.com', telefone: '(31) 96666-8765', pedidos: 2, totalGasto: 699.98, ultimoPedido: '17/06/2026' },
  { id: 5, nome: 'Carla Mendes', email: 'carla@email.com', telefone: '(11) 95555-2468', pedidos: 4, totalGasto: 1839.96, ultimoPedido: '16/06/2026' },
  { id: 6, nome: 'Bruno Alves', email: 'bruno@email.com', telefone: '(41) 94444-1357', pedidos: 1, totalGasto: 299.99, ultimoPedido: '16/06/2026' },
  { id: 7, nome: 'Fernanda Rocha', email: 'fernanda@email.com', telefone: '(11) 93333-9876', pedidos: 6, totalGasto: 2339.94, ultimoPedido: '15/06/2026' },
  { id: 8, nome: 'Lucas Martins', email: 'lucas@email.com', telefone: '(51) 92222-5432', pedidos: 2, totalGasto: 1099.98, ultimoPedido: '15/06/2026' },
  { id: 9, nome: 'Isabela Santos', email: 'isabela@email.com', telefone: '(11) 91111-6789', pedidos: 8, totalGasto: 4399.92, ultimoPedido: '14/06/2026' },
  { id: 10, nome: 'Pedro Oliveira', email: 'pedro@email.com', telefone: '(21) 90000-3456', pedidos: 3, totalGasto: 1049.97, ultimoPedido: '14/06/2026' },
]

function fmt(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function Clientes() {
  const [search, setSearch] = useState('')

  const filtered = mockClientes.filter((c) =>
    c.nome.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-black text-zinc-900 uppercase tracking-wide">Clientes</h1>
          <p className="text-sm text-zinc-400 mt-0.5">{mockClientes.length} clientes cadastrados</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-zinc-200 rounded p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-400 mb-3">Total de clientes</p>
          <p className="text-3xl font-black text-zinc-900">{mockClientes.length}</p>
        </div>
        <div className="bg-white border border-zinc-200 rounded p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-400 mb-3">Pedidos totais</p>
          <p className="text-3xl font-black text-zinc-900">{mockClientes.reduce((s, c) => s + c.pedidos, 0)}</p>
        </div>
        <div className="bg-white border border-zinc-200 rounded p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-400 mb-3">Receita total</p>
          <p className="text-3xl font-black text-zinc-900">{fmt(mockClientes.reduce((s, c) => s + c.totalGasto, 0))}</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-xs mb-6">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          placeholder="Buscar por nome ou e-mail..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm border border-zinc-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-zinc-400"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-zinc-200 rounded">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-100">
              <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Cliente</th>
              <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Telefone</th>
              <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Pedidos</th>
              <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Total gasto</th>
              <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Último pedido</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors last:border-0">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-600 flex-shrink-0">
                      {c.nome.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-800">{c.nome}</p>
                      <p className="text-xs text-zinc-400">{c.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-sm text-zinc-500">{c.telefone}</td>
                <td className="px-5 py-3 text-sm text-zinc-700 font-semibold">{c.pedidos}</td>
                <td className="px-5 py-3 text-sm font-semibold text-zinc-800">{fmt(c.totalGasto)}</td>
                <td className="px-5 py-3 text-sm text-zinc-400">{c.ultimoPedido}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-sm text-zinc-400">
                  Nenhum cliente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
