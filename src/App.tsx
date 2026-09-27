import type { MouseEvent } from 'react'
import { Outlet, ScrollRestoration, type Location } from 'react-router-dom'
import { AskButton } from './components/ask/AskButton'
import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'
import { ScrollToHash } from './components/layout/ScrollToHash'

// Moves focus to the page content without adding #main to the address bar,
// which would otherwise send ScrollToHash after it on the next render.
function skipToContent(e: MouseEvent<HTMLAnchorElement>) {
  const main = document.getElementById('main')
  if (!main) return
  e.preventDefault()
  main.focus({ preventScroll: true })
  main.scrollIntoView()
}

// Every page load starts on a history entry keyed "default", so keying saved
// offsets on location.key alone would hand one page's offset to the next page
// loaded in the tab. That first entry is keyed by its URL instead.
const scrollKey = (location: Location) =>
  location.key === 'default' ? location.pathname + location.hash : location.key

export default function App() {
  return (
    <>
      <a className="skip" href="#main" onClick={skipToContent}>Skip to content</a>
      <SiteHeader />
      <ScrollRestoration getKey={scrollKey} />
      <ScrollToHash />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />
      <AskButton />
    </>
  )
}
