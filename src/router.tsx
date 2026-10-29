import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { HomeScreen } from './features/home'

// Cada screen nueva = una carpeta en src/features/<nombre> + una <Route> acá + una fila en docs/screens.md
export function AppRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </AnimatePresence>
  )
}
