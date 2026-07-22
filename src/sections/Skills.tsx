import { Prompt } from '../components/ui/Prompt'
import { Reveal } from '../components/Reveal'
import { deliverables } from '../data/deliverables'
import { technologies } from '../data/technologies'

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

        <p className="label mt-5 mb-2">Stack</p>
        <ul className="flex flex-wrap gap-2">
          {technologies.map((technology) => (
            <li
              key={technology.name}
              className="flex items-center gap-2 rounded-panel border border-line bg-panel px-2.5 py-1.5 transition-colors duration-200 hover:border-line-strong"
            >
              <img src={technology.logo} alt="" aria-hidden="true" loading="lazy" className="size-4 shrink-0" />
              <span className="text-xs text-text-2">{technology.name}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </>
  )
}
