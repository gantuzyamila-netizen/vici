import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '../../../components/icons/Icon'
import { cn } from '../../../lib/cn'
import type { ToggleOption } from '../../../types'

interface ToggleRowProps {
  option: ToggleOption
  included: boolean
  onToggle: () => void
}

// ingredient-row / condimento de Figma: checkbox violeta cuando está incluido, vacío + "Quitado" cuando se quitó
export function ToggleRow({ option, included, onToggle }: ToggleRowProps) {
  return (
    <motion.button
      type="button"
      role="checkbox"
      aria-checked={included}
      whileTap={{ scale: 0.98 }}
      onClick={onToggle}
      className="flex w-full items-center gap-3 rounded-[20px] bg-neutral-0 p-3 text-left shadow-card"
    >
      <span
        className={cn(
          'flex size-6 shrink-0 items-center justify-center rounded-lg border-2 transition-colors duration-200',
          included ? 'border-brand-violet-600 bg-brand-violet-600' : 'border-neutral-200 bg-neutral-0',
        )}
      >
        <motion.span initial={false} animate={{ scale: included ? 1 : 0, opacity: included ? 1 : 0 }} transition={{ type: 'spring', stiffness: 500, damping: 28 }} className="flex">
          <Icon name="check-14" size={14} />
        </motion.span>
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="w-full text-label-m text-neutral-900">{option.label}</span>
        <span className="w-full text-body-s text-neutral-500">{option.detail}</span>
      </span>
      <AnimatePresence initial={false}>
        {!included && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="inline-flex shrink-0 items-center rounded-full bg-brand-orange-50 px-[10px] py-1 text-label-s text-brand-orange-700"
          >
            Quitado
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
