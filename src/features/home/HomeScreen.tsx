import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchBar } from '../../components/ui/SearchBar'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { categories } from '../../data/categories'
import { user } from '../../data/user'
import { usePromos } from '../../hooks/usePromos'
import { useStores } from '../../hooks/useStores'
import { CategoryChips } from './components/CategoryChips'
import { Greeting } from './components/Greeting'
import { PromoCarousel } from './components/PromoCarousel'
import { StoreList } from './components/StoreList'
import { TopRow } from './components/TopRow'

// 04 · Home (Figma node 5:4754 / 80:14281)
export function HomeScreen() {
  const navigate = useNavigate()
  const [categoryId, setCategoryId] = useState('all')
  const { data: promos } = usePromos()
  const { data: stores, loading: storesLoading } = useStores()

  const visibleStores = useMemo(
    () => stores.filter((store) => categoryId === 'all' || store.categories.includes(categoryId)),
    [stores, categoryId],
  )

  return (
    <main className="no-scrollbar flex h-full flex-col gap-5 overflow-y-auto bg-neutral-50 pb-[124px] pt-14 [&>*]:shrink-0">
      <TopRow address={user.address} />
      <Greeting name={user.name} />
      <SearchBar placeholder="Restaurantes, productos…" onActivate={() => navigate('/categorias', { state: { focusSearch: true } })} />
      <CategoryChips categories={categories} activeId={categoryId} onChange={setCategoryId} />
      <PromoCarousel promos={promos} />
      <SectionHeader title="Tus comercios favoritos" actionLabel="Ver todos" />
      <StoreList stores={visibleStores} loading={storesLoading} />
    </main>
  )
}
