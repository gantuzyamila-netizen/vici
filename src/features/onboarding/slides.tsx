import type { CSSProperties, ReactNode } from 'react'

// Medidas tomadas de get_design_context de 02 · Onboarding 1/2/3 (frame de 390×844)
// Figma proyecta la sombra sobre la silueta de la imagen (PNG transparente), no sobre la caja
const heroShadow = 'drop-shadow(0 4px 10px rgba(80, 52, 166, 0.08))'

// Elemento rotado dentro de una caja contenedora: Figma lo exporta con hypot() sobre las unidades del contenedor
function Rotated({ box, size, rotate, shadow, src }: { box: CSSProperties; size: { w: string; h: string }; rotate: number; shadow: string; src: string }) {
  return (
    <div className="absolute flex items-center justify-center" style={{ ...box, containerType: 'size' }}>
      <div className="flex-none" style={{ width: size.w, height: size.h, transform: `rotate(${rotate}deg)`, filter: `drop-shadow(${shadow})` }}>
        <img src={src} alt="" draggable={false} className="pointer-events-none absolute inset-0 size-full object-cover" />
      </div>
    </div>
  )
}

export interface Slide {
  id: string
  title: ReactNode
  art: ReactNode
}

export const slides: Slide[] = [
  {
    id: 'comida',
    title: (
      <>
        Recibí comida, súper y
        <br />
        productos de tus tiendas
        <br />
        favoritas en minutos.
      </>
    ),
    art: (
      <div className="absolute left-5 top-[92px] h-[380px] w-[350px] overflow-hidden rounded-[36px]" style={{ filter: heroShadow }}>
        <img
          src="/images/onboarding/hero-1.png"
          alt=""
          draggable={false}
          className="pointer-events-none absolute max-w-none"
          style={{ height: '105.04%', width: '171.04%', left: '-42.78%', top: '-2.43%' }}
        />
      </div>
    ),
  },
  {
    id: 'promos',
    title: (
      <>
        Disfrutá las mejores promos
        <br />
        en tus restaurantes
        <br />
        favoritos.
      </>
    ),
    art: (
      <>
        <Rotated
          box={{ inset: '34% 54.39% 49.01% 8.21%' }}
          size={{ w: 'hypot(98.1009cqw, 1.96746cqh)', h: 'hypot(-1.89914cqw, 98.0325cqh)' }}
          rotate={1.13}
          shadow="0 3.092px 3.865px rgba(0,0,0,0.25)"
          src="/images/onboarding/fries.png"
        />
        <Rotated
          box={{ inset: '38.86% 7.53% 47.34% 45.13%' }}
          size={{ w: 'hypot(90.1942cqw, -33.3415cqh)', h: 'hypot(9.8058cqw, 66.6585cqh)' }}
          rotate={-13.13}
          shadow="0 4.621px 5.777px rgba(0,0,0,0.25)"
          src="/images/onboarding/pizza.png"
        />
        <Rotated
          box={{ inset: '10.66% 9.75% 69.03% 44.62%' }}
          size={{ w: 'hypot(73.3152cqw, 30.2509cqh)', h: 'hypot(-26.6848cqw, 69.7491cqh)' }}
          rotate={21.67}
          shadow="0 2.652px 3.315px rgba(0,0,0,0.25)"
          src="/images/onboarding/burger.png"
        />
        <div className="absolute left-[38px] top-[131px] flex size-[110.669px] items-center justify-center">
          <img src="/images/onboarding/ice-cream.png" alt="" draggable={false} className="pointer-events-none size-[90px] flex-none rotate-[-15.4deg] object-contain" />
        </div>
        <div className="absolute left-[38.15px] top-[131.42px] flex h-[291.512px] w-[297.114px] items-center justify-center">
          <img
            src="/images/onboarding/promo-bubble.png"
            alt=""
            draggable={false}
            className="pointer-events-none h-[212px] w-[225px] flex-none rotate-[-27.26deg] object-cover"
            style={{ filter: 'drop-shadow(0 30px 31px rgba(0,0,0,0.35))' }}
          />
        </div>
      </>
    ),
  },
  {
    id: 'envios',
    title: 'Lo que te gusta con envíos gratis a partir de compras mayores a $10.000.',
    art: (
      <div className="absolute left-[-131px] top-[44px] h-[414px] w-[652px] overflow-hidden">
        <img src="/images/onboarding/hero-3.png" alt="" draggable={false} className="pointer-events-none absolute left-0 max-w-none" style={{ height: '118.1%', width: '100%', top: '-9.05%' }} />
      </div>
    ),
  },
]
