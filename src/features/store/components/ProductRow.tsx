import { motion } from 'framer-motion'
import { price } from '../../../lib/format'
import type { Product } from '../../../types'

export function ProductRow({ product, onSelect }: { product: Product; onSelect: () => void }) {
  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="flex w-full items-center gap-[14px] rounded-[24px] bg-neutral-0 py-[10px] pl-[10px] pr-3 text-left shadow-card"
    >
      <img src={product.image} alt="" draggable={false} className="pointer-events-none size-[76px] shrink-0 rounded-[18px] object-cover" />
      <span className={`flex min-w-0 flex-1 flex-col items-start ${product.discount ? 'gap-1' : 'gap-[3px]'}`}>
        <span className="w-full text-title-s text-neutral-900">{product.title}</span>
        <span className="w-full text-body-s text-neutral-500">{product.description}</span>
        {product.discount && <span className="whitespace-nowrap text-label-s text-brand-orange-500">{product.discount}</span>}
      </span>
      <span className="flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-[18px] bg-brand-violet-600 px-[14px] text-label-m text-neutral-0">
        {price(product.price)}
      </span>
    </motion.button>
  )
}
