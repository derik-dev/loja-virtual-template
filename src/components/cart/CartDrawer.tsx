'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { formatCurrency } from '@/lib/utils'
import { products as allProducts } from '@/lib/data/products'
import CartItem from './CartItem'

const FREE_SHIPPING_THRESHOLD = 399

const CATEGORIES = [
  { label: 'MASCULINO', href: '/produtos?categoria=masculino' },
  { label: 'FEMININO', href: '/produtos?categoria=feminino' },
  { label: 'KITS', href: '/produtos?categoria=kits' },
]

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [cepOpen, setCepOpen] = useState(false)
  const [cep, setCep] = useState('')
  const suggestRef = useRef<HTMLDivElement>(null)

  const items = useCartStore((s) => s.items)
  const total = useCartStore((s) => s.total())
  const { user } = useAuth()

  useEffect(() => { setMounted(true) }, [])

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

  const cartIds = new Set(items.map((i) => i.product.id))
  const suggestions = allProducts.filter((p) => !cartIds.has(p.id)).slice(0, 6)

  const scrollSuggestions = (dir: 'left' | 'right') => {
    if (!suggestRef.current) return
    suggestRef.current.scrollBy({ left: dir === 'left' ? -160 : 160, behavior: 'smooth' })
  }

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
          'fixed inset-y-0 right-0 z-50 flex flex-col bg-white w-full max-w-[420px] transition-transform duration-300 ease-in-out',
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
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-zinc-900">Carrinho</span>
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
        <div className="px-5 pt-3.5 pb-3 bg-sky-50">
          <div className="relative h-1.5 bg-sky-200 rounded-full overflow-visible mb-2">
            <div
              className="absolute inset-y-0 left-0 bg-sky-500 rounded-full transition-all duration-500"
              style={{ width: mounted ? `${progress}%` : '0%' }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-sky-500 border-2 border-white shadow transition-all duration-500"
              style={{ left: mounted ? `calc(${progress}% - 6px)` : '-6px' }}
            />
          </div>
          <p className="text-[11px] text-center text-zinc-600">
            {!mounted || remaining > 0
              ? <>Faltam <strong className="text-zinc-900">{mounted ? formatCurrency(remaining) : formatCurrency(FREE_SHIPPING_THRESHOLD)}</strong> para o Frete Grátis</>
              : <strong className="text-sky-700">Você desbloqueou Frete Grátis!</strong>
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
                    className="block w-full border border-zinc-300 py-3.5 text-xs font-bold tracking-[0.15em] uppercase text-zinc-900 text-center hover:bg-zinc-50 transition-colors"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="px-5 pt-1">
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>

              {/* Sugestões */}
              {suggestions.length > 0 && (
                <div className="border-t border-zinc-100 mt-1">
                  <div className="flex items-center justify-between px-5 py-3">
                    <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-zinc-500">
                      Sugestões para você
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => scrollSuggestions('left')}
                        className="text-zinc-400 hover:text-zinc-900 transition-colors"
                        aria-label="Anterior"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                      </button>
                      <button
                        onClick={() => scrollSuggestions('right')}
                        className="text-zinc-400 hover:text-zinc-900 transition-colors"
                        aria-label="Próximo"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div
                    ref={suggestRef}
                    className="flex gap-3 px-5 pb-4 overflow-x-auto scrollbar-none"
                    style={{ scrollbarWidth: 'none' }}
                  >
                    {suggestions.map((p) => (
                      <Link
                        key={p.id}
                        href={`/produto/${p.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="flex-shrink-0 w-[140px] group"
                      >
                        <div className="w-full aspect-[3/4] bg-zinc-100 overflow-hidden mb-2">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <p className="text-[10px] font-semibold text-zinc-900 uppercase leading-tight line-clamp-2 tracking-wide">
                          {p.name}
                        </p>
                        {p.colors && p.colors[0] && (
                          <p className="text-[10px] text-zinc-400 mt-0.5">{p.colors[0].name}</p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-zinc-200">
            {/* Prazo de entrega accordion */}
            <button
              onClick={() => setCepOpen((v) => !v)}
              className="w-full flex items-center justify-between px-5 py-4 border-b border-zinc-100 hover:bg-zinc-50 transition-colors"
            >
              <span className="text-xs font-bold tracking-[0.12em] uppercase text-zinc-900">Prazo de Entrega</span>
              <svg
                className={`h-4 w-4 text-zinc-500 transition-transform duration-200 ${cepOpen ? 'rotate-45' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>

            {cepOpen && (
              <div className="px-5 py-3 border-b border-zinc-100 bg-zinc-50">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cep}
                    onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
                    placeholder="00000-000"
                    className="flex-1 border border-zinc-300 px-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900"
                  />
                  <button className="bg-zinc-900 text-white text-[10px] font-bold tracking-wider uppercase px-4 hover:bg-zinc-700 transition-colors">
                    OK
                  </button>
                </div>
              </div>
            )}

            {/* Subtotal */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
              <span className="text-xs font-bold tracking-[0.12em] uppercase text-zinc-900">Subtotal</span>
              <span className="text-sm font-bold text-zinc-900">{formatCurrency(total)}</span>
            </div>

            {/* CTA */}
            <div className="px-5 py-4 space-y-3">
              <Link href="/checkout" onClick={() => setIsOpen(false)}>
                <button className="w-full bg-zinc-900 text-white text-xs font-bold tracking-[0.18em] uppercase py-4 hover:bg-zinc-700 transition-colors">
                  Finalizar a Compra
                </button>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-center text-xs font-medium text-zinc-900 underline underline-offset-4 tracking-wide py-1 hover:text-zinc-500 transition-colors"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
