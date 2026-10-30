import { AnimatePresence } from 'framer-motion'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { getChrome } from './components/layout/chrome'
import { HomeIndicator } from './components/layout/HomeIndicator'
import { PhoneFrame } from './components/layout/PhoneFrame'
import { StatusBar } from './components/layout/StatusBar'
import { TabBar } from './components/layout/TabBar'
import { CartProvider, useCart } from './state/CartContext'
import { OrderProvider } from './state/OrderContext'
import { AppRoutes } from './router'

function Shell() {
  const chrome = getChrome(useLocation().pathname, useCart().count)
  return (
    <PhoneFrame>
      <AppRoutes />
      {chrome.deviceChrome && <StatusBar tone={chrome.statusTone} withBackground={chrome.statusBackground} />}
      <AnimatePresence>{chrome.tabBar && <TabBar activeTab={chrome.activeTab} />}</AnimatePresence>
      {chrome.deviceChrome && <HomeIndicator tone={chrome.indicatorTone} />}
    </PhoneFrame>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <OrderProvider>
          <Shell />
        </OrderProvider>
      </CartProvider>
    </BrowserRouter>
  )
}
