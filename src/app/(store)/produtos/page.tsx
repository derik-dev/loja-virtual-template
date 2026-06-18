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
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-[1440px] px-8 sm:px-14 lg:px-20 py-12">

        {/* Page header */}
        <div className="flex items-end justify-between mb-10 border-b border-zinc-100 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 uppercase tracking-wide">
              Todos os Produtos
            </h1>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
              {filtered.length} {filtered.length !== 1 ? 'produtos encontrados' : 'produto encontrado'}
            </p>
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setFiltersVisible((v) => !v)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-zinc-200 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700 hover:border-zinc-900 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
            Filtros
          </button>
        </div>

        <div className="flex gap-10">
          {/* Sidebar — desktop */}
          <div className="hidden lg:block w-52 flex-shrink-0">
            <ProductFilters filters={filters} onChange={setFilters} />
          </div>

          {/* Mobile filters overlay */}
          {filtersVisible && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setFiltersVisible(false)}
              />
              <div className="relative ml-auto w-72 bg-white h-full overflow-y-auto p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-900">Filtros</h2>
                  <button
                    onClick={() => setFiltersVisible(false)}
                    className="text-zinc-400 hover:text-zinc-900 transition-colors"
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
    </div>
  )
}
