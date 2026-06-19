'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency } from '@/lib/utils'

type Step = 'informacoes' | 'frete' | 'pagamento'
type PaymentMethod = 'cartao' | 'pix' | 'boleto'

const STEPS: Step[] = ['informacoes', 'frete', 'pagamento']
const STEP_LABELS: Record<Step, string> = {
  informacoes: 'Informações',
  frete: 'Frete',
  pagamento: 'Pagamento',
}

function PlaceholderInput({
  placeholder,
  type = 'text',
  className = '',
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon?: React.ReactNode }) {
  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-zinc-300 px-3 py-3.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 bg-white transition-colors"
        {...props}
      />
      {icon && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">{icon}</span>
      )}
    </div>
  )
}

function PlaceholderSelect({
  placeholder,
  children,
  className = '',
}: {
  placeholder?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      <select className="w-full border border-zinc-300 px-3 py-3.5 text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 bg-white transition-colors appearance-none">
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </span>
    </div>
  )
}

function CheckboxField({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked ?? false)
  return (
    <label className="flex items-start gap-2.5 cursor-pointer">
      <div
        onClick={() => setChecked(!checked)}
        className={`mt-0.5 flex-shrink-0 w-4 h-4 border transition-colors ${checked ? 'bg-zinc-900 border-zinc-900' : 'border-zinc-400 bg-white'} flex items-center justify-center`}
      >
        {checked && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        )}
      </div>
      <span className="text-sm text-zinc-700 leading-snug">{label}</span>
    </label>
  )
}

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items)
  const total = useCartStore((s) => s.total())
  const clearCart = useCartStore((s) => s.clearCart)

  const [step, setStep] = useState<Step>('informacoes')
  const [payment, setPayment] = useState<PaymentMethod>('cartao')
  const [coupon, setCoupon] = useState('')
  const [isGift, setIsGift] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const shipping = step === 'pagamento' ? (total >= 399 ? 0 : 19.9) : null
  const finalTotal = total + (shipping ?? 0)

  const currentStepIndex = STEPS.indexOf(step)

  const handleContinue = () => {
    const next = STEPS[currentStepIndex + 1]
    if (next) setStep(next)
  }

  const handleBack = () => {
    const prev = STEPS[currentStepIndex - 1]
    if (prev) setStep(prev)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step !== 'pagamento') { handleContinue(); return }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    clearCart()
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="bg-white p-12 text-center max-w-md w-full mx-4">
          <div className="w-12 h-12 border border-zinc-900 flex items-center justify-center mx-auto mb-6">
            <svg className="h-6 w-6 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-lg font-semibold text-zinc-900 mb-3">Pedido Confirmado!</h1>
          <p className="text-sm text-zinc-500 mb-1">Seu pedido foi recebido com sucesso.</p>
          <p className="text-xs text-zinc-400 mb-8">Você receberá um e-mail com os detalhes e o código de rastreio em breve.</p>
          <Link href="/" className="inline-block bg-zinc-900 text-white text-xs font-bold tracking-[0.15em] uppercase px-8 py-3.5 hover:bg-zinc-700 transition-colors">
            Voltar para a Loja
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* ── ESQUERDA ── */}
      <div className="flex-1 bg-[#F5F5F5] lg:overflow-y-auto">
        <div className="max-w-[540px] mx-auto px-6 py-10 lg:py-14">

          {/* Logo */}
          <Link href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-preta.png" alt="VERO" className="h-7 w-auto object-contain mb-8" />
          </Link>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 mb-8">
            <Link href="/carrinho" className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors">
              Carrinho
            </Link>
            {STEPS.map((s, i) => (
              <span key={s} className="flex items-center gap-1.5">
                <svg className="h-3 w-3 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                <button
                  onClick={() => i < currentStepIndex && setStep(s)}
                  className={[
                    'text-xs transition-colors',
                    i === currentStepIndex
                      ? 'text-zinc-900 font-semibold'
                      : i < currentStepIndex
                      ? 'text-zinc-400 hover:text-zinc-700 cursor-pointer'
                      : 'text-zinc-300 cursor-default',
                  ].join(' ')}
                >
                  {STEP_LABELS[s]}
                </button>
              </span>
            ))}
          </nav>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* ── STEP 1: Informações ── */}
            {step === 'informacoes' && (
              <>
                {/* Contato */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-medium text-zinc-900">Contato</h2>
                    <Link href="/conta" className="text-xs text-zinc-500 underline hover:text-zinc-900 transition-colors">
                      Fazer login
                    </Link>
                  </div>
                  <PlaceholderInput placeholder="E-mail" type="email" required />
                  <div className="mt-3 space-y-2.5">
                    <CheckboxField label="Enviar novidades e ofertas para mim por e-mail" defaultChecked />
                    <CheckboxField label="Quero receber descontos e novidades por WhatsApp" defaultChecked />
                  </div>
                  <div className="mt-4">
                    <label className="flex items-center gap-2.5 cursor-pointer" onClick={() => setIsGift(!isGift)}>
                      <div className={`flex-shrink-0 w-4 h-4 border transition-colors ${isGift ? 'bg-zinc-900 border-zinc-900' : 'border-zinc-400 bg-white'} flex items-center justify-center`}>
                        {isGift && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-zinc-700">Esse pedido é um presente?</span>
                    </label>
                  </div>

                  {isGift && (
                    <div className="mt-4 space-y-3">
                      <div className="border border-zinc-200 bg-white p-4">
                        <p className="text-sm font-medium text-zinc-900 mb-0.5">Vai presentear? Dê um upgrade com a Vero Gift Bag</p>
                        <p className="text-xs text-zinc-400 mb-3">Aviso: A sacola é enviada à parte para você montar.</p>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-zinc-100 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-zinc-900">Vero Gift Bag</p>
                            <p className="text-xs text-zinc-500">R$ 9,00</p>
                          </div>
                          <button type="button" className="bg-zinc-900 text-white text-xs font-bold uppercase tracking-wide px-4 py-2 hover:bg-zinc-700 transition-colors">
                            Adicionar
                          </button>
                        </div>
                      </div>
                      <div className="border border-zinc-200 bg-white p-4">
                        <p className="text-sm font-medium text-zinc-900 mb-3">Deixe o presente ainda mais especial</p>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-zinc-100 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-zinc-900">Embalagem de Presente Prateada</p>
                            <p className="text-xs text-zinc-500">R$ 13,90</p>
                          </div>
                          <button type="button" className="bg-zinc-900 text-white text-xs font-bold uppercase tracking-wide px-4 py-2 hover:bg-zinc-700 transition-colors">
                            Adicionar
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </section>

                {/* Endereço */}
                <section>
                  <h2 className="text-base font-medium text-zinc-900 mb-4">Endereço de entrega</h2>
                  <div className="space-y-2.5">
                    <PlaceholderSelect placeholder="País/Região">
                      <option value="brasil">Brasil</option>
                    </PlaceholderSelect>
                    <div className="grid grid-cols-2 gap-2.5">
                      <PlaceholderInput placeholder="Nome" required />
                      <PlaceholderInput placeholder="Sobrenome" required />
                    </div>
                    <PlaceholderInput
                      placeholder="CEP"
                      required
                      icon={
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                      }
                    />
                    <div className="grid grid-cols-[1fr_120px] gap-2.5">
                      <PlaceholderInput placeholder="Endereço" required />
                      <PlaceholderInput placeholder="Número" required />
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      <PlaceholderInput placeholder="Apartamento, bloco etc. (opcional)" />
                      <PlaceholderInput placeholder="Bairro" required />
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      <PlaceholderInput placeholder="Cidade" required />
                      <PlaceholderSelect>
                        <option value="">Estado</option>
                        {['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO'].map(uf => (
                          <option key={uf} value={uf}>{uf}</option>
                        ))}
                      </PlaceholderSelect>
                    </div>
                    <PlaceholderInput
                      placeholder="Telefone"
                      type="tel"
                      icon={
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                        </svg>
                      }
                    />
                    <CheckboxField label="Salvar minhas informações para a próxima vez" />
                  </div>
                </section>
              </>
            )}

            {/* ── STEP 2: Frete ── */}
            {step === 'frete' && (
              <section>
                <h2 className="text-base font-medium text-zinc-900 mb-4">Opções de entrega</h2>
                <div className="space-y-2.5">
                  {[
                    { id: 'pac', label: 'PAC — Correios', desc: '5 a 8 dias úteis', price: 19.9 },
                    { id: 'sedex', label: 'SEDEX — Correios', desc: '1 a 3 dias úteis', price: 34.9 },
                    { id: 'gratis', label: 'Frete Grátis', desc: '7 a 12 dias úteis', price: 0, disabled: total < 399 },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center justify-between border p-4 cursor-pointer transition-colors ${opt.disabled ? 'opacity-40 cursor-not-allowed border-zinc-200' : 'border-zinc-300 hover:border-zinc-900'}`}
                    >
                      <div className="flex items-center gap-3">
                        <input type="radio" name="shipping" value={opt.id} defaultChecked={opt.id === 'pac'} disabled={opt.disabled} className="accent-zinc-900" />
                        <div>
                          <p className="text-sm font-medium text-zinc-900">{opt.label}</p>
                          <p className="text-xs text-zinc-400">{opt.desc}</p>
                          {opt.disabled && <p className="text-xs text-zinc-400">Disponível acima de R$399</p>}
                        </div>
                      </div>
                      <span className="text-sm font-medium text-zinc-900">
                        {opt.price === 0 ? 'Grátis' : formatCurrency(opt.price)}
                      </span>
                    </label>
                  ))}
                </div>
              </section>
            )}

            {/* ── STEP 3: Pagamento ── */}
            {step === 'pagamento' && (
              <section>
                <h2 className="text-base font-medium text-zinc-900 mb-4">Forma de pagamento</h2>
                <div className="grid grid-cols-3 gap-2.5 mb-6">
                  {([
                    { value: 'cartao', label: 'Cartão de Crédito' },
                    { value: 'pix', label: 'PIX' },
                    { value: 'boleto', label: 'Boleto' },
                  ] as const).map((opt) => (
                    <label
                      key={opt.value}
                      className={[
                        'flex items-center justify-center py-3.5 border cursor-pointer transition-all text-xs font-medium text-center',
                        payment === opt.value
                          ? 'border-zinc-900 bg-zinc-900 text-white'
                          : 'border-zinc-300 text-zinc-600 hover:border-zinc-600',
                      ].join(' ')}
                    >
                      <input type="radio" name="payment" value={opt.value} checked={payment === opt.value} onChange={() => setPayment(opt.value)} className="sr-only" />
                      {opt.label}
                    </label>
                  ))}
                </div>

                {payment === 'cartao' && (
                  <div className="space-y-2.5">
                    <PlaceholderInput placeholder="Número do cartão" required />
                    <PlaceholderInput placeholder="Nome no cartão" required />
                    <div className="grid grid-cols-2 gap-2.5">
                      <PlaceholderInput placeholder="Validade (MM/AA)" required />
                      <PlaceholderInput placeholder="CVV" required />
                    </div>
                    <PlaceholderSelect>
                      <option>1x de {formatCurrency(finalTotal)} sem juros</option>
                      <option>2x de {formatCurrency(finalTotal / 2)} sem juros</option>
                      <option>3x de {formatCurrency(finalTotal / 3)} sem juros</option>
                      <option>6x de {formatCurrency(finalTotal / 6)} sem juros</option>
                      <option>12x de {formatCurrency(finalTotal / 12)} com juros</option>
                    </PlaceholderSelect>
                  </div>
                )}

                {payment === 'pix' && (
                  <div className="border border-zinc-200 p-8 text-center">
                    <div className="h-28 w-28 mx-auto border border-zinc-200 flex items-center justify-center mb-4">
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider">QR Code PIX</span>
                    </div>
                    <p className="text-xs text-zinc-500">O QR Code será gerado após confirmar o pedido.</p>
                    <p className="text-xs font-bold text-zinc-900 mt-1">5% de desconto no PIX</p>
                  </div>
                )}

                {payment === 'boleto' && (
                  <div className="border border-zinc-200 p-5 space-y-1">
                    <p className="text-sm text-zinc-600">O boleto será gerado após a confirmação e enviado para seu e-mail.</p>
                    <p className="text-xs text-zinc-400">Prazo: 3 dias úteis. Após o vencimento, o pedido é cancelado automaticamente.</p>
                  </div>
                )}
              </section>
            )}

            {/* Navegação */}
            <div className="flex items-center justify-between pt-2">
              {step === 'informacoes' ? (
                <Link href="/carrinho" className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  Voltar ao carrinho
                </Link>
              ) : (
                <button type="button" onClick={handleBack} className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  {step === 'frete' ? 'Voltar às informações' : 'Voltar ao frete'}
                </button>
              )}

              <button
                type="submit"
                disabled={loading || items.length === 0}
                className="bg-zinc-900 text-white text-sm font-medium px-8 py-3.5 hover:bg-zinc-700 transition-colors disabled:opacity-50"
              >
                {loading
                  ? 'Processando...'
                  : step === 'informacoes'
                  ? 'Continuar para frete'
                  : step === 'frete'
                  ? 'Continuar para pagamento'
                  : 'Confirmar Pedido'}
              </button>
            </div>

            {/* Footer links */}
            <div className="pt-6 border-t border-zinc-200 flex flex-wrap gap-x-4 gap-y-1">
              {['Política de reembolso', 'Frete', 'Política de privacidade', 'Termos de serviço', 'Cancelamentos', 'Contato'].map((l) => (
                <a key={l} href="#" className="text-xs text-zinc-400 hover:text-zinc-700 underline transition-colors">{l}</a>
              ))}
            </div>

          </form>
        </div>
      </div>

      {/* ── DIREITA: Resumo ── */}
      <div className="lg:w-[460px] bg-white border-l border-zinc-200 lg:overflow-y-auto">
        <div className="max-w-[400px] mx-auto px-6 py-10 lg:py-14 lg:sticky lg:top-0">

          {/* Itens */}
          <div className="space-y-4 mb-6">
            {items.length === 0 ? (
              <p className="text-sm text-zinc-400">Nenhum item no carrinho.</p>
            ) : items.map((item) => (
              <div key={item.product.id} className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-16 bg-zinc-100 overflow-hidden">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-500 text-[10px] font-bold text-white">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-900 line-clamp-2 leading-snug">{item.product.name}</p>
                  {item.product.colors && item.product.colors[0] && (
                    <p className="text-xs text-zinc-400 mt-0.5">{item.product.colors[0].name}</p>
                  )}
                </div>
                <p className="text-sm font-medium text-zinc-900 flex-shrink-0">
                  {formatCurrency(item.product.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          {/* Cupom */}
          <div className="flex gap-2 mb-5">
            <input
              type="text"
              placeholder="Cupom de desconto ou Gift Card"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="flex-1 border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 bg-white transition-colors"
            />
            <button
              type="button"
              className="border border-zinc-300 px-4 py-2.5 text-sm text-zinc-700 hover:border-zinc-900 hover:text-zinc-900 transition-colors whitespace-nowrap"
            >
              Aplicar
            </button>
          </div>

          {/* Aviso */}
          <div className="flex items-start gap-2.5 bg-zinc-50 border border-zinc-200 p-3.5 mb-6 text-xs text-zinc-600">
            <svg className="h-4 w-4 flex-shrink-0 text-zinc-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <p>
              Teve problemas ao finalizar o pedido?{' '}
              <a href="#" className="underline hover:text-zinc-900 transition-colors">Reporte o problema nesse formulário</a>.
            </p>
          </div>

          {/* Totais */}
          <div className="space-y-2.5 text-sm border-t border-zinc-100 pt-4">
            <div className="flex justify-between text-zinc-600">
              <span>Subtotal</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span className="flex items-center gap-1">
                Frete
                {step !== 'pagamento' && (
                  <svg className="h-3.5 w-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                  </svg>
                )}
              </span>
              {step !== 'pagamento' ? (
                <span className="text-zinc-400 text-xs">Calculado na próxima etapa</span>
              ) : (
                <span className={shipping === 0 ? 'text-green-700 font-medium' : ''}>
                  {shipping === 0 ? 'Grátis' : formatCurrency(shipping ?? 0)}
                </span>
              )}
            </div>
            <div className="flex justify-between font-bold text-zinc-900 text-base pt-3 border-t border-zinc-100">
              <span>Total</span>
              <span className="flex items-baseline gap-2">
                <span className="text-xs font-normal text-zinc-400">BRL</span>
                {formatCurrency(finalTotal)}
              </span>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
