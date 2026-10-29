import { useNavigate } from 'react-router-dom'

// Vuelve a la pantalla anterior; si se abrió directo por URL, va a `fallback`.
export function useBack(fallback: string) {
  const navigate = useNavigate()
  return () => (window.history.state?.idx > 0 ? navigate(-1) : navigate(fallback))
}
