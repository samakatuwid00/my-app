import { useRef, useState, type CSSProperties } from 'react'
import { education, experience } from '../../data/experience'
import { useInView } from '../../hooks/useInView'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { Band } from '../layout/Band'

const FIRST = 2019
const YEARS = 9                                  // 2019 through 2027, one grid column each
const col = (year: number) => year - FIRST + 2   // column 1 holds the labels
const now = new Date()
// How far today sits along the axis; the elapsed rule and the Now line read it.
const NOW_PCT = `${(((now.getFullYear() - FIRST) + now.getMonth() / 12) / YEARS) * 100}%`

const entry = (key: string) => {
  const found = experience.find((e) => e.key === key)
  if (!found) throw new Error(`experience entry "${key}" is missing`)
  return found
}

export function Experience() {
  const ref = useRef<HTMLElement>(null)
  const { inView, seen } = useInView(ref, 0.4)
  const reduced = usePrefersReducedMotion()
  // One key lights its label, bar or mark, and role row together; the rest dim.
  const [focus, setFocus] = useState<string | null>(null)
  const link = (k: string) => ({
    'data-k': k,
    onMouseEnter: () => setFocus(k), onMouseLeave: () => setFocus(null),
    onFocus: () => setFocus(k), onBlur: () => setFocus(null),
  })
  const hl = (k: string) => (focus === k ? ' hl' : '')
  const r5 = entry('r5')
  const co = entry('co')
  const lg = entry('lg')

  // armed hides the bars until drawn, so without script or with reduced motion
  // the timeline is simply complete.
  const tlClass = ['tl', !reduced && 'armed', seen && 'drawn', inView && 'in-view', focus && 'focus'].filter(Boolean).join(' ')
  const bar = (k: string, row: number, from: number, to: number, kind = '', d = '0s') => (
    <span className={`bar${kind ? ` ${kind}` : ''}${hl(k)}`} {...link(k)} style={{ gridRow: row, gridColumn: `${col(from)} / ${col(to)}`, '--d': d } as CSSProperties} />
  )

  return (
    <Band id="experience" tone="dark">
      <div className="wrap">
        <div className="head">
          <h2 className="h2">Experience</h2>
          <p>Feature ownership inside a national team, then end-to-end ownership of production systems and the servers they run on.</p>
        </div>
        <figure ref={ref} id="timeline" className={tlClass} aria-label="Timeline from 2019 to the present" style={{ '--now': NOW_PCT } as CSSProperties}>
          <span className={`lab ui${hl('r5')}`} {...link('r5')} style={{ gridRow: 1 }}>Region V</span>
          {bar('r5', 1, r5.start!, FIRST + YEARS, 'now')}
          <span className={`lab ui${hl('co')}`} {...link('co')} style={{ gridRow: 2 }}>Central Office</span>
          {bar('co', 2, co.start!, co.end!, '', '.08s')}
          <span className={`lab ui${hl('fl')}`} {...link('fl')} style={{ gridRow: 3 }}>Freelance</span>
          <span className={`mark${hl('fl')}`} {...link('fl')} style={{ gridRow: 3, gridColumn: `2 / ${YEARS + 2}` }}><i />ongoing</span>
          <span className={`lab ui${hl('ed')}`} {...link('ed')} style={{ gridRow: 4 }}>{education.degree.replace('BS Information Technology', 'BSIT')}, {education.honors}</span>
          {bar('ed', 4, education.start, education.end, 'edu', '.16s')}
          <span className={`lab ui${hl('lg')}`} {...link('lg')} style={{ gridRow: 5 }}>LGU internship</span>
          {bar('lg', 5, lg.start!, lg.end!, 'intern', '.24s')}
          <span className="now-line" aria-hidden="true" style={{ gridRow: '1 / 6', gridColumn: `2 / ${YEARS + 2}` }}><b className="ui">Now</b></span>
          <span className="elapsed" aria-hidden="true" style={{ gridRow: 6, gridColumn: `2 / ${YEARS + 2}` }} />
          {Array.from({ length: YEARS - 1 }, (_, i) => (
            <span key={i} className="axis ui" style={{ gridColumn: i + 2 }}>{FIRST + i}</span>
          ))}
          <figcaption className="key ui"><span><i className="k-work" />Work</span><span><i className="k-edu" />Education</span><span><i className="k-intern" />Internship</span></figcaption>
        </figure>
        <div className="roles">
          {experience.map((e) => (
            <div key={e.key} className={`role-row${hl(e.key)}`} tabIndex={0} {...link(e.key)}>
              <span className="ui">{e.period}</span>
              <div>
                <div className="role">{e.role} <span className="org">{e.organization}</span></div>
                <p>{e.summary}</p>
                {e.award && <span className="award ui"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="12" cy="9" r="6" /><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7" /></svg>{e.award}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Band>
  )
}
