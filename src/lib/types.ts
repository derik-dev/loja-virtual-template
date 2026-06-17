export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  tags: string[]
  rating: number
  reviewCount: number
  stock: number
  featured: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string
  productCount: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface FilterState {
  category: string | null
  minPrice: number | null
  maxPrice: number | null
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest'
}
