import { useEffect, useState } from 'react'

export function useAsync<T>(load: () => Promise<T>, initial: T) {
  const [data, setData] = useState<T>(initial)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    load().then((result) => {
      if (!active) return
      setData(result)
      setLoading(false)
    })
    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, loading }
}
