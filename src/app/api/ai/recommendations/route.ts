import { NextRequest, NextResponse } from 'next/server'
import { groqChat } from '@/lib/groq'

export async function POST(req: NextRequest) {
  try {
    const { currentProduct, allProducts } = await req.json()

    const candidates = allProducts
      .filter((p: { id: string }) => p.id !== currentProduct.id)
      .slice(0, 60)

    const list = candidates.map((p: { id: string; name: string; category: string; price: number; description?: string }) =>
      `ID:${p.id} | ${p.name} | categoria:${p.category} | R$${p.price}${p.description ? ' | ' + p.description.slice(0, 80) : ''}`
    ).join('\n')

    const prompt = `Você é um especialista em moda e estilo. Um cliente está vendo o produto:
Nome: ${currentProduct.name}
Categoria: ${currentProduct.category}
Preço: R$${currentProduct.price}
${currentProduct.description ? 'Descrição: ' + currentProduct.description : ''}

Escolha EXATAMENTE 4 produtos da lista abaixo que complementam melhor o produto acima por estilo, ocasião, combinação ou faixa de preço. Priorize produtos que formariam um look completo ou seriam usados juntos.

PRODUTOS DISPONÍVEIS:
${list}

Responda APENAS com um array JSON com os 4 IDs selecionados em ordem de relevância, sem texto adicional:
["id1","id2","id3","id4"]`

    const raw = await groqChat(prompt)
    const match = raw.match(/\[[\s\S]*?\]/)
    if (!match) return NextResponse.json({ products: [] })

    const ids: string[] = JSON.parse(match[0])
    const ordered = ids
      .map((id) => candidates.find((p: { id: string }) => p.id === id))
      .filter(Boolean)
      .slice(0, 4)

    return NextResponse.json({ products: ordered })
  } catch {
    return NextResponse.json({ products: [] })
  }
}
