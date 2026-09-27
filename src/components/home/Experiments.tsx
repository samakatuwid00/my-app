import { experiments, previewFor } from '../../data/projects'
import type { ProjectFacts } from '../../types/portfolio'
import { Band } from '../layout/Band'
import { Halftone } from '../ui/Halftone'

const THUMB_SIZES = '(max-width: 960px) 112px, 200px'

// Cygnus has a bundled screenshot; Sticky Brain and Second Brain only carry a
// poster under public/. The name beside the thumbnail says what it is, so the
// image itself is decoration.
function Thumb({ p }: { p: ProjectFacts }) {
  const preview = previewFor(p.slug)
  if (preview) return <Halftone source={preview} alt="" sizes={THUMB_SIZES} className={p.slug === 'cygnus' ? 'center' : ''} />
  if (p.media?.poster) {
    return (
      <div className="ht">
        <img src={p.media.poster} alt="" loading="lazy" decoding="async" />
      </div>
    )
  }
  return null
}

export function Experiments() {
  return (
    <Band id="experiments" tone="light" flush>
      <div className="wrap">
        <div className="head">
          <h2 className="h2">Experiments</h2>
          <p>Personal projects in AI tooling, built to learn.</p>
        </div>
        <div className="index">
          {experiments.map((p) => {
            const body = (
              <>
                <Thumb p={p} />
                <div><div className="name">{p.title}</div><p>{p.description}</p></div>
              </>
            )
            // Only a public repo is linked. Cygnus stays unlinked until its repo
            // is cleaned up, and a private project says so instead.
            return p.githubUrl ? (
              <a key={p.slug} href={p.githubUrl}>
                {body}
                <span className="ui go">
                  Source
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
                </span>
              </a>
            ) : (
              <div key={p.slug} className="item">
                {body}
                {p.status === 'private' && <span className="ui soft">Private</span>}
              </div>
            )
          })}
        </div>
      </div>
    </Band>
  )
}
