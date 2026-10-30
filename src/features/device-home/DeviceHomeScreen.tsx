import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FitStage } from '../../components/layout/FitStage'

interface Rect {
  left: number
  top: number
  width: number
  height: number
}

// Pantalla de inicio del iPhone (Figma node 301:690): el prototipo arranca acá y se entra tocando el logo de vici.
// El fondo es la captura exportada de Figma; el logo es un botón real encima, en la misma posición.
export function DeviceHomeScreen() {
  const navigate = useNavigate()
  const main = useRef<HTMLElement>(null)
  const [opening, setOpening] = useState<Rect | null>(null)

  const open = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (opening || !main.current) return
    const logo = event.currentTarget.getBoundingClientRect()
    const area = main.current.getBoundingClientRect()
    setOpening({ left: logo.left - area.left, top: logo.top - area.top, width: logo.width, height: logo.height })
    setTimeout(() => navigate('/splash'), 480)
  }

  return (
    <main ref={main} className="relative h-full overflow-hidden bg-[#14111f]">
      <FitStage designWidth={389} designHeight={844}>
        <div className="relative h-[844px] w-[389px]">
          <img src="/images/iphone/home-screen.png" alt="" draggable={false} className="pointer-events-none absolute inset-0 size-full select-none" />
          <motion.button
            type="button"
            aria-label="Abrir vici"
            whileTap={{ scale: 0.9 }}
            onClick={open}
            className="absolute left-[297px] top-[272px] flex size-[68px] items-center justify-center rounded-[20px] bg-brand-violet-600 shadow-button"
          >
            <img src="/images/brand/logo-v.png" alt="" width={42} height={41.911} draggable={false} className="block" />
          </motion.button>
        </div>
      </FitStage>

      {/* "abrir la app": el ícono crece hasta llenar la pantalla */}
      {opening && (
        <motion.div
          aria-hidden
          initial={{ ...opening, borderRadius: 20 }}
          animate={{ left: 0, top: 0, width: '100%', height: '100%', borderRadius: 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="absolute z-10 bg-brand-violet-600"
        />
      )}
    </main>
  )
}
