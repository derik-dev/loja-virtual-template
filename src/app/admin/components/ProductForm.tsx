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

const CATEGORIES = ['roupas', 'eletronicos', 'acessorios', 'calcados', 'esporte']

function slugify(str: string) {
  return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

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
    // Nome e hex separados por espaço, ex: "Preto #111111"
    colors: product?.colors?.map((c) => `${c.name} ${c.hex}`).join('\n') ?? '',
    sizes: product?.sizes?.join(', ') ?? 'P, M, G, GG, XGG',
    features: product?.features?.join('\n') ?? '',
  })

  function set(field: string, value: string | boolean) {
    setForm((f) => {
      const updated = { ...f, [field]: value }
      if (field === 'name' && !isEdit) updated.slug = slugify(value as string)
      return updated
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const images = form.images.split('\n').map((s) => s.trim()).filter(Boolean)
    const tags = form.tags.split(',').map((s) => s.trim()).filter(Boolean)
    const sizes = form.sizes.split(',').map((s) => s.trim()).filter(Boolean)
    const features = form.features.split('\n').map((s) => s.trim()).filter(Boolean)
    const colors = form.colors.split('\n').map((line) => {
      const parts = line.trim().split(' ')
      const hex = parts.pop() ?? '#000000'
      const name = parts.join(' ')
      return { name: name.toUpperCase(), hex }
    }).filter((c) => c.name)

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

          {/* Preço + Preço original + Categoria */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-1.5">Preço (R$) *</label>
              <input required type="number" step="0.01" value={form.price} onChange={(e) => set('price', e.target.value)}
                className="w-full border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:border-zinc-900" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-1.5">Preço original (R$)</label>
              <input type="number" step="0.01" value={form.original_price} onChange={(e) => set('original_price', e.target.value)}
                className="w-full border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:border-zinc-900" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-1.5">Categoria *</label>
              <select value={form.category} onChange={(e) => set('category', e.target.value)}
                className="w-full border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:border-zinc-900 bg-white">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
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
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-1.5">
              Cores <span className="normal-case font-normal">(uma por linha · formato: Nome #hex)</span>
            </label>
            <textarea rows={4} value={form.colors} onChange={(e) => set('colors', e.target.value)}
              placeholder={'Preto #111111\nCinza #9ca3af\nBranco #f8f8f8'}
              className="w-full border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:border-zinc-900 resize-none font-mono" />
            {/* Preview das cores */}
            {form.colors && (
              <div className="flex flex-wrap gap-2 mt-2">
                {form.colors.split('\n').map((line, i) => {
                  const parts = line.trim().split(' ')
                  const hex = parts[parts.length - 1]
                  const name = parts.slice(0, -1).join(' ')
                  if (!name || !hex.startsWith('#')) return null
                  return (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="h-5 w-5 rounded-full border border-zinc-300 inline-block" style={{ backgroundColor: hex }} />
                      <span className="text-xs text-zinc-500">{name}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Tamanhos */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-1.5">
              Tamanhos <span className="normal-case font-normal">(separados por vírgula)</span>
            </label>
            <input value={form.sizes} onChange={(e) => set('sizes', e.target.value)}
              placeholder="P, M, G, GG, XGG"
              className="w-full border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:border-zinc-900" />
          </div>

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
