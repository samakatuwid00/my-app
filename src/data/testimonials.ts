import type { Testimonial } from '../types/portfolio'

// Every quote must name something a visitor can actually see on this site. A
// third quote praising a mood-tracking app was removed for that reason — the app
// appears nowhere here, so the quote read as borrowed. A private-sector quote
// belongs in this list once a real one is obtained; nothing is placeheld.
export const testimonials: Testimonial[] = [
  // Verbatim from the Certificate of Recognition he signed — the document
  // photographed in the award card on this view. Cut at a clause boundary to
  // match the length of the other two, with nothing removed from inside the
  // sentence: the citation continues "…of the Integrated Resource Inventory and
  // Mapping System for Region V (IRIMS-V)", which the award card already names.
  // First, beside the award it cites, in the approved mockup's order.
  {
    name: 'Gilbert T. Sadsad',
    position: 'Regional Director, DepEd Region V',
    quote:
      'For his invaluable contributions, dedication, and exemplary service as Full Stack Systems Programmer.',
  },
  {
    name: 'Cesar Arriola',
    position: 'LRMS Supervisor, DepEd',
    quote:
      'The inventory system gave our team clear visibility from summary dashboards down to individual resource records.',
  },
  {
    name: 'Rose Burce',
    position: 'HR Coordinator, DepEd',
    quote:
      'Our leave approval process became faster, auditable, and easier for employees and administrators to manage.',
  },
]
