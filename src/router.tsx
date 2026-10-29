import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation, useNavigationType } from 'react-router-dom'
import { ScreenTransition } from './components/layout/ScreenTransition'
import { CartScreen } from './features/cart'
import { CategoriesScreen } from './features/categories'
import { ComingSoonScreen } from './features/coming-soon/ComingSoonScreen'
import { HomeScreen } from './features/home'
import { LoginScreen } from './features/login'
import { OnboardingScreen } from './features/onboarding'
import { OrderConfirmedScreen } from './features/order-confirmed'
import { OrderTrackingScreen } from './features/order-tracking'
import { ProductCustomizeScreen } from './features/product-customize'
import { SplashScreen } from './features/splash'
import { StoreScreen } from './features/store'

// Cada screen nueva = una carpeta en src/features/<nombre> + una <Route> acá + su chrome en components/layout/chrome.ts + una fila en docs/screens.md
export function AppRoutes() {
  const location = useLocation()
  const dir = useNavigationType() === 'POP' ? -1 : 1
  const screen = (element: JSX.Element) => <ScreenTransition dir={dir}>{element}</ScreenTransition>

  return (
    <AnimatePresence custom={dir}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={screen(<SplashScreen />)} />
        <Route path="/onboarding" element={screen(<OnboardingScreen />)} />
        <Route path="/login" element={screen(<LoginScreen />)} />
        <Route path="/home" element={screen(<HomeScreen />)} />
        <Route path="/categorias" element={screen(<CategoriesScreen />)} />
        <Route path="/tienda/rapanui" element={screen(<StoreScreen />)} />
        <Route path="/tienda/rapanui/producto/:id" element={screen(<ProductCustomizeScreen />)} />
        <Route path="/carrito" element={screen(<CartScreen />)} />
        <Route path="/pedido-confirmado" element={screen(<OrderConfirmedScreen />)} />
        <Route path="/seguimiento" element={screen(<OrderTrackingScreen />)} />
        <Route path="/pedidos" element={screen(<ComingSoonScreen title="Pedidos" />)} />
        <Route path="/soporte" element={screen(<ComingSoonScreen title="Soporte" />)} />
        <Route path="/perfil" element={screen(<ComingSoonScreen title="Perfil" />)} />
      </Routes>
    </AnimatePresence>
  )
}
