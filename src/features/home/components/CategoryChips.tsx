import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { cn } from '../../../lib/cn'
import type { Category } from '../../../types'

// chip circular de Figma: círculo blanco de 56 con el ícono 3D y el nombre debajo
function CategoryChip({ category }: { category: Category }) {
  const navigate = useNavigate()
  const enabled = Boolean(category.to)
  return (
    <motion.button
      type="button"
      disabled={!enabled}
      whileTap={enabled ? { scale: 0.92 } : undefined}
      onClick={() => category.to && navigate(category.to)}
      className={cn('flex shrink-0 flex-col items-center gap-[10px]', !enabled && 'cursor-not-allowed opacity-disabled')}
    >
      <span className="relative flex size-14 items-center justify-center rounded-full bg-neutral-0">
        {category.crop ? (
          // el ícono de Pizzas es un recorte: Figma lo muestra dentro de una ventana de 49,5×36
          <span className="relative h-9 w-[49.5px] overflow-hidden">
            <img src={category.image} alt="" draggable={false} className="pointer-events-none absolute max-w-none" style={category.crop} />
          </span>
        ) : (
          <img src={category.image} alt="" draggable={false} className={cn('pointer-events-none', category.imageClass)} />
        )}
      </span>
      <span className="whitespace-nowrap text-center text-[12px] font-medium leading-[15px] text-neutral-500">{category.label}</span>
    </motion.button>
  )
}

export function CategoryChips({ categories }: { categories: Category[] }) {
  return (
    <div className="no-scrollbar flex gap-6 overflow-x-auto px-6">
      {categories.map((category) => (
        <CategoryChip key={category.id} category={category} />
      ))}
    </div>
  )
}
