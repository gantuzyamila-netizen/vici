import { motion } from 'framer-motion'
import { Badge } from '../../../components/ui/Badge'
import type { Promo } from '../../../types'

function PromoCard({ promo }: { promo: Promo }) {
  return (
    <motion.article whileTap={{ scale: 0.98 }} className="relative h-[172px] w-[300px] shrink-0 snap-start overflow-hidden rounded-[28px]">
      <img src={promo.image} alt="" draggable={false} className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(29,26,43,0)] from-20% to-[rgba(29,26,43,0.8)]" />
      <div className="absolute left-4 top-4">
        <Badge tone="solid">{promo.badge}</Badge>
      </div>
      <div className="absolute left-4 top-[118px] flex flex-col gap-0.5">
        <p className="text-title-s text-neutral-0">{promo.title}</p>
        <p className="text-label-s text-neutral-0/85">{promo.subtitle}</p>
      </div>
    </motion.article>
  )
}

export function PromoCarousel({ promos }: { promos: Promo[] }) {
  return (
    <div className="no-scrollbar flex snap-x snap-mandatory scroll-px-6 gap-[14px] overflow-x-auto px-6">
      {promos.map((promo) => (
        <PromoCard key={promo.id} promo={promo} />
      ))}
    </div>
  )
}
