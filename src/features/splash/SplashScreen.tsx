import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SPLASH_MS = 2400

// 01 · Splash (Figma node 279:1423): después de un momento pasa al onboarding
export function SplashScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/onboarding'), SPLASH_MS)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <main className="relative h-full overflow-hidden bg-splash">
      <motion.img
        src="/images/brand/splash-deco-1.svg"
        alt=""
        draggable={false}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="absolute -left-[130px] -top-[110px] size-[360px]"
      />
      <motion.img
        src="/images/brand/splash-deco-2.svg"
        alt=""
        draggable={false}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
        className="absolute -bottom-[56px] -right-[140px] size-[340px]"
      />
      <motion.img
        src="/images/brand/splash-deco-3.svg"
        alt=""
        draggable={false}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
        className="absolute -left-[70px] bottom-1 size-[190px]"
      />
      {/* el centrado va en un contenedor aparte: la animación de scale pisaría un translate */}
      <div className="absolute inset-x-0 top-[calc(50%-32px)] flex justify-center pl-px">
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.25 }}
          className="relative h-[78.964px] w-[139px]"
        >
          <img src="/images/brand/vici-wordmark.svg" alt="Vici" draggable={false} className="absolute block max-w-none" style={{ inset: '0 -2.21% -7.79% -2.21%', width: '104.42%', height: '107.79%' }} />
        </motion.div>
      </div>
    </main>
  )
}
