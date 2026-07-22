// Confirmed from the résumé (2026-07): the handle is mr-nikoo. The old build's
// footer link to github.com/samakatuwid00 was wrong.
export const GITHUB_URL = 'https://github.com/mr-nikoo'
export const GITHUB_HANDLE = 'mr-nikoo'

export const site = {
  name: 'Roger A. Abay Jr.',
  role: 'Full-Stack Developer',
  shellTitle: 'roger@portfolio:~',
  email: 'abaygherjr07@gmail.com',
  phone: '+63 956-642-2783',
  // Region only — the résumé's street address is deliberately not published.
  location: 'Pasacao, Camarines Sur, Philippines',
  intro:
    'I build production web systems for government offices and businesses — replacing manual processes with reliable workflows, records management, reporting, and analytics dashboards.',
  award: {
    label: 'Awards & Recognition',
    title: 'Full Stack Developer Award',
    caption: 'Regional government system launch',
  },
  feedback: {
    heading: 'Trusted for practical, maintainable systems',
  },
  contact: {
    heading: "Let's turn your ideas into scalable systems",
    paragraph:
      'Send a message about your government system, business platform, dashboard, HR workflow, reporting process, API integration, or database-backed application requirement.',
  },
} as const

export const systemFacts = [
  { label: 'Role', value: 'Full-Stack Developer' },
  { label: 'Sector', value: 'Government / Private' },
  { label: 'Stack', value: 'Laravel · React · PostgreSQL' },
  { label: 'Base', value: 'Camarines Sur, PH' },
] as const

export const socialLinks = [
  { label: 'GitHub', href: GITHUB_URL, brand: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/roger-abay-30394441b', brand: 'linkedin' },
  { label: 'Facebook', href: 'https://www.facebook.com/niko.0y', brand: 'facebook' },
] as const
