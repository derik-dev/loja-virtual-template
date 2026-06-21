import { NextRequest, NextResponse } from 'next/server'
import { groqChat } from '@/lib/groq'

export async function POST(req: NextRequest) {
  const { query, products } = await req.json()

  if (!query?.trim()) {
    return NextResponse.json({ products })
  }

  const productList = products.map((p: { id: string; name: string; category: string; tags: string[]; description: string }) =>
    `ID: ${p.id} | Nome: ${p.name} | Categoria: ${p.category} | Tags: ${(p.tags ?? []).join(', ')} | Descrição: ${p.description}`
  ).join('\n')

  const prompt = `Você é um assistente de busca de e-commerce. O usuário buscou: "${query}".
Analise a lista de produtos abaixo e retorne APENAS um array JSON com os IDs dos produtos mais relevantes, do mais relevante ao menos relevante.
Retorne no máximo 6 produtos. Responda SOMENTE o JSON, sem texto adicional.

Produtos:
${productList}`

  try {
    const raw = await groqChat(prompt)
    const match = raw.match(/\[[\s\S]*?\]/)
    if (!match) return NextResponse.json({ products: [] })

    const ids: string[] = JSON.parse(match[0])
    const ordered = ids
      .map((id) => products.find((p: { id: string }) => p.id === id))
      .filter(Boolean)

    return NextResponse.json({ products: ordered })
  } catch (err) {
    console.error('[AI Search] Groq error:', err)
    return NextResponse.json({ products }, { status: 500 })
  }
}
