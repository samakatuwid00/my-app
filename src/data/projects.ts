import { Boxes, Building2, CalendarCheck, Library, Network } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Project } from '../types/portfolio'
import { projectFacts } from './facts'
import eduleavePreview from '../assets/eduleave.png'
import eurasianPreview from '../assets/eurasian.png'
import irimsvPreview from '../assets/irims-v.png'
import libraryPreview from '../assets/library.png'
import lrmisPreview from '../assets/lrmis.png'

type Visual = { previewImage: string; icon: LucideIcon }

// Copy lives in facts.ts so the assistant can bundle it without Vite assets.
const visuals: Record<string, Visual> = {
  'IRIMS-V': { previewImage: irimsvPreview, icon: Boxes },
  EDULEAVE: { previewImage: eduleavePreview, icon: CalendarCheck },
  Eurasian: { previewImage: eurasianPreview, icon: Building2 },
  'IRIMS-V Library': { previewImage: libraryPreview, icon: Library },
  LRMIS: { previewImage: lrmisPreview, icon: Network },
}

export const projects: Project[] = projectFacts.map((facts) => {
  const visual = visuals[facts.title]
  if (!visual) throw new Error(`No preview image or icon registered for project "${facts.title}"`)
  return { ...facts, ...visual }
})
