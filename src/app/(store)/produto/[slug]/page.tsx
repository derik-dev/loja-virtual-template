'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { products } from '@/lib/data/products'
import { formatCurrency, calculateDiscount } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { ProductGallery, ProductGrid } from '@/components/product'

interface ProductPageProps {
  params: { slug: string }
}

const REVIEWS = [
  { name: 'Maria S.', rating: 5, comment: 'Excelente produto! Superou todas as minhas expectativas. Entrega rápida e embalagem impecável.' },
  { name: 'João P.', rating: 4, comment: 'Muito bom, qualidade ótima. Recomendo a todos que estão em dúvida.' },
  { name: 'Ana L.', rating: 5, comment: 'Perfeito! Exatamente como descrito. Comprei e já recomendei para amigos.' },
]

function Stars({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const h = size === 'md' ? 'h-4 w-4' : 'h-3 w-3'
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`${h} ${i + 1 <= Math.round(rating) ? 'text-zinc-800' : 'text-zinc-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug)
  if (!product) notFound()

  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'descricao' | 'especificacoes' | 'avaliacoes'>('descricao')
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  const discount = product.originalPrice ? calculateDiscount(product.originalPrice, product.price) : null

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const TABS = [
    { key: 'descricao', label: 'Descrição' },
    { key: 'especificacoes', label: 'Especificações' },
    { key: 'avaliacoes', label: 'Avaliações' },
  ] as const

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-[1440px] px-8 sm:px-14 lg:px-20 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400 mb-10">
          <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
          <span className="text-zinc-200">/</span>
          <Link href="/produtos" className="hover:text-zinc-900 transition-colors">Produtos</Link>
          <span className="text-zinc-200">/</span>
          <span className="text-zinc-600 line-clamp-1">{product.name}</span>
        </nav>

        {/* Main layout */}
        <div className="grid lg:grid-cols-2 gap-14 mb-20">

          {/* Gallery */}
          <ProductGallery images={product.images} alt={product.name} />

          {/* Info */}
          <div className="flex flex-col">

            {/* Category + discount */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-400">
                {product.category}
              </span>
              {discount && (
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] bg-zinc-900 text-white px-2 py-0.5">
                  -{discount}%
                </span>
              )}
              {product.stock === 0 && (
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] bg-zinc-100 text-zinc-500 px-2 py-0.5">
                  Esgotado
                </span>
              )}
            </div>

            {/* Name */}
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 uppercase tracking-wide leading-tight mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <Stars rating={product.rating} size="md" />
              <span className="text-xs text-zinc-500">{product.rating} · {product.reviewCount} avaliações</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-zinc-100">
              <span className="text-3xl font-black text-zinc-900">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-zinc-400 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-zinc-500 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Stock */}
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-6 text-zinc-400">
              {product.stock > 0 ? `${product.stock} unidades disponíveis` : 'Fora de estoque'}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">Qtd.</span>
              <div className="flex items-center border border-zinc-200">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                  </svg>
                </button>
                <span className="w-10 text-center text-sm font-bold text-zinc-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  disabled={product.stock === 0}
                  className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors disabled:opacity-30"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full py-4 bg-zinc-900 text-white text-xs font-bold uppercase tracking-[0.22em] hover:bg-zinc-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed mb-3"
            >
              {added ? '✓ Adicionado ao carrinho' : product.stock === 0 ? 'Esgotado' : 'Adicionar ao Carrinho'}
            </button>

            {/* Trust row */}
            <div className="flex items-center justify-between pt-5 border-t border-zinc-100 mt-2">
              {[
                { icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z', label: 'Compra segura' },
                { icon: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99', label: 'Troca em 30 dias' },
                { icon: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12', label: 'Frete grátis acima de R$199' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                  <svg className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                  </svg>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-zinc-400">{label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Tabs */}
        <div className="mb-20">
          <div className="flex border-b border-zinc-200 mb-8">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={[
                  'pb-3 mr-8 text-[11px] font-bold uppercase tracking-[0.18em] border-b-2 -mb-px transition-colors',
                  activeTab === tab.key
                    ? 'border-zinc-900 text-zinc-900'
                    : 'border-transparent text-zinc-400 hover:text-zinc-700',
                ].join(' ')}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="max-w-3xl">
            {activeTab === 'descricao' && (
              <div className="space-y-4">
                <p className="text-sm text-zinc-500 leading-relaxed">{product.description}</p>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  Desenvolvido com materiais de alta performance, cada peça da Vero é projetada para durar. Garantia de satisfação ou seu dinheiro de volta em até 30 dias.
                </p>
              </div>
            )}

            {activeTab === 'especificacoes' && (
              <div className="divide-y divide-zinc-100 border border-zinc-100">
                {[
                  ['Categoria', product.category],
                  ['Avaliação', `${product.rating} / 5.0`],
                  ['Estoque', `${product.stock} unidades`],
                  ['Tags', product.tags.join(', ')],
                  ['SKU', `SKU-${product.id.padStart(6, '0')}`],
                ].map(([label, value]) => (
                  <div key={label} className="flex py-3.5 px-4">
                    <span className="w-36 text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-400">{label}</span>
                    <span className="text-sm text-zinc-700">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'avaliacoes' && (
              <div className="space-y-6">
                <div className="flex items-center gap-6 pb-6 border-b border-zinc-100">
                  <div className="text-center">
                    <p className="text-5xl font-black text-zinc-900">{product.rating}</p>
                    <Stars rating={product.rating} size="md" />
                    <p className="text-[11px] text-zinc-400 mt-1 uppercase tracking-[0.12em]">{product.reviewCount} avaliações</p>
                  </div>
                </div>
                {REVIEWS.map((review) => (
                  <div key={review.name} className="pb-6 border-b border-zinc-100 last:border-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-7 w-7 flex-shrink-0 bg-zinc-900 flex items-center justify-center">
                        <span className="text-[11px] font-bold text-white">{review.name[0]}</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-zinc-900">{review.name}</p>
                        <Stars rating={review.rating} />
                      </div>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <div className="mb-8">
              <h2 className="text-xl font-black text-zinc-900 uppercase tracking-wide">Você Também Pode Gostar</h2>
            </div>
            <ProductGrid products={related} />
          </div>
        )}

      </div>
    </div>
  )
}
