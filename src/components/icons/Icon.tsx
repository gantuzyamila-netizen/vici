import type { CSSProperties } from 'react'
import { cn } from '../../lib/cn'

export type IconName =
  | 'pin' | 'down' | 'search' | 'sliders' | 'bike'
  | 'home' | 'bag' | 'clipboard' | 'info' | 'user'
  | 'mail' | 'lock' | 'eye' | 'google' | 'apple'
  | 'back' | 'heart' | 'star' | 'cart' | 'minus' | 'plus' | 'check' | 'check-14' | 'edit' | 'pin-violet' | 'bike-orange'
  | 'heart-outline' | 'trophy' | 'credit-card' | 'log-out' | 'expand-right' | 'search-24'
  | 'tracking/bike-white' | 'tracking/pin-white' | 'tracking/bike-status'

interface IconProps {
  name: IconName
  size: number
  className?: string
}

// SVG original de Figma, con su color incrustado.
export function Icon({ name, size, className }: IconProps) {
  return (
    <img
      src={`/icons/${name}.svg`}
      width={size}
      height={size}
      alt=""
      draggable={false}
      className={cn('block shrink-0', className)}
    />
  )
}

// El mismo SVG usado como máscara: toma el color del texto (currentColor), así cambia con el estado.
export function MaskIcon({ name, size, className }: IconProps) {
  const style: CSSProperties = {
    width: size,
    height: size,
    backgroundColor: 'currentColor',
    WebkitMask: `url(/icons/${name}.svg) center / contain no-repeat`,
    mask: `url(/icons/${name}.svg) center / contain no-repeat`,
  }
  return <span aria-hidden className={cn('block shrink-0', className)} style={style} />
}
