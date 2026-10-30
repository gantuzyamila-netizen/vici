import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../state/CartContext'
import { useOrder } from '../../state/OrderContext'
import { ConfettiBag } from './Confetti'

const CONFIRMED_MS = 3200

// 09 · congrats (Figma node 80:14493): después de un momento sigue al seguimiento del pedido
export function OrderConfirmedScreen() {
  const navigate = useNavigate()
  const { items, total, clear } = useCart()
  const { place } = useOrder()

  useEffect(() => {
    // el pedido ya está pagado: pasa a la pestaña Pedidos y el carrito se vacía
    if (items.length > 0) place({ storeName: items[0].storeName, items, total })
    clear()
    const timer = setTimeout(() => navigate('/seguimiento', { replace: true }), CONFIRMED_MS)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="relative h-full overflow-hidden bg-neutral-50">
      {/* el posicionado va en un contenedor aparte: la animación de scale pisaría el translate que lo centra */}
      <div className="absolute top-[-93px] size-[493px]" style={{ left: 'calc(50% - 246px)' }}>
        <motion.img
          src="/images/congrats/deco-top.svg"
          alt=""
          draggable={false}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="size-full"
        />
      </div>
      <motion.img
        src="/images/congrats/deco-mint.svg"
        alt=""
        draggable={false}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
        className="absolute -left-[34px] -top-[164px] h-[508px] w-[457px]"
      />

      <div className="absolute inset-x-0 top-[calc(50%-60.5px)] flex -translate-y-1/2 justify-center">
        <div className="flex h-[487px] w-[390px] flex-col items-center px-6 pb-6 pt-9">
          <ConfettiBag />
          <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.45, duration: 0.4 }} className="flex w-full flex-col items-center gap-3 text-center">
            <h1 className="w-full text-display-xl text-neutral-900">¡Pedido confirmado!</h1>
            <p className="w-full text-body-m text-neutral-500">
              El local ya está preparando tu pedido.
              <br />
              ¡En breve tendrás novedades!
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
