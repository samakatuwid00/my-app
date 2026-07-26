import type { Stat } from '../types/portfolio'

// Worded as outcomes a client can price, not as résumé headings. "Largest
// deployment" is the government scale repositioned as a trust signal rather
// than as the site's subject.
// Exported on its own so prose elsewhere can interpolate it by name. It used to
// be read as `stats[0].value`, which silently produces "National (DepEd) building
// production systems." the moment this array is reordered.
export const YEARS_SHIPPING = '2+ years'

export const stats: Stat[] = [
  { label: 'Shipping production systems', value: YEARS_SHIPPING },
  { label: 'Largest deployment', value: 'National (DepEd)' },
  { label: 'Sectors', value: 'Government · Hospitality · HR' },
  { label: 'Full Stack Developer Award', value: 'Regional launch' },
]
