import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation, useNavigationType } from 'react-router-dom'
import { ScreenTransition } from './components/layout/ScreenTransition'
import { CartScreen } from './features/cart'
import { CategoriesScreen } from './features/categories'
import { DeviceHomeScreen } from './features/device-home'
import { HomeScreen } from './features/home'
import { LoginScreen } from './features/login'
import { OnboardingScreen } from './features/onboarding'
import { OrdersScreen } from './features/orders'
import { OrderConfirmedScreen } from './features/order-confirmed'
import { OrderTrackingScreen } from './features/order-tracking'
import { ProfileScreen } from './features/profile'
import { ProductCustomizeScreen } from './features/product-customize'
import { RegisterScreen } from './features/register'
import { SplashScreen } from './features/splash'
import { StoreScreen } from './features/store'
import { SupportScreen } from './features/support'

// Cada screen nueva = una carpeta en src/features/<nombre> + una <Route> acá + su chrome en components/layout/chrome.ts + una fila en docs/screens.md
export function AppRoutes() {
  const location = useLocation()
  const dir = useNavigationType() === 'POP' ? -1 : 1
  const screen = (element: JSX.Element) => <ScreenTransition dir={dir}>{element}</ScreenTransition>

  return (
    <AnimatePresence custom={dir}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={screen(<DeviceHomeScreen />)} />
        <Route path="/splash" element={screen(<SplashScreen />)} />
        <Route path="/onboarding" element={screen(<OnboardingScreen />)} />
        <Route path="/login" element={screen(<LoginScreen />)} />
        <Route path="/registro" element={screen(<RegisterScreen />)} />
        <Route path="/home" element={screen(<HomeScreen />)} />
        <Route path="/categorias" element={screen(<CategoriesScreen />)} />
        <Route path="/tienda/:storeId" element={screen(<StoreScreen />)} />
        <Route path="/tienda/:storeId/producto/:id" element={screen(<ProductCustomizeScreen />)} />
        <Route path="/carrito" element={screen(<CartScreen />)} />
        <Route path="/pedido-confirmado" element={screen(<OrderConfirmedScreen />)} />
        <Route path="/seguimiento" element={screen(<OrderTrackingScreen />)} />
        <Route path="/pedidos" element={screen(<OrdersScreen />)} />
        <Route path="/soporte" element={screen(<SupportScreen />)} />
        <Route path="/perfil" element={screen(<ProfileScreen />)} />
      </Routes>
    </AnimatePresence>
  )
}
