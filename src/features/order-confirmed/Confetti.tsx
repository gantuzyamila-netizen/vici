import { motion, useReducedMotion } from 'framer-motion'

// La imagen de Figma ("image 16", 1024 px) tiene la bolsa y cada confeti como piezas sueltas con transparencia;
// se separaron en archivos propios (public/images/congrats/confetti) conservando su posición original.
const SOURCE = 1024
const BOX = 365 // lado con el que Figma muestra la imagen
const K = BOX / SOURCE
const MOUTH = { x: 520, y: 520 } // boca de la bolsa, en px de la imagen original

interface Piece {
  name: string
  x: number
  y: number
  w: number
  h: number
  spin: number // grados que giran mientras salen
  delay: number
}

const pieces: Piece[] = [
  { name: 'ribbon-right', x: 535, y: 270, w: 287, h: 164, spin: 18, delay: 0 },
  { name: 'ribbon-left', x: 312, y: 126, w: 123, h: 293, spin: -24, delay: 0.04 },
  { name: 'star', x: 463, y: 121, w: 160, h: 173, spin: 140, delay: 0.08 },
  { name: 'ribbon-yellow-right', x: 631, y: 411, w: 188, h: 82, spin: 30, delay: 0.1 },
  { name: 'ribbon-yellow-left', x: 274, y: 399, w: 107, h: 76, spin: -40, delay: 0.12 },
  { name: 'ball-orange-right', x: 708, y: 164, w: 59, h: 61, spin: 0, delay: 0.14 },
  { name: 'ball-orange-left', x: 209, y: 216, w: 54, h: 54, spin: 0, delay: 0.16 },
  { name: 'ball-yellow-small', x: 479, y: 325, w: 49, h: 49, spin: 0, delay: 0.06 },
  { name: 'ball-yellow-left', x: 206, y: 345, w: 59, h: 52, spin: 0, delay: 0.18 },
  { name: 'ball-blue', x: 712, y: 560, w: 53, h: 54, spin: 0, delay: 0.2 },
]

interface ConfettiBagProps {
  /** Segundos hasta que la bolsa termina de entrar y empiezan a salir los confetis. */
  burstAt?: number
}

// Bolsa con los confetis saliendo desde adentro: arrancan escondidos detrás de la bolsa (en su boca), chicos y girados,
// y salen disparados hasta su lugar en el frame; después flotan apenas.
export function ConfettiBag({ burstAt = 0.55 }: ConfettiBagProps) {
  const still = useReducedMotion()

  return (
    <div className="pointer-events-none relative shrink-0" style={{ width: BOX, height: BOX }}>
      {pieces.map((piece, i) => {
        const dx = (MOUTH.x - (piece.x + piece.w / 2)) * K
        const dy = (MOUTH.y - (piece.y + piece.h / 2)) * K
        return (
          <motion.div
            key={piece.name}
            initial={still ? false : { x: dx, y: dy, scale: 0.15, rotate: piece.spin * -1, opacity: 0 }}
            animate={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 150, damping: 10, mass: 0.9, delay: burstAt + piece.delay, opacity: { duration: 0.12, delay: burstAt + piece.delay } }}
            className="absolute z-0"
            style={{ left: piece.x * K, top: piece.y * K, width: piece.w * K, height: piece.h * K }}
          >
            {/* flotación suave una vez que salieron */}
            <motion.img
              src={`/images/congrats/confetti/${piece.name}.png`}
              alt=""
              draggable={false}
              animate={still ? undefined : { y: [0, i % 2 ? -4 : 4, 0] }}
              transition={{ duration: 2.6 + (i % 3) * 0.4, repeat: Infinity, ease: 'easeInOut', delay: burstAt + 1.2 }}
              className="size-full"
            />
          </motion.div>
        )
      })}
      <motion.img
        src="/images/congrats/confetti/bag.png"
        alt=""
        draggable={false}
        initial={still ? false : { scale: 0.4, y: 40, rotate: -8, opacity: 0 }}
        animate={{ scale: 1, y: 0, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 210, damping: 13, delay: 0.15 }}
        className="absolute z-10"
        style={{ left: 322 * K, top: 420 * K, width: 393 * K, height: 467 * K }}
      />
    </div>
  )
}
