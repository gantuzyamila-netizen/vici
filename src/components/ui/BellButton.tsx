import { motion } from 'framer-motion'

export function BellButton() {
  return (
    <motion.button type="button" aria-label="Notificaciones" whileTap={{ scale: 0.92 }} className="relative size-11 shrink-0">
      {/* El SVG incluye la sombra y el punto de notificación, por eso desborda el botón */}
      <img src="/icons/bell-button.svg" alt="" draggable={false} className="pointer-events-none absolute block max-w-none" style={{ inset: '-16px -20px -24px -20px', width: 84, height: 84 }} />
    </motion.button>
  )
}
