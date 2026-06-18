'use client'

interface ProductGalleryProps {
  images: string[]
  alt: string
}

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  // Fill to exactly 4 images for the 2×2 mosaic
  const mosaic: string[] = []
  for (let i = 0; i < 6; i++) {
    mosaic.push(images[i % images.length])
  }

  return (
    <div className="grid grid-cols-2 gap-0.5">
      {mosaic.map((src, i) => (
        <div
          key={i}
          className="relative overflow-hidden bg-zinc-100 aspect-[3/4]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`${alt} ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}
