import { useLayoutEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

// Scrolls to #id after each new navigation, or to the top when there is none.
// Keyed on location.key too, so clicking the link you are already on still scrolls.
// Back and Forward (POP) are left to <ScrollRestoration />, which returns the
// visitor to where they were rather than to the top of the hash's section.
export function ScrollToHash() {
  const { pathname, hash, key } = useLocation()
  const navigationType = useNavigationType()
  useLayoutEffect(() => {
    if (navigationType === 'POP') return
    const el = hash ? document.getElementById(hash.slice(1)) : null
    if (el) el.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash, key, navigationType])
  return null
}
