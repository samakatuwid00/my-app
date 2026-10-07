import type { PictureSource } from '../components/ui/Picture'
import type { ProjectFacts } from '../types/portfolio'
import { projectFacts } from './facts'
// AVIF first, WebP as the fallback. Wide screens get three widths (a phone, a
// laptop, a 2x laptop) and nothing upsizes; phone screens and the small build-log
// shots get two.
import irimsvPreview from '../assets/shots/irimsv-division.png?w=640;960;1280&format=avif;webp&as=picture'
import libraryPreview from '../assets/shots/library-catalog.webp?w=640;960;1440&format=avif;webp&as=picture'
import eduleavePreview from '../assets/shots/eduleave.webp?w=640;960;1440&format=avif;webp&as=picture'
import lrmisPreview from '../assets/lrmis.png?w=640;960;1440&format=avif;webp&as=picture'
import cygnusPreview from '../assets/shots/cygnus-hud.png?w=640;1280&format=avif;webp&as=picture'
import eurasianPreview from '../assets/shots/eurasian.png?w=640;1280&format=avif;webp&as=picture'
import schemaPreview from '../assets/shots/schema-mapper.png?w=640;1280&format=avif;webp&as=picture'
import stickyPreview from '../assets/shots/sticky-board.png?w=360;450&format=avif;webp&as=picture'
import secondBrainPreview from '../assets/shots/second-brain.png?w=640;1280&format=avif;webp&as=picture'
import accountsRegister from '../assets/shots/accounts-register.png?w=640;1088&format=avif;webp&as=picture'
import accountsLogin from '../assets/shots/accounts-login.png?w=480;960&format=avif;webp&as=picture'
import appHome from '../assets/shots/app-home.png?w=240;480&format=avif;webp&as=picture'
import appReady from '../assets/shots/app-ready.png?w=240;480&format=avif;webp&as=picture'
import appJunior from '../assets/shots/app-junior.png?w=240;480&format=avif;webp&as=picture'
import sizerReady from '../assets/shots/sizer-ready.png?w=240;480&format=avif;webp&as=picture'
import sizerSized from '../assets/shots/sizer-sized.png?w=240;480&format=avif;webp&as=picture'

const bySlug = (slug: string) => {
  const p = projectFacts.find((f) => f.slug === slug)
  if (!p) throw new Error(`No project ${slug}`)
  return p
}

// Order within each group is the order on the page.
export const suiteProjects: ProjectFacts[] = ['irims-v', 'irims-v-library', 'irims-v-library-app', 'irims-v-accounts'].map(bySlug)
export const alsoProjects: ProjectFacts[] = ['eduleave', 'lrmis'].map(bySlug)
export const logProjects: ProjectFacts[] = ['cygnus', 'eurasian', 'schema-mapper', 'sticky-brain', 'second-brain', 'cerebrum-sizer'].map(bySlug)

// One wide screenshot per project that has one. The library app and the sizer
// have no single screen; they use the phone sets.
const previews: Partial<Record<string, PictureSource>> = {
  'irims-v': irimsvPreview,
  'irims-v-library': libraryPreview,
  'irims-v-accounts': accountsRegister,
  eduleave: eduleavePreview,
  lrmis: lrmisPreview,
  cygnus: cygnusPreview,
  eurasian: eurasianPreview,
  'schema-mapper': schemaPreview,
  'sticky-brain': stickyPreview,
  'second-brain': secondBrainPreview,
}

// Alt text says what the screenshot shows, which the project title alone does not.
const previewAlts: Partial<Record<string, string>> = {
  'irims-v': 'iRIMS-V division dashboard: learning resources, population, ratio and needs',
  'irims-v-library': 'iRIMS-V Library System catalog of print resources',
  'irims-v-accounts': 'iRIMS-V Accounts registration, step 1 of 6: who the account is for',
  eduleave: 'EDULEAVE landing page: Time off hassle free',
  lrmis: 'LRMIS national map dashboard',
  cygnus: 'CYGNUS HUD: system status, the orb, the transcript and the Running panel',
  eurasian: 'Eurasian Paradise Resort booking site with the availability search',
  'schema-mapper': 'schema_mapper console: delivery pipeline, queue depth and entities with kill switches',
  'sticky-brain': 'Sticky Brain board with live coding-agent sessions; card text blurred',
  'second-brain': 'Obsidian graph view of the vault',
}

export const phoneSets = {
  app: [
    { source: appHome, alt: 'Library app home screen for a Grade 7 student' },
    { source: appReady, alt: 'Library app: the librarian approved the request, ready to pick up' },
    { source: appJunior, alt: 'Library app home in the junior look for younger students' },
  ],
  sizer: [
    { source: sizerReady, alt: 'Cerebrum Sizer waiting for a signal' },
    { source: sizerSized, alt: 'Cerebrum Sizer showing invest and leverage for a pasted signal' },
  ],
}

// The Accounts sign-in screen, for its window in the collage.
export const accountsSignIn = { source: accountsLogin, alt: 'iRIMS-V Accounts sign-in: one account for every iRIMS-V system' }

export const previewFor = (slug: string) => previews[slug]
export const previewAltFor = (slug: string) => previewAlts[slug]
