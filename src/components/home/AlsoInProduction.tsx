import { alsoProjects, previewAltFor, previewFor } from '../../data/projects'
import { Band } from '../layout/Band'
import { useCarriedShot } from '../../hooks/useCarriedShot'
import { CaseStudyLink } from '../screens/CaseStudyLink'
import { ScreenFrame } from '../screens/ScreenFrame'
import type { ProjectFacts } from '../../types/portfolio'
import { Arrow } from '../ui/Arrow'

const host = (url: string) => new URL(url).host.replace(/^www\./, '')

function Duo({ p }: { p: ProjectFacts }) {
  const card = p.card!
  const carried = useCarriedShot(p.slug)
  return (
    <article className="duo rv" id={p.slug}>
      <div className="shot" data-tilt>
        <ScreenFrame
          source={previewFor(p.slug)!}
          alt={previewAltFor(p.slug)!}
          sizes="(max-width: 700px) 92vw, 560px"
          figure={p.slug === 'eduleave' ? 'eduleave' : 'lrmis'}
          style={carried}
        />
      </div>
      <div className="top ui"><span>{card.label}</span><span className="idx">{card.note}</span></div>
      <h3 className="h3">{card.name}</h3>
      <p>{card.lede}</p>
      <p className="meta">{card.role} · {card.stack}</p>
      <div className="btns">
        {p.liveUrl && <a className="btn line" href={p.liveUrl}>{host(p.liveUrl)} <Arrow /></a>}
        {p.caseStudy && <CaseStudyLink slug={p.slug} />}
      </div>
    </article>
  )
}

// The two production systems outside the suite, side by side.
export function AlsoInProduction() {
  return (
    <Band id="also" tone="dark" className="also">
      <div className="wrap">
        <div className="also-head">
          <h2 className="h2">Also in production</h2>
          <p>Two more systems people use every day, outside the suite.</p>
        </div>
        <div className="pair">
          {alsoProjects.map((p) => <Duo key={p.slug} p={p} />)}
        </div>
      </div>
    </Band>
  )
}
