import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import resume from '../../assets/full.pdf'
import { useBandTone } from '../../hooks/useBandTone'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { Niko } from '../ui/Niko'
import { MobileSheet } from './MobileSheet'

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'experience', label: 'Experience' },
  { id: 'faq', label: 'FAQ' },
] as const
const ALL_SECTIONS = ['work', 'services', 'experience', 'recognition', 'experiments', 'faq', 'contact'] as const

export function SiteHeader() {
  const ref = useRef<HTMLElement>(null)
  const tone = useBandTone(ref)
  const active = useScrollSpy(ALL_SECTIONS, ref)
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <header ref={ref} className={`site ${tone}`}>
        <div className="wrap">
          <Link className="brand" to="/" aria-label="Roger A. Abay Jr., home">
            <Niko />
            <b>Roger Abay</b>
            <small>Full-stack developer</small>
          </Link>
          <nav className="links ui" aria-label="Sections">
            {LINKS.map((l) => (
              <Link key={l.id} to={`/#${l.id}`} aria-current={active === l.id ? 'true' : 'false'}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="actions">
            <Link className="btn line" to="/#contact">Contact</Link>
            <a className="btn solid" href={resume}>Résumé</a>
          </div>
          <button
            className="btn line menu-btn"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="sheet"
            onClick={() => setMenuOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>
      {/* A sibling of the header, as in the mockup: inside the sticky header it
          would share the header's stacking context and sit under the frame. */}
      <MobileSheet open={menuOpen} onClose={closeMenu} resume={resume} />
    </>
  )
}
