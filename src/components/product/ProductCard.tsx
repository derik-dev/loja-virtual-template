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

  const stars = Array.from({ length: 5 }, (_, i) => i + 1)

  return (
    <div className="group relative flex flex-col bg-white border border-zinc-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-zinc-900 hover:shadow-2xl hover:shadow-zinc-900/10 hover:-translate-y-0.5">

      {/* ── IMAGE ─── */}
      <Link
        href={`/produto/${product.slug}`}
        className="relative block overflow-hidden bg-stone-50"
        style={{ aspectRatio: '1 / 1' }}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.stock === 0 && (
            <span className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold bg-zinc-100 text-zinc-500">
              Esgotado
            </span>
          )}
          {discount && discount > 0 && (
            <span className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold bg-red-600 text-white">
              -{discount}%
            </span>
          )}
          {product.featured && !discount && product.stock > 0 && (
            <span className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold bg-zinc-900 text-white">
              Destaque
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
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md border border-zinc-100 text-zinc-400 hover:text-red-500 transition-all duration-200 opacity-0 group-hover:opacity-100"
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

        {/* Quick-view overlay on hover */}
        <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/8 transition-colors duration-300" />
      </Link>

      {/* ── CONTENT ─── */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Category */}
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
          {product.category}
        </span>

        {/* Name */}
        <Link href={`/produto/${product.slug}`}>
          <h3 className="text-sm font-semibold text-zinc-800 leading-snug line-clamp-2 hover:text-zinc-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {stars.map((star) => (
              <svg
                key={star}
                className={`h-3 w-3 ${
                  star <= Math.round(product.rating) ? 'text-amber-400' : 'text-zinc-200'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-zinc-400">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 pt-0.5">
          <span
            className={`text-base font-bold ${
              product.originalPrice ? 'text-red-600' : 'text-zinc-900'
            }`}
          >
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-zinc-400 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to cart — transforms on card hover */}
        <div className="mt-auto pt-2">
          <button
            onClick={() => addItem(product)}
            disabled={product.stock === 0}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-transparent py-2.5 text-sm font-semibold text-zinc-600 transition-all duration-300 group-hover:bg-zinc-900 group-hover:border-zinc-900 group-hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            {product.stock === 0 ? 'Esgotado' : 'Adicionar ao Carrinho'}
          </button>
        </div>
      </div>
    </div>
  )
}
