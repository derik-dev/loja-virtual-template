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
    <div className="flex items-start gap-3 py-4 border-b border-slate-100 last:border-0">
      {/* Image */}
      <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-slate-100">
        <img
          src={item.product.images[0]}
          alt={item.product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 line-clamp-2 leading-snug">
          {item.product.name}
        </p>
        <p className="text-xs text-slate-400 mt-0.5 capitalize">{item.product.category}</p>

        {/* Quantity + Remove */}
        <div className="flex items-center gap-3 mt-2">
          {/* Quantity controls */}
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              aria-label="Diminuir quantidade"
              className="w-7 h-7 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
              </svg>
            </button>
            <span className="w-8 text-center text-sm font-medium text-slate-700">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              aria-label="Aumentar quantidade"
              className="w-7 h-7 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => removeItem(item.product.id)}
            aria-label="Remover item"
            className="text-xs text-red-500 hover:text-red-700 transition-colors"
          >
            Remover
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="flex-shrink-0 text-right">
        <p className="text-sm font-bold text-slate-900">
          {formatCurrency(item.product.price * item.quantity)}
        </p>
        {item.quantity > 1 && (
          <p className="text-xs text-slate-400 mt-0.5">
            {formatCurrency(item.product.price)} cada
          </p>
        )}
      </div>
    </div>
  )
}
