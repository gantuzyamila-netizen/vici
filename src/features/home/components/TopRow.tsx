import { motion } from 'framer-motion'
import { Icon } from '../../../components/icons/Icon'
import { BellButton } from '../../../components/ui/BellButton'

export function TopRow({ address }: { address: string }) {
  return (
    <div className="flex items-center justify-between px-6">
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2 rounded-[22px] bg-neutral-0 py-[10px] pl-3 pr-[14px] shadow-card"
      >
        <Icon name="pin" size={18} />
        <span className="max-w-[149px] truncate text-label-m text-neutral-900">{address}</span>
        <Icon name="down" size={16} />
      </motion.button>
      <BellButton />
    </div>
  )
}
