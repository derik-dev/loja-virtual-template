'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { formatCurrency } from '@/lib/utils'
import CartItem from './CartItem'

const FREE_SHIPPING_THRESHOLD = 399
const SHIPPING_PRICE = 19.9

const CATEGORIES = [
  { label: 'MASCULINO', href: '/produtos?categoria=masculino' },
  { label: 'FEMININO', href: '/produtos?categoria=feminino' },
  { label: 'KITS', href: '/produtos?categoria=kits' },
]

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [hasAddress, setHasAddress] = useState(false)
  const items = useCartStore((s) => s.items)
  const total = useCartStore((s) => s.total())
  const itemCount = useCartStore((s) => s.itemCount())
  const { user } = useAuth()

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!user) { setHasAddress(false); return }
    supabase.from('addresses').select('id', { count: 'exact', head: true }).eq('user_id', user.id)
      .then(({ count }) => setHasAddress((count ?? 0) > 0))
  }, [user])

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev)
    window.addEventListener('toggle-cart', handleToggle)
    return () => window.removeEventListener('toggle-cart', handleToggle)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - total)
  const progress = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100)
  const shippingFree = total >= FREE_SHIPPING_THRESHOLD
  const shipping = hasAddress ? (shippingFree ? 0 : SHIPPING_PRICE) : null

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={[
          'fixed inset-y-0 right-0 z-50 flex flex-col bg-white w-full max-w-[480px] transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
        aria-label="Carrinho de compras"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200">
          <div className="flex items-center gap-2.5">
            <svg className="h-5 w-5 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-zinc-900">
              Carrinho
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Fechar carrinho"
            className="p-1 text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Frete grátis progress */}
        <div className="px-5 pt-4 pb-3 bg-blue-50">
          <div className="relative h-1.5 bg-blue-200 rounded-full overflow-visible mb-2">
            <div
              className="absolute inset-y-0 left-0 bg-blue-800 rounded-full transition-all duration-500"
              style={{ width: mounted ? `${progress}%` : '0%' }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-800 border-2 border-white shadow transition-all duration-500"
              style={{ left: mounted ? `calc(${progress}% - 6px)` : '-6px' }}
            />
          </div>
          <p className="text-xs text-center text-zinc-600">
            {!mounted || remaining > 0
              ? <>Faltam <strong>{mounted ? formatCurrency(remaining) : formatCurrency(FREE_SHIPPING_THRESHOLD)}</strong> pra ganhar Frete Grátis</>
              : <strong className="text-green-700">Você ganhou Frete Grátis! 🎉</strong>
            }
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center gap-8">
              <p className="text-sm text-zinc-500 leading-relaxed">
                O seu carrinho ainda está vazio.<br />
                Aceita algumas sugestões?
              </p>
              <div className="w-full space-y-3">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.label}
                    href={cat.href}
                    onClick={() => setIsOpen(false)}
                    className="block w-full border border-zinc-300 py-3.5 text-xs font-bold tracking-[0.15em] uppercase text-zinc-900 text-center rounded hover:bg-zinc-50 transition-colors"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="px-5 py-2">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer com resumo e checkout */}
        {items.length > 0 && (
          <div className="border-t border-zinc-200 px-5 py-5 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'itens'})</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Frete</span>
                {shipping === null
                  ? <span className="text-zinc-400 text-xs">Calculado no checkout</span>
                  : shipping === 0
                    ? <span className="text-green-700 font-medium">Grátis</span>
                    : <span className="text-zinc-700">{formatCurrency(shipping)}</span>
                }
              </div>
              <div className="flex justify-between font-bold text-zinc-900 text-base pt-2 border-t border-zinc-100">
                <span>Total</span>
                <span>{formatCurrency(total + (shipping ?? 0))}</span>
              </div>
            </div>

            <Link href="/checkout" onClick={() => setIsOpen(false)}>
              <button className="w-full bg-zinc-900 text-white text-xs font-bold tracking-[0.15em] uppercase py-4 hover:bg-zinc-700 transition-colors">
                Finalizar Compra
              </button>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-xs text-zinc-400 hover:text-zinc-700 transition-colors tracking-wide uppercase py-1"
            >
              Continuar comprando
            </button>
          </div>
        )}
      </div>
    </>
  )
}
