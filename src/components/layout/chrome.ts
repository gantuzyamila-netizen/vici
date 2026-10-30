import { matchPath } from 'react-router-dom'

export type TabId = 'home' | 'pedidos' | 'soporte' | 'perfil'

// Lo que rodea a cada pantalla (barra de estado, tab bar, indicador): se define por ruta como en los frames de Figma.
export interface Chrome {
  statusTone: 'dark' | 'light'
  statusBackground: boolean
  tabBar: boolean
  activeTab: TabId | null
  indicatorTone: 'dark' | 'light'
}

const base: Chrome = { statusTone: 'dark', statusBackground: false, tabBar: false, activeTab: null, indicatorTone: 'dark' }

const table: Array<[string, Partial<Chrome>]> = [
  ['/', { statusTone: 'light', indicatorTone: 'light' }],
  ['/splash', { statusTone: 'light', indicatorTone: 'light' }],
  ['/onboarding', {}],
  ['/login', {}],
  ['/registro', {}],
  ['/home', { statusBackground: true, tabBar: true, activeTab: 'home' }],
  ['/pedidos', { statusBackground: true, tabBar: true, activeTab: 'pedidos' }],
  ['/soporte', { statusBackground: true, tabBar: true, activeTab: 'soporte' }],
  ['/perfil', { statusBackground: true, tabBar: true, activeTab: 'perfil' }],
  ['/categorias', { statusBackground: true, tabBar: true, activeTab: 'home' }],
  ['/tienda/:storeId', { statusTone: 'light', indicatorTone: 'light' }],
  ['/tienda/:storeId/producto/:id', { statusTone: 'light' }],
  ['/carrito', {}],
  ['/pedido-confirmado', {}],
  ['/seguimiento', { tabBar: true, activeTab: 'pedidos' }],
]

export function getChrome(pathname: string, cartCount: number): Chrome {
  const entry = table.find(([path]) => matchPath({ path, end: true }, pathname))
  const chrome = { ...base, ...entry?.[1] }
  // en la Tienda el indicador es blanco porque queda sobre la barra violeta del carrito; sin carrito vuelve a oscuro
  if (matchPath('/tienda/:storeId', pathname) && cartCount === 0) chrome.indicatorTone = 'dark'
  return chrome
}
