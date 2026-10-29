import { motion } from 'framer-motion'
import { useState } from 'react'
import { MaskIcon } from '../../components/icons/Icon'
import { CircleButton } from '../../components/ui/CircleButton'
import { cn } from '../../lib/cn'

// Botones sobre la foto (volver / favorito) más el degradé oscuro que cuida la barra de estado
export function HeroActions({ onBack }: { onBack: () => void }) {
  const [liked, setLiked] = useState(false)
  return (
    <>
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-[150px] w-full bg-gradient-to-b from-[rgba(29,26,43,0.55)] to-[rgba(29,26,43,0)]" />
      <div className="absolute left-0 top-14 z-20 flex w-full items-start justify-between px-6">
        <CircleButton icon="back" label="Volver" onClick={onBack} />
        <motion.button
          type="button"
          aria-label="Favorito"
          whileTap={{ scale: 0.85 }}
          onClick={() => setLiked((v) => !v)}
          className="flex size-11 items-center justify-center rounded-[22px] bg-neutral-0 shadow-card"
        >
          <motion.span animate={{ scale: liked ? [1, 1.35, 1] : 1 }} transition={{ duration: 0.3 }} className={cn('transition-colors', liked ? 'text-brand-orange-500' : 'text-neutral-900')}>
            <MaskIcon name="heart" size={22} />
          </motion.span>
        </motion.button>
      </div>
    </>
  )
}
