import { useRef, type ComponentType, type ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { skillGroups } from '../../data/facts'
import { Band } from '../layout/Band'
import { ApprovalsFigure } from './figures/ApprovalsFigure'
import { DashboardsFigure } from './figures/DashboardsFigure'
import { DeployFigure } from './figures/DeployFigure'
import { RecordsFigure } from './figures/RecordsFigure'

const STEPS: { cls: string; Figure: ComponentType; title: string; text: string }[] = [
  { cls: 'fig-records', Figure: RecordsFigure, title: 'Records', text: 'One searchable source instead of a spreadsheet per office.' },
  { cls: 'fig-approvals', Figure: ApprovalsFigure, title: 'Approvals', text: 'Requests route themselves; every decision is kept.' },
  { cls: 'fig-dash', Figure: DashboardsFigure, title: 'Dashboards', text: 'What came in, what is pending, what needs attention.' },
  { cls: 'fig-deploy', Figure: DeployFigure, title: 'Deploy and support', text: 'On servers I run, and I stay on after launch.' },
]

// The derived group is every other library the projects list; it belongs to
// the assistant's context, not to this short stack.
const DERIVED = 'Also shipped in production'
// "Pest (PHP testing)" reads as "Pest" in a tag.
const bare = (name: string) => name.replace(/\s*\(.+\)$/, '')

// .on plays the figure's entrance once; .in-view keeps its loop running only
// while it is on screen.
function Step({ cls, children }: { cls: string; children: ReactNode }) {
  const ref = useRef<HTMLLIElement>(null)
  const { inView, seen } = useInView(ref)
  return (
    <li ref={ref} className={`${cls}${seen ? ' on' : ''}${inView ? ' in-view' : ''}`}>
      {children}
    </li>
  )
}

export function Services() {
  const reduced = usePrefersReducedMotion()
  return (
    <Band id="services" tone="light" flush>
      <div className="wrap">
        <div className="head">
          <h2 className="h2">What I do</h2>
          <p>One pattern underneath every project: move the record off paper, route it, report on it, and keep it running.</p>
        </div>
        <ol id="flow" className={`flow${reduced ? '' : ' armed'}`}>
          {STEPS.map(({ cls, Figure, title, text }) => (
            <Step key={cls} cls={cls}>
              <Figure />
              <h3 className="step">{title}</h3>
              <p>{text}</p>
            </Step>
          ))}
        </ol>
        <div className="stack">
          {skillGroups
            .filter((g) => g.label !== DERIVED)
            .map((g) => (
              <div key={g.label}>
                <span className="ui">{g.label}</span>
                <ul className="tags">
                  {g.items.map((t) => (
                    <li key={t}>{bare(t)}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </Band>
  )
}
