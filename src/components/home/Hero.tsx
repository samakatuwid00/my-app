import { Fragment, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import resume from '../../assets/full.pdf'
import { credits, hero } from '../../data/site'
import { Band } from '../layout/Band'
import { DotField } from './DotField'
import { Portrait } from './Portrait'


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
      <DotField />
      <div className="wrap">
        <div className="intro">
          <div className="intro-text" data-depth="-0.06">
            <h1 ref={nameRef} className="display">
              {hero.name.map((part, i) => (
                <Fragment key={part}>{i > 0 && ' '}<span>{part}</span></Fragment>
              ))}
            </h1>
            <p className="tagline">{hero.tagline}</p>
            <p className="applied"><span className="long">{hero.applied}</span><span className="short">{hero.appliedShort}</span></p>
            <p className="lede"><span className="long">{hero.lede}</span><span className="short">{hero.ledeShort}</span></p>
            <div className="btns">
              <Link className="btn solid" to="/#work">View work</Link>
              <a className="btn tint" href={resume}>
                <svg className="dl" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
                </svg>
                Résumé
              </a>
            </div>
            <dl className="credits ui">
              {credits.map((c) => (
                <div key={c.term}>
                  <dt>{c.term}</dt>
                  <dd>{c.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="portrait-rail" data-depth="0.12">
            <span className="ring" aria-hidden="true" />
            <span className="ring b" aria-hidden="true" />
            <Portrait />
          </div>
        </div>
      </div>
      <div className="scroll-cue ui" aria-hidden="true"><span>Scroll</span><i /></div>
    </Band>
  )
}
