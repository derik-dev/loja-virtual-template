'use client'

import { CartItem as CartItemType } from '@/lib/types'
import { formatCurrency } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore()

  return (
    <div className="flex gap-4 py-5 border-b border-zinc-100 last:border-0">
      {/* Image */}
      <div className="flex-shrink-0 w-20 h-24 bg-zinc-100 overflow-hidden">
        <img
          src={item.product.images[0]}
          alt={item.product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <p className="text-xs font-medium text-zinc-900 leading-snug line-clamp-2 uppercase tracking-wide">
            {item.product.name}
          </p>
          <p className="text-xs text-zinc-400 mt-0.5 capitalize">{item.product.category}</p>
        </div>

        <div className="flex items-center justify-between mt-3">
          {/* Quantity controls */}
          <div className="flex items-center border border-zinc-300">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              aria-label="Diminuir quantidade"
              className="w-7 h-7 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
              </svg>
            </button>
            <span className="w-7 text-center text-xs font-medium text-zinc-900">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              aria-label="Aumentar quantidade"
              className="w-7 h-7 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>

          {/* Price + remove */}
          <div className="text-right">
            <p className="text-xs font-bold text-zinc-900">
              {formatCurrency(item.product.price * item.quantity)}
            </p>
            <button
              onClick={() => removeItem(item.product.id)}
              aria-label="Remover item"
              className="text-[10px] text-zinc-400 hover:text-red-500 transition-colors mt-1 uppercase tracking-wide"
            >
              Remover
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
