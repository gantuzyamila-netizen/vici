import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { CartItem } from '../types'

export interface PlacedOrder {
  storeName: string
  items: CartItem[]
  total: number
}

interface OrderValue {
  order: PlacedOrder | null
  place: (order: PlacedOrder) => void
}

const OrderContext = createContext<OrderValue | null>(null)

// El pedido que se acaba de pagar: lo muestra la pestaña Pedidos. Vive solo en memoria, se pierde al recargar.
export function OrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<PlacedOrder | null>(null)
  const value = useMemo<OrderValue>(() => ({ order, place: setOrder }), [order])
  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrder() {
  const value = useContext(OrderContext)
  if (!value) throw new Error('useOrder debe usarse dentro de <OrderProvider>')
  return value
}
