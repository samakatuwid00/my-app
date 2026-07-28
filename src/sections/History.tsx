import { Reveal } from '../components/Reveal'
import { experience } from '../data/experience'

export function History() {
  return (
    // Two columns, and the points inside each entry go back to one — the entries
    // stack about half as tall this way, and a point list two columns deep
    // inside a half-width card wraps every line.
    <ol className="grid gap-0.5 lg:grid-cols-2">
      {experience.map((entry, index) => (
        <li key={entry.role}>
          <Reveal delay={index * 0.04} className="h-full" dissolve>
            <article className="h-full rounded-panel border border-line bg-panel px-2.5 py-1">
              {/* Role and period on one line, organisation on the next. The
                  three used to share one wrapping flex row, where `ml-auto` on
                  the period forced a break as soon as a long organisation name
                  arrived: "DepEd Central Office — National Learning Resource
                  Platform" pushed that header to 70px against another card's
                  21px, and because the cards are `h-full` the taller one set the
                  height of its whole row. */}
              <div className="flex items-baseline gap-x-3">
                <h2 className="min-w-0 text-[13px] font-semibold leading-snug text-text">{entry.role}</h2>
                <p className="label ml-auto shrink-0">{entry.location ?? entry.period}</p>
              </div>
              <p className="text-[11px] leading-snug text-accent">{entry.organization}</p>

              <ul className="mt-0.5 flex flex-col">
                {entry.points.map((point) => (
                  <li key={point} className="prose-body flex gap-1.5 leading-snug">
                    <span aria-hidden="true" className="shrink-0 text-accent">
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
  )
}
