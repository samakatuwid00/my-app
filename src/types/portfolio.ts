export type ProjectStatus = 'live' | 'internal' | 'demo' | 'in-progress' | 'private'

export type ProjectGroup = 'suite' | 'also' | 'log'

export type ProjectCard = {
  name: string // the name on the card, e.g. "iRIMS-V Inventory"
  label: string // the eyebrow, e.g. "Inventory"
  note: string // the status line, e.g. "live · 13 divisions"
  lede: string // one sentence
  points: string[] // three at most
  role: string
  stack: string // one line, dot-separated
}

// Case-study copy. Every featured project has one, built only from facts
// already on the site; a project without `caseStudy` has no case-study route.
export type CaseStudy = {
  expansion?: string // e.g. "Integrated Resource Inventory and Mapping System for Region V"
  lede: string
  problem: string
  approach: string[]
  result: string
}

// Text only, and deliberately free of asset imports: the serverless assistant
// bundles this data for its system prompt and cannot resolve Vite asset URLs.
// Screenshots are keyed by `slug` in projects.ts.
export type ProjectFacts = {
  slug: string
  title: string
  category: string // "Regional inventory", "Library circulation", ...
  description: string // one paragraph shown on the home page
  client?: string
  role?: string
  stack: string // short, comma-separated, shown in the facts list
  technologies: string[] // full list, used by the assistant
  features: string[]
  status: ProjectStatus
  // Where the home page shows it: one of the four iRIMS-V suite cards, the
  // "Also in production" pair, or the build log.
  group: ProjectGroup
  // The short card copy. Kept apart from `description` so the assistant keeps
  // its full paragraph while the page stays brief.
  card?: ProjectCard
  liveUrl?: string
  // Public source repo. Leave it off any repo that is private or exposes
  // private data: a visitor who follows it lands on a 404 or on data that was
  // never meant to be published.
  githubUrl?: string
  caseStudy?: CaseStudy
  // Empty on every project on purpose: no user count, office count, or
  // migration figure has been cleared for publication. Fill this in only with
  // numbers the owner confirms. An approximate metric on a portfolio reads as
  // a claim, and one wrong number costs more than four missing ones.
  metrics?: string[]
}

export type TimelineKey = 'r5' | 'co' | 'fl' | 'lg'

export type TimelineEntry = {
  key: TimelineKey
  role: string
  organization: string
  period: string // display, e.g. "2025 – Present"
  summary: string // one line
  start: number | null // year; null when not recorded (Freelance)
  end: number | null // year; null = ongoing
  award?: string
}

export type Testimonial = {
  name: string
  position: string
  quote: string
}

export type Stat = {
  label: string
  value: string
}

export type AskRole = 'user' | 'assistant'

export type AskTurn = {
  role: AskRole
  text: string
}

export type AskMessage = AskTurn & {
  id: number
}

export type ContactPayload = {
  fullName: string
  email: string
  subject: string
  message: string
}
