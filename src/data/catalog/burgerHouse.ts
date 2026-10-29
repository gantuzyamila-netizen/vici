import type { StoreDetail } from '../../types'

export const burgerHouse: StoreDetail = {
  id: 'burger-house',
  name: 'Burger House',
  tagline: 'Hamburguesas y más',
  rating: 5,
  deliveryTime: '25 - 35 min',
  shipping: 'Envío: Gratis',
  hero: '/images/burger-house/hero.jpg',
  tabs: [
    { label: 'Promociones', enabled: true },
    { label: 'Combos', enabled: false },
    { label: 'Bebidas', enabled: false },
  ],
  products: [
    {
      id: 'doble-cheddar',
      title: 'Doble cheddar',
      fullTitle: 'Doble cheddar',
      description: 'Carne y cheddar',
      discount: '30% OFF',
      price: 1000,
      image: '/images/burger-house/p-doble.jpg',
      heroImage: '/images/burger-house/hero-custom.jpg',
      customization: {
        kind: 'toggles',
        brand: 'Burger House',
        heading: 'Ingredientes',
        hint: 'Puedes quitar o agregar',
        defaultRemoved: ['pepino'], // como llega en el frame de Figma
        options: [
          { id: 'carne', label: 'Carne de res', detail: '2 medallones' },
          { id: 'cheddar', label: 'Queso cheddar', detail: 'Derretido' },
          { id: 'pepino', label: 'Pepino', detail: 'En rodajas finas' },
          { id: 'lechuga', label: 'Lechuga', detail: 'Hojas frescas' },
          { id: 'tomate', label: 'Tomate', detail: 'Rodajas jugosas' },
          { id: 'pan', label: 'Pan brioche', detail: 'Tostado' },
        ],
      },
    },
    { id: 'clasica', title: 'Clásica', fullTitle: 'Clásica', description: 'Lechuga y tomate', discount: '30% OFF', price: 750, image: '/images/burger-house/p-clasica.jpg' },
    { id: 'pollo', title: 'Pollo crispy', fullTitle: 'Pollo crispy', description: 'Pollo y lechuga', discount: '15% OFF', price: 450, image: '/images/burger-house/p-pollo.jpg' },
    { id: 'papas', title: 'Papas Fritas', fullTitle: 'Papas Fritas', description: 'Con ketchup', price: 1200, image: '/images/burger-house/p-papas.jpg' },
  ],
}
