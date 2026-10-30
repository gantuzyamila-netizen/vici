import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Icon } from '../../components/icons/Icon'
import { BellButton } from '../../components/ui/BellButton'
import { CircleButton } from '../../components/ui/CircleButton'
import { EmptyState } from '../../components/ui/EmptyState'
import { cn } from '../../lib/cn'
import { categorySections } from '../../data/categorySections'
import { useBack } from '../../hooks/useBack'

// 05 · Categorías (Figma node 80:14175). Con flujo diseñado: Helados, Pizzas y Hamburguesas; el resto queda deshabilitado.
export function CategoriesScreen() {
  const navigate = useNavigate()
  const goBack = useBack('/home')
  const location = useLocation()
  const searchRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')

  // si venís del buscador de la Home, el cursor ya queda listo para escribir
  useEffect(() => {
    if (location.state?.focusSearch) searchRef.current?.focus({ preventScroll: true })
  }, [location.state])

  const text = query.trim().toLowerCase()
  const sections = categorySections
    .map((section) => ({ ...section, tiles: section.tiles.filter((tile) => !text || tile.label.toLowerCase().includes(text)) }))
    .filter((section) => section.tiles.length > 0)

  return (
    <main className="relative h-full bg-neutral-50">
      <div className="no-scrollbar absolute inset-0 flex flex-col gap-5 overflow-y-auto pb-[124px] pt-14 [&>*]:shrink-0">
        <header className="flex items-center gap-[14px] px-6">
          <CircleButton icon="back" label="Volver" onClick={goBack} />
          <h1 className="min-w-0 flex-1 text-title-m text-neutral-900">Categorías</h1>
          <BellButton />
        </header>

        <label className="mx-6 flex h-[52px] items-center gap-3 rounded-[26px] bg-neutral-0 px-5 shadow-card">
          <Icon name="search" size={20} />
          <input
            ref={searchRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="¿Qué producto estás buscando?"
            className="min-w-0 flex-1 bg-transparent text-body-m text-neutral-900 outline-none placeholder:text-neutral-500"
          />
        </label>

        {sections.map((section) => (
          <section key={section.title} className="flex flex-col gap-3 px-6">
            <h2 className="whitespace-nowrap text-title-m text-neutral-900">{section.title}</h2>
            <div className="grid grid-cols-3 gap-3">
              {section.tiles.map((tile) => (
                <button
                  key={tile.id}
                  type="button"
                  disabled={!tile.to}
                  onClick={() => tile.to && navigate(tile.to)}
                  className={cn('group flex min-w-0 flex-col items-center gap-2', !tile.to && 'cursor-not-allowed opacity-disabled')}
                >
                  <span className="flex h-[92px] w-full items-center justify-center rounded-[26px] bg-brand-violet-50 transition-transform duration-150 group-enabled:group-active:scale-95">
                    <img src={tile.image} alt="" draggable={false} className="pointer-events-none size-[72px] object-contain" />
                  </span>
                  <span className="whitespace-nowrap text-center text-label-m text-neutral-900">{tile.label}</span>
                </button>
              ))}
            </div>
          </section>
        ))}
        {sections.length === 0 && (
          <div className="py-10">
            <EmptyState icon="search" title="No encontramos esa categoría" text="Probá con otra palabra o mirá todas las categorías." action={{ label: 'Ver todas', onClick: () => setQuery('') }} />
          </div>
        )}
      </div>
    </main>
  )
}
