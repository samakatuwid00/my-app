// The active handle is samakatuwid00 (used by the live footer, demo-repo links,
// and the résumé contact line). An older build's footer pointed at mr-nikoo;
// that was the wrong account. Keep GITHUB_URL on samakatuwid00.
export const GITHUB_URL = 'https://github.com/samakatuwid00'

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
      { term: 'A DepEd division HR office · project-based', detail: 'EDULEAVE – leave credits for teaching and non-teaching staff' },
      { term: 'Private clients', detail: 'resort operations: reservations, guest records, dashboards' },
    ],
  },
  {
    label: 'how I work',
    body: "Government office or resort, the problem is the same – scattered records, slow approvals, no visibility:",
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
    ? `${block.body} ${block.points.map((point) => `${point.term} – ${point.detail}`).join('; ')}.`
    : block.body

export const site = {
  name: 'Roger A. Abay Jr.',
  role: 'Full-Stack Developer',
  // The employer the boot log and the whoami line name. It was only ever spelled
  // out inside `aboutBlocks`, which meant the intro had nowhere to read it from
  // and would have had to hard-code it.
  org: 'DepEd Region V',
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
    'Full Stack Developer Award – regional government system launch',
  ],
  contact: {
    heading: "Let's turn your ideas into scalable systems",
    paragraph:
      'Send a message about your booking platform, business dashboard, HR workflow, inventory system, API integration, or government system requirement – or about modernizing a process that still runs on paper and spreadsheets.',
  },
} as const

export const socialLinks = [
  { label: 'GitHub', href: GITHUB_URL, brand: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/roger-abay-30394441b', brand: 'linkedin' },
  { label: 'Facebook', href: 'https://www.facebook.com/niko.0y', brand: 'facebook' },
] as const

// Redesign copy, verbatim from the approved mockup (docs/redesign-mockup-v2.html).
// The FAQ leaves out "Do you work remotely?" until the owner answers it.
export const hero = {
  name: ['Roger A.', 'Abay Jr.'],
  tagline: 'Full-stack developer. Systems that replace paper.',
  lede: 'I scope, build, deploy, and keep running the Laravel and PostgreSQL systems DepEd offices use every day, from a regional inventory to a national learning-resource platform. Based in Camarines Sur, Philippines.',
} as const

export const credits = [
  { term: 'Now', detail: 'Full-Stack Developer, DepEd Region V' },
  { term: 'Before', detail: 'Web Systems Developer, DepEd Central Office' },
  { term: 'Recognized', detail: 'Full Stack Developer Award' },
  { term: 'Education', detail: 'BSIT, Cum Laude, STI College Naga' },
] as const

// The portrait's thought bubble cycles through these, one per visit.
export const thoughts = [
  'Right now: building the iRIMS-V Library app in Flutter.',
  'Still shipping updates to iRIMS-V.',
  'Every paper form is a system waiting to happen.',
  'Ask me about Laravel, PostgreSQL, or keeping a VPS alive.',
  'Cygnus, my voice assistant, is listening. Mostly.',
] as const

export const faq = [
  {
    q: 'What kind of systems do you build?',
    a: 'Systems that replace a manual process end to end: records and inventory, approval workflows, and dashboards and reports. iRIMS-V, EDULEAVE, and LRMIS are all live examples.',
  },
  {
    q: 'Can you take over or maintain an existing system?',
    a: 'Yes. Support is part of how I work: I stay available when a system needs to change, and I maintain the regional systems I built.',
  },
  {
    q: 'Where does the system run?',
    a: 'On a Linux VPS I set up and manage, with Docker, Coolify, and Nginx. Deployment and releases are part of the job, not a handoff.',
  },
  {
    q: 'How do we start?',
    a: 'Send a short description of the process as it runs today. I start by understanding how it actually works before proposing anything.',
  },
] as const
