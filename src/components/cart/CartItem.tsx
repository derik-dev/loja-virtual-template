'use client'

import { CartItem as CartItemType } from '@/lib/types'
import { formatCurrency } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore()

  const subtitle = [item.selectedColor, item.selectedSize].filter(Boolean).join(' | ')

  return (
    <div className="flex gap-3 py-4 border-b border-zinc-100 last:border-0">
      {/* Image */}
      <div className="flex-shrink-0 w-[72px] h-[88px] bg-zinc-100 overflow-hidden">
        <img
          src={item.product.images[0]}
          alt={item.product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-zinc-900 leading-snug uppercase tracking-wide line-clamp-2">
              {item.product.name}
            </p>
            {subtitle && (
              <p className="text-[11px] text-zinc-400 mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            onClick={() => removeItem(item.product.id)}
            aria-label="Remover item"
            className="flex-shrink-0 text-zinc-400 hover:text-zinc-900 transition-colors mt-0.5"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          {/* Circular quantity controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              aria-label="Diminuir quantidade"
              className="w-6 h-6 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-600 hover:border-zinc-900 transition-colors"
            >
              <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
              </svg>
            </button>
            <span className="text-xs font-medium text-zinc-900 w-4 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              aria-label="Aumentar quantidade"
              className="w-6 h-6 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-600 hover:border-zinc-900 transition-colors"
            >
              <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>

          <p className="text-xs font-bold text-zinc-900">
            {formatCurrency(item.product.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  )
}
