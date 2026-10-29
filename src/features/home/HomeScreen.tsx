import { motion } from 'framer-motion'
import { user } from '../../data/user'
import { screenTransition, screenVariants } from '../../lib/motion'

// Placeholder: la implementación visual se hace a partir de Figma (04 · Home, node 5:4754).
export function HomeScreen() {
  return (
    <motion.main
      className="h-full p-6"
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={screenTransition}
    >
      <h1 className="text-display-xl">¡Hola, {user.name}!</h1>
      <p className="text-body-m text-neutral-500">¿Qué querés comer hoy?</p>
    </motion.main>
  )
}
