import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Rect {
  left: number
  top: number
  width: number
  height: number
}

// Íconos de iOS tal como están en el frame 301:690 de Figma (originales exportados, 64 px)
const apps = [
  ['facetime', 'calendar', 'photos', 'camera'],
  ['mail', 'clock', 'maps', 'weather'],
  ['reminders', 'notes', 'stocks'],
]
const dock = ['phone', 'safari', 'messages', 'music']

const icon = 'size-16 shrink-0 rounded-[14.5px]'

// Pantalla de inicio del iPhone (Figma node 301:690): el prototipo arranca acá y se entra tocando el logo de vici.
// Está armada en capas (fondo, grilla arriba, dock abajo) para ocupar toda la pantalla en cualquier teléfono, como el resto de la app.
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
    <main ref={main} className="relative h-full overflow-hidden bg-[#14111f] md:border-[3.86px] md:border-[#27272a] md:rounded-[32px]">
      <img src="/images/iphone/wallpaper.jpg" alt="" draggable={false} className="pointer-events-none absolute inset-0 size-full select-none object-cover" />

      {/* grilla de apps, anclada arriba: 4 columnas que se reparten el ancho */}
      <div className="absolute inset-x-0 top-0 flex flex-col gap-[37.5px] px-[19px] pt-[67px]">
        {apps.map((row, r) => (
          <div key={r} className="flex justify-between">
            {row.map((name) => (
              <img key={name} src={`/images/iphone/app-${name}.png`} alt="" draggable={false} className={icon} />
            ))}
            {r === 2 && (
              // el logo mide 68 (los íconos 64) y va pegado al borde derecho de la grilla, como en Figma
              <span className="relative size-[68px] shrink-0">
                <motion.button
                  type="button"
                  aria-label="Abrir vici"
                  whileTap={{ scale: 0.9 }}
                  onClick={open}
                  className="absolute inset-0 flex size-[68px] items-center justify-center rounded-[20px] bg-brand-violet-600 shadow-button"
                >
                  <img src="/images/brand/logo-v.png" alt="" width={42} height={41.911} draggable={false} className="block" />
                </motion.button>
              </span>
            )}
          </div>
        ))}
      </div>

      {/* puntitos de página y dock, anclados abajo */}
      <div className="absolute inset-x-[7px] bottom-[max(16px,env(safe-area-inset-bottom))] flex flex-col items-center gap-[17px] md:bottom-10">
        <div className="flex gap-[9px]">
          {[1, 0.4, 0.4].map((opacity, i) => (
            <span key={i} className="size-[7px] rounded-full bg-neutral-0" style={{ opacity }} />
          ))}
        </div>
        <div className="flex w-full justify-between rounded-[36px] bg-[rgba(255,255,255,0.22)] px-3 py-4 backdrop-blur-[12px]">
          {dock.map((name) => (
            <img key={name} src={`/images/iphone/app-${name}.png`} alt="" draggable={false} className={icon} />
          ))}
        </div>
      </div>

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
