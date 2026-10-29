import type { StoreDetail } from '../../types'

export const pizzeriaFuego: StoreDetail = {
  id: 'pizzeria-fuego',
  name: 'Pizzería Fuego',
  tagline: 'Pizzas artesanales y más',
  rating: 5,
  deliveryTime: '30 - 45 min',
  shipping: 'Envío: Gratis',
  hero: '/images/pizzeria/hero.jpg',
  tabs: [
    { label: 'Promociones', enabled: true },
    { label: 'Especiales', enabled: false },
    { label: 'Bebidas', enabled: false },
  ],
  products: [
    {
      id: 'pepperoni',
      title: 'Pepperoni clásica',
      fullTitle: 'Pepperoni',
      description: 'Pepperoni y queso',
      discount: '30% OFF',
      price: 1000,
      image: '/images/pizzeria/p-pepperoni.jpg',
      heroImage: '/images/pizzeria/hero-custom.jpg',
      customization: {
        kind: 'toggles',
        brand: 'Pizza House',
        heading: 'Condimentos',
        hint: 'Desmarcá los que quieras quitar',
        unit: { one: 'pizza', many: 'pizzas' },
        defaultRemoved: ['aji'], // como llega en el frame de Figma
        options: [
          { id: 'oregano', label: 'Orégano', detail: 'Incluido' },
          { id: 'aji', label: 'Ají molido', detail: 'Toque picante' },
          { id: 'aceite', label: 'Aceite de oliva', detail: 'Incluido' },
        ],
      },
    },
    { id: 'margherita', title: 'Margherita', fullTitle: 'Margherita', description: 'Tomate y albahaca', discount: '30% OFF', price: 750, image: '/images/pizzeria/p-margherita.jpg' },
    { id: 'carnes', title: 'Carnes', fullTitle: 'Carnes', description: 'Pepperoni y salchicha', discount: '15% OFF', price: 450, image: '/images/pizzeria/p-carnes.jpg' },
    { id: 'nudos', title: 'Nudos de ajo', fullTitle: 'Nudos de ajo', description: 'Con queso y ajo', price: 1200, image: '/images/pizzeria/p-nudos.jpg' },
  ],
}
