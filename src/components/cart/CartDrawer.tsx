'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency } from '@/lib/utils'
import CartItem from './CartItem'
import { Button } from '@/components/ui/Button'

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const items = useCartStore((s) => s.items)
  const total = useCartStore((s) => s.total())
  const itemCount = useCartStore((s) => s.itemCount())

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev)
    window.addEventListener('toggle-cart', handleToggle)
    return () => window.removeEventListener('toggle-cart', handleToggle)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const shipping = total > 199 ? 0 : 19.9
  const finalTotal = total + shipping

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={[
          'fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
        aria-label="Carrinho de compras"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-slate-900">Carrinho</h2>
            {itemCount > 0 && (
              <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-indigo-600 text-xs font-bold text-white">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Fechar carrinho"
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <svg
                className="h-16 w-16 text-slate-200 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              <p className="text-slate-500 font-medium">Seu carrinho está vazio</p>
              <p className="text-slate-400 text-sm mt-1">Adicione produtos para continuar</p>
              <Button
                variant="primary"
                size="sm"
                className="mt-4"
                onClick={() => setIsOpen(false)}
              >
                <Link href="/produtos">Ver produtos</Link>
              </Button>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-slate-200 px-5 py-5 space-y-3">
            {/* Shipping */}
            <div className="flex justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Frete</span>
              <span className={shipping === 0 ? 'text-green-600 font-medium' : 'text-slate-900'}>
                {shipping === 0 ? 'Grátis' : formatCurrency(shipping)}
              </span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-slate-400">
                Frete grátis em compras acima de {formatCurrency(199)}
              </p>
            )}
            <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-100">
              <span>Total</span>
              <span>{formatCurrency(finalTotal)}</span>
            </div>

            {/* Actions */}
            <Link href="/checkout" onClick={() => setIsOpen(false)}>
              <Button variant="primary" fullWidth size="lg">
                Finalizar Compra
              </Button>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-sm text-slate-500 hover:text-indigo-600 transition-colors py-1"
            >
              Continuar comprando
            </button>
          </div>
        )}
      </div>
    </>
  )
}
