'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

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

const masculinoProducts: ShowcaseProduct[] = [
  {
    id: 'm1',
    name: 'Blusa Gola Alta Manga Longa',
    price: 199,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop&q=80',
    badge: 'LANÇAMENTO',
    colors: ['#111', '#4a3728', '#1a2a4a'],
    slug: 'blusa-gola-alta',
  },
  {
    id: 'm2',
    name: 'Jaqueta Ripstop Masculino',
    price: 599,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop&q=80',
    badge: 'LANÇAMENTO',
    colors: ['#1a2a4a', '#4a4a4a'],
    slug: 'jaqueta-ripstop',
  },
  {
    id: 'm3',
    name: 'Suéter Future Knit',
    price: 999,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop&q=80',
    badge: 'LANÇAMENTO',
    colors: ['#111', '#c9b99a', '#c8b400'],
    slug: 'sueter-future-knit',
  },
  {
    id: 'm4',
    name: 'Camiseta Essential Masculino',
    price: 132,
    originalPrice: 169,
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=800&fit=crop&q=80',
    badge: 'BEST SELLER',
    badgeExtra: '22% OFF',
    colors: ['#111', '#6b3a2a', '#3d2b1f', '#1a2a4a', '#8b0000', '#1a3a5c', '#f5f5f5', '#8b7355', '#2d4a2d'],
    rating: 4.8,
    reviewCount: 25598,
    slug: 'camiseta-essential',
  },
  {
    id: 'm5',
    name: 'Calça Jogger Masculino',
    price: 349,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop&q=80',
    colors: ['#111', '#1a2a4a', '#4a4a4a'],
    slug: 'calca-jogger',
  },
  {
    id: 'm6',
    name: 'Moletom Oversized Masculino',
    price: 459,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&h=800&fit=crop&q=80',
    badge: 'LANÇAMENTO',
    colors: ['#c9b99a', '#111', '#4a4a4a'],
    slug: 'moletom-oversized',
  },
  {
    id: 'm7',
    name: 'Camisa Linho Premium',
    price: 289,
    originalPrice: 359,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&h=800&fit=crop&q=80',
    badgeExtra: '20% OFF',
    colors: ['#f5f5f5', '#c9b99a', '#1a2a4a'],
    rating: 4.6,
    reviewCount: 3241,
    slug: 'camisa-linho',
  },
  {
    id: 'm8',
    name: 'Shorts Masculino Treino',
    price: 179,
    image: 'https://images.unsplash.com/photo-1565084888279-aca607bb1f6a?w=600&h=800&fit=crop&q=80',
    colors: ['#111', '#1a2a4a', '#2d4a2d', '#8b0000'],
    slug: 'shorts-treino',
  },
  {
    id: 'm9',
    name: 'Polo Tech Masculino',
    price: 249,
    image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=800&fit=crop&q=80',
    badge: 'BEST SELLER',
    colors: ['#f5f5f5', '#111', '#1a2a4a', '#2d4a2d'],
    rating: 4.9,
    reviewCount: 11203,
    slug: 'polo-tech',
  },
]

const femininoProducts: ShowcaseProduct[] = [
  {
    id: 'f1',
    name: 'Vestido Midi Feminino',
    price: 499,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop&q=80',
    badge: 'LANÇAMENTO',
    colors: ['#2d5a3d', '#111', '#c9b99a'],
    slug: 'vestido-midi',
  },
  {
    id: 'f2',
    name: 'Blusa Cropped Feminino',
    price: 199,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop&q=80',
    badge: 'LANÇAMENTO',
    colors: ['#f5f5f5', '#111', '#c9b99a'],
    slug: 'blusa-cropped',
  },
  {
    id: 'f3',
    name: 'Calça Wide Leg Feminino',
    price: 379,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop&q=80',
    badge: 'LANÇAMENTO',
    colors: ['#111', '#c9b99a', '#f5f5f5'],
    slug: 'calca-wide-leg',
  },
  {
    id: 'f4',
    name: 'Jaqueta Oversized Feminino',
    price: 289,
    originalPrice: 369,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop&q=80',
    badge: 'BEST SELLER',
    badgeExtra: '22% OFF',
    colors: ['#4a4a4a', '#1a2a4a', '#f5f5f5'],
    rating: 4.7,
    reviewCount: 8420,
    slug: 'jaqueta-oversized',
  },
  {
    id: 'f5',
    name: 'Top Essential Feminino',
    price: 149,
    image: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&h=800&fit=crop&q=80',
    colors: ['#f5f5f5', '#111', '#8b0000', '#1a2a4a'],
    slug: 'top-essential',
  },
  {
    id: 'f6',
    name: 'Saia Midi Plissada',
    price: 329,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&h=800&fit=crop&q=80',
    badge: 'LANÇAMENTO',
    colors: ['#c9b99a', '#2d5a3d', '#111'],
    slug: 'saia-midi',
  },
  {
    id: 'f7',
    name: 'Moletom Feminino Cropped',
    price: 389,
    originalPrice: 459,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop&q=80',
    badgeExtra: '15% OFF',
    colors: ['#c9b99a', '#f5f5f5', '#111', '#8b0000'],
    rating: 4.5,
    reviewCount: 5610,
    slug: 'moletom-cropped',
  },
  {
    id: 'f8',
    name: 'Vestido Longo Feminino',
    price: 599,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop&q=80',
    badge: 'LANÇAMENTO',
    colors: ['#2d5a3d', '#111', '#8b0000'],
    slug: 'vestido-longo',
  },
  {
    id: 'f9',
    name: 'Conjunto Feminino Jogger',
    price: 519,
    image: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=600&h=800&fit=crop&q=80',
    badge: 'BEST SELLER',
    colors: ['#111', '#c9b99a', '#f5f5f5'],
    rating: 4.8,
    reviewCount: 9874,
    slug: 'conjunto-jogger',
  },
]

function ProductCard({ product }: { product: ShowcaseProduct }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <Link href={`/produto/${product.slug}`} className="group flex-shrink-0 w-[280px] sm:w-[320px]">
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

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState<'masculino' | 'feminino'>('masculino')
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  const products = activeTab === 'masculino' ? masculinoProducts : femininoProducts

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
  }, [activeTab])

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
