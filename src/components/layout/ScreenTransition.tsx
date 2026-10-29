import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

// dir = 1 al avanzar, -1 al volver
const variants: Variants = {
  initial: (dir: number) => ({ x: dir * 36, opacity: 0 }),
  animate: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -36, opacity: 0 }),
}

export function ScreenTransition({ dir, children }: { dir: number; children: ReactNode }) {
  return (
    <motion.div
      custom={dir}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  )
}
