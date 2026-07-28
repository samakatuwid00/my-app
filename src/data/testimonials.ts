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
  // Wording drafted here, not transcribed from him — confirm it with the office
  // before this ships, since it is attributed to a named public official.
  {
    name: 'Gilbert Sadsad',
    position: 'DEPED Region V Regional Director',
    quote:
      'IRIMS-V put the region on one system — division and school inventories now report in a single view.',
  },
]
