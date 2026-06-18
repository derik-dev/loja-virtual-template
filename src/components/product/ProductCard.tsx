'use client'

import Link from 'next/link'
import { Product } from '@/lib/types'
import { formatCurrency, calculateDiscount } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useWishlist } from '@/hooks/useWishlist'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const { toggleWishlist, isWishlisted } = useWishlist()
  const wishlisted = isWishlisted(product.id)
  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : null

  return (
    <div className="group relative flex flex-col">

      {/* IMAGE */}
      <Link
        href={`/produto/${product.slug}`}
        className="relative block overflow-hidden bg-zinc-100"
        style={{ aspectRatio: '3 / 4' }}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.stock === 0 && (
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] bg-zinc-100 text-zinc-500">
              Esgotado
            </span>
          )}
          {discount && discount > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] bg-zinc-900 text-white">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault()
            toggleWishlist(product.id)
          }}
          aria-label={wishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center bg-white text-zinc-400 hover:text-zinc-900 transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          <svg
            className="h-4 w-4"
            fill={wishlisted ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

        {/* Add to cart overlay on hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={(e) => {
              e.preventDefault()
              if (product.stock > 0) addItem(product)
            }}
            disabled={product.stock === 0}
            className="w-full bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-[0.18em] py-3 hover:bg-zinc-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {product.stock === 0 ? 'Esgotado' : 'Adicionar'}
          </button>
        </div>
      </Link>

      {/* CONTENT */}
      <div className="pt-3 flex flex-col gap-1">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
          {product.category}
        </span>

        <Link href={`/produto/${product.slug}`}>
          <h3 className="text-sm font-medium text-zinc-800 leading-snug line-clamp-2 hover:text-zinc-500 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2 pt-0.5">
          <span className={`text-sm font-bold ${product.originalPrice ? 'text-zinc-900' : 'text-zinc-900'}`}>
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-zinc-400 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
