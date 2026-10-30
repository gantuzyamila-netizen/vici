import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../components/icons/Icon'
import { Badge } from '../../components/ui/Badge'
import { CircleButton } from '../../components/ui/CircleButton'
import { EmptyState } from '../../components/ui/EmptyState'
import { order as orderData } from '../../data/order'
import { useBack } from '../../hooks/useBack'
import { useOrder } from '../../state/OrderContext'

// card/D-courier de Figma: pedido en camino con el repartidor
function CourierCard({ onOpen }: { onOpen: () => void }) {
  const action = 'flex size-10 shrink-0 cursor-not-allowed items-center justify-center rounded-full bg-neutral-50 opacity-disabled'
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      role="link"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => event.key === 'Enter' && onOpen()}
      className="mx-auto flex w-[343px] max-w-[calc(100%-32px)] cursor-pointer flex-col gap-4 rounded-3xl bg-neutral-0 p-4 shadow-float"
    >
      <div className="flex items-center justify-between">
        <span className="whitespace-nowrap text-body-s text-neutral-500">Tu pedido llegará</span>
        <Badge tone="discount">{orderData.eta}</Badge>
      </div>

      <div className="flex items-center gap-3">
        <span className="relative size-11 shrink-0 overflow-hidden rounded-[22px]">
          <img src={orderData.courier.image} alt="" draggable={false} className="pointer-events-none absolute max-w-none" style={{ left: '-27.28%', top: '-25.23%', width: '152.85%', height: '152.85%' }} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5 whitespace-nowrap">
          <span className="text-title-s text-neutral-900">{orderData.courier.name}</span>
          <span className="text-body-s text-neutral-500">Tu repartidor</span>
        </div>
        <span className={action} aria-label="Llamar" aria-disabled>
          <Icon name="phone" size={20} />
        </span>
        <span className={action} aria-label="Chatear" aria-disabled>
          <Icon name="chat" size={20} />
        </span>
      </div>

      <div className="flex items-center gap-3 rounded-[20px] bg-[rgba(243,232,255,0.5)] p-3">
        <Icon name="bike-violet" size={24} />
        <p className="min-w-0 flex-1 text-[12px] leading-[15px] text-neutral-500">El repartidor ya salió del local y está viajando hacia tu ubicación.</p>
      </div>
    </motion.div>
  )
}

// 11 · Pedidos (Figma node 288:1973). Sin pedido todavía, muestra un estado vacío.
export function OrdersScreen() {
  const navigate = useNavigate()
  const goBack = useBack('/home')
  const { order } = useOrder()

  return (
    <main className="no-scrollbar flex h-full flex-col gap-[29px] overflow-y-auto bg-neutral-50 pb-[124px] pt-14 [&>*]:shrink-0">
      <header className="flex items-center gap-[14px] px-6">
        <CircleButton icon="back" label="Volver" onClick={goBack} />
        <h1 className="min-w-0 flex-1 text-title-m text-neutral-900">Pedidos</h1>
      </header>

      {order ? (
        <CourierCard onOpen={() => navigate('/seguimiento')} />
      ) : (
        <div className="flex flex-1 items-center justify-center pb-16">
          <EmptyState
            icon="bag"
            title="Todavía no tenés pedidos"
            text="Cuando hagas uno, lo vas a ver acá para seguirlo en tiempo real."
            action={{ label: 'Pedir ahora', onClick: () => navigate('/categorias') }}
          />
        </div>
      )}
    </main>
  )
}
