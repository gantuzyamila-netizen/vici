import { motion, useAnimationControls } from 'framer-motion'
import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Icon } from '../../components/icons/Icon'
import { Button } from '../../components/ui/Button'
import { Stepper } from '../../components/ui/Stepper'
import { catalog } from '../../data/catalog'
import { defaultFlavors, flavors } from '../../data/flavors'
import { useBack } from '../../hooks/useBack'
import { cn } from '../../lib/cn'
import { price } from '../../lib/format'
import { useCart } from '../../state/CartContext'
import type { Product, StoreDetail } from '../../types'
import { HeroActions } from '../store/HeroActions'
import { FlavorChip } from './components/FlavorChip'
import { ToggleRow } from './components/ToggleRow'

const MAX_QTY = 9

// 08 · Personalizá tu pedido (Figma nodes 80:14004 helados, 94:445 pizza, 82:14910 hamburguesa)
export function ProductCustomizeScreen() {
  const { storeId = '', id } = useParams()
  const store = catalog[storeId]
  const product = store?.products.find((p) => p.id === id && p.customization)
  if (!store || !product) return <Navigate to={store ? `/tienda/${store.id}` : '/categorias'} replace />
  return <Customize store={store} product={product} />
}

interface CustomizeProps {
  store: StoreDetail
  product: Product
}

function Customize({ store, product }: CustomizeProps) {
  const customization = product.customization!
  const goBack = useBack(`/tienda/${store.id}`)
  const cart = useCart()
  const existing = cart.items.find((item) => item.productId === product.id)
  const [qty, setQty] = useState(existing?.qty ?? 1)

  const [flavorsChosen, setFlavorsChosen] = useState<string[]>(() => existing?.choices ?? (customization.kind === 'flavors' ? defaultFlavors.slice(0, customization.max) : []))
  // pizzas y hamburguesas: arrancan como el frame (con un ítem ya quitado)
  const [included, setIncluded] = useState<string[]>(() => {
    if (existing) return existing.choices
    if (customization.kind !== 'toggles') return []
    return customization.options.map((option) => option.id).filter((optionId) => !customization.defaultRemoved.includes(optionId))
  })
  const badge = useAnimationControls()

  const toggleFlavor = (flavor: string) => {
    if (customization.kind !== 'flavors') return
    if (flavorsChosen.includes(flavor)) return setFlavorsChosen(flavorsChosen.filter((f) => f !== flavor))
    if (flavorsChosen.length >= customization.max) return void badge.start({ x: [0, -5, 5, -3, 3, 0], transition: { duration: 0.35 } })
    setFlavorsChosen([...flavorsChosen, flavor])
  }
  const toggleOption = (optionId: string) => setIncluded((list) => (list.includes(optionId) ? list.filter((x) => x !== optionId) : [...list, optionId]))

  const removed = customization.kind === 'toggles' ? customization.options.filter((option) => !included.includes(option.id)) : []
  const removedText = removed.length ? `Sin ${removed.map((option) => option.label.toLowerCase()).join(' y ')}` : 'Con todo'
  const choices = customization.kind === 'flavors' ? flavorsChosen : included
  const detail = customization.kind === 'flavors' ? flavorsChosen.join(', ') : removed.length ? removedText : product.description

  const total = product.price * qty
  const add = () => {
    cart.setItem({ productId: product.id, storeId: store.id, storeName: store.name, title: product.title, image: product.image, qty, unitPrice: product.price, choices, detail })
    goBack()
  }

  const brand = customization.kind === 'toggles' ? customization.brand : store.name

  return (
    <main className="relative h-full bg-neutral-50">
      <HeroActions onBack={goBack} />
      <div className="no-scrollbar absolute inset-0 overflow-y-auto">
        <div className="relative pb-[140px] pt-[290px]">
          <img src={product.heroImage ?? product.image} alt="" draggable={false} className="pointer-events-none absolute left-0 top-0 h-[340px] w-full object-cover" />
          <div className="relative flex flex-col gap-5 rounded-[32px] bg-neutral-50 px-6 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex min-w-0 flex-col gap-0.5 whitespace-nowrap">
                <span className="text-label-m text-brand-violet-600">{brand}</span>
                <h1 className="text-title-l text-neutral-900">{product.fullTitle}</h1>
              </div>
              <Stepper value={qty} min={1} max={MAX_QTY} onChange={setQty} />
            </div>

            {customization.kind === 'flavors' ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-0.5 whitespace-nowrap">
                    <h2 className="text-title-m text-neutral-900">Elegí tus gustos</h2>
                    <p className="text-body-s text-neutral-500">Máximo {customization.max}</p>
                  </div>
                  <motion.span animate={badge} className="rounded-full bg-brand-violet-50 px-[10px] py-1 text-label-s text-brand-violet-600">
                    {flavorsChosen.length} de {customization.max}
                  </motion.span>
                </div>
                <div className="flex w-[342px] flex-wrap gap-[10px]">
                  {flavors.map((flavor) => (
                    <FlavorChip key={flavor} label={flavor} selected={flavorsChosen.includes(flavor)} onToggle={() => toggleFlavor(flavor)} />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-0.5 whitespace-nowrap">
                    <h2 className="text-title-m text-neutral-900">{customization.heading}</h2>
                    <p className="text-body-s text-neutral-500">{customization.hint}</p>
                  </div>
                  <span className="whitespace-nowrap rounded-full bg-brand-violet-50 px-[10px] py-1 text-label-s text-brand-violet-600">
                    {removed.length === 0 ? 'Todo incluido' : `${removed.length} quitado${removed.length > 1 ? 's' : ''}`}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {customization.options.map((option) => (
                    <ToggleRow key={option.id} option={option} included={included.includes(option.id)} onToggle={() => toggleOption(option.id)} />
                  ))}
                </div>
                {customization.unit && (
                  <p className="text-body-s text-neutral-500">
                    {qty} {qty > 1 ? customization.unit.many : customization.unit.one} · {removedText} · Precio sin cambios
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-30 flex h-[calc(88px+env(safe-area-inset-bottom))] flex-col rounded-t-[28px] bg-neutral-0 px-6 pt-4 md:h-28" style={{ filter: 'drop-shadow(0 4px 10px rgba(80,52,166,0.08))' }}>
        <Button variant="primary" onClick={add} className={cn('gap-2', customization.kind === 'flavors' && flavorsChosen.length === 0 && 'pointer-events-none opacity-50')}>
          <Icon name="cart" size={20} />
          Agregar al carrito · {price(total)}
        </Button>
      </div>
    </main>
  )
}
