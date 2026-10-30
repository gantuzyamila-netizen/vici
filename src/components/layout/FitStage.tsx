import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

interface FitStageProps {
  /** Ancho del diseño de Figma (390 en todos los frames). */
  designWidth?: number
  /** Alto del lienzo de Figma sobre el que están hechas las medidas (844). */
  designHeight: number
  /** Alto de la zona que tiene que verse completa; lo que quede debajo se recorta. Por defecto, todo el lienzo. */
  fitHeight?: number
  /** Alto que queda tapado por elementos fijos abajo (CTA, tab bar): el stage se achica para entrar en lo que sobra. */
  reserveBottom?: number
  children: ReactNode
  className?: string
}

// Muestra una composición hecha con medidas absolutas de Figma a tamaño real y, si la pantalla es más chica
// (iPhone 12 en Safari, iPhone SE, Android chicos), la achica para que entre en vez de cortarse.
export function FitStage({ designWidth = 390, designHeight, fitHeight = designHeight, reserveBottom = 0, children, className }: FitStageProps) {
  const holder = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const el = holder.current?.parentElement
    if (!el) return
    const fit = () => setScale(Math.min(1, el.clientWidth / designWidth, (el.clientHeight - reserveBottom) / fitHeight))
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(el)
    return () => observer.disconnect()
  }, [designWidth, fitHeight, reserveBottom])

  return (
    <div ref={holder} className={className ?? 'absolute inset-x-0 top-0 flex justify-center overflow-hidden'} style={{ height: fitHeight * scale }}>
      <div style={{ width: designWidth, height: designHeight, flex: 'none', transform: `scale(${scale})`, transformOrigin: 'top center' }}>{children}</div>
    </div>
  )
}
