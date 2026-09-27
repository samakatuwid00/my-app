import { Link } from 'react-router-dom'
import { featuredProjects, moreProjects, previewAltFor, previewFor } from '../../data/projects'
import { Band } from '../layout/Band'
import { Halftone } from '../ui/Halftone'

const WORDS = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
const count = (n: number) => WORDS[n] || String(n)
const host = (url: string) => new URL(url).host.replace(/^www\./, '')

export function SelectedWork() {
  const n = featuredProjects.length
  return (
    <Band id="work" tone="light">
      <div className="wrap">
        <div className="head">
          <h2 className="h2">Selected work</h2>
          <p>
            {count(n)} {n === 1 ? 'system' : 'systems'} in production. Each one replaced a process an office ran on
            paper, spreadsheets, or email.
          </p>
        </div>
        {featuredProjects.map((p) => {
          const preview = previewFor(p.slug)
          const shot = preview && <Halftone source={preview} alt={previewAltFor(p.slug) ?? `${p.title} screenshot`} />
          return (
            <article className="case" key={p.slug}>
              {shot &&
                (p.caseStudy ? (
                  <Link to={`/work/${p.slug}`} aria-label={`${p.title} case study`} viewTransition data-shot={p.slug}>
                    {shot}
                  </Link>
                ) : (
                  p.liveUrl && (
                    <a href={p.liveUrl} aria-label={`${p.title} live site`}>
                      {shot}
                    </a>
                  )
                ))}
              <div>
                <h3 className="h3">{p.title}</h3>
                <p>{p.description}</p>
                <dl className="facts">
                  {p.client && (<><dt className="ui">Client</dt><dd>{p.client}</dd></>)}
                  {p.role && (<><dt className="ui">Role</dt><dd>{p.role}</dd></>)}
                  <dt className="ui">Stack</dt><dd>{p.stack}</dd>
                  {p.metrics?.[0] && (<><dt className="ui">Result</dt><dd>{p.metrics[0]}</dd></>)}
                </dl>
                <div className="btns">
                  {p.caseStudy && <Link className="btn solid" to={`/work/${p.slug}`} viewTransition>Case study</Link>}
                  {p.liveUrl && <a className="btn tint live" href={p.liveUrl}>{host(p.liveUrl)}</a>}
                </div>
              </div>
            </article>
          )
        })}
        <div className="table" style={{ marginTop: 40 }}>
          {moreProjects.map((p) => (
            <div className="tr" key={p.slug}>
              <span className="ui">{p.category}</span>
              <div><div className="name">{p.title}</div><p>{p.description}</p></div>
              <span className="ui soft">{p.status === 'in-progress' ? 'In progress' : 'Internal'}</span>
            </div>
          ))}
        </div>
      </div>
    </Band>
  )
}
