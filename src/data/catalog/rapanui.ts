import type { StoreDetail } from '../../types'

export const rapanui: StoreDetail = {
  id: 'rapanui',
  name: 'Rapanui',
  tagline: 'Helados y chocolates',
  rating: 5,
  deliveryTime: '25 - 35 min',
  shipping: 'Envío: Gratis',
  hero: '/images/rapanui/hero.jpg',
  tabs: [
    { label: 'Promociones', enabled: true },
    { label: 'Franui', enabled: false },
    { label: 'Chocolates', enabled: false },
  ],
  products: [
    { id: '1kg', title: '1kg de Helado', fullTitle: '1 kg de Helado', description: 'Elegí 4 gustos', discount: '30% OFF', price: 1000, image: '/images/rapanui/p-1kg.png', customization: { kind: 'flavors', max: 4 } },
    { id: 'half', title: '1/2kg de Helado', fullTitle: '1/2 kg de Helado', description: 'Elegí 3 gustos', discount: '30% OFF', price: 750, image: '/images/rapanui/p-half.jpg', customization: { kind: 'flavors', max: 3 } },
    { id: 'quarter', title: '1/4kg de Helado', fullTitle: '1/4 kg de Helado', description: 'Elegí 2 gustos', discount: '15% OFF', price: 450, image: '/images/rapanui/p-quarter.jpg', customization: { kind: 'flavors', max: 2 } },
    { id: 'franui', title: 'Franui', fullTitle: 'Franui', description: 'Leche', price: 1200, image: '/images/rapanui/p-franui.jpg' },
  ],
}
