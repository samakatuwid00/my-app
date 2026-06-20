import type { LucideIcon } from 'lucide-react'

export type SkillGroup = {
  category: string
  icon: LucideIcon
  skills: Array<{
    name: string
    level: number
  }>
}

export type Project = {
  title: string
  description: string
  features: string[]
  technologies: string[]
  accent: string
}

export type TimelineItem = {
  role: string
  summary: string
  achievements: string[]
}

export type Service = {
  title: string
  description: string
  icon: LucideIcon
}

export type Technology = {
  name: string
  logo: string
  color: string
}

export type Testimonial = {
  name: string
  position: string
  quote: string
}

export type ContactPayload = {
  fullName: string
  email: string
  subject: string
  message: string
}
