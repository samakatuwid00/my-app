import { useEffect, useState, type RefObject } from 'react'
import { useLocation } from 'react-router-dom'

// The header takes the ink of whichever band sits just beneath it.
export function useBandTone(headerRef: RefObject<HTMLElement | null>) {
  const [tone, setTone] = useState<'dark' | 'light'>('dark')
  const { pathname } = useLocation()
  useEffect(() => {
    const sync = () => {
      const header = headerRef.current
      if (!header) return
      const y = header.getBoundingClientRect().bottom + 1
      const band = [...document.querySelectorAll<HTMLElement>('[data-band]')].find((b) => {
        const r = b.getBoundingClientRect()
        return r.top <= y && r.bottom > y
      })
      setTone(band?.dataset.band === 'light' ? 'light' : 'dark')
    }
    sync()
    addEventListener('scroll', sync, { passive: true })
    addEventListener('resize', sync)
    return () => {
      removeEventListener('scroll', sync)
      removeEventListener('resize', sync)
    }
  }, [headerRef, pathname])
  return tone
}
