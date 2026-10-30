import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { MaskIcon, type IconName } from '../icons/Icon'
import { Button } from './Button'

interface EmptyStateProps {
  icon: IconName
  title: string
  text: string
  action?: { label: string; onClick: () => void }
  children?: ReactNode
}

// Estado vacío (sin resultados, sin pedidos): círculo violeta con ícono, título Title/M, texto Body/M y una acción opcional.
export function EmptyState({ icon, title, text, action, children }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex w-full flex-col items-center gap-5 px-10 text-center"
    >
      <motion.span
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
        className="flex size-24 items-center justify-center rounded-full bg-brand-violet-50 text-brand-violet-600"
      >
        <MaskIcon name={icon} size={40} />
      </motion.span>
      <div className="flex flex-col gap-2">
        <h2 className="text-title-m text-neutral-900">{title}</h2>
        <p className="text-body-m text-neutral-500">{text}</p>
      </div>
      {children}
      {action && (
        <Button variant="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </motion.div>
  )
}
