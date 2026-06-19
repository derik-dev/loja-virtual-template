'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Header, Footer } from '@/components/layout'
import { BannerSlider, PromoSlider, RealLifeGallery, FaqSection } from '@/components/ui'
import { ProductShowcase } from '@/components/product'
import { CartDrawer } from '@/components/cart'
import { supabase, mapProduct } from '@/lib/supabase'
import type { Product } from '@/lib/types'

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
  const [products, setProducts] = useState<Product[]>([])
  const escolhasRef = useRef<HTMLDivElement>(null)
  const [escolhasLeft, setEscolhasLeft] = useState(false)
  const [escolhasRight, setEscolhasRight] = useState(true)

  function updateEscolhasArrows() {
    const el = escolhasRef.current
    if (!el) return
    setEscolhasLeft(el.scrollLeft > 10)
    setEscolhasRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  useEffect(() => {
    const el = escolhasRef.current
    if (!el) return
    el.addEventListener('scroll', updateEscolhasArrows)
    updateEscolhasArrows()
    return () => el.removeEventListener('scroll', updateEscolhasArrows)
  }, [products])

  useEffect(() => {
    supabase.from('products').select('*').then(({ data }) => {
      if (data) setProducts(data.map(mapProduct))
    })
  }, [])

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
        <section className="relative overflow-hidden h-[85vh] sm:h-[96vh]">
          {/* Imagem de fundo — mobile usa hero-fashion-cel, desktop usa hero-fashion */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-fashion-cel.png"
            alt="Nova coleção"
            className="absolute inset-0 h-full w-full object-cover object-center sm:hidden"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-fashion.png"
            alt="Nova coleção"
            className="absolute inset-0 h-full w-full object-cover object-center hidden sm:block"
          />


          {/* Texto editorial */}
          <div className="absolute left-6 sm:left-14 lg:left-20 top-[50%] sm:top-[50%] -translate-y-1/2">
            <p className="text-lg sm:text-5xl lg:text-6xl font-light text-white uppercase tracking-tight leading-none">
              Mala Inteligente.
            </p>
            <p className="mt-1.5 sm:mt-2 text-[1.25rem] sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight">
              Menos Peças. Mais Memórias.
            </p>

          </div>

          {/* Botão COMPRAR — centralizado, mobile only */}
          <div className="absolute bottom-24 left-0 right-0 flex justify-center sm:hidden">
            <Link
              href="/produtos"
              className="bg-white text-zinc-900 font-bold text-sm uppercase tracking-[0.18em] px-10 py-3.5 rounded-md hover:bg-zinc-100 transition-colors duration-200 whitespace-nowrap"
            >
              Comprar
            </Link>
          </div>

          {/* Botão COMPRAR — centralizado na base (só desktop) */}
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 hidden sm:block">
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
        <ProductShowcase products={products} />

        {/* ── BANNER SLIDER ────────────────────────────────── */}
        <BannerSlider />

        {/* ── ESCOLHAS INTELIGENTES ────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="text-center mb-10 px-4">
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 uppercase tracking-wide">Escolhas Inteligentes</h2>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400">Que te lembram quem é essencial</p>
          </div>

          {/* Mobile: carrossel | Desktop: grid */}
          <div className="relative sm:hidden">
            {escolhasLeft && (
              <button onClick={() => escolhasRef.current?.scrollBy({ left: -220, behavior: 'smooth' })} className="absolute left-3 top-1/3 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white border border-zinc-200 shadow-md flex items-center justify-center hover:bg-zinc-50">
                <svg className="h-4 w-4 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
            )}
            {escolhasRight && (
              <button onClick={() => escolhasRef.current?.scrollBy({ left: 220, behavior: 'smooth' })} className="absolute right-3 top-1/3 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white border border-zinc-200 shadow-md flex items-center justify-center hover:bg-zinc-50">
                <svg className="h-4 w-4 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            )}
          <div
            ref={escolhasRef}
            className="flex gap-4 overflow-x-auto px-4 pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.slice(0, 5).map((p) => {
              const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : null
              return (
                <Link key={p.id} href={`/produto/${p.slug}`} className="group flex-shrink-0 w-[200px]">
                  <div className="relative overflow-hidden bg-zinc-100" style={{ aspectRatio: '3/4' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.images[0] ?? ''} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    {(p.featured || discount) && (
                      <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                        {p.featured && <span className="bg-white border border-zinc-200 text-zinc-800 text-[10px] font-semibold tracking-[0.08em] px-2 py-0.5">BEST SELLER</span>}
                        {discount && <span className="bg-white border border-zinc-200 text-zinc-800 text-[10px] font-semibold tracking-[0.08em] px-2 py-0.5">{discount}% OFF</span>}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-3">
                    {(p.colors ?? []).slice(0, 6).map((c, i) => (
                      <span key={i} className="h-3.5 w-3.5 rounded-full border border-zinc-200 flex-shrink-0" style={{ backgroundColor: c.hex }} />
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-zinc-800 leading-snug">{p.name}</p>
                  <div className="mt-1.5 flex items-baseline gap-2">
                    {p.originalPrice && <span className="text-xs text-zinc-400 line-through">R${p.originalPrice}</span>}
                    <span className="text-sm text-zinc-900">R${p.price}</span>
                  </div>
                </Link>
              )
            })}
          </div>
          </div>

          {/* Desktop: grid */}
          <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-4 px-8">
            {products.slice(0, 5).map((p) => {
              const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : null
              return (
                <Link key={p.id} href={`/produto/${p.slug}`} className="group">
                  <div className="relative overflow-hidden bg-zinc-100" style={{ aspectRatio: '3/4' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.images[0] ?? ''} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    {(p.featured || discount) && (
                      <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                        {p.featured && <span className="bg-white border border-zinc-200 text-zinc-800 text-[10px] font-semibold tracking-[0.08em] px-2 py-0.5">BEST SELLER</span>}
                        {discount && <span className="bg-white border border-zinc-200 text-zinc-800 text-[10px] font-semibold tracking-[0.08em] px-2 py-0.5">{discount}% OFF</span>}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-3">
                    {(p.colors ?? []).slice(0, 6).map((c, i) => (
                      <span key={i} className="h-3.5 w-3.5 rounded-full border border-zinc-200 flex-shrink-0" style={{ backgroundColor: c.hex }} />
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-zinc-800 leading-snug">{p.name}</p>
                  <div className="mt-1.5 flex items-baseline gap-2">
                    {p.originalPrice && <span className="text-xs text-zinc-400 line-through">R${p.originalPrice}</span>}
                    <span className="text-sm text-zinc-900">R${p.price}</span>
                    {discount && <span className="text-xs text-zinc-400">com cupom</span>}
                  </div>
                  {p.rating && (
                    <div className="mt-1 flex items-center gap-1">
                      <span className="text-[11px] text-zinc-500">★ {p.rating}</span>
                      <span className="text-[11px] text-zinc-400">({p.reviewCount?.toLocaleString('pt-BR')} reviews)</span>
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        </section>

        {/* ── PROMO SLIDER ─────────────────────────────────── */}
        <PromoSlider />

        {/* ── VERO IN REAL LIFE ────────────────────────────── */}
        <RealLifeGallery />

        {/* ── LOJA FÍSICA ──────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-8 sm:px-14 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-900 uppercase tracking-wide">
                  Agora, também em loja física
                </h2>
                <p className="mt-3 text-sm text-zinc-500">
                  Pra vestir e sentir o futuro na pele.
                </p>
                <a
                  href="https://maps.google.com/?q=São+Paulo,SP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block bg-zinc-900 text-white text-sm font-medium px-7 py-3 hover:bg-zinc-700 transition-colors"
                >
                  Como chegar
                </a>
              </div>

              {/* Right — Google Maps */}
              <div className="w-full overflow-hidden" style={{ height: '360px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.5!2d-46.6957!3d-23.6273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSanto+Amaro%2C+S%C3%A3o+Paulo%2C+SP!5e0!3m2!1spt-BR!2sbr!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização da loja"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── TEXTO INSTITUCIONAL ──────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 uppercase leading-tight tracking-wide">
              Roupas tecnológicas, funcionais e versáteis
            </h2>
            <p className="mt-8 text-sm text-zinc-500 leading-relaxed">
              As <strong className="text-zinc-700 font-semibold">roupas tecnológicas</strong> da Vero unem funcionalidade, design e conforto. Elas são atemporais e transitam entre diversos ambientes, aumentando as possibilidades de combinações. Além disso, apresentam excelente durabilidade e não desbotam com o passar do tempo.
            </p>
            <p className="mt-5 text-sm text-zinc-500 leading-relaxed">
              Desenvolvemos <strong className="text-zinc-700 font-semibold">roupas masculinas</strong> e femininas com tecnologia anti odor, anti suor e antimicrobiana. Com elas, você consegue cumprir todos os compromissos sem se preocupar com manchas de transpiração e odores desagradáveis.
            </p>
            <button className="mt-8 text-sm font-semibold text-zinc-900 underline underline-offset-4 hover:text-zinc-600 transition-colors">
              Leia mais
            </button>
          </div>
        </section>


        {/* ── FAQ ──────────────────────────────────────────── */}
        <FaqSection />

      </main>
      <Footer />
    </>
  )
}
