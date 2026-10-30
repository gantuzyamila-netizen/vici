import type { Category } from '../types'

// Atajos circulares de la Home (Figma 04 · Home, "Selector / Categorías"). Cada ícono se ubica como en el frame.
export const categories: Category[] = [
  { id: 'helados', label: 'Helados', image: '/images/home/chip-helados.png', imageClass: 'absolute left-[3px] top-[5px] size-[46px] object-contain', to: '/tienda/rapanui' },
  { id: 'pizzas', label: 'Pizzas', image: '/images/home/chip-pizzas.png', imageClass: '', crop: { width: '135.85%', height: '184.62%', left: '-13.21%', top: '-48.72%' }, to: '/tienda/pizzeria-fuego' },
  { id: 'cafe', label: 'Café', image: '/images/home/chip-cafe.png', imageClass: 'size-14 object-contain' },
  { id: 'burgers', label: 'Burgers', image: '/images/home/chip-burger.png', imageClass: 'size-[50px] object-contain', to: '/tienda/burger-house' },
  { id: 'papas', label: 'Papas', image: '/images/home/chip-papas.png', imageClass: 'size-[50px] object-contain' },
]
