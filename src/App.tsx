import type { MouseEvent } from 'react'
import { Outlet } from 'react-router-dom'
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

export default function App() {
  return (
    <>
      <a className="skip" href="#main" onClick={skipToContent}>Skip to content</a>
      <SiteHeader />
      <ScrollToHash />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />
      <AskButton />
    </>
  )
}
