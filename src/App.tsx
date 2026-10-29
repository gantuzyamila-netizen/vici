import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './router'
import { PhoneFrame } from './components/layout/PhoneFrame'

export default function App() {
  return (
    <BrowserRouter>
      <PhoneFrame>
        <AppRoutes />
      </PhoneFrame>
    </BrowserRouter>
  )
}
