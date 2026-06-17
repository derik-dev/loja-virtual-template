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
  { value: '50k+', label: 'Clientes' },
  { value: '1.200+', label: 'Produtos' },
  { value: '4.9★', label: 'Avaliação' },
  { value: '99%', label: 'No prazo' },
]

const BENEFITS = [
  {
    title: 'Entrega em Todo Brasil',
    description: 'Frete grátis em compras acima de R$ 199. Receba em até 3 dias úteis.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    title: 'Pagamento 100% Seguro',
    description: 'Criptografia SSL e diversas opções: cartão, Pix, boleto e parcelamento.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: 'Troca sem Complicação',
    description: 'Não gostou? Devolvemos em até 30 dias, sem burocracia e sem custo.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
  {
    title: 'Suporte Especializado',
    description: 'Atendimento humano 24 horas por dia, 7 dias por semana. Sempre aqui.',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
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
        <section className="relative overflow-hidden bg-slate-950">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-indigo-600/20 blur-[120px]" />
            <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-[100px]" />
            <div className="absolute bottom-0 left-1/2 h-[300px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[80px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left — copy */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                  <span className="text-sm font-medium text-indigo-300">Nova coleção disponível agora</span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight">
                  Qualidade
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                    que você
                  </span>
                  merece
                </h1>

                <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-md">
                  Produtos selecionados com cuidado para o seu estilo de vida.
                  Compre com segurança, pague menos e receba em casa.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/produtos"
                    className="group inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5"
                  >
                    Explorar Catálogo
                    <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/produtos?categoria=ofertas"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                  >
                    Ver Ofertas
                    <span className="text-amber-400">🔥</span>
                  </Link>
                </div>

                <div className="grid grid-cols-4 gap-4 pt-6 border-t border-white/10">
                  {STATS.map((s) => (
                    <div key={s.label}>
                      <p className="text-xl sm:text-2xl font-bold text-white">{s.value}</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-tight">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — hero image with floating cards */}
              <div className="hidden lg:block relative">
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-black/60 border border-white/5">
                  <img
                    src="https://picsum.photos/seed/hero-store/640/520"
                    alt="Produtos em destaque"
                    className="w-full object-cover aspect-[6/5]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                </div>
                <div className="absolute -bottom-6 -left-8 z-20 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-2xl">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-lg">⭐</div>
                  <div>
                    <p className="text-xs text-slate-500">Avaliação média</p>
                    <p className="text-sm font-bold text-slate-900">4.9 / 5.0</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 z-20 flex items-center gap-3 rounded-2xl bg-indigo-600 p-4 shadow-2xl">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-lg">📦</div>
                  <div>
                    <p className="text-xs text-indigo-200">Pedidos hoje</p>
                    <p className="text-sm font-bold text-white">1.247</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── TRUST STRIP ──────────────────────────────────── */}
        <div className="border-y border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center divide-x divide-slate-200">
              {[
                { icon: '🚚', text: 'Frete grátis acima de R$199' },
                { icon: '🔒', text: 'Pagamento 100% seguro' },
                { icon: '🔄', text: 'Troca em até 30 dias' },
                { icon: '💬', text: 'Suporte 24 horas' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 px-6 py-4 text-sm font-medium text-slate-600">
                  <span className="text-base">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CATEGORIAS ───────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Explore</span>
              <h2 className="mt-2 text-4xl font-black text-slate-900 tracking-tight">Compre por Categoria</h2>
              <p className="mt-3 text-slate-500 max-w-md mx-auto">
                De eletrônicos a moda, encontre tudo o que você precisa no nosso catálogo completo.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat, i) => (
                <Link
                  key={cat.id}
                  href={`/produtos?categoria=${cat.slug}`}
                  className="group relative overflow-hidden rounded-3xl bg-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                  style={{ aspectRatio: i === 0 ? '3/4' : '1/1' }}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/20 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white font-bold text-lg leading-tight">{cat.name}</p>
                    <p className="text-white/60 text-sm mt-0.5">{cat.productCount} produtos</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-white/0 group-hover:text-white/80 transition-colors duration-300">
                      Ver todos
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
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Curadoria especial</span>
                <h2 className="mt-2 text-4xl font-black text-slate-900 tracking-tight">Em Destaque</h2>
                <p className="mt-3 text-slate-500">Os favoritos dos nossos clientes esta semana</p>
              </div>
              <Link
                href="/produtos"
                className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-white px-5 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition-colors shadow-sm"
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
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-12 sm:p-16">
              <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-10">
                <div className="absolute right-8 top-8 h-64 w-64 rounded-full bg-white blur-2xl" />
                <div className="absolute bottom-4 right-32 h-40 w-40 rounded-full bg-white blur-xl" />
              </div>

              <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden sm:flex h-32 w-32 items-center justify-center rounded-full border-4 border-white/30 bg-white/20 backdrop-blur-sm lg:h-40 lg:w-40">
                <div className="text-center">
                  <p className="text-3xl lg:text-4xl font-black text-white leading-none">50%</p>
                  <p className="text-xs font-bold text-white/80 mt-1">OFF</p>
                </div>
              </div>

              <div className="relative max-w-lg">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm mb-4">
                  ⚡ OFERTA RELÂMPAGO — Termina em breve
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                  Segunda Peça
                  <br />
                  <span className="text-white/80">com</span> 50% OFF
                </h2>
                <p className="mt-4 text-white/80 text-lg">
                  Na compra de qualquer item, o segundo leva com metade do preço.
                  Apenas hoje, enquanto durarem os estoques.
                </p>
                <Link
                  href="/produtos?categoria=ofertas"
                  className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-orange-600 hover:bg-orange-50 transition-colors shadow-xl"
                >
                  Aproveitar Agora
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Nossa promessa</span>
              <h2 className="mt-2 text-4xl font-black text-slate-900 tracking-tight">Por que nos escolher?</h2>
              <p className="mt-3 text-slate-500 max-w-md mx-auto">
                Cada detalhe foi pensado para você ter a melhor experiência de compra.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {BENEFITS.map((b) => (
                <div
                  key={b.title}
                  className="group flex flex-col p-7 rounded-3xl border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${b.bg} ${b.color} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    {b.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ───────────────────────────────────── */}
        <section className="py-24 bg-slate-950">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />
              </div>
              <div className="relative">
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Newsletter</span>
                <h2 className="mt-3 text-4xl sm:text-5xl font-black text-white tracking-tight">
                  Fique por dentro
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                    das novidades
                  </span>
                </h2>
                <p className="mt-4 text-slate-400 text-lg max-w-md mx-auto">
                  Receba promoções exclusivas, lançamentos e dicas antes de todo mundo.
                </p>

                {subscribed ? (
                  <div className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 px-8 py-4 text-emerald-400 font-semibold">
                    ✓ Inscrição confirmada! Bem-vindo(a) 🎉
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      required
                      className="flex-1 rounded-2xl border border-slate-700 bg-slate-800/80 px-5 py-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      className="rounded-2xl bg-indigo-600 px-8 py-4 text-sm font-bold text-white hover:bg-indigo-500 transition-colors whitespace-nowrap shadow-lg shadow-indigo-500/25"
                    >
                      Quero receber
                    </button>
                  </form>
                )}

                <p className="mt-4 text-xs text-slate-600">
                  Sem spam. Cancele a qualquer momento. Seus dados estão protegidos.
                </p>

                <div className="mt-10 flex items-center justify-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <img
                        key={i}
                        src={`https://picsum.photos/seed/avatar${i}/32/32`}
                        alt=""
                        className="h-8 w-8 rounded-full border-2 border-slate-900 object-cover"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-slate-500">
                    <span className="text-slate-300 font-semibold">+12.000</span> pessoas já se inscreveram
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
