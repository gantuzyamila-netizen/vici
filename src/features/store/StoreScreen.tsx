import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../components/icons/Icon'
import { Badge } from '../../components/ui/Badge'
import { Chip } from '../../components/ui/Chip'
import { rapanui as store } from '../../data/rapanui'
import { useBack } from '../../hooks/useBack'
import { useCart } from '../../state/CartContext'
import { CartBar } from './components/CartBar'
import { ProductRow } from './components/ProductRow'
import { HeroActions } from './HeroActions'

// 07 · Tienda (Figma node 80:14082)
export function StoreScreen() {
  const navigate = useNavigate()
  const goBack = useBack('/categorias')
  const cart = useCart()
  const [tab, setTab] = useState(store.tabs[0])

  const products = tab === 'Promociones' ? store.products : store.products.filter((product) => product.title === tab)

  // Franui no tiene gustos para elegir: se suma directo al carrito
  const select = (id: string) => {
    const product = store.products.find((p) => p.id === id)!
    if (product.maxFlavors) return navigate(`/tienda/rapanui/producto/${id}`)
    cart.setItem({ productId: id, storeName: store.name, title: product.title, image: product.image, qty: 1, unitPrice: product.price, flavors: [] })
  }

  return (
    <main className="relative h-full bg-neutral-50">
      <HeroActions onBack={goBack} />
      <div className="no-scrollbar absolute inset-0 overflow-y-auto">
        <div className="relative pb-[124px] pt-[248px]">
          <img src={store.hero} alt="" draggable={false} className="pointer-events-none absolute left-0 top-0 h-[300px] w-full object-cover" />
          <div className="relative flex flex-col gap-4 rounded-[32px] bg-neutral-50 px-6 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5 whitespace-nowrap">
                <h1 className="text-title-l text-neutral-900">{store.name}</h1>
                <p className="text-body-m text-neutral-500">{store.tagline}</p>
              </div>
              <div className="flex items-center gap-[6px] rounded-full bg-brand-orange-50 py-2 pl-[10px] pr-3">
                <Icon name="star" size={16} />
                <span className="text-label-m text-brand-orange-700">{store.rating}</span>
              </div>
            </div>

            <div className="flex items-center gap-[10px]">
              <div className="flex items-center gap-[6px] rounded-full bg-neutral-0 py-[6px] pl-[10px] pr-3">
                <Icon name="bike" size={16} />
                <span className="whitespace-nowrap text-label-s text-neutral-900">{store.deliveryTime}</span>
              </div>
              <Badge tone="shipping">{store.shipping}</Badge>
            </div>

            <div className="no-scrollbar -mx-6 -my-6 flex gap-[10px] overflow-x-auto px-6 py-6">
              {store.tabs.map((name) => (
                <Chip key={name} label={name} active={tab === name} onClick={() => setTab(name)} />
              ))}
            </div>

            <h2 className="whitespace-nowrap text-title-m text-neutral-900">{tab}</h2>
            <div className="flex flex-col gap-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {products.map((product) => (
                  <ProductRow key={product.id} product={product} onSelect={() => select(product.id)} />
                ))}
              </AnimatePresence>
              {products.length === 0 && <p className="py-6 text-center text-body-m text-neutral-500">Esta sección no está en el prototipo.</p>}
            </div>
          </div>
        </div>
      </div>
      <CartBar visible={cart.count > 0} total={cart.total} onOpen={() => navigate('/carrito')} />
    </main>
  )
}
