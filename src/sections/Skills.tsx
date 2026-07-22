import { Prompt } from '../components/ui/Prompt'
import { Reveal } from '../components/Reveal'
import { deliverables } from '../data/deliverables'
import { skills } from '../data/skills'

export function Skills() {
  return (
    <>
      <Prompt command="cat skills.txt" />

      <Reveal>
        <p className="label mb-2">What I deliver</p>
        <ul className="grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((item) => (
            <li key={item} className="flex gap-1.5 text-xs text-text-2">
              <span aria-hidden="true" className="text-accent">
                +
              </span>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-5 grid gap-5 border-t border-line pt-4 sm:grid-cols-2">
          {skills.map((group) => (
            <section key={group.label}>
              <h3 className="label mb-2">{group.label}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map(({ name, logo, icon: Icon }) => (
                  <li
                    key={name}
                    className="flex items-center gap-2 rounded-panel border border-line bg-panel px-2.5 py-1.5 transition-colors duration-200 hover:border-line-strong"
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
          ))}
        </div>
      </Reveal>
    </>
  )
}
