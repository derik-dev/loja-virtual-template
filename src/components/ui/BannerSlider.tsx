'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

interface Slide {
  image: string
  title: string
  subtitle: string
  products: { name: string; href: string }[]
  href: string
}

const slides: Slide[] = [
  {
    image: '/section-3-winter-01.png',
    title: 'NOVIDADES DE INVERNO',
    subtitle: 'mais camadas. mais conforto.',
    products: [
      { name: 'Camiseta\nRoll-IN', href: '/produtos?categoria=roupas' },
      { name: 'Jaqueta\nTrekkIN', href: '/produtos?categoria=roupas' },
    ],
    href: '/produtos?categoria=roupas',
  },
  {
    image: '/section-3-essentials-02.png',
    title: 'COLEÇÃO ESSENTIALS',
    subtitle: 'peças que nunca saem de moda.',
    products: [
      { name: 'Vestido\nMidi', href: '/produtos?categoria=roupas' },
      { name: 'Top\nEssential', href: '/produtos?categoria=roupas' },
    ],
    href: '/produtos?categoria=roupas',
  },
]

export default function BannerSlider() {
  const [active, setActive] = useState(0)

  const next = useCallback(() => {
    setActive((i) => (i + 1) % slides.length)
  }, [])

  useEffect(() => {
    const t = setInterval(next, 6000)
    return () => clearInterval(t)
  }, [next])

  const slide = slides[active]

  return (
    <section className="relative overflow-hidden w-full" style={{ height: '95vh' }}>
      {/* Background images — cross-fade */}
      {slides.map((s, i) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          key={i}
          src={s.image}
          alt=""
          className={[
            'absolute inset-0 w-full h-full object-cover object-[65%_top] sm:object-center transition-opacity duration-700',
            i === active ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
        />
      ))}

      {/* Editorial contrast for copy on the light campaign backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-black/30" />

      {/* Text */}
      <div className="absolute left-0 right-0 sm:left-14 sm:right-auto lg:left-20 top-1/2 -translate-y-1/2 px-6 sm:px-0 text-center sm:text-left">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase leading-tight tracking-tight">
          {slide.title}
        </h2>
        <p className="mt-2 text-lg sm:text-xl text-white/80 font-light">
          {slide.subtitle}
        </p>
      </div>

      {/* Right product names */}
      <div className="absolute right-10 sm:right-14 lg:right-24 top-1/2 -translate-y-1/2 hidden md:flex gap-10 sm:gap-16">
        {slide.products.map((p) => (
          <Link
            key={p.name}
            href={p.href}
            className="text-white/80 text-sm sm:text-base text-right whitespace-pre-line hover:text-white transition-colors leading-snug"
          >
            {p.name}
          </Link>
        ))}
      </div>

      {/* COMPRAR button — center bottom */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
        <Link
          href={slide.href}
          className="inline-block bg-white text-zinc-900 font-bold text-xs uppercase tracking-[0.22em] px-12 py-3.5 hover:bg-zinc-100 transition-colors whitespace-nowrap"
        >
          Comprar
        </Link>
      </div>

      {/* Dots — bottom right */}
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
