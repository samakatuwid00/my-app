import { Prompt } from '../components/ui/Prompt'
import { Reveal } from '../components/Reveal'
import { education, experience } from '../data/experience'

export function History() {
  return (
    <>
      <Prompt command="history --experience" />

      <ol className="flex flex-col gap-3">
        {experience.map((entry, index) => (
          <li key={entry.role}>
            <Reveal delay={index * 0.04}>
              <article className="rounded-panel border border-line bg-panel px-4 py-3">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h2 className="text-[15px] font-semibold text-text">{entry.role}</h2>
                  <p className="text-xs text-accent">{entry.organization}</p>
                  <p className="label ml-auto">{entry.location ?? entry.period}</p>
                </div>

                <ul className="mt-2 grid gap-x-6 gap-y-1 lg:grid-cols-2">
                  {entry.points.map((point) => (
                    <li key={point} className="prose-body flex gap-1.5 text-[13px] leading-relaxed">
                      <span aria-hidden="true" className="text-accent">
                        ·
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal delay={0.08}>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-panel border border-line bg-panel px-4 py-3">
          <span className="label">Education</span>
          <h2 className="text-[15px] font-semibold text-text">{education.school}</h2>
          <p className="prose-body text-[13px]">
            {education.degree} — <span className="text-accent-2">{education.honors}</span>
          </p>
          <p className="label ml-auto">{education.period}</p>
        </div>
      </Reveal>
    </>
  )
}
