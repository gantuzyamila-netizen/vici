import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'

interface ButtonProps {
  variant: 'primary' | 'secondary'
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

// button/primary y button/secondary de Figma: 56 de alto, radio 28, Label/L
export function Button({ variant, children, onClick, className }: ButtonProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        'flex h-14 w-full items-center justify-center rounded-[28px] px-6 text-label-l',
        variant === 'primary' ? 'bg-brand-violet-600 text-neutral-0 shadow-button' : 'border border-neutral-200 bg-neutral-0 text-neutral-900',
        className,
      )}
    >
      {children}
    </motion.button>
  )
}
