import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

// Live: flipping the OS setting re-renders without a reload. The server
// snapshot is false so markup rendered without a window assumes motion is fine;
// every animation starts from the visible state anyway.
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const m = matchMedia(QUERY)
      m.addEventListener('change', cb)
      return () => m.removeEventListener('change', cb)
    },
    () => matchMedia(QUERY).matches,
    () => false,
  )
}
