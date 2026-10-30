export interface User {
  id: string
  name: string
  address: string
  fullName: string
  phone: string
}

export interface Category {
  id: string
  label: string
  image: string
  imageClass: string // medida y posición del ícono dentro del círculo de 56 px, como en Figma
  crop?: { width: string; height: string; left: string; top: string } // ícono recortado dentro de una ventana (Pizzas)
  to?: string // sin `to` el atajo no tiene flujo diseñado y se muestra deshabilitado
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
  to?: string // sin `to` el comercio no tiene flujo diseñado y se muestra deshabilitado
}

export interface CategoryTile {
  id: string
  label: string
  image: string
  to?: string // sin `to` la categoría no tiene flujo diseñado y se muestra deshabilitada
}

export interface CategorySection {
  title: string
  tiles: CategoryTile[]
}

export interface ToggleOption {
  id: string
  label: string
  detail: string
}

// Cómo se personaliza un producto: eligiendo gustos (helados) o destildando lo que se quiere quitar (pizzas, hamburguesas)
export type Customization =
  | { kind: 'flavors'; max: number }
  | { kind: 'toggles'; brand: string; heading: string; hint: string; options: ToggleOption[]; defaultRemoved: string[]; unit?: { one: string; many: string } }

export interface Product {
  id: string
  title: string
  fullTitle: string
  description: string
  discount?: string
  price: number
  image: string
  heroImage?: string
  customization?: Customization // sin esto el producto no tiene pantalla de personalización y se muestra deshabilitado
}

export interface StoreTab {
  label: string
  enabled: boolean
}

export interface StoreDetail {
  id: string
  name: string
  tagline: string
  rating: number
  deliveryTime: string
  shipping: string
  hero: string
  tabs: StoreTab[]
  products: Product[]
}

export interface CartItem {
  productId: string
  storeId: string
  storeName: string
  title: string
  image: string
  qty: number
  unitPrice: number
  choices: string[] // gustos elegidos o ids de lo que queda incluido
  detail: string // lo que se lista debajo del título en el carrito
}
