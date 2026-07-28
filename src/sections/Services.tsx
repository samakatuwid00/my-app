import { Reveal } from '../components/Reveal'
import { services } from '../data/services'

// Split out of Skills when /projects became sub-views: what I can build for you
// and what I build it with are two answers, and holding them in one panel put
// that panel 474px over the pane at 1200×800.
export function Services() {
  return (
    <Reveal>
      <p className="label mb-1.5">What I can build for you</p>
      <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li key={service.id} className="flex gap-1.5">
            <span aria-hidden="true" className="text-accent">
              +
            </span>
            <span>
              <span className="block text-xs leading-snug text-text-2">{service.name}</span>
              <span className="prose-body mt-0.5 block text-[11px] leading-snug">{service.pitch}</span>
            </span>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}
