import { categories } from '../data/categories'
import type { Category } from '../types'

export async function getCategories(): Promise<Category[]> {
  return categories
}
