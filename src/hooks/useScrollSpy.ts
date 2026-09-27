import { useEffect, useState, type RefObject } from 'react'
import { useLocation } from 'react-router-dom'

// Every home section counts, so the mark clears over sections without a nav link.
export function useScrollSpy(sectionIds: readonly string[], headerRef: RefObject<HTMLElement | null>) {
  const [active, setActive] = useState<string | null>(null)
  const { pathname } = useLocation()
  useEffect(() => {
    const sync = () => {
      const y = (headerRef.current?.getBoundingClientRect().bottom ?? 0) + 41
      let current: string | null = null
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= y) current = id
      }
      setActive(current)
    }
    sync()
    addEventListener('scroll', sync, { passive: true })
    return () => removeEventListener('scroll', sync)
  }, [sectionIds, headerRef, pathname])
  return active
}
