import { Reveal } from '../components/Reveal'
import { education } from '../data/experience'

export function Education() {
  return (
    <Reveal delay={0.08} dissolve>
      <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-panel border border-line bg-panel px-3.5 py-2.5">
        <span className="label">Education</span>
        <h2 className="text-[14px] font-semibold text-text">{education.school}</h2>
        <p className="prose-body">
          {education.degree} – <span className="text-accent-2">{education.honors}</span>
        </p>
        <p className="label ml-auto">{education.period}</p>
      </div>
    </Reveal>
  )
}
