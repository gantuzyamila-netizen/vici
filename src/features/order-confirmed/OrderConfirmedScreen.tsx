import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../state/CartContext'

const CONFIRMED_MS = 3200

// 09 · congrats (Figma node 80:14493): después de un momento sigue al seguimiento del pedido
export function OrderConfirmedScreen() {
  const navigate = useNavigate()
  const { clear } = useCart()

  useEffect(() => {
    // el pedido ya está pagado: el carrito se vacía
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
      <img src="/images/congrats/deco-right.svg" alt="" draggable={false} className="absolute left-[196px] top-[615px] size-[340px]" />
      <img src="/images/congrats/deco-left.svg" alt="" draggable={false} className="absolute left-[-67px] top-[641px] size-[190px]" />

      <div className="absolute left-0 top-[calc(50%-60.5px)] flex h-[487px] w-[390px] -translate-y-1/2 flex-col items-center px-6 pb-6 pt-9">
        <motion.img
          src="/images/congrats/bag.png"
          alt=""
          draggable={false}
          initial={{ scale: 0.4, y: 40, rotate: -8, opacity: 0 }}
          animate={{ scale: 1, y: 0, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 210, damping: 13, delay: 0.15 }}
          className="pointer-events-none size-[365px] shrink-0 object-cover"
        />
        <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.45, duration: 0.4 }} className="flex w-full flex-col items-center gap-3 text-center">
          <h1 className="w-full text-display-xl text-neutral-900">¡Pedido confirmado!</h1>
          <p className="w-full text-body-m text-neutral-500">
            El local ya está preparando tu pedido.
            <br />
            ¡En breve tendrás novedades!
          </p>
        </motion.div>
      </div>
    </main>
  )
}
