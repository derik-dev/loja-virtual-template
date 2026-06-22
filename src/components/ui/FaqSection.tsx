'use client'

import { useState } from 'react'

const faqs = [
  { q: 'As roupas da Vero têm bom custo-benefício?', a: 'Sim. Nossas peças combinam tecnologia, durabilidade e design atemporal, tornando cada compra um investimento de longo prazo no seu guarda-roupa.' },
  { q: 'Há quanto tempo a Vero existe?', a: 'A Vero foi fundada com o propósito de reinventar o que significa vestir bem. Estamos em constante evolução desde o primeiro dia.' },
  { q: 'Qual é o tecido da Vero?', a: 'Utilizamos tecidos de alta performance com tecnologia anti odor, anti suor e antimicrobiana, garantindo conforto em qualquer situação.' },
  { q: 'As roupas da Vero não amassam?', a: 'Correto. Nossos tecidos foram desenvolvidos para resistir ao amassado, mantendo a aparência impecável mesmo após horas de uso.' },
  { q: 'Quanto tempo dura uma camiseta da Vero?', a: 'Com os cuidados corretos de lavagem, nossas peças mantêm forma, cor e tecnologia por anos de uso contínuo.' },
  { q: 'Qual o diferencial da Vero?', a: 'Somos a junção de moda e tecnologia. Cada detalhe — do corte ao fio — é pensado para oferecer funcionalidade sem abrir mão do estilo.' },
  { q: 'Posso secar minha camiseta Vero na secadora?', a: 'Recomendamos secagem natural para preservar a tecnologia do tecido. Evite altas temperaturas.' },
  { q: 'Quem criou a Vero?', a: 'A Vero nasceu da visão de um grupo de apaixonados por moda e inovação que acreditam que roupa boa precisa trabalhar por você.' },
  { q: 'Posso centrifugar as camisetas da Vero?', a: 'Sim, em velocidade baixa. Evite centrifugação excessiva para garantir a durabilidade do tecido tecnológico.' },
  { q: 'As roupas anti suor da Vero impedem a transpiração?', a: 'Não impedem — elas gerenciam. O tecido absorve e evapora o suor rapidamente, mantendo você seco e fresco.' },
]

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 uppercase text-center tracking-wide mb-12">
          Perguntas Frequentes
        </h2>

        <div className="divide-y divide-zinc-100">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left group"
              >
                <div className="flex items-center gap-3">
                  <svg className="h-4 w-4 flex-shrink-0 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                  </svg>
                  <span className="text-sm text-zinc-700 group-hover:text-zinc-900 transition-colors">
                    {faq.q}
                  </span>
                </div>
                <svg
                  className={`h-4 w-4 flex-shrink-0 text-zinc-400 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {open === i && (
                <div className="pb-5 pl-7 pr-6">
                  <p className="text-sm text-zinc-500 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
