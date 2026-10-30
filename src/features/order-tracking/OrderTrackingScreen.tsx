import { motion } from 'framer-motion'
import { FitStage } from '../../components/layout/FitStage'
import { Icon } from '../../components/icons/Icon'
import { Badge } from '../../components/ui/Badge'
import { BellButton } from '../../components/ui/BellButton'
import { CircleButton } from '../../components/ui/CircleButton'
import { order } from '../../data/order'
import { useBack } from '../../hooks/useBack'

// Recorrido del repartidor: de su posición en el frame a la del destino (centros de los marcadores, en px del frame de 390×844)
const RIDER = { x: 152, y: 424 }
const PIN = { x: 258, y: 208 }
const SHEET_RESERVE = 300 // alto que la hoja inferior le saca al mapa en pantallas bajas (sin la card del comercio)
const AMBIENT_DELAY = 3 // el frame de Figma es una foto fija: los movimientos suaves arrancan después

const labels = [
  { text: 'Preparando', done: true },
  { text: 'En camino', done: true },
  { text: 'Entregado', done: false },
]

// 10 · Seguí tu pedido (Figma node 80:13828)
export function OrderTrackingScreen() {
  const goBack = useBack('/home')
  const { tracking } = order

  return (
    <main className="relative h-full overflow-hidden bg-neutral-50">
      <img src="/images/tracking/map.png" alt="" draggable={false} className="pointer-events-none absolute left-0 top-[-155px] h-[999px] w-[390px] object-cover" />

      <header className="absolute left-0 top-14 z-10 flex w-full items-center justify-between px-6">
        <CircleButton icon="back" label="Volver" onClick={goBack} />
        <span className="flex h-11 items-center rounded-[22px] bg-neutral-0 px-5 text-label-l text-neutral-900 shadow-card">Seguí tu pedido</span>
        <BellButton />
      </header>

      {/* ruta y marcadores: medidas absolutas del frame; en pantallas bajas se achican para no quedar tapados por la hoja de abajo */}
      <FitStage designHeight={470} reserveBottom={SHEET_RESERVE}>
        <div className="relative h-full w-full">
          <img src="/images/tracking/route.svg" alt="" draggable={false} className="pointer-events-none absolute left-[140px] top-[196px] h-[240px] w-[130px]" />

          <motion.img
            src="/images/tracking/pulse-pin.svg"
            alt=""
            draggable={false}
            animate={{ scale: [1, 1.18, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: AMBIENT_DELAY }}
            className="pointer-events-none absolute left-[214px] top-[164px] size-[88px]"
          />
          <span className="absolute left-[236px] top-[186px] flex size-11 items-center justify-center rounded-[22px] border-[3px] border-neutral-0 bg-brand-violet-600">
            <Icon name="tracking/pin-white" size={22} />
          </span>

          {/* repartidor: avanza lento hacia el destino */}
          <motion.div
            initial={{ x: 0, y: 0 }}
            animate={{ x: (PIN.x - RIDER.x) * 0.22, y: (PIN.y - RIDER.y) * 0.22 }}
            transition={{ duration: 60, ease: 'linear', delay: AMBIENT_DELAY }}
            className="absolute left-0 top-0"
          >
            <motion.img
              src="/images/tracking/pulse-rider.svg"
              alt=""
              draggable={false}
              animate={{ scale: [1, 1.18, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: AMBIENT_DELAY }}
              className="pointer-events-none absolute left-[108px] top-[380px] size-[88px]"
            />
            <span className="absolute left-[130px] top-[402px] flex size-11 items-center justify-center rounded-[22px] border-[3px] border-neutral-0 bg-brand-orange-500">
              <Icon name="tracking/bike-white" size={22} />
            </span>
          </motion.div>
        </div>
      </FitStage>

      <motion.section
        initial={{ y: 120 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 30, delay: 0.1 }}
        className="absolute inset-x-0 bottom-0 flex w-full flex-col gap-4 rounded-[32px] bg-neutral-0 px-6 pb-[110px] pt-3"
        style={{ filter: 'drop-shadow(0 12px 16px rgba(80,52,166,0.2))' }}
      >
        <div className="flex w-full justify-center">
          <span className="h-1 w-10 rounded-sm bg-neutral-200" />
        </div>

        <div className="flex items-center justify-between">
          <span className="whitespace-nowrap text-label-m text-neutral-500">Tu pedido llegará</span>
          <Badge tone="discount">{order.eta}</Badge>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-[24px] bg-brand-orange-100">
            <Icon name="tracking/bike-status" size={24} />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <h1 className="whitespace-nowrap text-title-m text-neutral-900">En camino</h1>
            <p className="w-full text-body-s text-neutral-500">El repartidor ya salió del local y está viajando hacia tu ubicación.</p>
          </div>
        </div>

        <div className="flex w-full gap-[6px]">
          {labels.map((step, i) => (
            <span key={step.text} className="relative h-[6px] min-w-0 flex-1 overflow-hidden rounded-[3px] bg-neutral-200">
              {step.done && (
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.35, ease: 'easeOut' }}
                  className="absolute inset-0 origin-left rounded-[3px] bg-brand-violet-600"
                />
              )}
            </span>
          ))}
        </div>
        <div className="flex w-full items-start justify-between whitespace-nowrap text-label-s">
          {labels.map((step) => (
            <span key={step.text} className={step.done ? 'text-brand-violet-600' : 'text-neutral-500'}>
              {step.text}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 rounded-[24px] bg-neutral-50 py-[10px] pl-[10px] pr-[14px] [@media(max-height:843px)]:hidden">
          <img src={tracking.image} alt="" draggable={false} className="pointer-events-none size-[52px] shrink-0 rounded-2xl object-cover" />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5 whitespace-nowrap">
            <span className="text-title-s text-neutral-900">{tracking.storeName}</span>
            <span className="text-body-s text-neutral-500">{tracking.storeDescription}</span>
          </div>
          <Badge tone="discount">{tracking.badge}</Badge>
        </div>
      </motion.section>
    </main>
  )
}
