'use client'

import { useState } from 'react'

interface ProductGalleryProps {
  images: string[]
  alt: string
}

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="flex gap-3">
      {/* Thumbnails — vertical strip on left */}
      {images.length > 1 && (
        <div className="flex flex-col gap-2 w-16 flex-shrink-0">
          {images.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Ver imagem ${idx + 1}`}
              className={`w-full overflow-hidden bg-zinc-100 transition-all duration-200 ${
                idx === activeIndex
                  ? 'ring-1 ring-zinc-900'
                  : 'opacity-50 hover:opacity-80'
              }`}
              style={{ aspectRatio: '3/4' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`${alt} ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="relative flex-1 overflow-hidden bg-zinc-100" style={{ aspectRatio: '3/4' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[activeIndex]}
          alt={`${alt} - imagem ${activeIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={() => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1))}
              aria-label="Imagem anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center bg-white/90 hover:bg-white transition-colors"
            >
              <svg className="h-4 w-4 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1))}
              aria-label="Próxima imagem"
              className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center bg-white/90 hover:bg-white transition-colors"
            >
              <svg className="h-4 w-4 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  )
}
