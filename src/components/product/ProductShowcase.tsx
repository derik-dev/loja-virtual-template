'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import type { Product } from '@/lib/types'

interface ShowcaseProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  badge?: string
  badgeExtra?: string
  colors: string[]
  rating?: number
  reviewCount?: number
  slug: string
}

function toShowcase(p: Product): ShowcaseProduct {
  const discount = p.originalPrice
    ? Math.round((1 - p.price / p.originalPrice) * 100)
    : null
  return {
    id: p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.originalPrice,
    image: p.images[0] ?? '',
    badge: p.featured ? 'BEST SELLER' : undefined,
    badgeExtra: discount ? `${discount}% OFF` : undefined,
    colors: (p.colors ?? []).map((c) => c.hex),
    rating: p.rating || undefined,
    reviewCount: p.reviewCount || undefined,
    slug: p.slug,
  }
}

function ProductCard({ product }: { product: ShowcaseProduct }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <Link href={`/produto/${product.slug}`} className="group flex-shrink-0 w-[82vw] sm:w-[320px]">
      <div className="relative overflow-hidden bg-zinc-100" style={{ aspectRatio: '3/4' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {(product.badge || product.badgeExtra) && (
          <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
            {product.badge && (
              <span className="bg-white border border-zinc-200 text-zinc-800 text-[10px] font-semibold tracking-[0.08em] px-2 py-0.5">
                {product.badge}
              </span>
            )}
            {product.badgeExtra && (
              <span className="bg-white border border-zinc-200 text-zinc-800 text-[10px] font-semibold tracking-[0.08em] px-2 py-0.5">
                {product.badgeExtra}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 mt-3">
        {product.colors.slice(0, 8).map((color, i) => (
          <span
            key={i}
            className="h-3.5 w-3.5 rounded-full border border-zinc-200 flex-shrink-0"
            style={{ backgroundColor: color }}
          />
        ))}
        {product.colors.length > 8 && (
          <span className="text-[10px] text-zinc-400">+{product.colors.length - 8}</span>
        )}
      </div>

      <div className="mt-2">
        <p className="text-sm text-zinc-800 leading-snug">{product.name}</p>
        <div className="mt-1.5 flex items-baseline gap-2">
          {product.originalPrice && (
            <span className="text-xs text-zinc-400 line-through">R${product.originalPrice}</span>
          )}
          <span className="text-sm text-zinc-900">R${product.price}</span>
          {discount && <span className="text-xs text-zinc-400">com cupom</span>}
        </div>
        {product.rating && (
          <div className="mt-1 flex items-center gap-1">
            <span className="text-[11px] text-zinc-500">★ {product.rating}</span>
            <span className="text-[11px] text-zinc-400">({product.reviewCount?.toLocaleString('pt-BR')} reviews)</span>
          </div>
        )}
      </div>
    </Link>
  )
}

interface Props {
  products: Product[]
}

export default function ProductShowcase({ products: rawProducts }: Props) {
  const [activeTab, setActiveTab] = useState<'masculino' | 'feminino'>('masculino')
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  const products = rawProducts.map(toShowcase)

  function updateArrows() {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', updateArrows)
    updateArrows()
    return () => el.removeEventListener('scroll', updateArrows)
  }, [activeTab, rawProducts])

  function scrollBy(dir: 'left' | 'right') {
    scrollRef.current?.scrollBy({ left: dir === 'right' ? 340 : -340, behavior: 'smooth' })
  }

  const ArrowBtn = ({ dir }: { dir: 'left' | 'right' }) => (
    <button
      onClick={() => scrollBy(dir)}
      className="absolute top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white border border-zinc-200 shadow-md flex items-center justify-center hover:bg-zinc-50 transition-all z-10"
      style={{ [dir === 'left' ? 'left' : 'right']: '12px' }}
      aria-label={dir === 'left' ? 'Anterior' : 'Próximo'}
    >
      <svg className="h-4 w-4 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d={dir === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
      </svg>
    </button>
  )

  return (
    <section className="py-16 bg-white">
      {/* Tabs */}
      <div className="flex justify-center mb-10">
        {(['masculino', 'feminino'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab)
              scrollRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
            }}
            className={[
              'px-10 py-3 text-sm tracking-[0.18em] uppercase transition-colors border-b-2',
              activeTab === tab
                ? 'border-zinc-900 text-zinc-900 font-medium'
                : 'border-zinc-200 text-zinc-400 font-normal hover:text-zinc-600',
            ].join(' ')}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Scroll area */}
      <div className="relative">
        {canScrollLeft && <ArrowBtn dir="left" />}
        {canScrollRight && <ArrowBtn dir="right" />}

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto px-8 sm:px-14 lg:px-20 pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-10">
        <Link
          href="/produtos?categoria=roupas"
          className="bg-zinc-900 text-white text-xs font-bold uppercase tracking-[0.2em] px-14 py-4 hover:bg-zinc-700 transition-colors"
        >
          Shop {activeTab === 'masculino' ? 'Masculino' : 'Feminino'}
        </Link>
      </div>
    </section>
  )
}
