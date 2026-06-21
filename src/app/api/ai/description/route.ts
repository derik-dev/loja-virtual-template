import { NextRequest, NextResponse } from 'next/server'
import { groqChat } from '@/lib/groq'

export async function POST(req: NextRequest) {
  try {
    const { nome, categoria, descricaoBreve, diferenciais, tags, cores } = await req.json()

    const prompt = `Você é um copywriter especialista em e-commerce de moda e varejo brasileiro. Expanda e aprimore a descrição breve abaixo em uma descrição de produto persuasiva, humana e otimizada para SEO:

Nome: ${nome || 'não informado'}
Categoria: ${categoria || 'não informado'}
Descrição breve do lojista: ${descricaoBreve}
Diferenciais: ${(diferenciais as string[]).join(', ') || 'não informado'}
Tags: ${(tags as string[]).join(', ') || 'não informado'}
Cores disponíveis: ${(cores as string[]).join(', ') || 'não informado'}

A descrição deve: ter entre 80 e 120 palavras, começar direto no benefício principal sem clichês como "apresentamos" ou "conheça", usar linguagem próxima e direta com o cliente, destacar os diferenciais de forma natural, terminar com uma frase que instiga a compra. Preserve a essência e as informações da descrição breve do lojista.

Retorne APENAS o texto da descrição, sem título, sem aspas, sem formatação adicional.`

    const description = await groqChat(prompt)
    return NextResponse.json({ description: description.trim() })
  } catch {
    return NextResponse.json({ error: 'Erro ao gerar descrição' }, { status: 500 })
  }
}
