import type { Transition, Variants } from 'framer-motion'

export const screenTransition: Transition = { duration: 0.25, ease: 'easeOut' }

export const screenVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

// Mismo valor que `opacity-disabled` en tailwind.config.ts; se usa donde Framer Motion anima la opacidad y pisaría la clase.
export const DISABLED_OPACITY = 0.4
