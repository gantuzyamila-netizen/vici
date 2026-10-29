import { getFavoriteStores } from '../services/storesService'
import type { Store } from '../types'
import { useAsync } from './useAsync'

export const useStores = () => useAsync<Store[]>(getFavoriteStores, [])
