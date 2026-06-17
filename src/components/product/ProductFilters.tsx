'use client'

import { useState } from 'react'
import { FilterState } from '@/lib/types'
import { categories } from '@/lib/data/categories'

interface ProductFiltersProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
}

export default function ProductFilters({ filters, onChange }: ProductFiltersProps) {
  const [localMin, setLocalMin] = useState(filters.minPrice?.toString() ?? '')
  const [localMax, setLocalMax] = useState(filters.maxPrice?.toString() ?? '')

  const update = (partial: Partial<FilterState>) => {
    onChange({ ...filters, ...partial })
  }

  const applyPrice = () => {
    update({
      minPrice: localMin ? Number(localMin) : null,
      maxPrice: localMax ? Number(localMax) : null,
    })
  }

  const reset = () => {
    setLocalMin('')
    setLocalMax('')
    onChange({ category: null, minPrice: null, maxPrice: null, sortBy: 'newest' })
  }

  return (
    <aside className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
          Filtros
        </h2>
        <button
          onClick={reset}
          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          Limpar
        </button>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-sm font-medium text-slate-700 mb-2">Ordenar por</h3>
        <select
          value={filters.sortBy}
          onChange={(e) => update({ sortBy: e.target.value as FilterState['sortBy'] })}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="newest">Mais recentes</option>
          <option value="price-asc">Menor preço</option>
          <option value="price-desc">Maior preço</option>
          <option value="rating">Melhor avaliação</option>
        </select>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-sm font-medium text-slate-700 mb-2">Categoria</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="category"
              checked={filters.category === null}
              onChange={() => update({ category: null })}
              className="accent-indigo-600"
            />
            <span className="text-sm text-slate-600 group-hover:text-indigo-600 transition-colors">
              Todas as categorias
            </span>
          </label>
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="category"
                checked={filters.category === cat.slug}
                onChange={() => update({ category: cat.slug })}
                className="accent-indigo-600"
              />
              <span className="text-sm text-slate-600 group-hover:text-indigo-600 transition-colors">
                {cat.name}
              </span>
              <span className="ml-auto text-xs text-slate-400">{cat.productCount}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 className="text-sm font-medium text-slate-700 mb-2">Faixa de preço</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <span className="text-slate-400 text-xs">—</span>
          <input
            type="number"
            placeholder="Max"
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          onClick={applyPrice}
          className="mt-2 w-full py-1.5 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
        >
          Aplicar
        </button>
      </div>
    </aside>
  )
}
