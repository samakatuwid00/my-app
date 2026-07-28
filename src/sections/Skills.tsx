import { Reveal } from '../components/Reveal'
import { skills } from '../data/skills'

// The stack only. The services list that used to sit above it is gone from the
// site's pages — `services.ts` still feeds the assistant's answers in ask.ts.
//
// The one group with the most chips is pulled out and given the full panel
// width, and the rest balance across two CSS columns. Both halves of that are
// load-bearing, and both were measured rather than guessed:
//
// - A half-width column wraps that group to five chip rows (337px) and it then
//   sets the height of the whole block. Across the full width it is two (177px).
// - The remaining five groups are the opposite case: they are short enough that
//   two balanced columns cost ~250px where one column costs 437px.
//
// `columns` rather than `grid` because the groups have unequal heights and grid
// rows are as tall as their tallest cell — the balancing is the entire point.
const widest = skills.reduce((tallest, group) => (group.items.length > tallest.items.length ? group : tallest))
const rest = skills.filter((group) => group !== widest)

function SkillGroup({ group }: { group: (typeof skills)[number] }) {
  return (
    <section className="mb-3 break-inside-avoid">
      <h3 className="label mb-1.5">{group.label}</h3>
      <ul className="flex flex-wrap gap-1.5">
        {group.items.map(({ name, logo, icon: Icon }) => (
          <li
            key={name}
            className="flex items-center gap-2 rounded-panel border border-line bg-panel px-2.5 py-1 transition-colors duration-200 hover:border-line-strong"
          >
            {logo ? (
              <img src={logo} alt="" aria-hidden="true" loading="lazy" className="size-4 shrink-0" />
            ) : (
              Icon && <Icon size={15} aria-hidden="true" className="shrink-0 text-text-3" />
            )}
            <span className="text-xs text-text-2">{name}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Skills() {
  return (
    <Reveal>
      <div className="gap-x-6 sm:columns-2">
        {rest.map((group) => (
          <SkillGroup key={group.label} group={group} />
        ))}
      </div>

      <SkillGroup group={widest} />
    </Reveal>
  )
}
