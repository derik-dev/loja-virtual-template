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
    <aside className="space-y-7">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-900">
          Filtros
        </h2>
        <button
          onClick={reset}
          className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400 hover:text-zinc-900 transition-colors"
        >
          Limpar
        </button>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-3">
          Ordenar por
        </h3>
        <select
          value={filters.sortBy}
          onChange={(e) => update({ sortBy: e.target.value as FilterState['sortBy'] })}
          className="w-full border border-zinc-200 px-3 py-2.5 text-xs text-zinc-700 bg-white focus:outline-none focus:border-zinc-900 transition-colors appearance-none cursor-pointer"
        >
          <option value="newest">Mais recentes</option>
          <option value="price-asc">Menor preço</option>
          <option value="price-desc">Maior preço</option>
          <option value="rating">Melhor avaliação</option>
        </select>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-3">
          Categoria
        </h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-2.5">
              <span
                className={`h-3.5 w-3.5 border flex-shrink-0 flex items-center justify-center transition-colors ${
                  filters.category === null ? 'bg-zinc-900 border-zinc-900' : 'border-zinc-300 group-hover:border-zinc-600'
                }`}
              >
                {filters.category === null && (
                  <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"/>
                  </svg>
                )}
              </span>
              <input
                type="radio"
                name="category"
                checked={filters.category === null}
                onChange={() => update({ category: null })}
                className="sr-only"
              />
              <span className="text-xs text-zinc-600 group-hover:text-zinc-900 transition-colors">
                Todas as categorias
              </span>
            </div>
          </label>
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-2.5">
                <span
                  className={`h-3.5 w-3.5 border flex-shrink-0 flex items-center justify-center transition-colors ${
                    filters.category === cat.slug ? 'bg-zinc-900 border-zinc-900' : 'border-zinc-300 group-hover:border-zinc-600'
                  }`}
                >
                  {filters.category === cat.slug && (
                    <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 12 12">
                      <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"/>
                    </svg>
                  )}
                </span>
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === cat.slug}
                  onChange={() => update({ category: cat.slug })}
                  className="sr-only"
                />
                <span className="text-xs text-zinc-600 group-hover:text-zinc-900 transition-colors">
                  {cat.name}
                </span>
              </div>
              <span className="text-[10px] text-zinc-400">{cat.productCount}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-3">
          Faixa de preço
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
            className="w-full border border-zinc-200 px-2 py-2 text-xs text-zinc-700 focus:outline-none focus:border-zinc-900 transition-colors"
          />
          <span className="text-zinc-300 text-xs flex-shrink-0">—</span>
          <input
            type="number"
            placeholder="Max"
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
            className="w-full border border-zinc-200 px-2 py-2 text-xs text-zinc-700 focus:outline-none focus:border-zinc-900 transition-colors"
          />
        </div>
        <button
          onClick={applyPrice}
          className="mt-3 w-full py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] bg-zinc-900 text-white hover:bg-zinc-700 transition-colors"
        >
          Aplicar
        </button>
      </div>
    </aside>
  )
}
