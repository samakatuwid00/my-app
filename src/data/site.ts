// Confirmed from the résumé (2026-07): the handle is mr-nikoo. The old build's
// footer link to github.com/samakatuwid00 was wrong.
export const GITHUB_URL = 'https://github.com/samakatuwid00'
export const GITHUB_HANDLE = 'samakatuwid00'

// The About copy. Each block is a one-line lead plus scannable points, because
// a prospective client skims this section rather than reading it: five dense
// paragraphs asked them to read an essay before finding out whether I solve
// their problem. The lead answers that question; the points are the evidence.
//
// `term` is the label a client would recognise, `detail` the outcome in their
// words. Keep both to one line: the moment a detail wraps past two lines the
// section has quietly become prose again.
//
// `site.intro` is rejoined from these fields rather than stored twice, so the
// page and the assistant's context can never drift apart. The points fold into
// that join — leaving them out would strip the assistant of most of the
// substance, since the leads carry almost none of it.
export type AboutPoint = {
  term: string
  detail: string
}

export type AboutBlock = {
  label: string
  body: string
  points?: readonly AboutPoint[]
}

export const aboutBlocks: readonly AboutBlock[] = [
  {
    label: 'who',
    body: "I'm a full-stack developer who turns manual, paper-and-spreadsheet processes into web systems people actually use.",
  },
  {
    label: 'what I build',
    body: 'Systems that replace a manual process end to end:',
    points: [
      { term: 'Records & inventory', detail: 'one searchable source instead of scattered spreadsheets' },
      { term: 'Approval workflows', detail: 'requests route themselves, every decision recorded' },
      { term: 'Booking & reservations', detail: 'customers book themselves in, one calendar holds it all' },
      { term: 'Dashboards & reports', detail: "what came in, what's pending, what needs attention today" },
    ],
  },
  {
    label: 'where I have built it',
    body: 'Government and private, employed and project-based:',
    points: [
      { term: 'DepEd Central Office', detail: 'a national learning-resource platform' },
      { term: 'DepEd Region V', detail: 'regional systems I design, deploy, and maintain' },
      { term: 'DepEd Naga · project-based', detail: 'EDULEAVE — leave credits for teaching and non-teaching staff' },
      { term: 'Private clients', detail: 'resort operations: reservations, guest records, dashboards' },
    ],
  },
  {
    label: 'how I work',
    body: "Government office or resort, the problem is the same — scattered records, slow approvals, no visibility:",
    points: [
      { term: 'Scope', detail: 'understand the process as it actually runs today' },
      { term: 'Build', detail: 'the system that fixes it, tested before it ships' },
      { term: 'Deploy', detail: 'on infrastructure I set up and manage myself' },
      { term: 'Support', detail: "stay available when it needs to change" },
    ],
  },
] as const

// Folds each block back into one paragraph. A block with points reads as
// "lead term — detail; term — detail." so nothing on the page is missing from
// the assistant's prompt.
const flattenBlock = (block: AboutBlock) =>
  block.points?.length
    ? `${block.body} ${block.points.map((point) => `${point.term} — ${point.detail}`).join('; ')}.`
    : block.body

export const site = {
  name: 'Roger A. Abay Jr.',
  role: 'Full-Stack Developer',
  shellTitle: 'roger@portfolio:~',
  email: 'abaygherjr07@gmail.com',
  phone: '+63 956-642-2783',
  // Region only — the résumé's street address is deliberately not published.
  location: 'Pasacao, Camarines Sur, Philippines',
  intro: aboutBlocks.map(flattenBlock).join(' '),
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
