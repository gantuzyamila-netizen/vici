import { motion } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import { cn } from '../../lib/cn'

interface ChipProps {
  label: string
  active: boolean
  onClick: () => void
  disabled?: boolean
}

export function Chip({ label, active, onClick, disabled = false }: ChipProps) {
  const textRef = useRef<HTMLSpanElement>(null)
  const [width, setWidth] = useState<number>()

  // Figma redondea hacia arriba el ancho del texto (p. ej. 38,4 → 39); sin esto los chips se desfasan hasta 2 px.
  useLayoutEffect(() => {
    let alive = true
    const measure = () => alive && textRef.current && setWidth(Math.ceil(textRef.current.getBoundingClientRect().width))
    measure()
    document.fonts?.ready.then(measure)
    return () => {
      alive = false
    }
  }, [label])

  return (
    <motion.button
      type="button"
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'relative h-10 shrink-0 rounded-[20px] px-[18px] text-label-m transition-colors duration-200',
        disabled && 'cursor-not-allowed opacity-disabled',
        // en Figma el chip activo no tiene borde (75 de ancho = texto + padding) y los inactivos sí
        active ? 'text-neutral-0' : 'border border-neutral-200 bg-neutral-0 text-neutral-900',
      )}
    >
      {active && (
        <motion.span
          layoutId="chip-active"
          className="absolute inset-0 rounded-[20px] bg-brand-violet-600 shadow-button"
          transition={{ type: 'spring', stiffness: 500, damping: 36 }}
        />
      )}
      <span className="relative block text-center" style={{ width }}>
        <span ref={textRef} className="inline-block whitespace-nowrap">
          {label}
        </span>
      </span>
    </motion.button>
  )
}
