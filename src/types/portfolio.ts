import type { LucideIcon } from 'lucide-react'

export type ProjectStatus = 'live' | 'internal'

export type Project = {
  title: string
  description: string
  features: string[]
  technologies: string[]
  status: ProjectStatus
  liveUrl?: string
  previewImage: string
  icon: LucideIcon
}

export type Technology = {
  name: string
  logo: string
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

export type ContactPayload = {
  fullName: string
  email: string
  subject: string
  message: string
}
