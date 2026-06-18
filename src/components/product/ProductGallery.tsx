'use client'

interface ProductGalleryProps {
  images: string[]
  alt: string
}

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  // Ensure at least 4 images for the mosaic by repeating
  const mosaic = images.length >= 4
    ? images
    : [...images, ...images, ...images, ...images].slice(0, Math.max(4, images.length))

  return (
    <div className="grid grid-cols-2 gap-0.5">
      {mosaic.map((src, i) => (
        <div
          key={i}
          className="overflow-hidden bg-zinc-100"
          style={{ aspectRatio: '3 / 4' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`${alt} ${i + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}
