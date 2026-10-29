import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '../icons/Icon'

interface StepperProps {
  value: number
  min: number
  max: number
  onChange: (value: number) => void
}

function StepButton({ icon, label, disabled, onClick }: { icon: 'minus' | 'plus'; label: string; disabled: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      disabled={disabled}
      whileTap={{ scale: 0.85 }}
      onClick={onClick}
      className="flex size-8 items-center justify-center rounded-2xl bg-[rgba(255,255,255,0.22)] transition-opacity disabled:opacity-50"
    >
      <Icon name={icon} size={16} />
    </motion.button>
  )
}

export function Stepper({ value, min, max, onChange }: StepperProps) {
  return (
    <div className="flex h-12 items-center gap-3 rounded-[24px] bg-brand-orange-500 px-2 shadow-orange">
      <StepButton icon="minus" label="Quitar uno" disabled={value <= min} onClick={() => onChange(value - 1)} />
      <span className="relative flex h-5 items-center justify-center overflow-hidden text-label-l text-neutral-0">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={value} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.15 }}>
            {value}
          </motion.span>
        </AnimatePresence>
      </span>
      <StepButton icon="plus" label="Agregar uno" disabled={value >= max} onClick={() => onChange(value + 1)} />
    </div>
  )
}
