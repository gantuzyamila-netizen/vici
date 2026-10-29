import { createContext, useContext, useMemo, useReducer, type ReactNode } from 'react'
import type { CartItem } from '../types'

type Action = { type: 'set'; item: CartItem } | { type: 'clear' }

function reducer(items: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case 'set': {
      // el pedido es de un solo comercio: si llega algo de otro, arranca un carrito nuevo
      if (items.some((item) => item.storeId !== action.item.storeId)) return [action.item]
      // mismo producto = misma línea (así "editar" reemplaza en lugar de duplicar)
      const exists = items.some((item) => item.productId === action.item.productId)
      return exists ? items.map((item) => (item.productId === action.item.productId ? action.item : item)) : [...items, action.item]
    }
    case 'clear':
      return []
  }
}

interface CartValue {
  items: CartItem[]
  count: number
  subtotal: number
  shipping: number
  total: number
  setItem: (item: CartItem) => void
  clear: () => void
}

const CartContext = createContext<CartValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, [])

  const value = useMemo<CartValue>(() => {
    const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0)
    return {
      items,
      count: items.reduce((sum, item) => sum + item.qty, 0),
      subtotal,
      shipping: 0, // todos los comercios del prototipo tienen envío gratis
      total: subtotal,
      setItem: (item) => dispatch({ type: 'set', item }),
      clear: () => dispatch({ type: 'clear' }),
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const value = useContext(CartContext)
  if (!value) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return value
}
