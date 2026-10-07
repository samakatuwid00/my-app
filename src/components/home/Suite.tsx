import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { phoneSets, previewAltFor, previewFor, suiteProjects } from '../../data/projects'
import { site } from '../../data/site'
import type { ProjectFacts } from '../../types/portfolio'
import { Band } from '../layout/Band'
import { useCarriedShot } from '../../hooks/useCarriedShot'
import { CaseStudyLink } from '../screens/CaseStudyLink'
import { Figure } from '../screens/Figure'
import { PhoneFan, PhoneRow } from '../screens/PhoneSet'
import { ScreenFrame } from '../screens/ScreenFrame'
import { Arrow } from '../ui/Arrow'

const host = (url: string) => new URL(url).host.replace(/^www\./, '')
const preview = (slug: string) => {
  const p = previewFor(slug)
  if (!p) throw new Error(`No screenshot for ${slug}`)
  return p
}

// A window in the collage. data-from is where it flies in from (x, y in tenths
// of a percent of the collage width, then degrees); data-rot is where it settles;
// data-depth-c is how fast it drifts while you scroll. useScrollScene reads them.
function Piece({ href, className, from, rot, depth, title, note, children }: {
  href: string; className: string; from: string; rot: number; depth: number; title: string; note?: string; children: ReactNode
}) {
  return (
    <Link className={`piece ${className}`} to={`/${href}`} data-from={from} data-rot={rot} data-depth-c={depth}>
      <div className="pbar"><i /><i /><i /><b>{title}</b>{note && <em>{note}</em>}</div>
      {children}
    </Link>
  )
}

function Collage() {
  return (
    <div className="collage" data-collage>
      <Piece href="#irims-v-library" className="p-lib" from="70,50,7" rot={2} depth={0.1} title="Library System" note="irimsv-library.net">
        <ScreenFrame source={preview('irims-v-library')} alt={previewAltFor('irims-v-library')!} sizes="(max-width: 700px) 80vw, 560px" />
      </Piece>
      <Piece href="#irims-v" className="p-inv" from="-60,30,-5" rot={-1.5} depth={0.03} title="Inventory" note="irimsv.net">
        <ScreenFrame source={preview('irims-v')} alt={previewAltFor('irims-v')!} sizes="(max-width: 700px) 92vw, 720px" figure="opener" loading="eager" />
      </Piece>
      <Piece href="#irims-v-accounts" className="p-sso" from="-50,80,-8" rot={1.5} depth={0.16} title="Accounts" note="in progress">
        <div className="sso-body"><Figure name="sso" className="sso" /></div>
      </Piece>
      <div className="piece p-note" data-from="0,90,0" data-rot="0" data-depth-c="0.24" aria-hidden="true">
        <span>13 divisions</span><span>1 sign-in</span><span>1 server</span>
      </div>
      <Piece href="#irims-v-library-app" className="p-app" from="60,90,9" rot={-3} depth={0.2} title="Library app" note="Android · test">
        <PhoneRow phones={phoneSets.app.slice(0, 2)} />
      </Piece>
    </div>
  )
}

// What each card shows on its left: a live screen, the phone set, or the sign-in figure.
function CaseShot({ p }: { p: ProjectFacts }) {
  const carried = useCarriedShot(p.slug)
  if (p.slug === 'irims-v-library-app')
    return <div className="sf phones-frame"><PhoneFan phones={phoneSets.app} /></div>
  if (p.slug === 'irims-v-accounts')
    return <div className="sso-frame"><Figure name="sso" className="sso" /></div>
  return (
    <ScreenFrame
      source={preview(p.slug)}
      alt={previewAltFor(p.slug)!}
      sizes="(max-width: 960px) 92vw, 560px"
      figure={p.slug === 'irims-v' ? 'inventory' : 'library'}
      style={carried}
    />
  )
}

const CAPTION: Record<string, string> = {
  'irims-v': 'Division dashboard',
  'irims-v-library': 'Catalog',
  'irims-v-library-app': '17 test builds since Oct 3 · pilot next',
  'irims-v-accounts': 'How the sign-in hands off',
}

function Case({ p, n }: { p: ProjectFacts; n: number }) {
  const card = p.card!
  // Cards alternate inks; the header reads data-band to match the one under it.
  const tone = n % 2 === 0 ? 'dark' : 'light'
  const hasScreen = Boolean(previewFor(p.slug))
  return (
    <article className="case" id={p.slug} data-band={tone}>
      <div className="wrap">
        <div className="shot" data-tilt>
          <CaseShot p={p} />
          <div className="cap">
            <span>{CAPTION[p.slug]}{hasScreen && <em> · <span className="hint">hover</span> for the real screen</em>}</span>
            {p.liveUrl && <a href={p.liveUrl}>{host(p.liveUrl)} ↗</a>}
          </div>
        </div>
        <div className="body">
          <div className="top ui"><span>{n} of 4 · {card.label}</span><span className="idx">{card.note}</span></div>
          <h3 className="h3">{card.name}</h3>
          <p className="lede">{card.lede}</p>
          {p.slug === 'irims-v' && <p className="award ui"><i />{site.award.title}, Regional Director</p>}
          <ul className="points">{card.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
          <dl className="facts"><dt className="ui">Role</dt><dd>{card.role}</dd><dt className="ui">Stack</dt><dd>{card.stack}</dd></dl>
          {p.liveUrl && (
            <div className="btns">
              <a className="btn solid" href={p.liveUrl}>Live site <Arrow /></a>
              {p.caseStudy && <CaseStudyLink slug={p.slug} />}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export function Suite() {
  return (
    <>
      <Band id="work" tone="dark" className="opener">
        <div className="ghost-word" data-depth="0.25" aria-hidden="true">iRIMS-V</div>
        <div className="wrap">
          <div className="opener-head">
            <div>
              <p className="eyebrow ui">Selected work · DepEd Region V</p>
              <h2 className="h2">The iRIMS-V suite</h2>
            </div>
            <p>Four systems, one sign-in, one server I run. The inventory and the library are live across the region; the app is in test builds and the shared sign-in is being built.</p>
          </div>
          <Collage />
        </div>
      </Band>
      <section className="cases" aria-label="The four systems of the suite">
        <div className="stack">
          {suiteProjects.map((p, i) => <Case key={p.slug} p={p} n={i + 1} />)}
        </div>
      </section>
    </>
  )
}
