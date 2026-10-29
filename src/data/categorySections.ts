import type { CategorySection } from '../types'

export const categorySections: CategorySection[] = [
  {
    title: 'Almuerzos y Cena',
    tiles: [
      { id: 'papas', label: 'Papas Fritas', image: '/images/categories/fries.png' },
      { id: 'pizzas', label: 'Pizzas', image: '/images/categories/pizza.png', to: '/tienda/pizzeria-fuego' },
      { id: 'hamburguesas', label: 'Hamburguesas', image: '/images/categories/burger.png', to: '/tienda/burger-house' },
    ],
  },
  {
    title: 'Postres',
    tiles: [
      { id: 'tortas', label: 'Tortas', image: '/images/categories/cake.png' },
      { id: 'helados', label: 'Helados', image: '/images/categories/ice-cream.png', to: '/tienda/rapanui' },
      { id: 'chocolate', label: 'Chocolate', image: '/images/categories/chocolate.png' },
    ],
  },
  {
    title: 'Bebidas',
    tiles: [
      { id: 'cafe', label: 'Café', image: '/images/categories/coffee.png' },
      { id: 'cervezas', label: 'Cervezas', image: '/images/categories/beer.png' },
      { id: 'agua', label: 'Agua', image: '/images/categories/water.png' },
    ],
  },
]
