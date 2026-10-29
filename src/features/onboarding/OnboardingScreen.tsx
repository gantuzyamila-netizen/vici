import { animate, motion, useMotionValue, type PanInfo } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { slides } from './slides'

const WIDTH = 390
const AUTO_MS = 4200

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

  return (
    <main className="relative h-full overflow-hidden bg-neutral-50">
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

      <button type="button" onClick={toLogin} className="absolute right-6 top-[54px] text-label-m text-neutral-500 active:opacity-60">
        Omitir
      </button>

      <div className="absolute left-0 top-[656px] flex w-[390px] flex-col items-center gap-[14px] px-6">
        <Button variant="primary" onClick={toLogin}>
          Crear cuenta
        </Button>
        <Button variant="secondary" onClick={toLogin}>
          Iniciar sesión
        </Button>
      </div>
    </main>
  )
}
