import { motion } from 'framer-motion'
import { Icon } from '../../../components/icons/Icon'
import { cn } from '../../../lib/cn'

interface FlavorChipProps {
  label: string
  selected: boolean
  onToggle: () => void
}

export function FlavorChip({ label, selected, onToggle }: FlavorChipProps) {
  return (
    <motion.button
      type="button"
      layout
      whileTap={{ scale: 0.94 }}
      onClick={onToggle}
      className={cn(
        'flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-[22px] text-label-m transition-colors duration-200',
        selected ? 'bg-brand-violet-600 pl-4 pr-3 text-neutral-0' : 'border border-neutral-200 bg-neutral-0 px-4 text-neutral-900',
      )}
    >
      {label}
      {selected && (
        <motion.span initial={{ scale: 0, width: 0 }} animate={{ scale: 1, width: 16 }} transition={{ type: 'spring', stiffness: 500, damping: 28 }} className="flex size-4 items-center">
          <Icon name="check" size={16} />
        </motion.span>
      )}
    </motion.button>
  )
}
