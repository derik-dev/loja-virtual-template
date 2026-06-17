'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header, Footer } from '@/components/layout'
import { CartDrawer } from '@/components/cart'
import { ProductGrid } from '@/components/product'
import { products } from '@/lib/data/products'
import { categories } from '@/lib/data/categories'

const featured = products.filter((p) => p.featured)

const STATS = [
  { value: '50k+', label: 'Clientes satisfeitos' },
  { value: '1.200+', label: 'Produtos disponíveis' },
  { value: '4.9★', label: 'Avaliação média' },
]

const BENEFITS = [
  {
    title: 'Entrega em Todo Brasil',
    description: 'Frete grátis em compras acima de R$ 199. Receba em até 3 dias úteis.',
    iconBg: 'bg-stone-100',
    iconColor: 'text-stone-700',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    title: 'Pagamento 100% Seguro',
    description: 'Criptografia SSL e diversas opções: cartão, Pix, boleto e parcelamento.',
    iconBg: 'bg-stone-100',
    iconColor: 'text-stone-700',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: 'Troca sem Complicação',
    description: 'Não gostou? Devolvemos em até 30 dias, sem burocracia e sem custo.',
    iconBg: 'bg-stone-100',
    iconColor: 'text-stone-700',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
  {
    title: 'Suporte Especializado',
    description: 'Atendimento humano 24 horas por dia, 7 dias por semana. Sempre aqui.',
    iconBg: 'bg-stone-100',
    iconColor: 'text-stone-700',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
]

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (email) setSubscribed(true)
  }

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="min-h-screen bg-white">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-stone-50">
          {/* Decorative circles — thin, editorial */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-32 -top-32 h-[640px] w-[640px] rounded-full border border-zinc-200" />
            <div className="absolute right-20 top-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full border border-zinc-100" />
            <div className="absolute -left-24 bottom-0 h-[320px] w-[320px] rounded-full border border-zinc-100" />
          </div>

          {/* Dot grid */}
          <div className="pointer-events-none absolute bottom-10 left-10 hidden lg:grid grid-cols-6 gap-3">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-zinc-300" />
            ))}
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left — copy */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold text-zinc-500 tracking-wide">Nova coleção disponível</span>
                </div>

                <h1 className="mt-6 text-5xl sm:text-6xl lg:text-[5.5rem] font-black text-zinc-900 leading-[0.88] tracking-tight">
                  Qualidade
                  <span className="block text-zinc-300">que você</span>
                  merece.
                </h1>

                <div className="mt-7 h-px w-14 bg-zinc-900" />

                <p className="mt-6 text-zinc-500 text-lg leading-relaxed max-w-sm">
                  Produtos selecionados com cuidado para o seu estilo de vida.
                  Compre com segurança e receba em casa.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/produtos"
                    className="group inline-flex items-center gap-2.5 rounded-xl bg-zinc-900 px-7 py-3.5 text-sm font-bold text-white hover:bg-zinc-700 transition-colors duration-200"
                  >
                    Explorar Catálogo
                    <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/produtos?categoria=ofertas"
                    className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-7 py-3.5 text-sm font-bold text-zinc-900 hover:border-zinc-900 hover:bg-zinc-50 transition-all duration-200"
                  >
                    Ver Ofertas
                  </Link>
                </div>

                {/* Stats */}
                <div className="mt-10 grid grid-cols-3 gap-6 border-t border-zinc-200 pt-8">
                  {STATS.map((s) => (
                    <div key={s.label}>
                      <p className="text-2xl font-black text-zinc-900">{s.value}</p>
                      <p className="text-xs text-zinc-400 mt-0.5 leading-snug">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — hero image + floating cards */}
              <div className="hidden lg:block relative">
                <div className="relative overflow-hidden rounded-3xl bg-zinc-100" style={{ aspectRatio: '5/6' }}>
                  <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=640&h=768&fit=crop&q=80"
                    alt="Produtos em destaque"
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle inner shadow */}
                  <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.06)]" />
                </div>

                {/* Floating card — rating */}
                <div className="absolute -bottom-5 -left-8 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl border border-zinc-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                    <svg className="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] text-zinc-400 font-medium">Avaliação média</p>
                    <p className="text-sm font-black text-zinc-900">4.9 / 5.0</p>
                  </div>
                </div>

                {/* Floating card — orders */}
                <div className="absolute -top-4 -right-6 flex items-center gap-3 rounded-2xl bg-zinc-900 p-4 shadow-xl">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] text-zinc-500 font-medium">Pedidos hoje</p>
                    <p className="text-sm font-black text-white">1.247</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── TRUST STRIP ──────────────────────────────────── */}
        <div className="border-y border-zinc-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center divide-x divide-zinc-100">
              {[
                { icon: '🚚', text: 'Frete grátis acima de R$199' },
                { icon: '🔒', text: 'Pagamento 100% seguro' },
                { icon: '🔄', text: 'Troca em até 30 dias' },
                { icon: '💬', text: 'Suporte 24 horas' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2.5 px-6 py-4 text-sm font-medium text-zinc-500">
                  <span>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CATEGORIAS ───────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Explorar</span>
                <h2 className="mt-1.5 text-3xl font-black text-zinc-900 tracking-tight">Categorias</h2>
              </div>
              <Link
                href="/produtos"
                className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1"
              >
                Ver todas
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {categories.map((cat, i) => (
                <Link
                  key={cat.id}
                  href={`/produtos?categoria=${cat.slug}`}
                  className="group relative overflow-hidden rounded-2xl bg-zinc-100 transition-all duration-500 hover:shadow-xl hover:-translate-y-0.5"
                  style={{ aspectRatio: i === 0 ? '3/4' : '1/1' }}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  {/* Hover tint */}
                  <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/15 transition-colors duration-300" />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-bold text-sm leading-tight">{cat.name}</p>
                    <p className="text-white/60 text-xs mt-0.5">{cat.productCount} produtos</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-white/0 group-hover:text-white/80 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                      Explorar
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUTOS EM DESTAQUE ─────────────────────────── */}
        <section className="py-20 bg-stone-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Curadoria especial</span>
                <h2 className="mt-1.5 text-3xl font-black text-zinc-900 tracking-tight">Em Destaque</h2>
                <p className="mt-1.5 text-zinc-500 text-sm">Os favoritos dos nossos clientes esta semana</p>
              </div>
              <Link
                href="/produtos"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 hover:border-zinc-900 hover:text-zinc-900 transition-all shadow-sm"
              >
                Ver catálogo completo
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
            <ProductGrid products={featured} />
          </div>
        </section>

        {/* ── BANNER PROMOCIONAL ───────────────────────────── */}
        <section className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-3xl bg-zinc-900 px-10 py-14 sm:px-16 sm:py-16">
              {/* Decorative thin circles */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -right-16 -top-16 h-[360px] w-[360px] rounded-full border border-white/5" />
                <div className="absolute right-24 top-1/2 -translate-y-1/2 h-[240px] w-[240px] rounded-full border border-white/5" />
              </div>

              {/* OFF circle */}
              <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden sm:flex h-28 w-28 lg:h-36 lg:w-36 flex-col items-center justify-center rounded-full border border-red-500/30 bg-red-600/10">
                <p className="text-2xl lg:text-3xl font-black text-red-400 leading-none">50%</p>
                <p className="text-[10px] font-bold text-red-400/70 mt-0.5 uppercase tracking-wider">Off</p>
              </div>

              <div className="relative max-w-md">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-zinc-400 mb-5">
                  ⚡ Oferta Relâmpago — Termina em breve
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.05]">
                  Segunda Peça
                  <br />
                  <span className="text-zinc-500">com</span> 50% OFF
                </h2>
                <p className="mt-4 text-zinc-400 text-base leading-relaxed">
                  Na compra de qualquer item, o segundo leva pela metade do preço.
                  Hoje somente, enquanto durarem os estoques.
                </p>
                <Link
                  href="/produtos?categoria=ofertas"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-zinc-900 hover:bg-zinc-100 transition-colors"
                >
                  Aproveitar Agora
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── DIFERENCIAIS ─────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Nossa promessa</span>
              <h2 className="mt-2 text-3xl font-black text-zinc-900 tracking-tight">Por que nos escolher?</h2>
              <p className="mt-3 text-zinc-500 text-sm max-w-md mx-auto">
                Cada detalhe foi pensado para a melhor experiência de compra do início ao fim.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {BENEFITS.map((b) => (
                <div
                  key={b.title}
                  className="group flex flex-col p-6 rounded-2xl border border-zinc-100 bg-white hover:border-zinc-900 hover:shadow-xl hover:shadow-zinc-900/8 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${b.iconBg} ${b.iconColor} mb-5 transition-transform duration-300 group-hover:scale-110`}>
                    {b.icon}
                  </div>
                  <h3 className="text-sm font-bold text-zinc-900 mb-1.5">{b.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ───────────────────────────────────── */}
        <section className="py-24 bg-zinc-900">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <div className="relative">
              {/* Decorative circle */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-72 w-72 rounded-full border border-white/5" />
              </div>

              <div className="relative">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Newsletter</span>
                <h2 className="mt-3 text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  Fique por dentro
                  <br />
                  <span className="text-zinc-500">das novidades</span>
                </h2>
                <p className="mt-4 text-zinc-400 text-base max-w-md mx-auto leading-relaxed">
                  Receba promoções exclusivas, lançamentos e dicas antes de todo mundo. Sem spam.
                </p>

                {subscribed ? (
                  <div className="mt-10 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-zinc-300">
                    <span className="text-emerald-400">✓</span>
                    Inscrição confirmada! Bem-vindo(a).
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      required
                      className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-5 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-zinc-500"
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-zinc-900 hover:bg-zinc-100 transition-colors whitespace-nowrap"
                    >
                      Inscrever-se
                    </button>
                  </form>
                )}

                <p className="mt-4 text-xs text-zinc-600">
                  Sem spam. Cancele a qualquer momento.
                </p>

                {/* Social proof */}
                <div className="mt-10 flex items-center justify-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <img
                        key={i}
                        src={`https://images.unsplash.com/photo-${['1534528741775-53994a69daeb', '1506794778202-cad84cf45f1d', '1472099645785-5658abf4ff4e', '1438761681033-6461ffad8d80', '1507003211169-0a1dd7228f2d'][i - 1]}?w=32&h=32&fit=crop&crop=face&q=80`}
                        alt=""
                        className="h-8 w-8 rounded-full border-2 border-zinc-900 object-cover"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-500">
                    <span className="text-zinc-300 font-semibold">+12.000</span> pessoas já se inscreveram
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
