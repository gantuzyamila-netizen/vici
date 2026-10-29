export interface User {
  id: string
  name: string
  address: string
}

export interface Category {
  id: string
  label: string
}

export interface Promo {
  id: string
  title: string
  subtitle: string
  badge: string
  image: string
}

export interface Store {
  id: string
  name: string
  description: string
  badge: string
  badgeTone: 'discount' | 'shipping'
  deliveryTime: string
  image: string
  categories: string[]
}

export interface CategoryTile {
  id: string
  label: string
  image: string
}

export interface CategorySection {
  title: string
  tiles: CategoryTile[]
}

export interface Product {
  id: string
  title: string
  fullTitle: string
  description: string
  discount?: string
  price: number
  image: string
  maxFlavors?: number
}

export interface StoreDetail {
  id: string
  name: string
  tagline: string
  rating: number
  deliveryTime: string
  shipping: string
  hero: string
  tabs: string[]
  products: Product[]
}

export interface CartItem {
  productId: string
  storeName: string
  title: string
  image: string
  qty: number
  unitPrice: number
  flavors: string[]
}
