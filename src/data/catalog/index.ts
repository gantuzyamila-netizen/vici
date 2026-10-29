import type { StoreDetail } from '../../types'
import { burgerHouse } from './burgerHouse'
import { pizzeriaFuego } from './pizzeriaFuego'
import { rapanui } from './rapanui'

// Comercios con pantalla de tienda diseñada, por id de ruta (/tienda/:storeId)
export const catalog: Record<string, StoreDetail> = {
  [rapanui.id]: rapanui,
  [pizzeriaFuego.id]: pizzeriaFuego,
  [burgerHouse.id]: burgerHouse,
}
