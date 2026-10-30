import { animate, motion, useMotionValue, type PanInfo } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FitStage } from '../../components/layout/FitStage'
import { Button } from '../../components/ui/Button'
import { slides } from './slides'

const WIDTH = 390
const AUTO_MS = 4200
const BUTTONS_H = 176 // botones (126) + aire abajo y arriba en pantallas chicas

// 02 · Onboarding 1/2/3 (Figma nodes 80:14519, 80:14552, 80:14590)
export function OnboardingScreen() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const [touched, setTouched] = useState(false)
  const x = useMotionValue(0)

  useEffect(() => {
    animate(x, -index * WIDTH, { type: 'spring', stiffness: 320, damping: 34 })
  }, [index, x])

  // avanza sola hasta el último slide, salvo que la persona ya lo haya movido
  useEffect(() => {
    if (touched || index === slides.length - 1) return
    const timer = setTimeout(() => setIndex((i) => i + 1), AUTO_MS)
    return () => clearTimeout(timer)
  }, [index, touched])

  const onDragEnd = (_: PointerEvent, info: PanInfo) => {
    setTouched(true)
    const swipe = info.offset.x + info.velocity.x * 0.2
    if (swipe < -60) setIndex((i) => Math.min(i + 1, slides.length - 1))
    else if (swipe > 60) setIndex((i) => Math.max(i - 1, 0))
    else animate(x, -index * WIDTH, { type: 'spring', stiffness: 320, damping: 34 })
  }

  const toLogin = () => navigate('/login')
  const toRegister = () => navigate('/registro')

  return (
    <main className="relative h-full overflow-hidden bg-neutral-50">
      {/* las slides están hechas sobre el lienzo de 390×844: en pantallas bajas se achican (hasta el fin del copy, 606 px) para no pisar los botones */}
      <FitStage designHeight={844} fitHeight={606} reserveBottom={BUTTONS_H}>
        <div className="relative h-full w-full overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: -(slides.length - 1) * WIDTH, right: 0 }}
          dragElastic={0.12}
          onDragEnd={onDragEnd}
          style={{ x, width: WIDTH * slides.length }}
          className="absolute inset-y-0 left-0 cursor-grab active:cursor-grabbing"
        >
          {slides.map((slide, i) => (
            <section key={slide.id} className="absolute top-0 h-full overflow-hidden" style={{ left: i * WIDTH, width: WIDTH }}>
              {slide.art}
              <div className="absolute left-0 top-[494px] flex w-[390px] flex-col gap-[14px] px-6">
                <div className="flex items-center gap-[6px]">
                  {slides.map((dot, d) => (
                    <motion.span
                      key={dot.id}
                      animate={{ width: d === i ? 28 : 8, backgroundColor: d === i ? '#6e4bdc' : '#cabff5' }}
                      transition={{ duration: 0.25 }}
                      className="h-2 rounded-[4px]"
                    />
                  ))}
                </div>
                <h1 className="text-title-l text-neutral-900">{slide.title}</h1>
              </div>
            </section>
          ))}
        </motion.div>
        </div>
      </FitStage>

      <button type="button" onClick={toLogin} className="absolute right-6 top-[54px] text-label-m text-neutral-500 active:opacity-60">
        Omitir
      </button>

      <div className="absolute inset-x-0 bottom-[max(24px,env(safe-area-inset-bottom))] mx-auto flex w-full max-w-[390px] flex-col items-center gap-[14px] px-6 md:bottom-[62px]">
        <Button variant="primary" onClick={toRegister}>
          Crear cuenta
        </Button>
        <Button variant="secondary" onClick={toLogin}>
          Iniciar sesión
        </Button>
      </div>
    </main>
  )
}
