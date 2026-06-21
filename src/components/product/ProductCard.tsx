'use client'

import Link from 'next/link'
import { Product } from '@/lib/types'
import { formatCurrency, calculateDiscount } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useWishlist } from '@/hooks/useWishlist'
import { useAuth } from '@/context/AuthContext'

interface ProductCardProps {
  product: Product
}


export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const { toggleWishlist, isWishlisted } = useWishlist()
  const { user, openAuthModal } = useAuth()
  const wishlisted = isWishlisted(product.id)
  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : null
  const colors = product.colors?.map((c) => c.hex) ?? []

  const badges: string[] = []
  if (product.featured) badges.push('BEST SELLER')
  if (discount) badges.push(`${discount}% OFF`)
  if (!product.featured && !discount) badges.push('LANÇAMENTO')
  if (product.stock > 0 && product.stock <= 3) badges.push('ÚLTIMAS PEÇAS')

  return (
    <div className="group relative flex flex-col">

      {/* IMAGE */}
      <Link
        href={`/produto/${product.slug}`}
        className="relative block overflow-hidden bg-zinc-100"
        style={{ aspectRatio: '3 / 4' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badges — bottom left no mobile, top right no desktop */}
        {badges.length > 0 && (
          <div className="absolute bottom-3 left-3 sm:bottom-auto sm:top-3 sm:left-auto sm:right-3 flex flex-col items-start sm:items-end gap-1">
            {badges.map((badge) => (
              <span
                key={badge}
                className="bg-white border border-zinc-300 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-800 whitespace-nowrap"
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault()
            toggleWishlist(product.id)
          }}
          aria-label={wishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          className="absolute top-3 left-3 flex h-7 w-7 items-center justify-center bg-white/80 text-zinc-400 hover:text-zinc-900 transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          <svg
            className="h-4 w-4"
            fill={wishlisted ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>

        {/* Quick add on hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={(e) => {
              e.preventDefault()
              if (product.stock === 0) return
              if (!user) { openAuthModal(); return }
              addItem(product)
            }}
            disabled={product.stock === 0}
            className="w-full bg-zinc-900/90 text-white text-[10px] font-bold uppercase tracking-[0.18em] py-3 hover:bg-zinc-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {product.stock === 0 ? 'Esgotado' : 'Adicionar'}
          </button>
        </div>
      </Link>

      {/* COLOR SWATCHES */}
      <div className="flex items-center gap-1.5 mt-2.5">
        {colors.map((color, i) => (
          <button
            key={i}
            title={color}
            className="h-3.5 w-3.5 rounded-full border border-zinc-200 hover:scale-110 transition-transform"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* INFO */}
      <div className="mt-2 flex flex-col gap-1">
        <Link href={`/produto/${product.slug}`}>
          <h3 className="text-sm text-zinc-800 leading-snug line-clamp-2 hover:text-zinc-500 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2">
          {product.originalPrice && (
            <span className="text-xs text-zinc-400 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
          <span className="text-sm font-semibold text-zinc-900">
            {formatCurrency(product.price)}
          </span>
        </div>

        {product.reviewCount > 0 && (
          <div className="flex items-center gap-1">
            <svg className="h-3 w-3 text-zinc-800" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs text-zinc-500">{product.rating} ({product.reviewCount.toLocaleString('pt-BR')} reviews)</span>
          </div>
        )}
      </div>
    </div>
  )
}
