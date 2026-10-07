import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useBandTone } from '../../hooks/useBandTone'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { Niko } from '../ui/Niko'

// Three links and one action, so the bar never competes with the page. On a
// phone only the mark and "Hire me" remain; the page itself is the menu.
const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
] as const
const ALL_SECTIONS = ['work', 'also', 'more', 'services', 'experience', 'recognition', 'faq', 'contact'] as const

export function SiteHeader() {
  const ref = useRef<HTMLElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const tone = useBandTone(ref)
  const active = useScrollSpy(ALL_SECTIONS, ref)

  // A hairline of the other ink shows how far down the page you are.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const h = document.documentElement.scrollHeight - innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(frame) }
  }, [])

  return (
    <header ref={ref} className={`site ${tone}`}>
      <div className="wrap">
        <Link className="brand" to="/" aria-label="Roger Abay, full-stack developer, home">
          <Niko />
          <b>Roger Abay</b>
        </Link>
        <nav className="links" aria-label="Sections">
          {LINKS.map((l) => (
            <Link key={l.id} to={`/#${l.id}`} aria-current={active === l.id ? 'true' : 'false'}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="actions">
          <Link className="btn solid" to="/#contact">Hire me</Link>
        </div>
      </div>
      <div ref={bar} className="progress" aria-hidden="true" />
    </header>
  )
}
