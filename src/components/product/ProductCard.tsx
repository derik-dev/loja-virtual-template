'use client'

import Link from 'next/link'
import { Product } from '@/lib/types'
import { formatCurrency, calculateDiscount } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useWishlist } from '@/hooks/useWishlist'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

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
    <div className="group relative flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
      {/* Image */}
      <Link href={`/produto/${product.slug}`} className="block overflow-hidden aspect-square relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.stock === 0 && <Badge variant="soldout">Esgotado</Badge>}
          {discount && discount > 0 && (
            <Badge variant="sale">-{discount}%</Badge>
          )}
          {product.featured && !discount && product.stock > 0 && (
            <Badge variant="new">Destaque</Badge>
          )}
        </div>
        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault()
            toggleWishlist(product.id)
          }}
          aria-label={wishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm text-slate-400 hover:text-red-500 hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
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
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3">
        {/* Category */}
        <span className="text-xs text-indigo-500 font-medium uppercase tracking-wide mb-1">
          {product.category}
        </span>

        {/* Name */}
        <Link href={`/produto/${product.slug}`}>
          <h3 className="text-sm font-semibold text-slate-800 hover:text-indigo-600 transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {stars.map((star) => (
              <svg
                key={star}
                className={`h-3 w-3 ${
                  star <= Math.round(product.rating)
                    ? 'text-amber-400'
                    : 'text-slate-200'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-slate-500">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span
            className={`text-base font-bold ${
              product.originalPrice ? 'text-red-600' : 'text-slate-900'
            }`}
          >
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-slate-400 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <div className="mt-auto">
          <Button
            onClick={() => addItem(product)}
            disabled={product.stock === 0}
            fullWidth
            size="sm"
            variant="primary"
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            {product.stock === 0 ? 'Esgotado' : 'Adicionar'}
          </Button>
        </div>
      </div>
    </div>
  )
}
