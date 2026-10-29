import { motion } from 'framer-motion'
import { Icon } from '../icons/Icon'

// Botón Google / Apple de Login y Registro
export function SocialButton({ label, icon, iconClass, onClick }: { label: string; icon: 'google' | 'apple'; iconClass: string; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="flex h-[52px] min-w-0 flex-1 items-center justify-center gap-[10px] rounded-[26px] border border-neutral-200 bg-neutral-0"
    >
      <span className="relative size-[26px] shrink-0 rounded-[13px] bg-brand-orange-100">
        <span className={`absolute ${iconClass}`}>
          <Icon name={icon} size={icon === 'google' ? 16 : 12} className={icon === 'apple' ? 'h-4 w-3' : ''} />
        </span>
      </span>
      <span className="text-label-m text-neutral-900">{label}</span>
    </motion.button>
  )
}
