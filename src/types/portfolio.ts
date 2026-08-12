import type { LucideIcon } from 'lucide-react'
import type { PictureSource } from '../components/ui/Picture'

export type ProjectStatus = 'live' | 'internal' | 'demo'

// What the system does for a business, which is what a prospect is shopping for.
// Sector is the secondary fact — a resort and a division office buy the same
// capability under different names.
export type Capability =
  | 'Operations & inventory'
  | 'HR & workflow automation'
  | 'Bookings & hospitality'
  | 'Analytics & reporting'

// Text only, and deliberately free of asset imports: the serverless assistant
// bundles this data for its system prompt and cannot resolve Vite asset URLs.
export type ProjectFacts = {
  title: string
  description: string
  features: string[]
  technologies: string[]
  status: ProjectStatus
  liveUrl?: string
  // Public source repo for unhosted / local projects. When present the detail
  // modal footer links here instead of showing a demo or "no public URL".
  githubUrl?: string
  // Case-study fields. All optional, so a project with no confirmed copy still
  // renders — the card falls back to `description` and the detail view omits
  // the block entirely rather than showing empty headings.
  sector?: string
  capabilities?: Capability[]
  problem?: string
  approach?: string
  outcome?: string
  // Empty on every project on purpose: no user count, office count, or
  // migration figure has been cleared for publication. Fill this in only with
  // numbers the owner confirms — an approximate metric on a portfolio reads as
  // a claim, and one wrong number costs more than four missing ones.
  metrics?: string[]
  // Demo media for unhosted projects. Plain public/ paths — no Vite imports —
  // so the assistant-bundled facts stay asset-free. `poster` doubles as the
  // detail-modal image; `video` plays inline with the poster as its cover.
  media?: {
    poster: string
    video?: string
    // A real page on this site (e.g. an interactive demo) — not an external host.
    demoUrl?: string
  }
}

export type Project = ProjectFacts & {
  // A vite-imagetools `as=picture` object, not a URL: the preview is rendered
  // through <Picture> so it can carry AVIF/WebP srcsets and its intrinsic size.
  // Optional because demo projects ship their poster via `media.poster` (public
  // assets can't be processed by vite-imagetools), and the card warms whichever
  // one exists.
  previewImage?: PictureSource
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
