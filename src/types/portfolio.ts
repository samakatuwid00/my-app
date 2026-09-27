import type { ComponentType } from 'react'
import type { PictureSource } from '../components/ui/Picture'

export type ProjectStatus = 'live' | 'internal' | 'demo' | 'in-progress' | 'private'

// The approved case-study copy. Only iRIMS-V has one today; a project without
// `caseStudy` links to its live site instead of a case-study route.
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
  featured?: boolean // appears as a large case row
  hidden?: boolean // never rendered, never sent to the assistant
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
  // Plain public/ paths, no Vite imports, so the assistant-bundled facts stay
  // asset-free. `video` plays inline with the poster as its cover.
  media?: { poster: string; video?: string }
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

// LEGACY: removed in Task 13. The old ProjectCard / ProjectDetail / Projects
// section still read these. The case-study fields are optional and no project
// sets them; `icon` is a placeholder component, since the lucide icons were
// dropped from projects.ts.
export type Capability =
  | 'Operations & inventory'
  | 'HR & workflow automation'
  | 'Bookings & hospitality'
  | 'Analytics & reporting'

// LEGACY: removed in Task 13.
export type Project = ProjectFacts & {
  previewImage?: PictureSource
  icon: ComponentType<{ size?: number }>
  sector?: string
  capabilities?: Capability[]
  problem?: string
  approach?: string
  outcome?: string
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

export type NavItem = {
  label: string
  to: string
  id: string
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
