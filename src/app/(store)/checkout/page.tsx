'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency } from '@/lib/utils'

type PaymentMethod = 'cartao' | 'pix' | 'boleto'

function Field({
  label,
  colSpan2,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; colSpan2?: boolean }) {
  const id = label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className={colSpan2 ? 'sm:col-span-2' : ''}>
      <label htmlFor={id} className="block text-[10px] font-bold tracking-[0.12em] uppercase text-zinc-500 mb-1.5">
        {label}
      </label>
      <input
        id={id}
        className="w-full border border-zinc-300 px-3 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 transition-colors bg-white"
        {...props}
      />
    </div>
  )
}

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items)
  const total = useCartStore((s) => s.total())
  const clearCart = useCartStore((s) => s.clearCart)

  const [payment, setPayment] = useState<PaymentMethod>('cartao')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const shipping = total >= 399 ? 0 : 19.9
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
      <div className="mx-auto max-w-md px-4 py-32 text-center">
        <div className="w-16 h-16 border border-zinc-900 flex items-center justify-center mx-auto mb-8">
          <svg className="h-8 w-8 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="text-xl font-bold uppercase tracking-[0.15em] text-zinc-900 mb-4">Pedido Confirmado</h1>
        <p className="text-sm text-zinc-500 mb-2">Seu pedido foi recebido com sucesso.</p>
        <p className="text-xs text-zinc-400 mb-10">
          Você receberá um e-mail com os detalhes e o código de rastreio em breve.
        </p>
        <Link
          href="/"
          className="inline-block bg-zinc-900 text-white text-xs font-bold tracking-[0.15em] uppercase px-10 py-4 hover:bg-zinc-700 transition-colors"
        >
          Voltar para a Loja
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-900 mb-10">
        Finalizar Compra
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-10">

          {/* ── ESQUERDA: formulário ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* 1. Informações Pessoais */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center h-6 w-6 border border-zinc-900 text-[10px] font-bold text-zinc-900">
                  1
                </span>
                <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-zinc-900">
                  Informações Pessoais
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Nome completo" placeholder="João Silva" required />
                <Field label="E-mail" type="email" placeholder="joao@email.com" required />
                <Field label="CPF" placeholder="000.000.000-00" required />
                <Field label="Telefone" placeholder="(11) 99999-9999" required />
              </div>
            </section>

            <div className="border-t border-zinc-100" />

            {/* 2. Endereço */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center h-6 w-6 border border-zinc-900 text-[10px] font-bold text-zinc-900">
                  2
                </span>
                <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-zinc-900">
                  Endereço de Entrega
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="CEP" placeholder="00000-000" required />
                <div className="hidden sm:block" />
                <Field label="Endereço" placeholder="Rua, Avenida..." required colSpan2 />
                <Field label="Número" placeholder="123" required />
                <Field label="Complemento" placeholder="Apto, Bloco..." />
                <Field label="Bairro" placeholder="Centro" required />
                <Field label="Cidade" placeholder="São Paulo" required />
                <Field label="Estado" placeholder="SP" required />
              </div>
            </section>

            <div className="border-t border-zinc-100" />

            {/* 3. Pagamento */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center h-6 w-6 border border-zinc-900 text-[10px] font-bold text-zinc-900">
                  3
                </span>
                <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-zinc-900">
                  Forma de Pagamento
                </h2>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {([
                  { value: 'cartao', label: 'Cartão de Crédito' },
                  { value: 'pix', label: 'PIX' },
                  { value: 'boleto', label: 'Boleto' },
                ] as const).map((opt) => (
                  <label
                    key={opt.value}
                    className={[
                      'flex items-center justify-center py-3.5 border cursor-pointer transition-all text-[11px] font-bold tracking-[0.1em] uppercase',
                      payment === opt.value
                        ? 'border-zinc-900 bg-zinc-900 text-white'
                        : 'border-zinc-300 text-zinc-600 hover:border-zinc-500',
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
                    {opt.label}
                  </label>
                ))}
              </div>

              {payment === 'cartao' && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Número do Cartão" placeholder="0000 0000 0000 0000" required colSpan2 />
                  <Field label="Nome no Cartão" placeholder="JOÃO SILVA" required colSpan2 />
                  <Field label="Validade" placeholder="MM/AA" required />
                  <Field label="CVV" placeholder="123" required />
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold tracking-[0.12em] uppercase text-zinc-500 mb-1.5">
                      Parcelas
                    </label>
                    <select className="w-full border border-zinc-300 px-3 py-3 text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors bg-white">
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
                <div className="border border-zinc-200 p-8 text-center">
                  <div className="h-28 w-28 mx-auto border border-zinc-200 flex items-center justify-center mb-4">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider">QR Code PIX</span>
                  </div>
                  <p className="text-xs text-zinc-500">O QR Code será gerado após confirmar o pedido.</p>
                  <p className="text-xs font-bold text-zinc-900 mt-1 uppercase tracking-wider">5% de desconto no PIX</p>
                </div>
              )}

              {payment === 'boleto' && (
                <div className="border border-zinc-200 p-6 text-sm text-zinc-500 space-y-1">
                  <p>O boleto será gerado após a confirmação e enviado para seu e-mail.</p>
                  <p className="text-xs text-zinc-400">Prazo de pagamento: 3 dias úteis. Após o vencimento, o pedido é cancelado automaticamente.</p>
                </div>
              )}
            </section>
          </div>

          {/* ── DIREITA: resumo ── */}
          <div className="lg:col-span-1">
            <div className="border border-zinc-200 p-6 sticky top-24">
              <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-900 mb-5">
                Resumo
              </h2>

              <div className="space-y-4 mb-5 max-h-56 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-start gap-3">
                    <div className="h-14 w-11 flex-shrink-0 bg-zinc-100 overflow-hidden">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-zinc-900 line-clamp-2 uppercase tracking-wide leading-snug">
                        {item.product.name}
                      </p>
                      <p className="text-[10px] text-zinc-400 mt-0.5">Qtd: {item.quantity}</p>
                    </div>
                    <p className="text-xs font-bold text-zinc-900 flex-shrink-0">
                      {formatCurrency(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-100 pt-4 space-y-2.5 text-xs">
                <div className="flex justify-between text-zinc-500">
                  <span>Subtotal</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Frete</span>
                  <span className={shipping === 0 ? 'text-green-700 font-medium' : 'text-zinc-900'}>
                    {shipping === 0 ? 'Grátis' : formatCurrency(shipping)}
                  </span>
                </div>
                <div className="pt-3 border-t border-zinc-100 flex justify-between font-bold text-sm text-zinc-900">
                  <span>Total</span>
                  <span>{formatCurrency(finalTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || items.length === 0}
                className="mt-6 w-full bg-zinc-900 text-white text-xs font-bold tracking-[0.15em] uppercase py-4 hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processando...' : 'Confirmar Pedido'}
              </button>

              <p className="text-[10px] text-zinc-400 text-center mt-3">
                Ao confirmar, você aceita nossos{' '}
                <a href="/termos" className="underline hover:text-zinc-700">termos de uso</a>.
              </p>
            </div>
          </div>

        </div>
      </form>
    </div>
  )
}
