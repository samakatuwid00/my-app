import { useEffect, useState } from 'react'

const STORAGE_KEY = 'portfolio-rail-collapsed'

export function useRailCollapsed() {
  const [isCollapsed, setIsCollapsed] = useState(
    () => typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY) === 'true',
  )

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, String(isCollapsed))
  }, [isCollapsed])

  return {
    isCollapsed,
    toggleCollapsed: () => setIsCollapsed((current) => !current),
  }
}
