'use client'

import { useState } from 'react'
import { FilterState } from '@/lib/types'
import { categories } from '@/lib/data/categories'

interface ProductFiltersProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-5 border-b border-zinc-100">
      <h3 className="text-sm font-bold text-zinc-900 mb-3">{title}</h3>
      {children}
    </div>
  )
}

export default function ProductFilters({ filters, onChange }: ProductFiltersProps) {
  const [localMin, setLocalMin] = useState(filters.minPrice?.toString() ?? '')
  const [localMax, setLocalMax] = useState(filters.maxPrice?.toString() ?? '')
  const [showMoreCat, setShowMoreCat] = useState(false)

  const update = (partial: Partial<FilterState>) => onChange({ ...filters, ...partial })

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

  const visibleCats = showMoreCat ? categories : categories.slice(0, 4)

  return (
    <div>
      <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">Filtros</span>
        <button
          onClick={reset}
          className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors underline underline-offset-2"
        >
          Limpar
        </button>
      </div>

      {/* Categoria */}
      <FilterSection title="Categoria">
        <div className="space-y-2.5">
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <span className={`h-4 w-4 border flex-shrink-0 flex items-center justify-center ${filters.category === null ? 'border-zinc-900 bg-zinc-900' : 'border-zinc-300'}`}>
              {filters.category === null && (
                <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
                  <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                </svg>
              )}
            </span>
            <input type="radio" name="category" checked={filters.category === null} onChange={() => update({ category: null })} className="sr-only" />
            <span className="text-sm text-zinc-700 group-hover:text-zinc-900">Todas</span>
          </label>
          {visibleCats.map((cat) => (
            <label key={cat.id} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-2.5">
                <span className={`h-4 w-4 border flex-shrink-0 flex items-center justify-center ${filters.category === cat.slug ? 'border-zinc-900 bg-zinc-900' : 'border-zinc-300 group-hover:border-zinc-600'}`}>
                  {filters.category === cat.slug && (
                    <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
                      <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                    </svg>
                  )}
                </span>
                <input type="radio" name="category" checked={filters.category === cat.slug} onChange={() => update({ category: cat.slug })} className="sr-only" />
                <span className="text-sm text-zinc-700 group-hover:text-zinc-900">{cat.name}({cat.productCount})</span>
              </div>
            </label>
          ))}
          {categories.length > 4 && (
            <button
              onClick={() => setShowMoreCat((v) => !v)}
              className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors underline underline-offset-2 mt-1"
            >
              {showMoreCat ? 'ver menos' : 'ver mais'}
            </button>
          )}
        </div>
      </FilterSection>

      {/* Faixa de preço */}
      <FilterSection title="Faixa de Preço">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
            className="w-full border border-zinc-200 px-2 py-2 text-sm text-zinc-700 focus:outline-none focus:border-zinc-900 transition-colors"
          />
          <span className="text-zinc-300 flex-shrink-0">—</span>
          <input
            type="number"
            placeholder="Max"
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
            className="w-full border border-zinc-200 px-2 py-2 text-sm text-zinc-700 focus:outline-none focus:border-zinc-900 transition-colors"
          />
        </div>
        <button
          onClick={applyPrice}
          className="mt-3 w-full py-2 text-[10px] font-bold uppercase tracking-[0.18em] bg-zinc-900 text-white hover:bg-zinc-700 transition-colors"
        >
          Aplicar
        </button>
      </FilterSection>
    </div>
  )
}
