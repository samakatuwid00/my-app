import type { PictureSource } from '../components/ui/Picture'
import type { Project } from '../types/portfolio'
import { projectFacts } from './facts'
// Three widths, AVIF first, WebP as the fallback format. The sources are
// full-page screenshots shown at up to ~600px wide inside the halftone frame;
// the widths cover a phone, a laptop, and a 2x laptop, and nothing upsizes.
// Cygnus is a small index thumbnail, so it gets two narrower widths.
import irimsvPreview from '../assets/irims-v.png?w=768;1152;1536&format=avif;webp&as=picture'
import libraryPreview from '../assets/shots/library-catalog.webp?w=768;1152;1536&format=avif;webp&as=picture'
import eduleavePreview from '../assets/shots/eduleave.webp?w=768;1152;1536&format=avif;webp&as=picture'
import lrmisPreview from '../assets/lrmis.png?w=768;1152;1536&format=avif;webp&as=picture'
import cygnusPreview from '../assets/shots/cygnus.webp?w=480;960&format=avif;webp&as=picture'

// Copy lives in facts.ts so the assistant can bundle it without Vite assets.
// Screenshots are keyed by slug here. Sticky Brain and Second Brain carry their
// poster as a plain public/ path in `facts.media` instead.
const previews: Partial<Record<string, PictureSource>> = {
  'irims-v': irimsvPreview,
  'irims-v-library': libraryPreview,
  eduleave: eduleavePreview,
  lrmis: lrmisPreview,
  cygnus: cygnusPreview,
}

export const visibleProjects = projectFacts.filter((p) => !p.hidden)
export const featuredProjects = visibleProjects.filter((p) => p.featured)
export const moreProjects = visibleProjects.filter(
  (p) => !p.featured && ['internal', 'in-progress'].includes(p.status),
)
export const experiments = visibleProjects.filter((p) => ['demo', 'private'].includes(p.status))
export const previewFor = (slug: string) => previews[slug]

// LEGACY: removed in Task 13. The old /projects section (ProjectCard,
// ProjectDetail) still reads `projects`, `previewImage`, and `icon`. Built from
// the visible projects so Eurasian stays off the old shell too. The icon is an
// empty placeholder: the lucide icons were dropped from this file.
const NoIcon = () => null
export const projects: Project[] = visibleProjects.map((facts) => ({
  ...facts,
  previewImage: previews[facts.slug],
  icon: NoIcon,
}))
