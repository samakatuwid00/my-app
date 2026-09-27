import type { PictureSource } from '../components/ui/Picture'
import { projectFacts } from './facts'
// Three widths, AVIF first, WebP as the fallback format. The sources are
// full-page screenshots shown at up to ~600px wide inside the halftone frame;
// the widths cover a phone, a laptop, and a 2x laptop, and nothing upsizes.
// Cygnus is a small index thumbnail, so it gets two narrower widths; Sticky
// Brain and Second Brain are thumbnail-only too (200px, 112px on phones).
import irimsvPreview from '../assets/irims-v.png?w=768;1152;1536&format=avif;webp&as=picture'
import libraryPreview from '../assets/shots/library-catalog.webp?w=768;1152;1536&format=avif;webp&as=picture'
import eduleavePreview from '../assets/shots/eduleave.webp?w=768;1152;1536&format=avif;webp&as=picture'
import lrmisPreview from '../assets/lrmis.png?w=768;1152;1536&format=avif;webp&as=picture'
import cygnusPreview from '../assets/shots/cygnus.webp?w=480;960&format=avif;webp&as=picture'
import stickyBrainPreview from '../assets/shots/sticky-brain.png?w=240;480&format=avif;webp&as=picture'
import secondBrainPreview from '../assets/shots/second-brain.png?w=240;480&format=avif;webp&as=picture'

// Copy lives in facts.ts so the assistant can bundle it without Vite assets.
// Screenshots are keyed by slug here.
const previews: Partial<Record<string, PictureSource>> = {
  'irims-v': irimsvPreview,
  'irims-v-library': libraryPreview,
  eduleave: eduleavePreview,
  lrmis: lrmisPreview,
  cygnus: cygnusPreview,
  'sticky-brain': stickyBrainPreview,
  'second-brain': secondBrainPreview,
}

// Alt text from the approved mockup: it says what the screenshot shows, which
// the project title alone does not.
const previewAlts: Partial<Record<string, string>> = {
  'irims-v': 'iRIMS-V regional dashboard',
  'irims-v-library': 'iRIMS-V Library System catalog of print resources',
  eduleave: 'EDULEAVE landing page: Time off hassle free',
  lrmis: 'LRMIS national map dashboard',
}

export const featuredProjects = projectFacts.filter((p) => p.featured)
export const moreProjects = projectFacts.filter(
  (p) => !p.featured && ['internal', 'in-progress'].includes(p.status),
)
export const experiments = projectFacts.filter((p) => ['demo', 'private'].includes(p.status))
export const previewFor = (slug: string) => previews[slug]
export const previewAltFor = (slug: string) => previewAlts[slug]
