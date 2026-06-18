'use client'

import { useState } from 'react'

type Desconto = {
  id: number
  codigo: string
  tipo: 'percentual' | 'fixo'
  valor: number
  minimo: number
  usos: number
  limite: number | null
  validade: string
  ativo: boolean
}

const mockDescontos: Desconto[] = [
  { id: 1, codigo: 'BOAS-VINDAS', tipo: 'percentual', valor: 10, minimo: 0, usos: 84, limite: null, validade: '31/12/2026', ativo: true },
  { id: 2, codigo: 'VERAO25', tipo: 'percentual', valor: 25, minimo: 200, usos: 37, limite: 100, validade: '30/06/2026', ativo: true },
  { id: 3, codigo: 'FRETE50', tipo: 'fixo', valor: 50, minimo: 150, usos: 12, limite: 50, validade: '30/06/2026', ativo: false },
  { id: 4, codigo: 'BLACK30', tipo: 'percentual', valor: 30, minimo: 300, usos: 0, limite: 200, validade: '29/11/2026', ativo: false },
  { id: 5, codigo: 'VIP15', tipo: 'percentual', valor: 15, minimo: 0, usos: 21, limite: null, validade: '31/12/2026', ativo: true },
]

export default function Descontos() {
  const [descontos, setDescontos] = useState<Desconto[]>(mockDescontos)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ codigo: '', tipo: 'percentual' as 'percentual' | 'fixo', valor: '', minimo: '', limite: '', validade: '' })

  function toggleAtivo(id: number) {
    setDescontos((prev) => prev.map((d) => d.id === id ? { ...d, ativo: !d.ativo } : d))
  }

  function handleRemove(id: number) {
    setDescontos((prev) => prev.filter((d) => d.id !== id))
  }

  function handleAdd() {
    if (!form.codigo || !form.valor || !form.validade) return
    const novo: Desconto = {
      id: Date.now(),
      codigo: form.codigo.toUpperCase().trim(),
      tipo: form.tipo,
      valor: Number(form.valor),
      minimo: Number(form.minimo) || 0,
      limite: form.limite ? Number(form.limite) : null,
      usos: 0,
      validade: form.validade,
      ativo: true,
    }
    setDescontos((prev) => [novo, ...prev])
    setForm({ codigo: '', tipo: 'percentual', valor: '', minimo: '', limite: '', validade: '' })
    setShowForm(false)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-black text-zinc-900 uppercase tracking-wide">Descontos</h1>
          <p className="text-sm text-zinc-400 mt-0.5">{descontos.filter((d) => d.ativo).length} cupons ativos</p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 bg-zinc-900 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-zinc-700 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Novo cupom
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-zinc-200 rounded p-6 mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-500 mb-4">Novo cupom de desconto</p>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-500 mb-1.5">Código</label>
              <input
                type="text"
                placeholder="ex: VERAO20"
                value={form.codigo}
                onChange={(e) => setForm({ ...form, codigo: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-500 mb-1.5">Tipo</label>
              <select
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value as 'percentual' | 'fixo' })}
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded focus:outline-none focus:ring-1 focus:ring-zinc-400 bg-white"
              >
                <option value="percentual">Percentual (%)</option>
                <option value="fixo">Valor fixo (R$)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-500 mb-1.5">
                Valor {form.tipo === 'percentual' ? '(%)' : '(R$)'}
              </label>
              <input
                type="number"
                placeholder={form.tipo === 'percentual' ? '10' : '50'}
                value={form.valor}
                onChange={(e) => setForm({ ...form, valor: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-500 mb-1.5">Pedido mínimo (R$)</label>
              <input
                type="number"
                placeholder="0"
                value={form.minimo}
                onChange={(e) => setForm({ ...form, minimo: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-500 mb-1.5">Limite de usos (opcional)</label>
              <input
                type="number"
                placeholder="Ilimitado"
                value={form.limite}
                onChange={(e) => setForm({ ...form, limite: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-500 mb-1.5">Validade</label>
              <input
                type="text"
                placeholder="DD/MM/AAAA"
                value={form.validade}
                onChange={(e) => setForm({ ...form, validade: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleAdd} className="bg-zinc-900 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-zinc-700 transition-colors">
              Criar cupom
            </button>
            <button onClick={() => setShowForm(false)} className="text-sm text-zinc-500 px-4 py-2 rounded hover:text-zinc-900 transition-colors">
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-zinc-200 rounded">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-100">
              <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Código</th>
              <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Desconto</th>
              <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Mín. pedido</th>
              <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Usos</th>
              <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Validade</th>
              <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {descontos.map((d) => (
              <tr key={d.id} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors last:border-0">
                <td className="px-5 py-3">
                  <span className="font-mono text-sm font-bold text-zinc-800 bg-zinc-100 px-2 py-1 rounded">{d.codigo}</span>
                </td>
                <td className="px-5 py-3 text-sm font-semibold text-zinc-800">
                  {d.tipo === 'percentual' ? `${d.valor}% off` : `R$ ${d.valor} off`}
                </td>
                <td className="px-5 py-3 text-sm text-zinc-500">
                  {d.minimo > 0 ? `R$ ${d.minimo}` : '—'}
                </td>
                <td className="px-5 py-3 text-sm text-zinc-500">
                  {d.usos}{d.limite ? ` / ${d.limite}` : ''}
                </td>
                <td className="px-5 py-3 text-sm text-zinc-500">{d.validade}</td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => toggleAtivo(d.id)}
                    className={`text-[10px] font-bold uppercase tracking-[0.1em] px-2 py-1 rounded transition-colors ${
                      d.ativo ? 'bg-emerald-50 text-emerald-700' : 'bg-zinc-100 text-zinc-400'
                    }`}
                  >
                    {d.ativo ? 'Ativo' : 'Inativo'}
                  </button>
                </td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => handleRemove(d.id)}
                    className="text-zinc-300 hover:text-red-500 transition-colors"
                    title="Remover cupom"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
