'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency } from '@/lib/utils'
import CartItem from '@/components/cart/CartItem'
import { Button } from '@/components/ui/Button'

export default function CarrinhoPage() {
  const items = useCartStore((s) => s.items)
  const total = useCartStore((s) => s.total())
  const clearCart = useCartStore((s) => s.clearCart)

  const shipping = total > 0 && total >= 199 ? 0 : total > 0 ? 19.9 : 0
  const finalTotal = total + shipping

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-slate-100 flex items-center justify-center">
            <svg className="h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Seu carrinho está vazio</h1>
        <p className="text-slate-500 mb-8">
          Que tal explorar nossos produtos e encontrar algo que você vai amar?
        </p>
        <Link href="/produtos">
          <Button variant="primary" size="lg">
            Explorar Produtos
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Meu Carrinho</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-900">
                {items.length} {items.length === 1 ? 'item' : 'itens'}
              </h2>
              <button
                onClick={clearCart}
                className="text-xs text-red-500 hover:text-red-700 transition-colors"
              >
                Limpar carrinho
              </button>
            </div>
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sticky top-24">
            <h2 className="font-semibold text-slate-900 mb-4">Resumo do Pedido</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Frete</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : 'text-slate-900'}>
                  {shipping === 0 ? 'Grátis' : formatCurrency(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-indigo-600 bg-indigo-50 rounded-lg p-2">
                  Adicione mais {formatCurrency(199 - total)} para ganhar frete grátis!
                </p>
              )}
              <div className="pt-3 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-base">
                <span>Total</span>
                <span>{formatCurrency(finalTotal)}</span>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <Link href="/checkout">
                <Button variant="primary" fullWidth size="lg">
                  Finalizar Compra
                </Button>
              </Link>
              <Link href="/produtos">
                <Button variant="secondary" fullWidth size="md">
                  Continuar Comprando
                </Button>
              </Link>
            </div>

            {/* Payment icons */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400 text-center mb-3">Pagamentos aceitos</p>
              <div className="flex justify-center gap-2">
                {['Visa', 'MC', 'PIX', 'Boleto'].map((p) => (
                  <span key={p} className="text-xs bg-slate-100 text-slate-500 rounded px-2 py-1">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
