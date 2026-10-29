import { motion } from 'framer-motion'
import { useRef } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Icon } from '../../components/icons/Icon'
import { Button } from '../../components/ui/Button'
import { CircleButton } from '../../components/ui/CircleButton'
import { order } from '../../data/order'
import { useBack } from '../../hooks/useBack'
import { price } from '../../lib/format'
import { useCart } from '../../state/CartContext'

const card = 'rounded-[28px] bg-neutral-0 shadow-card'

function EditButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <motion.button type="button" aria-label={label} whileTap={{ scale: 0.85 }} onClick={onClick} className="shrink-0">
      <Icon name="edit" size={20} />
    </motion.button>
  )
}

// 09 · Mi carrito / Detalle de compra (Figma node 80:13928)
export function CartScreen() {
  const navigate = useNavigate()
  const goBack = useBack('/tienda/rapanui')
  const live = useCart()
  // Al pagar el carrito se vacía mientras esta pantalla todavía se está yendo: se conserva lo último que mostraba
  // para que no se redirija sola ni parpadee en $0.
  const shown = useRef(live)
  if (live.items.length > 0) shown.current = live
  const cart = shown.current
  const item = cart.items[0]
  if (!item) return <Navigate to="/tienda/rapanui" replace />

  const pay = () => navigate('/pedido-confirmado')

  return (
    <main className="relative h-full bg-neutral-50">
      <div className="no-scrollbar absolute inset-0 flex flex-col gap-4 overflow-y-auto pb-[140px] pt-14 [&>*]:shrink-0">
        <header className="flex items-center gap-[14px] px-6">
          <CircleButton icon="back" label="Volver" onClick={goBack} />
          <h1 className="min-w-0 flex-1 text-title-m text-neutral-900">Detalle de compra</h1>
        </header>

        <div className="px-6">
          <div className={`${card} flex flex-col gap-[14px] p-4`}>
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-[22px] bg-brand-violet-50">
                <Icon name="pin-violet" size={22} />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="whitespace-nowrap text-label-s text-neutral-500">Entregar en</span>
                <span className="text-label-m text-neutral-900">{order.address}</span>
              </div>
              <EditButton label="Editar dirección" onClick={() => undefined} />
            </div>
            <div className="h-px w-full bg-neutral-200" />
            <span className="whitespace-nowrap text-label-m text-neutral-900">Notas</span>
            <p className="w-full rounded-2xl bg-neutral-50 p-[14px] text-body-m text-neutral-900">{order.notes}</p>
          </div>
        </div>

        <div className="px-6">
          <div className={`${card} flex h-[100px] items-center gap-[14px] p-4`}>
            <img src={item.image} alt="" draggable={false} className="pointer-events-none size-[72px] shrink-0 rounded-[18px] object-cover" />
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <p className="w-full text-title-s text-neutral-900">
                {item.storeName} - {item.title}
                {item.qty > 1 && ` ×${item.qty}`}
              </p>
              <p className="w-full text-body-s text-neutral-500">{item.flavors.join(', ')}</p>
            </div>
            <EditButton label="Editar pedido" onClick={() => navigate(`/tienda/rapanui/producto/${item.productId}`)} />
          </div>
        </div>

        <div className="px-6">
          <div className="flex items-center gap-3 rounded-[28px] bg-brand-orange-50 p-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-[22px] bg-brand-orange-100">
              <Icon name="bike-orange" size={22} />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5 whitespace-nowrap">
              <span className="text-label-m text-neutral-900">Tu pedido llegará</span>
              <span className="text-body-s text-neutral-500">Horario estimado</span>
            </div>
            <span className="whitespace-nowrap text-label-m text-brand-orange-700">{order.eta}</span>
          </div>
        </div>

        <div className="px-6">
          <div className={`${card} flex flex-col gap-3 p-4`}>
            <div className="flex items-center justify-between whitespace-nowrap">
              <span className="text-body-m text-neutral-500">Productos</span>
              <span className="text-label-m text-neutral-900">{price(cart.subtotal)}</span>
            </div>
            <div className="flex items-center justify-between whitespace-nowrap">
              <span className="text-body-m text-neutral-500">Envío</span>
              <span className="text-label-m text-state-success">{cart.shipping === 0 ? 'Gratis' : price(cart.shipping)}</span>
            </div>
            <div className="h-px w-full bg-neutral-200" />
            <div className="flex items-center justify-between whitespace-nowrap">
              <span className="text-body-m text-neutral-500">Total</span>
              <span className="text-title-m text-neutral-900">{price(cart.total)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 top-[732px] z-30 flex h-28 flex-col rounded-t-[28px] bg-neutral-0 px-6 pt-4" style={{ filter: 'drop-shadow(0 4px 10px rgba(80,52,166,0.08))' }}>
        <Button variant="primary" onClick={pay}>
          Pagar {price(cart.total)}
        </Button>
      </div>
    </main>
  )
}
