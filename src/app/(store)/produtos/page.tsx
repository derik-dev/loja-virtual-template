'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { supabase, mapProduct } from '@/lib/supabase'
import { Product, FilterState } from '@/lib/types'
import { ProductGrid, ProductFilters } from '@/components/product'

const defaultFilters: FilterState = {
  category: null,
  minPrice: null,
  maxPrice: null,
  sortBy: 'newest',
}

const SORT_OPTIONS = [
  { value: 'newest', label: 'Mais recentes' },
  { value: 'price-asc', label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
  { value: 'rating', label: 'Melhor avaliação' },
] as const

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [filtersVisible, setFiltersVisible] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    supabase.from('products').select('*').then(({ data }) => {
      setProducts((data ?? []).map(mapProduct))
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const filtered = useMemo(() => {
    let list = [...products]
    if (filters.category) list = list.filter((p) => p.category === filters.category)
    if (filters.minPrice !== null) list = list.filter((p) => p.price >= filters.minPrice!)
    if (filters.maxPrice !== null) list = list.filter((p) => p.price <= filters.maxPrice!)
    switch (filters.sortBy) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break
      case 'price-desc': list.sort((a, b) => b.price - a.price); break
      case 'rating': list.sort((a, b) => b.rating - a.rating); break
    }
    return list
  }, [products, filters])

  const activeSortLabel = SORT_OPTIONS.find((o) => o.value === filters.sortBy)?.label ?? 'Mais recentes'

  return (
    <div className="bg-white min-h-screen">

      {/* ── BANNER ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden w-full" style={{ height: '42vh' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-fashion.png"
          alt="Coleção"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-black/40" />
        <div className="absolute inset-0 flex items-center px-8 sm:px-14 lg:px-20">
          <p className="text-3xl sm:text-4xl lg:text-[clamp(2rem,4vw,3.5rem)] leading-none text-white uppercase">
            <span className="font-black">TECNOLOGIA QUE VESTE</span>
            <span className="font-light"> | pra usar todo dia</span>
          </p>
        </div>
      </section>

      {/* ── SUBTITLE ───────────────────────────────────────── */}
      <div className="px-8 sm:px-14 lg:px-20 pt-5 pb-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-800">
          VERO | COLEÇÃO 2026
        </p>
      </div>

      {/* ── MAIN CONTENT ───────────────────────────────────── */}
      <div className="px-8 sm:px-14 lg:px-20 py-6">

        {/* Sort bar + mobile filter toggle */}
        <div className="flex items-center justify-between mb-6">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setFiltersVisible((v) => !v)}
            className="lg:hidden flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
            Filtros
          </button>

          {/* Product count */}
          <p className="hidden lg:block text-xs text-zinc-400 uppercase tracking-[0.14em]">
            {filtered.length} produtos
          </p>

          {/* ORDENAR POR dropdown */}
          <div className="relative ml-auto" ref={sortRef}>
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="flex items-center gap-3 border border-zinc-300 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-800 hover:border-zinc-900 transition-colors"
            >
              ORDENAR POR
              <svg
                className={`h-3 w-3 transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 z-30 bg-white border border-zinc-200 min-w-[200px] shadow-sm">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setFilters((f) => ({ ...f, sortBy: opt.value }))
                      setSortOpen(false)
                    }}
                    className={`w-full text-left px-5 py-3 text-xs uppercase tracking-[0.14em] hover:bg-zinc-50 transition-colors ${
                      filters.sortBy === opt.value ? 'font-bold text-zinc-900' : 'text-zinc-500'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar + Grid */}
        <div className="flex gap-10">

          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-48 flex-shrink-0">
            <ProductFilters filters={filters} onChange={setFilters} />
          </aside>

          {/* Mobile filters overlay */}
          {filtersVisible && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              <div className="absolute inset-0 bg-black/40" onClick={() => setFiltersVisible(false)} />
              <div className="relative ml-auto w-72 bg-white h-full overflow-y-auto p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-900">Filtros</h2>
                  <button onClick={() => setFiltersVisible(false)} className="text-zinc-400 hover:text-zinc-900">
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
            {loading
              ? <p className="text-sm text-zinc-400 py-20 text-center">Carregando produtos...</p>
              : <ProductGrid products={filtered} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}
