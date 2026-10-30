import { AnimatePresence } from 'framer-motion'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Chip } from '../../../components/ui/Chip'
import { EmptyState } from '../../../components/ui/EmptyState'
import { catalog } from '../../../data/catalog'
import { matches } from '../../../lib/search'
import type { Store } from '../../../types'
import { ProductRow } from '../../store/components/ProductRow'
import { StoreCard } from './StoreCard'

const suggestions = ['Pizza', 'Helado', 'Hamburguesa', 'Sushi']

interface SearchResultsProps {
  query: string
  stores: Store[]
  onQuery: (value: string) => void
}

// Modo búsqueda de la Home: sugerencias si todavía no escribió nada, resultados (comercios y productos) o estado vacío.
export function SearchResults({ query, stores, onQuery }: SearchResultsProps) {
  const navigate = useNavigate()
  const foundStores = useMemo(() => stores.filter((store) => matches(query, store.name, store.description)), [stores, query])
  const foundProducts = useMemo(
    () =>
      Object.values(catalog).flatMap((store) =>
        store.products
          .filter((product) => matches(query, product.title, product.fullTitle, product.description))
          .map((product) => ({ store, product: { ...product, description: `${store.name} · ${product.description}` } })),
      ),
    [query],
  )

  if (!query.trim()) {
    return (
      <EmptyState icon="search" title="Buscá tu comida favorita" text="Probá con un restaurante, un producto o una categoría.">
        <div className="flex flex-wrap justify-center gap-[10px]">
          {suggestions.map((suggestion) => (
            <Chip key={suggestion} label={suggestion} active={false} onClick={() => onQuery(suggestion)} />
          ))}
        </div>
      </EmptyState>
    )
  }

  if (foundStores.length === 0 && foundProducts.length === 0) {
    return (
      <EmptyState
        icon="search"
        title={`No encontramos “${query.trim()}”`}
        text="Revisá que esté bien escrito o probá con otra palabra."
        action={{ label: 'Borrar búsqueda', onClick: () => onQuery('') }}
      />
    )
  }

  return (
    <div className="flex flex-col gap-5 px-6">
      {foundStores.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-title-m text-neutral-900">Comercios</h2>
          <AnimatePresence initial={false}>
            {foundStores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </AnimatePresence>
        </section>
      )}
      {foundProducts.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-title-m text-neutral-900">Productos</h2>
          <AnimatePresence initial={false}>
            {foundProducts.map(({ store, product }) => (
              <ProductRow key={`${store.id}-${product.id}`} product={product} onSelect={() => navigate(`/tienda/${store.id}/producto/${product.id}`)} />
            ))}
          </AnimatePresence>
        </section>
      )}
    </div>
  )
}
