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
  deliveryTime: string
  image: string
}
