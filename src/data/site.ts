// Confirmed from the résumé (2026-07): the handle is mr-nikoo. The old build's
// footer link to github.com/samakatuwid00 was wrong.
export const GITHUB_URL = 'https://github.com/mr-nikoo'
export const GITHUB_HANDLE = 'mr-nikoo'

// The About copy, split at its own sentence boundaries into the three blocks
// /about renders. `site.intro` is rejoined from the `body` fields rather than
// stored twice, so the hero and the assistant's context can never drift apart.
// `extra` is deliberately outside that join — it deepens a block on the page
// without lengthening the one-paragraph intro.
export const aboutBlocks = [
  {
    label: 'who',
    body:
      "I'm a full-stack developer who turns manual, paper-and-spreadsheet processes into web systems people actually use.",
  },
  {
    label: 'what I build',
    body:
      "I started at DepEd's Central Office building a national learning-resource platform, and now design, ship, and maintain systems at the regional level — alongside project-based work for clients: HR automation, booking platforms, dashboards, and business systems.",
    extra:
      'Alongside my government work I take on project-based engagements. HR at DepEd Naga hired me to build EDULEAVE, a leave-credit system that replaced their manual leave cards for teaching and non-teaching staff with an approval workflow they can audit — scoped, built, deployed, and supported by me directly. I work the same way with private clients: understand the process as it actually runs today, build the system that fixes it, deploy it, and stay available when it needs to change.',
  },
  {
    label: 'how I work',
    body:
      "Whether it's a government office or a resort, the problem is usually the same: scattered records, slow approvals, no visibility. I build the system that fixes that, then keep it running.",
  },
] as const

export const site = {
  name: 'Roger A. Abay Jr.',
  role: 'Full-Stack Developer',
  shellTitle: 'roger@portfolio:~',
  email: 'abaygherjr07@gmail.com',
  phone: '+63 956-642-2783',
  // Region only — the résumé's street address is deliberately not published.
  location: 'Pasacao, Camarines Sur, Philippines',
  intro: aboutBlocks.map((block) => block.body).join(' '),
  award: {
    label: 'Awards & Recognition',
    title: 'Full Stack Developer Award',
    caption: 'Regional government system launch',
  },
  feedback: {
    heading: 'Trusted for practical, maintainable systems',
  },
  // Shown beside the contact CTA. Government scale reads as a trust signal to a
  // private client — the same reason the projects are tagged by capability
  // rather than filed under "government work".
  trustBadges: [
    'Trusted with a national-scale DepEd platform',
    'Full Stack Developer Award — regional government system launch',
  ],
  contact: {
    heading: "Let's turn your ideas into scalable systems",
    paragraph:
      'Send a message about your booking platform, business dashboard, HR workflow, inventory system, API integration, or government system requirement — or about modernizing a process that still runs on paper and spreadsheets.',
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
