'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header, Footer } from '@/components/layout'
import { BannerSlider, PromoSlider } from '@/components/ui'
import { ProductShowcase } from '@/components/product'
import { CartDrawer } from '@/components/cart'
import { ProductGrid } from '@/components/product'
import { products } from '@/lib/data/products'
import { categories } from '@/lib/data/categories'

const featured = products.filter((p) => p.featured)

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
      <Header overlay />
      <CartDrawer />
      <main className="min-h-screen bg-white">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden" style={{ height: '96vh' }}>
          {/* Imagem de fundo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-fashion.png"
            alt="Nova coleção"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Gradiente lateral e de base */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

          {/* Texto editorial — esquerda, meio vertical */}
          <div className="absolute left-10 sm:left-14 lg:left-20 top-[50%] -translate-y-1/2">
            <p className="text-4xl sm:text-5xl lg:text-6xl font-light text-white uppercase tracking-tight leading-none">
              Mala Inteligente.
            </p>
            <p className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-none">
              Menos Peças. Mais Memórias.
            </p>
          </div>

          {/* Botão COMPRAR — centralizado na base */}
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2">
            <Link
              href="/produtos"
              className="inline-block bg-white text-zinc-900 font-bold text-xs uppercase tracking-[0.22em] px-12 py-3.5 rounded-md hover:bg-zinc-100 transition-colors duration-200 whitespace-nowrap"
            >
              Comprar
            </Link>
          </div>

          {/* Ticker scrollável */}
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden bg-black py-2.5">
            <style>{`
              @keyframes ticker {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .ticker-track {
                display: flex;
                width: max-content;
                animation: ticker 22s linear infinite;
              }
            `}</style>
            <div className="ticker-track">
              {[...Array(2)].map((_, pass) => (
                <span key={pass} className="flex items-center">
                  {[
                    'TROCA RÁPIDA E GRÁTIS',
                    '+2% OFF NO PIX',
                    'FRETE GRÁTIS A PARTIR DE R$399',
                    'TROCA RÁPIDA E GRÁTIS',
                    '+2% OFF NO PIX',
                    'FRETE GRÁTIS A PARTIR DE R$399',
                    'TROCA RÁPIDA E GRÁTIS',
                    '+2% OFF NO PIX',
                    'FRETE GRÁTIS A PARTIR DE R$399',
                  ].map((item, i) => (
                    <span key={i} className="flex items-center gap-6 px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-white whitespace-nowrap">
                      {item}
                      <span className="text-zinc-500">◆</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUTO SHOWCASE ─────────────────────────────── */}
        <ProductShowcase />

        {/* ── BANNER SLIDER ────────────────────────────────── */}
        <BannerSlider />

        {/* ── ESCOLHAS INTELIGENTES ────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="w-full px-4 sm:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 uppercase tracking-wide">Escolhas Inteligentes</h2>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400">Que te lembram quem é essencial</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { label: 'Viagem', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=650&fit=crop&q=80', href: '/produtos' },
                { label: 'Pra Fugir do Frio', img: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=650&fit=crop&q=80', href: '/produtos?categoria=roupas' },
                { label: 'Pra Curtir o Frio', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&h=650&fit=crop&q=80', href: '/produtos?categoria=roupas' },
                { label: 'Kits', img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&h=650&fit=crop&q=80', href: '/produtos' },
                { label: 'Compre e Ganhe', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=650&fit=crop&q=80', href: '/produtos?categoria=ofertas' },
              ].map((item) => (
                <Link key={item.label} href={item.href} className="group">
                  <div className="overflow-hidden bg-zinc-100" style={{ aspectRatio: '3/4' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.img}
                      alt={item.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-700 group-hover:text-zinc-900 transition-colors">
                    {item.label}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROMO SLIDER ─────────────────────────────────── */}
        <PromoSlider />

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
