import type { Store } from '../types'

export const stores: Store[] = [
  { id: 's0', name: 'Rapanui', description: 'Helados y chocolates', badge: '30% OFF', badgeTone: 'discount', deliveryTime: '25 - 35 min', image: '/images/store-rapanui.jpg', categories: ['helados'], to: '/tienda/rapanui' },
  { id: 's1', name: 'La Riviera', description: 'Rotisería y Cafetería', badge: '30% OFF', badgeTone: 'discount', deliveryTime: '25 - 35 min', image: '/images/store-la-riviera.jpg', categories: ['pizzas'] },
  { id: 's2', name: 'BBS Sushi', description: 'Sushi y Mariscos', badge: 'Envío: $0', badgeTone: 'shipping', deliveryTime: '15 - 25 min', image: '/images/store-bbs-sushi.jpg', categories: ['sushi'] },
  { id: 's3', name: 'Bakery', description: 'Tortas y Cafetería', badge: 'Envío: $150', badgeTone: 'shipping', deliveryTime: '20 - 30 min', image: '/images/store-bakery.jpg', categories: ['helados'] },
]
