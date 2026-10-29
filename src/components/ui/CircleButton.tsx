import { motion } from 'framer-motion'
import { Icon, type IconName } from '../icons/Icon'

interface CircleButtonProps {
  icon: IconName
  label: string
  onClick?: () => void
}

// icon-button de Figma: 44×44, radio 22, sombra Card, ícono de 22
export function CircleButton({ icon, label, onClick }: CircleButtonProps) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className="flex size-11 shrink-0 items-center justify-center rounded-[22px] bg-neutral-0 shadow-card"
    >
      <Icon name={icon} size={22} />
    </motion.button>
  )
}
