import type { Transition, Variants } from 'framer-motion'

export const screenTransition: Transition = { duration: 0.25, ease: 'easeOut' }

export const screenVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}
