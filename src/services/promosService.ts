import { promos } from '../data/promos'
import { delay } from '../lib/delay'
import type { Promo } from '../types'

export async function getPromos(): Promise<Promo[]> {
  await delay()
  return promos
}
