import type { Testimonial } from '../types/portfolio'

// Every quote must name something a visitor can actually see on this site. A
// third quote praising a mood-tracking app was removed for that reason — the app
// appears nowhere here, so the quote read as borrowed. A private-sector quote
// belongs in this list once a real one is obtained; nothing is placeheld.
export const testimonials: Testimonial[] = [
  {
    name: 'Cesar Arriola',
    position: 'DEPED LRMS Supervisor',
    quote:
      'The inventory system gave our team clear visibility from summary dashboards down to individual resource records.',
  },
  {
    name: 'Rose Burce',
    position: 'DEPED HR Coordinator',
    quote:
      'Our leave approval process became faster, auditable, and easier for employees and administrators to manage.',
  },
  // Verbatim from the Certificate of Recognition he signed — the same document
  // photographed in the award card on this view. An earlier version of this entry
  // was wording drafted in this repo and attributed to him, which put invented
  // words in a serving official's mouth; a citation he actually signed says more
  // and needs nobody's permission. `source` is what keeps it honest: it is a
  // quotation from a document, not something he said.
  {
    name: 'Gilbert T. Sadsad',
    position: 'Regional Director, DepEd Region V',
    quote:
      'For his invaluable contributions, dedication, and exemplary service as Full Stack Systems Programmer of the Integrated Resource Inventory and Mapping System for Region V (IRIMS-V).',
    source: 'Certificate of Recognition · 23 June 2026',
  },
]
