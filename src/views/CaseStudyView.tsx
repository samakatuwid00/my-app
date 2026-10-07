import { Link, useParams } from 'react-router-dom'
import { Band } from '../components/layout/Band'
import { Halftone } from '../components/ui/Halftone'
import { projectFacts } from '../data/facts'
import { alsoProjects, previewAltFor, previewFor, suiteProjects } from '../data/projects'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { NotFoundView } from './NotFoundView'

const host = (url: string) => new URL(url).host.replace(/^www\./, '')
const STATUS: Record<string, string> = { live: 'Live', internal: 'Internal', 'in-progress': 'In progress' }

// The next featured project with its own case study, wrapping around. Never the
// current one: with a single case study there is no "Next" at all.
function nextCaseStudy(slug: string) {
  const withCase = [...suiteProjects, ...alsoProjects].filter((p) => p.caseStudy)
  const i = withCase.findIndex((p) => p.slug === slug)
  const next = i === -1 ? undefined : withCase[(i + 1) % withCase.length]
  return next && next.slug !== slug ? next : undefined
}

export function CaseStudyView() {
  const { slug = '' } = useParams()
  const project = projectFacts.find((p) => p.slug === slug)
  useDocumentTitle(project?.caseStudy ? `${project.title} · Roger A. Abay Jr.` : undefined)

  if (!project?.caseStudy) return <NotFoundView />
  const cs = project.caseStudy
  const preview = previewFor(slug)
  const next = nextCaseStudy(slug)

  return (
    <>
      <Band as="div" tone="dark">
        <div className="wrap cs-hero">
          <Link className="back ui" to="/#work" viewTransition>
            <span aria-hidden="true">← </span>All work
          </Link>
          <h1 className="display">{project.title}</h1>
          <p className="lede">{cs.expansion ? `${cs.expansion}. ${cs.lede}` : cs.lede}</p>
          <dl className="cs-meta">
            {project.role && (<div><dt className="ui">Role</dt><dd>{project.role}</dd></div>)}
            {project.client && (<div><dt className="ui">Client</dt><dd>{project.client}</dd></div>)}
            <div><dt className="ui">Stack</dt><dd>{project.stack}</dd></div>
            <div>
              <dt className="ui">Status</dt>
              <dd>
                {project.liveUrl ? (
                  <a className="live" href={project.liveUrl}>Live at {host(project.liveUrl)}</a>
                ) : (
                  STATUS[project.status] ?? project.status
                )}
              </dd>
            </div>
          </dl>
          {preview && (
            // Always named "shot": the home preview only takes the name while a
            // transition runs, so the two never hold it at once.
            <Halftone
              className="cs-shot"
              source={preview}
              alt={previewAltFor(slug) ?? `${project.title} screenshot`}
              sizes="(max-width: 1120px) 100vw, 1056px"
              loading="eager"
              fetchPriority="high"
              style={{ viewTransitionName: 'shot' }}
            />
          )}
        </div>
      </Band>
      <Band as="div" tone="light">
        <div className="wrap cs-body">
          <div className="cs-sec">
            <h2 className="h3">Problem</h2>
            <div className="prose"><p>{cs.problem}</p></div>
          </div>
          <div className="cs-sec">
            <h2 className="h3">Approach</h2>
            <div className="prose">
              <ul>
                {cs.approach.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </div>
          </div>
          <div className="cs-sec">
            <h2 className="h3">Result</h2>
            {/* The mockup's metric rows are left out: no number is confirmed yet, and a placeholder reads as a claim. */}
            <div className="prose"><p>{cs.result}</p></div>
          </div>
          <div className="next ui">
            <Link to="/#work" viewTransition>
              <span aria-hidden="true">← </span>All work
            </Link>
            {next && (
              <Link to={`/work/${next.slug}`} viewTransition>
                Next: {next.title}<span aria-hidden="true"> →</span>
              </Link>
            )}
          </div>
        </div>
      </Band>
    </>
  )
}
