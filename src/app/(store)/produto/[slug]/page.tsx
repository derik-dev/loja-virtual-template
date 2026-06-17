'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { products } from '@/lib/data/products'
import { formatCurrency, calculateDiscount } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { ProductGallery, ProductGrid } from '@/components/product'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface ProductPageProps {
  params: { slug: string }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug)

  if (!product) {
    notFound()
  }

  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'descricao' | 'especificacoes' | 'avaliacoes'>('descricao')
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4)

  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : null

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const stars = Array.from({ length: 5 }, (_, i) => i + 1)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/produtos" className="hover:text-indigo-600 transition-colors">Produtos</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium line-clamp-1">{product.name}</span>
      </nav>

      {/* Product detail */}
      <div className="grid lg:grid-cols-2 gap-10 mb-16">
        {/* Gallery */}
        <ProductGallery images={product.images} alt={product.name} />

        {/* Info */}
        <div className="flex flex-col gap-4">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">{product.category}</Badge>
            {discount && <Badge variant="sale">-{discount}% OFF</Badge>}
            {product.stock === 0 && <Badge variant="soldout">Esgotado</Badge>}
            {product.featured && product.stock > 0 && <Badge variant="new">Destaque</Badge>}
          </div>

          {/* Name */}
          <h1 className="text-3xl font-bold text-slate-900 leading-tight">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {stars.map((star) => (
                <svg
                  key={star}
                  className={`h-4 w-4 ${star <= Math.round(product.rating) ? 'text-amber-400' : 'text-slate-200'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium text-slate-700">{product.rating}</span>
            <span className="text-sm text-slate-400">({product.reviewCount} avaliações)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className={`text-3xl font-extrabold ${discount ? 'text-red-600' : 'text-slate-900'}`}>
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-slate-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Stock */}
          <p className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {product.stock > 0 ? `✓ Em estoque (${product.stock} unidades)` : '✗ Fora de estoque'}
          </p>

          {/* Description */}
          <p className="text-slate-600 leading-relaxed">{product.description}</p>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-700">Quantidade:</span>
            <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                </svg>
              </button>
              <span className="w-12 text-center font-semibold text-slate-900">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              variant="primary"
              size="lg"
              className="flex-1"
            >
              {added ? '✓ Adicionado!' : 'Adicionar ao Carrinho'}
            </Button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: product.name, url: window.location.href })
                }
              }}
              className="p-3 rounded-xl border border-slate-300 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition-colors"
              aria-label="Compartilhar"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-100 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Compra segura
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              Devolução em 30 dias
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              Frete grátis acima de R$199
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-16">
        <div className="border-b border-slate-200 mb-6">
          <div className="flex gap-6">
            {(['descricao', 'especificacoes', 'avaliacoes'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={[
                  'pb-3 text-sm font-medium capitalize border-b-2 transition-colors',
                  activeTab === tab
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700',
                ].join(' ')}
              >
                {tab === 'descricao' ? 'Descrição' : tab === 'especificacoes' ? 'Especificações' : 'Avaliações'}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-3xl">
          {activeTab === 'descricao' && (
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed">{product.description}</p>
              <p className="text-slate-600 leading-relaxed mt-4">
                Produto de alta qualidade, desenvolvido com os melhores materiais e processos de fabricação. Garantia de satisfação ou seu dinheiro de volta em até 30 dias.
              </p>
            </div>
          )}
          {activeTab === 'especificacoes' && (
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              {[
                ['Categoria', product.category],
                ['Avaliação', `${product.rating} / 5.0`],
                ['Estoque', `${product.stock} unidades`],
                ['Tags', product.tags.join(', ')],
                ['SKU', `SKU-${product.id.padStart(6, '0')}`],
              ].map(([label, value], i) => (
                <div
                  key={label}
                  className={`flex py-3 px-4 text-sm ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}
                >
                  <span className="w-40 font-medium text-slate-700 capitalize">{label}</span>
                  <span className="text-slate-600 capitalize">{value}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'avaliacoes' && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="text-center">
                  <p className="text-4xl font-bold text-slate-900">{product.rating}</p>
                  <div className="flex mt-1">
                    {stars.map((s) => (
                      <svg key={s} className={`h-3.5 w-3.5 ${s <= Math.round(product.rating) ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{product.reviewCount} avaliações</p>
                </div>
              </div>
              {[
                { name: 'Maria S.', rating: 5, comment: 'Excelente produto! Superou todas as minhas expectativas. Entrega rápida e embalagem impecável.' },
                { name: 'João P.', rating: 4, comment: 'Muito bom, qualidade ótima. Recomendo a todos que estão em dúvida.' },
                { name: 'Ana L.', rating: 5, comment: 'Perfeito! Exatamente como descrito. Comprei e já recomendei para amigos.' },
              ].map((review) => (
                <div key={review.name} className="p-4 border border-slate-100 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{review.name}</p>
                      <div className="flex">
                        {stars.map((s) => (
                          <svg key={s} className={`h-3 w-3 ${s <= review.rating ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Produtos Relacionados</h2>
          <ProductGrid products={related} />
        </div>
      )}
    </div>
  )
}
