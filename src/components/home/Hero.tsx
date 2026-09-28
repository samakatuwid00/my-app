import { Fragment, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import resume from '../../assets/full.pdf'
import { credits, hero, site, socialLinks } from '../../data/site'
import { Band } from '../layout/Band'
import { Portrait } from './Portrait'

const PROFILES = [
  ...socialLinks.map(({ label, href }) => ({ label, href })),
  { label: 'Email', href: `mailto:${site.email}` },
]

const HEADER_HEIGHT = 60

// While the full name is on screen the header's short name would repeat it, so
// the root carries .hero-name and the header shows only the mark.
function useHeroNameFlag() {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    const name = ref.current
    if (!name) return
    const root = document.documentElement
    const observer = new IntersectionObserver(
      ([entry]) => root.classList.toggle('hero-name', entry.isIntersecting),
      { rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px` },
    )
    observer.observe(name)
    return () => {
      observer.disconnect()
      root.classList.remove('hero-name')
    }
  }, [])
  return ref
}

export function Hero() {
  const nameRef = useHeroNameFlag()
  return (
    <Band as="div" tone="dark" className="hero">
      <div className="wrap">
        <div className="intro">
          <Portrait />
          <div>
            <h1 ref={nameRef} className="display">
              {hero.name.map((part, i) => (
                <Fragment key={part}>{i > 0 && ' '}<span>{part}</span></Fragment>
              ))}
            </h1>
            <p className="tagline">{hero.tagline}</p>
            <p className="lede">{hero.lede}</p>
            <nav className="social ui" aria-label="Profiles">
              {PROFILES.map((p) => (
                <a key={p.label} href={p.href}>
                  {p.label}{' '}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </a>
              ))}
            </nav>
            <div className="btns">
              <Link className="btn solid" to="/#work">View work</Link>
              <a className="btn tint" href={resume}>
                <svg className="dl" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
                </svg>
                Résumé
              </a>
            </div>
          </div>
        </div>
        <dl className="credits">
          {credits.map((c) => (
            <div key={c.term}>
              <dt className="ui">{c.term}</dt>
              <dd>{c.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Band>
  )
}
