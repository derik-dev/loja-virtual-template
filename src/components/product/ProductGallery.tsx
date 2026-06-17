'use client'

import { useState } from 'react'

interface ProductGalleryProps {
  images: string[]
  alt: string
}

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-100 aspect-square">
        <img
          src={images[activeIndex]}
          alt={`${alt} - imagem ${activeIndex + 1}`}
          className="w-full h-full object-cover"
        />
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1))
              }
              aria-label="Imagem anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow hover:bg-white transition-colors"
            >
              <svg
                className="h-5 w-5 text-slate-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() =>
                setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1))
              }
              aria-label="Próxima imagem"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow hover:bg-white transition-colors"
            >
              <svg
                className="h-5 w-5 text-slate-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Ver imagem ${idx + 1}`}
              className={[
                'flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200',
                idx === activeIndex
                  ? 'border-indigo-500 shadow-md'
                  : 'border-slate-200 hover:border-indigo-300 opacity-70 hover:opacity-100',
              ].join(' ')}
            >
              <img src={src} alt={`${alt} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
