'use client'

import { useState, use, type ReactNode } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { products } from '@/lib/data/products'
import { formatCurrency, calculateDiscount } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useWishlist } from '@/hooks/useWishlist'
import { ProductGallery, ProductGrid } from '@/components/product'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

// ── Mock data ────────────────────────────────────────────────
const COLOR_PALETTES: { name: string; hex: string }[][] = [
  [
    { name: 'OFF WHITE', hex: '#f5f0e8' }, { name: 'PRETO', hex: '#111111' },
    { name: 'NAVY', hex: '#1e3a5f' }, { name: 'VERMELHO', hex: '#c0392b' },
    { name: 'GRAFITE', hex: '#4a4a4a' }, { name: 'BEGE', hex: '#c9a96e' },
    { name: 'AZUL', hex: '#2563eb' },
  ],
  [
    { name: 'PRETO', hex: '#111111' }, { name: 'CINZA', hex: '#9ca3af' },
    { name: 'BRANCO', hex: '#f8f8f8' },
  ],
  [
    { name: 'PRETO', hex: '#111111' }, { name: 'BEGE', hex: '#c9a96e' },
    { name: 'VERDE MILITAR', hex: '#4a5c3f' }, { name: 'BORDÔ', hex: '#7b1f3a' },
  ],
  [
    { name: 'PRETO', hex: '#111111' }, { name: 'CINZA MESCLA', hex: '#7c8187' },
    { name: 'CARAMELO', hex: '#c07d42' }, { name: 'NAVY', hex: '#1e3a5f' },
  ],
]

const SIZES = ['P', 'M', 'G', 'GG', 'XGG']

const MOCK_REVIEWS = [
  { initials: 'MS', name: 'Maria S.', rating: 5, title: 'Muito satisfeita', comment: 'Como sempre foi ótima! Produto de excelente qualidade e entrega também é rápida.', date: '18/06/2026' },
  { initials: 'JP', name: 'João P.', rating: 5, title: 'Cumpre o que promete', comment: 'Não marca o corpo e não amassa. Ótima peça para o dia a dia. Uso há semanas e continua igual ao primeiro dia.', date: '18/06/2026' },
  { initials: 'AL', name: 'Ana L.', rating: 5, title: 'Muito bom', comment: 'Adorei, tenho usado muito. Ótimo caimento e muito confortável. Já recomendei para várias amigas.', date: '17/06/2026' },
  { initials: 'RS', name: 'Rafael S.', rating: 4, title: 'Recomendo', comment: 'Produto de qualidade, entrega no prazo. Recomendo para quem busca conforto e estilo sem abrir mão da praticidade.', date: '16/06/2026' },
  { initials: 'CM', name: 'Carla M.', rating: 5, title: 'Perfeito!', comment: 'Compra excelente. A peça é linda, tem ótimo caimento e a tecnologia do tecido realmente funciona. Não amassa nem desfia.', date: '15/06/2026' },
]

const REAL_LIFE_PHOTOS = [
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop&q=80',
]

function getColors(id: string) {
  const hash = id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return COLOR_PALETTES[hash % COLOR_PALETTES.length]
}

// ── Sub-components ───────────────────────────────────────────
function Stars({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const dim = size === 'lg' ? 'h-5 w-5' : size === 'md' ? 'h-4 w-4' : 'h-3 w-3'
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} className={`${dim} ${i + 1 <= Math.round(rating) ? 'text-zinc-900' : 'text-zinc-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function AccordionItem({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  const [open, setOpen] = useState(title === 'Descrição')
  return (
    <div className="border-b border-zinc-100">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-zinc-400">{icon}</span>
          <span className="text-sm font-semibold text-zinc-800 group-hover:text-zinc-900">{title}</span>
        </div>
        <svg className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────
export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params)
  const product = products.find((p) => p.slug === slug)
  if (!product) notFound()

  const addItem = useCartStore((s) => s.addItem)
  const { toggleWishlist, isWishlisted } = useWishlist()
  const wishlisted = isWishlisted(product.id)

  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const colors = getColors(product.id)
  const [selectedColor, setSelectedColor] = useState(0)

  const discount = product.originalPrice ? calculateDiscount(product.originalPrice, product.price) : null
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  // Rating distribution
  const dist = [
    { stars: 5, pct: 94 },
    { stars: 4, pct: 5 },
    { stars: 3, pct: 1 },
    { stars: 2, pct: 0 },
    { stars: 1, pct: 0 },
  ]

  return (
    <div className="bg-white">

      {/* ── MAIN: Gallery + Sticky info ─────────────────────── */}
      <div className="flex max-w-[1440px] mx-auto mb-24">

        {/* Gallery mosaic — with left margin */}
        <div className="flex-1 min-w-0 pl-16 xl:pl-24">
          <ProductGallery images={product.images} alt={product.name} />
        </div>

        {/* Sticky info panel */}
        <div className="w-[480px] xl:w-[540px] flex-shrink-0 border-l border-zinc-100">
          <div className="px-8 py-8">

            {/* Name */}
            <h1 className="text-xl font-bold text-zinc-900 leading-snug mb-3">
              {product.name}
            </h1>

            {/* Badges + rating */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {product.featured && (
                <span className="border border-zinc-400 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-zinc-700">BEST SELLER</span>
              )}
              {discount && (
                <span className="border border-zinc-400 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-zinc-700">{discount}% OFF</span>
              )}
              {!product.featured && !discount && (
                <span className="border border-zinc-400 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-zinc-700">LANÇAMENTO</span>
              )}
              <span className="text-xs text-zinc-400">★ {product.rating} ({product.reviewCount.toLocaleString('pt-BR')} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-zinc-100">
              {product.originalPrice && (
                <span className="text-sm text-zinc-400 line-through">{formatCurrency(product.originalPrice)}</span>
              )}
              <span className="text-2xl font-bold text-zinc-900">{formatCurrency(product.price)}</span>
            </div>

            {/* Color selector */}
            <div className="mb-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-2.5">
                COR: <span className="text-zinc-900">{colors[selectedColor].name}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    title={color.name}
                    className={`h-7 w-7 rounded-full border-2 transition-all ${i === selectedColor ? 'border-zinc-900 scale-110' : 'border-transparent hover:border-zinc-400'}`}
                    style={{ backgroundColor: color.hex, outline: i === selectedColor ? '2px solid #e5e7eb' : 'none', outlineOffset: '1px' }}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div className="mb-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-2.5">TAMANHO</p>
              <div className="flex gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s === selectedSize ? null : s)}
                    className={`px-4 py-2 text-xs font-bold border transition-colors ${s === selectedSize ? 'bg-zinc-900 border-zinc-900 text-white' : 'border-zinc-300 text-zinc-700 hover:border-zinc-900'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-2.5">QUANTIDADE</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="h-9 w-9 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-600 hover:border-zinc-900 transition-colors"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                  </svg>
                </button>
                <span className="w-8 text-center text-sm font-bold text-zinc-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  disabled={product.stock === 0}
                  className="h-9 w-9 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-600 hover:border-zinc-900 transition-colors disabled:opacity-30"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full py-4 bg-zinc-900 text-white text-xs font-black uppercase tracking-[0.22em] hover:bg-zinc-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed mb-3"
            >
              {added ? '✓ ADICIONADO AO CARRINHO' : product.stock === 0 ? 'ESGOTADO' : 'ADICIONAR AO CARRINHO'}
            </button>

            {/* Envio imediato */}
            {product.stock > 0 && (
              <div className="w-full border border-zinc-200 py-3 px-4 text-center text-xs text-zinc-600 mb-4">
                Peça em estoque com <strong className="text-zinc-900">envio imediato</strong>
              </div>
            )}

            {/* WhatsApp */}
            <p className="text-center text-xs text-zinc-400 mb-6">
              Ou se preferir{' '}
              <a href="#" className="text-green-600 font-semibold hover:underline">
                COMPRE PELO WHATSAPP
              </a>
            </p>

            {/* Wishlist */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-zinc-200 text-xs text-zinc-500 hover:border-zinc-900 hover:text-zinc-900 transition-colors mb-6"
            >
              <svg className="h-4 w-4" fill={wishlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              {wishlisted ? 'Salvo nos favoritos' : 'Salvar nos favoritos'}
            </button>

            {/* Accordions */}
            <AccordionItem icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
            } title="Descrição">
              <p className="text-sm text-zinc-500 leading-relaxed">{product.description}</p>
              <p className="text-sm text-zinc-500 leading-relaxed mt-3">
                Desenvolvido com materiais de alta performance, ideal para o dia a dia — do trabalho ao lazer. Tecnologia que trabalha por você.
              </p>
            </AccordionItem>

            <AccordionItem icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
            } title="Diferenciais">
              <ul className="space-y-2">
                {['Anti odor e anti suor', 'Não amassa e não desbota', 'Secagem rápida', 'Leveza extrema', 'Durabilidade garantida'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-zinc-500">
                    <svg className="h-3 w-3 text-zinc-400 flex-shrink-0" fill="currentColor" viewBox="0 0 12 12">
                      <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </AccordionItem>

            <AccordionItem icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" /></svg>
            } title="Características">
              <div className="divide-y divide-zinc-100 border border-zinc-100">
                {[
                  ['Categoria', product.category],
                  ['Avaliação', `${product.rating} / 5.0`],
                  ['Estoque', `${product.stock} unidades`],
                  ['SKU', `VRO-${product.id.padStart(5, '0')}`],
                ].map(([label, value]) => (
                  <div key={label} className="flex py-2.5 px-3">
                    <span className="w-28 text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-400">{label}</span>
                    <span className="text-xs text-zinc-700">{value}</span>
                  </div>
                ))}
              </div>
            </AccordionItem>

            <AccordionItem icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
            } title="Composição">
              <p className="text-sm text-zinc-500">
                {product.tags.slice(0, 3).join(' · ')}
              </p>
              <p className="text-xs text-zinc-400 mt-2">
                Tecido desenvolvido com fibras de alta tecnologia para garantir conforto, durabilidade e funcionalidade.
              </p>
            </AccordionItem>

          </div>
        </div>
      </div>

      {/* ── EDITORIAL SECTIONS ───────────────────────────────── */}
      <div className="border-t border-zinc-100">
        {/* Section 1: text left, image right */}
        <div className="grid grid-cols-2 min-h-[320px]">
          <div className="flex items-center px-16 py-20">
            <div className="max-w-xs">
              <h2 className="text-lg font-black text-zinc-900 uppercase tracking-wide mb-5">STATEMENT PIECE</h2>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Uma peça com design minimalista que combina com tudo.{' '}
                <strong className="text-zinc-800">Ideal para usar com alfaiataria social, jeans ou no look do dia a dia.</strong>{' '}
                Transita entre o casual e o esportivo, perfeito para qualquer ambiente.
              </p>
            </div>
          </div>
          <div className="overflow-hidden bg-zinc-100" style={{ aspectRatio: 'auto' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Section 2: image left, text right */}
        <div className="grid grid-cols-2 min-h-[320px] border-t border-zinc-100">
          <div className="overflow-hidden bg-zinc-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.images[product.images.length > 1 ? 1 : 0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center px-16 py-20">
            <div className="max-w-xs">
              <h2 className="text-lg font-black text-zinc-900 uppercase tracking-wide mb-5">TECNOLOGIA FUNCIONAL</h2>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Feito com blend de{' '}
                <strong className="text-zinc-800">fibras ultra respiráveis e tecido de alta performance</strong>, ajuda a manter a temperatura ideal em diferentes climas e estações do ano. Garante isolamento e mobilidade em equilíbrio ideal.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: text left, image right */}
        <div className="grid grid-cols-2 min-h-[320px] border-t border-zinc-100">
          <div className="flex items-center px-16 py-20">
            <div className="max-w-xs">
              <h2 className="text-lg font-black text-zinc-900 uppercase tracking-wide mb-5">FOREVER PIECE</h2>
              <p className="text-sm text-zinc-500 leading-relaxed">
                <strong className="text-zinc-800">Um item feito para durar muito.</strong>{' '}
                A tecnologia Vero faz com que esta peça não desbote com o tempo e iniba a proliferação de bactérias causadoras do mau odor. Qualidade garantida lavagem após lavagem.
              </p>
            </div>
          </div>
          <div className="overflow-hidden bg-zinc-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" style={{ transform: 'scale(1.05)' }} />
          </div>
        </div>
      </div>

      {/* ── VERO IN REAL LIFE ────────────────────────────────── */}
      <section className="py-16 border-t border-zinc-100">
        <h2 className="text-center text-sm font-bold uppercase tracking-[0.28em] text-zinc-900 mb-8">
          VERO IN REAL LIFE
        </h2>
        <div className="flex overflow-x-hidden gap-1 px-8 sm:px-14 lg:px-20">
          {REAL_LIFE_PHOTOS.map((src, i) => (
            <div key={i} className="flex-shrink-0 overflow-hidden bg-zinc-100" style={{ width: '180px', aspectRatio: '1/1' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
        <div className="text-center mt-5">
          <button className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors underline underline-offset-4">Ver +</button>
        </div>
      </section>

      {/* ── RATING SUMMARY ───────────────────────────────────── */}
      <section className="py-16 border-t border-zinc-100">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="text-6xl font-black text-zinc-900">{product.rating}</p>
          <div className="flex justify-center mt-2 mb-1">
            <Stars rating={product.rating} size="lg" />
          </div>
          <p className="text-sm text-zinc-400 mb-8">
            Baseado em {product.reviewCount.toLocaleString('pt-BR')} Avaliações
          </p>

          {/* Distribution bars */}
          <div className="space-y-2 max-w-sm mx-auto mb-8">
            {dist.map(({ stars, pct }) => (
              <div key={stars} className="flex items-center gap-3">
                <div className="flex flex-shrink-0">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg key={i} className={`h-3 w-3 ${i < stars ? 'text-zinc-900' : 'text-zinc-200'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="flex-1 h-2 bg-zinc-100 overflow-hidden">
                  <div className="h-full bg-zinc-900 transition-all" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-zinc-400 w-8 text-right">
                  ({Math.round(product.reviewCount * pct / 100).toLocaleString('pt-BR')})
                </span>
              </div>
            ))}
          </div>

          <div className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-2">
            <span className="text-sm font-bold">99%</span>
            <span className="text-xs text-zinc-300">Revisores recomendariam este produto</span>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────── */}
      <section className="py-12 border-t border-zinc-100">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-8">
            {MOCK_REVIEWS.map((review) => (
              <div key={review.name} className="pb-8 border-b border-zinc-100 last:border-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-[11px] font-bold text-white">{review.initials}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-zinc-900">{review.name}</span>
                        <span className="text-xs text-zinc-400">Comprador verificado</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-400 flex-shrink-0">{review.date}</span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <Stars rating={review.rating} />
                  <span className="text-sm font-semibold text-zinc-800">{review.title}</span>
                </div>

                <p className="text-sm text-zinc-500 leading-relaxed mb-4">{review.comment}</p>

                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-700 transition-colors">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                    </svg>
                    Compartilhar
                  </button>
                  <span className="text-xs text-zinc-400">Este comentário foi útil? 0 · 0</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED PRODUCTS ─────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-16 border-t border-zinc-100">
          <div className="px-8 sm:px-14 lg:px-20">
            <h2 className="text-lg font-black text-zinc-900 uppercase tracking-wide mb-10">
              Você Também Pode Gostar
            </h2>
            <ProductGrid products={related} />
          </div>
        </section>
      )}

    </div>
  )
}
