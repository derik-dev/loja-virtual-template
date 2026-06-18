'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface ProductColor {
  name: string
  hex: string
}

interface Product {
  id: string
  name: string
  slug: string
  price: number
  original_price: number | null
  images: string[]
  category: string
  stock: number
  rating: number
  review_count: number
  description: string
  tags: string[]
  featured: boolean
  colors: ProductColor[]
  sizes: string[]
  features: string[]
}

interface Props {
  product?: Product
  onSaved: () => void
  onCancel: () => void
}

const PRODUCT_TYPES = [
  {
    value: 'roupas',
    label: 'Roupa',
    icon: '👕',
    defaultSizes: 'P, M, G, GG, XGG',
    hasSizes: true,
  },
  {
    value: 'calcados',
    label: 'Tênis / Calçado',
    icon: '👟',
    defaultSizes: '34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44',
    hasSizes: true,
  },
  {
    value: 'eletronicos',
    label: 'Eletrônico',
    icon: '📱',
    defaultSizes: '',
    hasSizes: false,
  },
  {
    value: 'acessorios',
    label: 'Acessório',
    icon: '👜',
    defaultSizes: '',
    hasSizes: false,
  },
]

function slugify(str: string) {
  return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

const DEFAULT_COLORS: ProductColor[] = [
  { name: 'PRETO', hex: '#111111' },
  { name: 'CINZA', hex: '#9ca3af' },
  { name: 'BRANCO', hex: '#f8f8f8' },
]

export default function ProductForm({ product, onSaved, onCancel }: Props) {
  const isEdit = !!product
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    description: product?.description ?? '',
    price: product?.price?.toString() ?? '',
    original_price: product?.original_price?.toString() ?? '',
    category: product?.category ?? 'roupas',
    stock: product?.stock?.toString() ?? '0',
    rating: product?.rating?.toString() ?? '5.0',
    review_count: product?.review_count?.toString() ?? '0',
    featured: product?.featured ?? false,
    images: product?.images?.join('\n') ?? '',
    tags: product?.tags?.join(', ') ?? '',
    sizes: product?.sizes?.join(', ') ?? 'P, M, G, GG, XGG',
    features: product?.features?.join('\n') ?? '',
  })

  const [colors, setColors] = useState<ProductColor[]>(
    product?.colors?.length ? product.colors : DEFAULT_COLORS
  )
  const [newColorName, setNewColorName] = useState('')
  const [newColorHex, setNewColorHex] = useState('#000000')

  function addColor() {
    const name = newColorName.trim().toUpperCase()
    if (!name) return
    setColors((prev) => [...prev, { name, hex: newColorHex }])
    setNewColorName('')
    setNewColorHex('#000000')
  }

  function removeColor(i: number) {
    setColors((prev) => prev.filter((_, idx) => idx !== i))
  }

  function set(field: string, value: string | boolean) {
    setForm((f) => {
      const updated = { ...f, [field]: value }
      if (field === 'name' && !isEdit) updated.slug = slugify(value as string)
      if (field === 'category') {
        const type = PRODUCT_TYPES.find((t) => t.value === value)
        if (type) updated.sizes = type.defaultSizes
      }
      return updated
    })
  }

  const currentType = PRODUCT_TYPES.find((t) => t.value === form.category) ?? PRODUCT_TYPES[0]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const images = form.images.split('\n').map((s) => s.trim()).filter(Boolean)
    const tags = form.tags.split(',').map((s) => s.trim()).filter(Boolean)
    const sizes = form.sizes.split(',').map((s) => s.trim()).filter(Boolean)
    const features = form.features.split('\n').map((s) => s.trim()).filter(Boolean)

    const payload = {
      id: product?.id ?? generateId(),
      name: form.name,
      slug: form.slug,
      description: form.description,
      price: parseFloat(form.price),
      original_price: form.original_price ? parseFloat(form.original_price) : null,
      category: form.category,
      stock: parseInt(form.stock),
      rating: parseFloat(form.rating),
      review_count: parseInt(form.review_count),
      featured: form.featured,
      images,
      tags,
      colors,
      sizes,
      features,
    }

    const { error: err } = await supabase.from('products').upsert(payload)
    setSaving(false)

    if (err) {
      setError(err.message)
    } else {
      onSaved()
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200 px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-900">
            {isEdit ? 'Editar produto' : 'Novo produto'}
          </h1>
          <p className="text-xs text-zinc-400">{isEdit ? product.name : 'Preencha os dados abaixo'}</p>
        </div>
        <button onClick={onCancel} className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors">
          ← Voltar
        </button>
      </header>

      <form onSubmit={handleSubmit} className="px-8 py-6 max-w-3xl">
        <div className="bg-white border border-zinc-200 p-6 space-y-5">

          {/* Nome + Slug */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-1.5">Nome *</label>
              <input required value={form.name} onChange={(e) => set('name', e.target.value)}
                className="w-full border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:border-zinc-900" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-1.5">Slug *</label>
              <input required value={form.slug} onChange={(e) => set('slug', e.target.value)}
                className="w-full border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:border-zinc-900" />
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-1.5">Descrição</label>
            <textarea rows={3} value={form.description} onChange={(e) => set('description', e.target.value)}
              className="w-full border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:border-zinc-900 resize-none" />
          </div>

          {/* Tipo de produto */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-2">Tipo de produto *</label>
            <div className="flex border border-zinc-300 divide-x divide-zinc-300 overflow-hidden">
              {PRODUCT_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => set('category', type.value)}
                  className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${
                    form.category === type.value
                      ? 'bg-zinc-900 text-white'
                      : 'bg-white text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Preço + Preço original */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-1.5">Preço (R$) *</label>
              <input required type="number" step="0.01" value={form.price} onChange={(e) => set('price', e.target.value)}
                className="w-full border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:border-zinc-900" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-1.5">Preço original (R$) <span className="normal-case font-normal">— aparece riscado</span></label>
              <input type="number" step="0.01" value={form.original_price} onChange={(e) => set('original_price', e.target.value)}
                className="w-full border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:border-zinc-900" />
            </div>
          </div>

          {/* Estoque + Rating + Reviews */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-1.5">Estoque</label>
              <input type="number" value={form.stock} onChange={(e) => set('stock', e.target.value)}
                className="w-full border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:border-zinc-900" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-1.5">Rating (0-5)</label>
              <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => set('rating', e.target.value)}
                className="w-full border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:border-zinc-900" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-1.5">Nº de reviews</label>
              <input type="number" value={form.review_count} onChange={(e) => set('review_count', e.target.value)}
                className="w-full border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:border-zinc-900" />
            </div>
          </div>

          {/* Imagens */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-1.5">
              URLs das imagens <span className="normal-case font-normal">(uma por linha)</span>
            </label>
            <textarea rows={4} value={form.images} onChange={(e) => set('images', e.target.value)}
              placeholder="https://exemplo.com/foto1.jpg&#10;https://exemplo.com/foto2.jpg"
              className="w-full border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:border-zinc-900 resize-none font-mono" />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-1.5">
              Tags <span className="normal-case font-normal">(separadas por vírgula)</span>
            </label>
            <input value={form.tags} onChange={(e) => set('tags', e.target.value)}
              placeholder="camiseta, algodao, casual"
              className="w-full border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:border-zinc-900" />
          </div>

          {/* Cores */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-2">Cores</label>

            {/* Cores adicionadas */}
            {colors.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {colors.map((c, i) => (
                  <div key={i} className="flex items-center gap-1.5 border border-zinc-200 rounded-full pl-1 pr-2 py-1 bg-white">
                    <span
                      className="h-5 w-5 rounded-full border border-zinc-200 flex-shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-xs text-zinc-700 font-medium">{c.name}</span>
                    <button
                      type="button"
                      onClick={() => removeColor(i)}
                      className="ml-0.5 text-zinc-300 hover:text-red-400 transition-colors leading-none"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Adicionar cor */}
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={newColorHex}
                onChange={(e) => setNewColorHex(e.target.value)}
                className="h-9 w-10 border border-zinc-300 rounded cursor-pointer p-0.5"
              />
              <input
                type="text"
                placeholder="Nome da cor (ex: Preto)"
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addColor())}
                className="flex-1 border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:border-zinc-900"
              />
              <button
                type="button"
                onClick={addColor}
                className="px-4 py-2 border border-zinc-300 text-xs font-semibold text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 transition-colors"
              >
                + Adicionar
              </button>
            </div>
          </div>

          {/* Tamanhos — só para roupas e calçados */}
          {currentType.hasSizes && (
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-1.5">
                Tamanhos <span className="normal-case font-normal">(separados por vírgula)</span>
              </label>
              <input value={form.sizes} onChange={(e) => set('sizes', e.target.value)}
                placeholder={currentType.defaultSizes}
                className="w-full border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:border-zinc-900" />
              <p className="text-[10px] text-zinc-400 mt-1">
                {form.category === 'calcados' ? 'Ex: 37, 38, 39, 40, 41, 42' : 'Ex: P, M, G, GG, XGG'}
              </p>
            </div>
          )}

          {/* Diferenciais */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-1.5">
              Diferenciais <span className="normal-case font-normal">(um por linha)</span>
            </label>
            <textarea rows={4} value={form.features} onChange={(e) => set('features', e.target.value)}
              placeholder={'Anti odor e anti suor\nNão amassa e não desbota\nSecagem rápida'}
              className="w-full border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:border-zinc-900 resize-none" />
          </div>

          {/* Destaque */}
          <div className="flex items-center gap-3">
            <input type="checkbox" id="featured" checked={form.featured}
              onChange={(e) => set('featured', e.target.checked)}
              className="h-4 w-4 accent-zinc-900" />
            <label htmlFor="featured" className="text-sm text-zinc-700">Produto em destaque (Best Seller)</label>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Botões */}
          <div className="flex items-center gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="px-8 py-3 bg-zinc-900 text-white text-xs font-black uppercase tracking-[0.18em] hover:bg-zinc-700 transition-colors disabled:opacity-50">
              {saving ? 'Salvando...' : isEdit ? 'Salvar alterações' : 'Criar produto'}
            </button>
            <button type="button" onClick={onCancel}
              className="px-6 py-3 border border-zinc-300 text-xs font-bold uppercase tracking-[0.15em] text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 transition-colors">
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
