'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

interface PromoSlide {
  bg: string
  leftTop: string
  leftBottom: string
  right: string
  href: string
}

const slides: PromoSlide[] = [
  {
    bg: 'linear-gradient(135deg, #050e1a 0%, #0a2a3a 40%, #0d3d4f 70%, #050e1a 100%)',
    leftTop: 'PEÇAS QUE',
    leftBottom: 'NÃO VOLTAM MAIS',
    right: 'COM ATÉ 40% OFF',
    href: '/produtos?categoria=ofertas',
  },
  {
    bg: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 40%, #16213e 70%, #0f3460 100%)',
    leftTop: 'ÚLTIMAS',
    leftBottom: 'UNIDADES',
    right: 'FRETE GRÁTIS ACIMA DE R$299',
    href: '/produtos',
  },
]

export default function PromoSlider() {
  const [active, setActive] = useState(0)

  const next = useCallback(() => setActive((i) => (i + 1) % slides.length), [])

  useEffect(() => {
    const t = setInterval(next, 6000)
    return () => clearInterval(t)
  }, [next])

  const slide = slides[active]

  return (
    <section
      className="relative overflow-hidden w-full flex items-center"
      style={{ height: '95vh', background: slide.bg, transition: 'background 0.8s ease' }}
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }} />

      {/* Left text */}
      <div className="absolute left-10 sm:left-14 lg:left-20 top-1/2 -translate-y-1/2">
        <p className="text-3xl sm:text-4xl lg:text-5xl font-light text-white uppercase tracking-tight leading-tight">
          {slide.leftTop}
        </p>
        <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-tight">
          {slide.leftBottom}
        </p>
      </div>

      {/* Right text */}
      <div className="absolute right-10 sm:right-14 lg:right-20 top-1/2 -translate-y-1/2 text-right">
        <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-tight max-w-sm">
          {slide.right}
        </p>
      </div>

      {/* COMPRAR button */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
        <Link
          href={slide.href}
          className="inline-block bg-white text-zinc-900 font-bold text-xs uppercase tracking-[0.22em] px-12 py-3.5 hover:bg-zinc-100 transition-colors whitespace-nowrap"
        >
          Comprar
        </Link>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 right-8 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            className={[
              'rounded-full transition-all duration-300',
              i === active ? 'bg-white w-3 h-3' : 'bg-white/40 w-2.5 h-2.5 hover:bg-white/70',
            ].join(' ')}
          />
        ))}
      </div>
    </section>
  )
}
