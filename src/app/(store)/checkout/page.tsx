'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency } from '@/lib/utils'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

type PaymentMethod = 'cartao' | 'pix' | 'boleto'

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items)
  const total = useCartStore((s) => s.total())
  const clearCart = useCartStore((s) => s.clearCart)

  const [payment, setPayment] = useState<PaymentMethod>('cartao')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const shipping = total >= 199 ? 0 : 19.9
  const finalTotal = total + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    clearCart()
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Pedido Confirmado!</h1>
        <p className="text-slate-500 mb-2">
          Seu pedido foi recebido com sucesso.
        </p>
        <p className="text-slate-500 mb-8 text-sm">
          Você receberá um e-mail com os detalhes e o código de rastreio em breve.
        </p>
        <Button variant="primary" size="lg" onClick={() => window.location.href = '/'}>
          Voltar para a Loja
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Finalizar Compra</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informações Pessoais */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-indigo-600 text-white text-xs font-bold">1</span>
                Informações Pessoais
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Nome completo" placeholder="João Silva" required />
                <Input label="E-mail" type="email" placeholder="joao@email.com" required />
                <Input label="CPF" placeholder="000.000.000-00" required />
                <Input label="Telefone" placeholder="(11) 99999-9999" required />
              </div>
            </div>

            {/* Endereço */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-indigo-600 text-white text-xs font-bold">2</span>
                Endereço de Entrega
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="CEP" placeholder="00000-000" required className="sm:col-span-1" />
                <div className="hidden sm:block" />
                <Input label="Endereço" placeholder="Rua, Avenida..." required className="sm:col-span-2" />
                <Input label="Número" placeholder="123" required />
                <Input label="Complemento" placeholder="Apto, Bloco..." />
                <Input label="Bairro" placeholder="Centro" required />
                <Input label="Cidade" placeholder="São Paulo" required />
                <Input label="Estado" placeholder="SP" required />
              </div>
            </div>

            {/* Pagamento */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-indigo-600 text-white text-xs font-bold">3</span>
                Forma de Pagamento
              </h2>

              {/* Payment method radio */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {([
                  { value: 'cartao', label: 'Cartão de Crédito' },
                  { value: 'pix', label: 'PIX' },
                  { value: 'boleto', label: 'Boleto' },
                ] as const).map((opt) => (
                  <label
                    key={opt.value}
                    className={[
                      'flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all',
                      payment === opt.value
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-slate-200 hover:border-slate-300',
                    ].join(' ')}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={opt.value}
                      checked={payment === opt.value}
                      onChange={() => setPayment(opt.value)}
                      className="sr-only"
                    />
                    <span className="text-xs font-medium text-center leading-snug">{opt.label}</span>
                  </label>
                ))}
              </div>

              {/* Card fields */}
              {payment === 'cartao' && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Número do Cartão" placeholder="0000 0000 0000 0000" required className="sm:col-span-2" />
                  <Input label="Nome no Cartão" placeholder="JOÃO SILVA" required className="sm:col-span-2" />
                  <Input label="Validade" placeholder="MM/AA" required />
                  <Input label="CVV" placeholder="123" required />
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-slate-700">Parcelas</label>
                    <select className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option>1x de {formatCurrency(finalTotal)} sem juros</option>
                      <option>2x de {formatCurrency(finalTotal / 2)} sem juros</option>
                      <option>3x de {formatCurrency(finalTotal / 3)} sem juros</option>
                      <option>6x de {formatCurrency(finalTotal / 6)} sem juros</option>
                      <option>12x de {formatCurrency(finalTotal / 12)} com juros</option>
                    </select>
                  </div>
                </div>
              )}

              {payment === 'pix' && (
                <div className="text-center py-6 bg-slate-50 rounded-xl">
                  <div className="h-32 w-32 mx-auto bg-white border-4 border-slate-200 rounded-xl flex items-center justify-center mb-3">
                    <span className="text-xs text-slate-400">QR Code PIX</span>
                  </div>
                  <p className="text-sm text-slate-600">O QR Code será gerado após confirmar o pedido.</p>
                  <p className="text-xs text-green-600 font-medium mt-1">5% de desconto no PIX</p>
                </div>
              )}

              {payment === 'boleto' && (
                <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600">
                  <p>O boleto será gerado após a confirmação e enviado para seu e-mail.</p>
                  <p className="text-xs text-slate-500 mt-2">Prazo de pagamento: 3 dias úteis. Após o vencimento, o pedido é cancelado automaticamente.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sticky top-24">
              <h2 className="font-semibold text-slate-900 mb-4">Resumo</h2>

              {/* Items list */}
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-800 line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-slate-500">Qtd: {item.quantity}</p>
                    </div>
                    <p className="text-xs font-semibold text-slate-900 flex-shrink-0">
                      {formatCurrency(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2 text-sm">
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
                <div className="pt-2 border-t border-slate-100 flex justify-between font-bold text-base text-slate-900">
                  <span>Total</span>
                  <span>{formatCurrency(finalTotal)}</span>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                loading={loading}
                className="mt-5"
              >
                Confirmar Pedido
              </Button>

              <p className="text-xs text-slate-400 text-center mt-3">
                Ao confirmar, você aceita nossos{' '}
                <a href="/termos" className="text-indigo-600 hover:underline">termos de uso</a>.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
