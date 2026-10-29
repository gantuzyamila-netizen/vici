import { AnimatePresence } from 'framer-motion'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { getChrome } from './components/layout/chrome'
import { HomeIndicator } from './components/layout/HomeIndicator'
import { PhoneFrame } from './components/layout/PhoneFrame'
import { StatusBar } from './components/layout/StatusBar'
import { TabBar } from './components/layout/TabBar'
import { CartProvider, useCart } from './state/CartContext'
import { AppRoutes } from './router'

function Shell() {
  const chrome = getChrome(useLocation().pathname, useCart().count)
  return (
    <PhoneFrame>
      <AppRoutes />
      <StatusBar tone={chrome.statusTone} withBackground={chrome.statusBackground} />
      <AnimatePresence>{chrome.tabBar && <TabBar activeTab={chrome.activeTab} />}</AnimatePresence>
      <HomeIndicator tone={chrome.indicatorTone} />
    </PhoneFrame>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Shell />
      </CartProvider>
    </BrowserRouter>
  )
}
