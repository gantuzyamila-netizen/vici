import { getPromos } from '../services/promosService'
import type { Promo } from '../types'
import { useAsync } from './useAsync'

export const usePromos = () => useAsync<Promo[]>(getPromos, [])
