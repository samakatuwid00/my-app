import type { LucideIcon } from 'lucide-react'

export type ProjectStatus = 'live' | 'internal'

// Text only, and deliberately free of asset imports: the serverless assistant
// bundles this data for its system prompt and cannot resolve Vite asset URLs.
export type ProjectFacts = {
  title: string
  description: string
  features: string[]
  technologies: string[]
  status: ProjectStatus
  liveUrl?: string
}

export type Project = ProjectFacts & {
  previewImage: string
  icon: LucideIcon
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
