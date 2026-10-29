import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '../../../components/icons/Icon'
import { price } from '../../../lib/format'

interface CartBarProps {
  visible: boolean
  total: number
  onOpen: () => void
}

export function CartBar({ visible, total, onOpen }: CartBarProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpen}
          className="absolute inset-x-6 bottom-6 z-30 flex h-16 items-center gap-3 rounded-[32px] bg-brand-violet-600 pl-[10px] pr-6 text-left shadow-button"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-[22px] bg-brand-orange-500">
            <Icon name="cart" size={20} />
          </span>
          <span className="min-w-0 flex-1 text-label-l text-neutral-0">Ver mi carrito</span>
          <motion.span key={total} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="whitespace-nowrap text-label-l text-neutral-0">
            {price(total)}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
