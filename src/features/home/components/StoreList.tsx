import { AnimatePresence } from 'framer-motion'
import type { Store } from '../../../types'
import { StoreCard } from './StoreCard'

export function StoreList({ stores, loading }: { stores: Store[]; loading: boolean }) {
  return (
    <div className="flex flex-col gap-3 px-6">
      <AnimatePresence>
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </AnimatePresence>
      {!loading && stores.length === 0 && <p className="py-6 text-center text-body-m text-neutral-500">No encontramos comercios para tu búsqueda.</p>}
    </div>
  )
}
