import { Boxes, Building2, CalendarCheck, Library, Network } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { PictureSource } from '../components/ui/Picture'
import type { Project } from '../types/portfolio'
import { projectFacts } from './facts'
// Three widths, AVIF first, WebP as the fallback format. The sources are 0.5–5MB
// PNG screenshots displayed at ~900px inside the detail modal; the widths cover
// a phone, a laptop, and a 2× laptop, and nothing upsizes.
import eduleavePreview from '../assets/eduleave.png?w=768;1152;1536&format=avif;webp&as=picture'
import eurasianPreview from '../assets/eurasian.png?w=768;1152;1536&format=avif;webp&as=picture'
import irimsvPreview from '../assets/irims-v.png?w=768;1152;1536&format=avif;webp&as=picture'
import libraryPreview from '../assets/library.png?w=768;1152;1536&format=avif;webp&as=picture'
import lrmisPreview from '../assets/lrmis.png?w=768;1152;1536&format=avif;webp&as=picture'

type Visual = { previewImage: PictureSource; icon: LucideIcon }

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
