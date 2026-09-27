import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scrolls to #id after each navigation, or to the top when there is none.
// Keyed on location.key too, so clicking the link you are already on still scrolls.
export function ScrollToHash() {
  const { pathname, hash, key } = useLocation()
  useLayoutEffect(() => {
    const el = hash ? document.getElementById(hash.slice(1)) : null
    if (el) el.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash, key])
  return null
}
