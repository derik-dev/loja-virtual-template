'use client'

import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'

// ── Mock data ────────────────────────────────────────────────
const salesData = [
  { day: '01/06', vendas: 4, receita: 1240 },
  { day: '02/06', vendas: 7, receita: 2890 },
  { day: '03/06', vendas: 3, receita: 980 },
  { day: '04/06', vendas: 9, receita: 3450 },
  { day: '05/06', vendas: 5, receita: 1870 },
  { day: '06/06', vendas: 12, receita: 4200 },
  { day: '07/06', vendas: 8, receita: 3100 },
  { day: '08/06', vendas: 6, receita: 2340 },
  { day: '09/06', vendas: 11, receita: 4780 },
  { day: '10/06', vendas: 4, receita: 1560 },
  { day: '11/06', vendas: 9, receita: 3890 },
  { day: '12/06', vendas: 14, receita: 5600 },
  { day: '13/06', vendas: 7, receita: 2780 },
  { day: '14/06', vendas: 10, receita: 4100 },
  { day: '15/06', vendas: 6, receita: 2450 },
  { day: '16/06', vendas: 8, receita: 3200 },
  { day: '17/06', vendas: 13, receita: 5100 },
  { day: '18/06', vendas: 9, receita: 3670 },
]

const categoryData = [
  { categoria: 'Roupas', receita: 12400 },
  { categoria: 'Eletrônicos', receita: 28900 },
  { categoria: 'Acessórios', receita: 8700 },
  { categoria: 'Calçados', receita: 6200 },
]

const recentOrders = [
  { id: '#10045', cliente: 'Maria Silva', produto: 'Smartphone Pro Ultra', valor: 3499.99, status: 'Pago', data: '18/06' },
  { id: '#10044', cliente: 'João Pereira', produto: 'Fone Bluetooth Premium', valor: 599.99, status: 'Enviado', data: '18/06' },
  { id: '#10043', cliente: 'Ana Costa', produto: 'Camiseta Premium Algodão', valor: 89.99, status: 'Pago', data: '17/06' },
  { id: '#10042', cliente: 'Rafael Lima', produto: 'Tênis Running Pro', valor: 349.99, status: 'Processando', data: '17/06' },
  { id: '#10041', cliente: 'Carla Mendes', produto: 'Bolsa Couro Clássica', valor: 459.99, status: 'Pago', data: '16/06' },
]

const STATUS_COLOR: Record<string, string> = {
  Pago: 'bg-emerald-50 text-emerald-700',
  Enviado: 'bg-blue-50 text-blue-700',
  Processando: 'bg-yellow-50 text-yellow-700',
  Cancelado: 'bg-red-50 text-red-700',
}

function fmt(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function KPICard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="bg-white border border-zinc-200 rounded p-5">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-400 mb-3">{label}</p>
      <p className={`text-3xl font-black ${color}`}>{value}</p>
      <p className="text-xs text-zinc-400 mt-1">{sub}</p>
    </div>
  )
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-zinc-200 shadow px-3 py-2 text-xs">
      <p className="font-bold text-zinc-700 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-zinc-500">{typeof p.value === 'number' && p.value > 100 ? fmt(p.value) : `${p.value} pedidos`}</p>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const totalReceita = salesData.reduce((s, d) => s + d.receita, 0)
  const totalVendas = salesData.reduce((s, d) => s + d.vendas, 0)
  const ticketMedio = totalReceita / totalVendas

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-black text-zinc-900 uppercase tracking-wide">Dashboard</h1>
          <p className="text-sm text-zinc-400 mt-0.5">Junho 2026 · últimos 18 dias</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500 border border-zinc-200 bg-white px-4 py-2 rounded">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
          </svg>
          01/06/2026 — 18/06/2026
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <KPICard label="Receita do mês" value={fmt(totalReceita)} sub="+18% vs. mês anterior" color="text-zinc-900" />
        <KPICard label="Pedidos" value={String(totalVendas)} sub="+12% vs. mês anterior" color="text-zinc-900" />
        <KPICard label="Ticket médio" value={fmt(ticketMedio)} sub="por pedido" color="text-zinc-900" />
        <KPICard label="Produtos ativos" value="8" sub="0 sem estoque" color="text-zinc-900" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {/* Receita */}
        <div className="col-span-2 bg-white border border-zinc-200 rounded p-5">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500 mb-4">Receita diária (R$)</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={salesData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#18181b" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#18181b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#a1a1aa' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#a1a1aa' }} axisLine={false} tickLine={false}
                tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="receita" stroke="#18181b" strokeWidth={2} fill="url(#grad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Por categoria */}
        <div className="bg-white border border-zinc-200 rounded p-5">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500 mb-4">Receita por categoria</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categoryData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: '#a1a1aa' }} axisLine={false} tickLine={false}
                tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="categoria" tick={{ fontSize: 10, fill: '#a1a1aa' }} axisLine={false} tickLine={false} width={70} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="receita" fill="#18181b" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pedidos recentes */}
      <div className="bg-white border border-zinc-200 rounded">
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">Pedidos recentes</p>
          <button className="text-xs text-zinc-400 hover:text-zinc-900 underline underline-offset-4 transition-colors">
            Ver todos
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-50">
              <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Pedido</th>
              <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Cliente</th>
              <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Produto</th>
              <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Valor</th>
              <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Status</th>
              <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Data</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((o) => (
              <tr key={o.id} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors last:border-0">
                <td className="px-5 py-3 text-sm font-mono font-semibold text-zinc-700">{o.id}</td>
                <td className="px-5 py-3 text-sm text-zinc-700">{o.cliente}</td>
                <td className="px-5 py-3 text-sm text-zinc-500 max-w-[180px] truncate">{o.produto}</td>
                <td className="px-5 py-3 text-sm font-semibold text-zinc-800">{fmt(o.valor)}</td>
                <td className="px-5 py-3">
                  <span className={`text-[10px] font-bold uppercase tracking-[0.1em] px-2 py-1 rounded ${STATUS_COLOR[o.status]}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm text-zinc-400">{o.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
