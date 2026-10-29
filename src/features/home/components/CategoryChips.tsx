import { Chip } from '../../../components/ui/Chip'
import type { Category } from '../../../types'

interface CategoryChipsProps {
  categories: Category[]
  activeId: string
  onChange: (id: string) => void
  isDisabled?: (id: string) => boolean
}

export function CategoryChips({ categories, activeId, onChange, isDisabled }: CategoryChipsProps) {
  // padding/margen vertical extra para que no se recorte la sombra del chip activo
  return (
    <div className="no-scrollbar -my-6 flex gap-[10px] overflow-x-auto px-6 py-6">
      {categories.map((category) => (
        <Chip key={category.id} label={category.label} active={category.id === activeId} onClick={() => onChange(category.id)} disabled={isDisabled?.(category.id)} />
      ))}
    </div>
  )
}
