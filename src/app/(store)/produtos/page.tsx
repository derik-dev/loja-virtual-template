'use client'

import { useState, useMemo } from 'react'
import { products } from '@/lib/data/products'
import { FilterState } from '@/lib/types'
import { ProductGrid, ProductFilters } from '@/components/product'

const defaultFilters: FilterState = {
  category: null,
  minPrice: null,
  maxPrice: null,
  sortBy: 'newest',
}

export default function ProdutosPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [filtersVisible, setFiltersVisible] = useState(false)

  const filtered = useMemo(() => {
    let list = [...products]

    if (filters.category) {
      list = list.filter((p) => p.category === filters.category)
    }
    if (filters.minPrice !== null) {
      list = list.filter((p) => p.price >= filters.minPrice!)
    }
    if (filters.maxPrice !== null) {
      list = list.filter((p) => p.price <= filters.maxPrice!)
    }

    switch (filters.sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
      default:
        break
    }

    return list
  }, [filters])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Todos os Produtos</h1>
          <p className="text-slate-500 text-sm mt-1">
            {filtered.length} produto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Mobile filter toggle */}
        <button
          onClick={() => setFiltersVisible((v) => !v)}
          className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>
          Filtros
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar filters - desktop always visible, mobile toggled */}
        <div
          className={[
            'w-60 flex-shrink-0',
            'hidden lg:block',
          ].join(' ')}
        >
          <ProductFilters filters={filters} onChange={setFilters} />
        </div>

        {/* Mobile filters overlay */}
        {filtersVisible && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setFiltersVisible(false)}
            />
            <div className="relative ml-auto w-72 bg-white h-full overflow-y-auto p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-slate-900">Filtros</h2>
                <button
                  onClick={() => setFiltersVisible(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <ProductFilters filters={filters} onChange={(f) => { setFilters(f); setFiltersVisible(false) }} />
            </div>
          </div>
        )}

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          <ProductGrid products={filtered} />
        </div>
      </div>
    </div>
  )
}
