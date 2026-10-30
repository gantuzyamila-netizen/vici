import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { SearchBar } from '../../components/ui/SearchBar'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { categories } from '../../data/categories'
import { user } from '../../data/user'
import { usePromos } from '../../hooks/usePromos'
import { useStores } from '../../hooks/useStores'
import { CategoryChips } from './components/CategoryChips'
import { Greeting } from './components/Greeting'
import { PromoCarousel } from './components/PromoCarousel'
import { SearchResults } from './components/SearchResults'
import { StoreList } from './components/StoreList'
import { TopRow } from './components/TopRow'

// 04 · Home (Figma node 293:3723). Al tocar el buscador se abre el teclado y la Home pasa a "modo búsqueda":
// el mismo input sigue montado (así el teclado no se cierra) y el resto del contenido se reemplaza por los resultados.
export function HomeScreen() {
  const [searching, setSearching] = useState(false)
  const [query, setQuery] = useState('')
  const input = useRef<HTMLInputElement>(null)
  const { data: promos } = usePromos()
  const { data: stores, loading: storesLoading } = useStores()

  const cancel = () => {
    input.current?.blur()
    setQuery('')
    setSearching(false)
  }

  return (
    <main className="no-scrollbar flex h-full flex-col gap-5 overflow-y-auto bg-neutral-50 pb-[124px] pt-14 [&>*]:shrink-0">
      {!searching && <TopRow address={user.address} />}
      {!searching && <Greeting name={user.name} />}

      <div className="flex items-center gap-3 px-6">
        <SearchBar ref={input} placeholder="Restaurantes, productos…" value={query} onChange={setQuery} onFocus={() => setSearching(true)} />
        <AnimatePresence initial={false}>
          {searching && (
            <motion.button
              type="button"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              // onPointerDown: no deja que el input pierda el foco antes de cancelar
              onPointerDown={(event) => event.preventDefault()}
              onClick={cancel}
              className="overflow-hidden whitespace-nowrap text-label-m text-brand-violet-600 active:opacity-60"
            >
              Cancelar
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {searching ? (
        <SearchResults query={query} stores={stores} onQuery={setQuery} />
      ) : (
        <>
          <CategoryChips categories={categories} />
          <PromoCarousel promos={promos} />
          <SectionHeader title="Tus comercios favoritos" actionLabel="Ver todos" />
          <StoreList stores={stores} loading={storesLoading} />
        </>
      )}
    </main>
  )
}
