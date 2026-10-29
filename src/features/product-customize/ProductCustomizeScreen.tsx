import { motion, useAnimationControls } from 'framer-motion'
import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Icon } from '../../components/icons/Icon'
import { Button } from '../../components/ui/Button'
import { Stepper } from '../../components/ui/Stepper'
import { defaultFlavors, flavors } from '../../data/flavors'
import { rapanui as store } from '../../data/rapanui'
import { useBack } from '../../hooks/useBack'
import { cn } from '../../lib/cn'
import { price } from '../../lib/format'
import { useCart } from '../../state/CartContext'
import { HeroActions } from '../store/HeroActions'
import { FlavorChip } from './components/FlavorChip'

const MAX_QTY = 9

// 08 · Personalizá tu pedido (Figma node 80:14004)
export function ProductCustomizeScreen() {
  const { id } = useParams()
  const product = store.products.find((p) => p.id === id && p.maxFlavors)
  if (!product) return <Navigate to="/tienda/rapanui" replace />
  return <Customize productId={product.id} />
}

function Customize({ productId }: { productId: string }) {
  const product = store.products.find((p) => p.id === productId)!
  const max = product.maxFlavors!
  const goBack = useBack('/tienda/rapanui')
  const cart = useCart()
  const existing = cart.items.find((item) => item.productId === productId)
  const [qty, setQty] = useState(existing?.qty ?? 1)
  const [selected, setSelected] = useState<string[]>(existing?.flavors ?? defaultFlavors.slice(0, max))
  const badge = useAnimationControls()

  const toggle = (flavor: string) => {
    if (selected.includes(flavor)) return setSelected(selected.filter((f) => f !== flavor))
    if (selected.length >= max) return void badge.start({ x: [0, -5, 5, -3, 3, 0], transition: { duration: 0.35 } })
    setSelected([...selected, flavor])
  }

  const total = product.price * qty
  const add = () => {
    cart.setItem({ productId, storeName: store.name, title: product.title, image: product.image, qty, unitPrice: product.price, flavors: selected })
    goBack()
  }

  return (
    <main className="relative h-full bg-neutral-50">
      <HeroActions onBack={goBack} />
      <div className="no-scrollbar absolute inset-0 overflow-y-auto">
        <div className="relative pb-[140px] pt-[290px]">
          <img src={product.image} alt="" draggable={false} className="pointer-events-none absolute left-0 top-0 h-[340px] w-full object-cover" />
          <div className="relative flex flex-col gap-5 rounded-[32px] bg-neutral-50 px-6 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5 whitespace-nowrap">
                <span className="text-label-m text-brand-violet-600">{store.name}</span>
                <h1 className="text-title-l text-neutral-900">{product.fullTitle}</h1>
              </div>
              <Stepper value={qty} min={1} max={MAX_QTY} onChange={setQty} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5 whitespace-nowrap">
                <h2 className="text-title-m text-neutral-900">Elegí tus gustos</h2>
                <p className="text-body-s text-neutral-500">Máximo {max}</p>
              </div>
              <motion.span animate={badge} className="rounded-full bg-brand-violet-50 px-[10px] py-1 text-label-s text-brand-violet-600">
                {selected.length} de {max}
              </motion.span>
            </div>

            <div className="flex w-[342px] flex-wrap gap-[10px]">
              {flavors.map((flavor) => (
                <FlavorChip key={flavor} label={flavor} selected={selected.includes(flavor)} onToggle={() => toggle(flavor)} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 top-[732px] z-30 flex h-28 flex-col rounded-t-[28px] bg-neutral-0 px-6 pt-4" style={{ filter: 'drop-shadow(0 4px 10px rgba(80,52,166,0.08))' }}>
        <Button variant="primary" onClick={add} className={cn('gap-2', selected.length === 0 && 'pointer-events-none opacity-50')}>
          <Icon name="cart" size={20} />
          Agregar al carrito · {price(total)}
        </Button>
      </div>
    </main>
  )
}
