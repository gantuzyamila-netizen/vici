import { motion } from 'framer-motion'
import { Icon } from '../icons/Icon'

interface SearchBarProps {
  placeholder: string
  onActivate: () => void
}

// En la Home es un acceso: al tocarlo abre Categorías (que tiene su propio buscador).
export function SearchBar({ placeholder, onActivate }: SearchBarProps) {
  return (
    <motion.div
      role="button"
      tabIndex={0}
      whileTap={{ scale: 0.985 }}
      onClick={onActivate}
      onKeyDown={(event) => event.key === 'Enter' && onActivate()}
      className="mx-6 flex h-14 cursor-pointer items-center gap-3 rounded-[28px] bg-neutral-0 pl-5 pr-2 shadow-card"
    >
      <Icon name="search" size={20} />
      <span className="min-w-0 flex-1 text-body-m text-neutral-500">{placeholder}</span>
      <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-[20px] bg-brand-orange-500">
        <Icon name="sliders" size={18} />
      </span>
    </motion.div>
  )
}
