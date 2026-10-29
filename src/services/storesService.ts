import { stores } from '../data/stores'
import { delay } from '../lib/delay'
import type { Store } from '../types'

// API simulada: reemplazable por fetch a un backend real sin tocar las pantallas.
export async function getFavoriteStores(): Promise<Store[]> {
  await delay()
  return stores
}
