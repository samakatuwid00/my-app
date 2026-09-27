# Portfolio Redesign (Black-and-White) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the "portfolio OS" shell with the single-page, black-and-white design approved in `docs/redesign-mockup-v2.html`, driven by the existing `src/data` modules, with the assistant and contact form kept working.

**Architecture:** One scrolling home route (`/`) made of alternating black and paper "bands", plus a data-driven case-study route (`/work/:slug`). Styling is ported from the mockup's `<style>` block into one plain-CSS file (`src/styles/site.css`) that uses CSS custom properties; Tailwind stays only as the reset/import layer. Motion is CSS keyframes switched on by small hooks (`useInView`, `usePrefersReducedMotion`), so every section renders complete without JavaScript or with reduced motion.

**Tech Stack:** React 19, TypeScript 6, Vite 8, react-router-dom 7, Tailwind CSS 4 (import only), vite-imagetools, Playwright 1.63 for end-to-end tests, @fontsource packages for fonts.

**Spec:** `docs/redesign-mockup-v2.html` (the approved mockup; open it in a browser next to the running app). Supporting assets: `docs/assets/` and `docs/assets/shots/`.

## Global Constraints

- Two inks only: `--black: #0b0b0b`, `--paper: #f2f2f0`, and those two at an alpha. No other color anywhere.
- Fonts: Antonio (display), Barlow Condensed (UI labels), Inter Tight (body), JetBrains Mono (email address and other literal data only).
- Display type never larger than 96px (`6rem`).
- No em dashes in any rendered copy. Use an en dash (–) for ranges, commas or colons elsewhere.
- Every section is fully visible with JavaScript disabled and with `prefers-reduced-motion: reduce`. Motion only ever animates *from* an already-visible default.
- No horizontal scroll at 390px wide. Side gutter 20px on phones, 32px on desktop.
- Eurasian is not shown on the site and not sent to the assistant (unrotated credential; see vault `wiki/Eurasian Paradise Resort System.md`).
- Do not link `github.com/samakatuwid00/JARVIS` (exposes private data) or `github.com/samakatuwid00/second-brain-vault` (private, 404 for visitors).
- Screenshots must not show private data: no account avatars, no Cygnus "Running" panel.
- No invented facts or metrics. Where a number is not confirmed, omit the row; never render a placeholder.
- Work on branch `redesign/bw`. One commit per task. Every commit message ends with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Out of Scope (owner actions, tracked separately)

- Real metrics for any project (all "Result" rows stay omitted until confirmed).
- The FAQ answer to "Do you work remotely?" (question is left out until the owner answers).
- Whether "DepEd Naga" may be named publicly (site keeps "a DepEd division HR office").
- Scrubbing or privatising the `JARVIS` repo; rotating the Eurasian Gmail app password.
- Fixing the résumé PDF (`irims-v-library.net` typo, JARVIS and Second Brain repo links, "IRIMS-V" spelling).
- Case-study copy for EDULEAVE, LRMIS and the Library System (only iRIMS-V has approved copy).
- A new iRIMS-V dashboard screenshot (needs an account) and a Library mobile app screenshot (no hosted build).

---

## File Structure

```
src/
  main.tsx                         MODIFY  font imports, AskProvider + BrowserRouter at the root
  App.tsx                          REWRITE layout: header, routes, footer, assistant
  index.css                        REWRITE @import "tailwindcss"; @import "./styles/site.css";
  styles/site.css                  CREATE  every style, ported from the mockup
  routes/AppRoutes.tsx             REWRITE /, /work/:slug, redirects, 404
  components/
    layout/SiteHeader.tsx          CREATE  brand, section links, actions, tone, scrollspy
    layout/MobileSheet.tsx         CREATE  full-screen menu on phones
    layout/SiteFooter.tsx          REWRITE ghost wordmark, glyph links
    layout/ScrollToHash.tsx        CREATE  scroll to #id on navigation
    layout/Band.tsx                CREATE  <section data-band="dark|light">
    ui/Niko.tsx                    CREATE  static pixel mark (open | happy)
    ui/Halftone.tsx                CREATE  screenshot wrapper with the dot screen
    home/Hero.tsx                  CREATE
    home/Portrait.tsx              CREATE  dithered portrait + thought bubble
    home/SelectedWork.tsx          CREATE  featured case rows + "more work" table
    home/Services.tsx              CREATE  process figures + stack tags
    home/figures/*.tsx             CREATE  Records, Approvals, Dashboards, Deploy SVGs
    home/Experience.tsx            CREATE  timeline + role rows, linked highlight
    home/Recognition.tsx           CREATE
    home/Experiments.tsx           CREATE
    home/Faq.tsx                   CREATE
    home/Contact.tsx               CREATE  reach tabs + existing ContactForm
    ask/AskButton.tsx              CREATE  floating button + panel on AskProvider
    AskContext.ts                  MODIFY  add open()
    AskProvider.tsx                MODIFY  implement open()
    ContactForm.tsx                MODIFY  markup classes only
  views/
    HomeView.tsx                   CREATE
    CaseStudyView.tsx              CREATE
    NotFoundView.tsx               REWRITE
  hooks/
    useInView.ts                   CREATE
    usePrefersReducedMotion.ts     CREATE
    useBandTone.ts                 CREATE
    useScrollSpy.ts                CREATE
  data/
    facts.ts                       MODIFY  names, slugs, featured, hidden, caseStudy, new projects
    projects.ts                    MODIFY  visuals keyed by slug, new screenshots
    experience.ts                  MODIFY  résumé dates, one-line summaries, timeline spans
    site.ts                        MODIFY  hero copy, credits, thoughts, faq
    ask.ts                         MODIFY  skip hidden projects in buildContext()
  types/portfolio.ts               MODIFY  new fields
  assets/portrait/portrait.png     CREATE  copy of docs/assets/portrait-dither-light.png
  assets/shots/*.webp              CREATE  copies of docs/assets/shots/*.webp
scripts/make-portrait-dither.py    CREATE  move from docs/assets/
playwright.config.ts               CREATE
tests/site.spec.ts                 CREATE  replaces tests/portfolio.spec.ts
```

Deleted in Task 13: `src/components/Intro/`, `src/components/NikoPet/`, `src/layouts/`, `WindowChrome.tsx`, `SideRail.tsx`, `PixelOverlay.tsx`, `CommandBar.tsx`, `AskDrawer.tsx`, `ThemeToggle.tsx`, `TransitionTickProvider.tsx`, `ViewShell.tsx`, `Reveal.tsx`, `ProjectCard.tsx`, `ProjectDetail.tsx`, `Modal.tsx`, `ui/{Prompt,ViewTabs,SectionPager,BackButton,Panel,StatusDot,Tag,ActionLink,ScrollUpButton}.tsx`, `src/sections/`, old views, hooks that lose all callers, `framer-motion`, `lucide-react` (if unused), `tests/portfolio.spec.ts`.

### Porting the mockup's CSS

`src/styles/site.css` is the mockup's `<style>` block with these changes, applied once in Task 2 and extended per task:

| Mockup | Production |
|---|---|
| `.review`, `.todo` blocks | drop (review aids only) |
| `.ask`, `.ask-panel`, `.chips` | keep, used by `AskButton` |
| `#home`, `#case` visibility rules, `[hidden]` rule | drop (the router handles views) |
| `.flow.armed …`, `.tl.armed …` | keep; `armed` is set by React instead of script |
| `body::after` frame | keep |
| comments | keep; they explain intent |

Section blocks are delimited in the mockup by `/* ============ Navbar ============ */`, `/* ============ Hero ============ */`, `/* ============ Sections ============ */`, `/* Selected work */`, `/* Tables … */`, `/* What I do … */`, `/* Experience … */`, `/* Recognition */`, `/* Experiments … */`, `/* FAQ … */`, `/* Contact */`, `/* Footer */`, `/* Assistant */`, `/* Case study */`, `/* ============ Motion ============ */`, and the two `@media` blocks at the end. Each task below names the blocks it ports.

### Porting the mockup's SVG and markup to JSX

| HTML | JSX |
|---|---|
| `class=` | `className=` |
| `stroke-width`, `stroke-linecap`, `stroke-linejoin`, `stroke-dasharray`, `fill-opacity`, `shape-rendering` | `strokeWidth`, `strokeLinecap`, `strokeLinejoin`, `strokeDasharray`, `fillOpacity`, `shapeRendering` |
| `style="--d:.2s;--t:3.1s"` | `style={{ '--d': '.2s', '--t': '3.1s' } as CSSProperties}` |
| `aria-hidden="true"` | `aria-hidden="true"` (unchanged) |
| `pathLength="1"` | `pathLength={1}` |

---

### Task 1: Branch, Playwright harness, first failing test

**Files:**
- Create: `playwright.config.ts`, `tests/site.spec.ts`
- Delete: `tests/portfolio.spec.ts`, `tests/niko-pet-in-intro.png`
- Modify: `package.json` (devDependency + scripts)

**Interfaces:**
- Produces: `npm run test:e2e` runs Playwright against the Vite dev server; `tests/site.spec.ts` exports nothing and is extended by every later task.

- [ ] **Step 1: Branch**

```bash
git switch -c redesign/bw
```

- [ ] **Step 2: Install the test runner**

```bash
npm install -D @playwright/test@1.63.0
npx playwright install chromium
```

- [ ] **Step 3: Add scripts to `package.json`**

```json
"test:e2e": "playwright test",
"test:e2e:ui": "playwright test --ui"
```

- [ ] **Step 4: Create `playwright.config.ts`**

```ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  use: { baseURL: 'http://localhost:5173' },
  webServer: {
    command: 'npm run dev -- --port 5173 --strictPort',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 60_000,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'phone', use: { ...devices['Pixel 7'], viewport: { width: 390, height: 844 } } },
  ],
})
```

- [ ] **Step 5: Replace the old suite.** Delete `tests/portfolio.spec.ts` (it asserts the terminal intro, Niko docking, and the mono body font, all of which this redesign removes) and `tests/niko-pet-in-intro.png`. Create `tests/site.spec.ts`:

```ts
import { test, expect } from '@playwright/test'

test.describe('shell', () => {
  test('home renders the new header brand', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('header.site .brand')).toContainText('Roger Abay')
  })
})
```

- [ ] **Step 6: Run it and confirm it fails**

Run: `npm run test:e2e -- --project=desktop`
Expected: FAIL, `locator('header.site .brand')` not found (the old shell is still mounted).

- [ ] **Step 7: Commit**

```bash
git add -A playwright.config.ts tests package.json package-lock.json
git commit -m "test: Playwright harness for the redesign, drop the OS-shell suite

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Tokens, fonts, base styles

**Files:**
- Create: `src/styles/site.css`
- Rewrite: `src/index.css`
- Modify: `src/main.tsx`, `index.html` (remove the theme bootstrap `<script>` that reads `portfolio-theme`)

**Interfaces:**
- Produces: CSS classes `.band`, `.dark`, `.light`, `.wrap`, `.display`, `.h2`, `.h3`, `.ui`, `.soft`, `.btn` (`.solid`, `.tint`, `.line`), `.btns`, `.live`, and custom properties `--black --paper --fg --bg --soft --rule --tint --ease --display --ui --body --mono`.

- [ ] **Step 1: Add the failing test** to `tests/site.spec.ts`

```ts
test.describe('type and ink', () => {
  test('body is Inter Tight on the black ground', async ({ page }) => {
    await page.goto('/')
    const body = await page.evaluate(() => {
      const s = getComputedStyle(document.body)
      return { font: s.fontFamily, bg: s.backgroundColor }
    })
    expect(body.font).toContain('Inter Tight')
    expect(body.bg).toBe('rgb(11, 11, 11)')
  })
})
```

- [ ] **Step 2: Run, expect FAIL** (`Inter Variable` / old canvas color).

Run: `npm run test:e2e -- --project=desktop -g "type and ink"`

- [ ] **Step 3: Install fonts**

```bash
npm install @fontsource-variable/antonio@5.3.0 @fontsource/barlow-condensed@5.3.0 @fontsource-variable/inter-tight@5.3.0
```

- [ ] **Step 4: `src/main.tsx` imports** (replace the two existing font imports)

```ts
import '@fontsource-variable/antonio'
import '@fontsource/barlow-condensed/500.css'
import '@fontsource/barlow-condensed/600.css'
import '@fontsource-variable/inter-tight'
import '@fontsource-variable/jetbrains-mono'
import './index.css'
```

- [ ] **Step 5: `src/index.css`** becomes exactly:

```css
@import "tailwindcss";
@import "./styles/site.css";
```

- [ ] **Step 6: Create `src/styles/site.css`** from the mockup's `:root`, `.dark`/`.light`, reset, frame (`body::after`), `.band`, `.wrap`, Type, Buttons blocks, with font stacks pointing at the installed families:

```css
:root {
  --black: #0b0b0b;
  --paper: #f2f2f0;
  --maxw: 1120px;
  --gutter: 32px;
  --display: 'Antonio Variable', 'Arial Narrow', sans-serif;
  --ui: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  --body: 'Inter Tight Variable', system-ui, sans-serif;
  --mono: 'JetBrains Mono Variable', ui-monospace, monospace;
  --ease: cubic-bezier(.16, 1, .3, 1);
  interpolate-size: allow-keywords;
}
.dark  { --fg: var(--paper); --bg: var(--black); --soft: rgba(242,242,240,.64); --rule: rgba(242,242,240,.2);  --tint: rgba(242,242,240,.1); }
.light { --fg: var(--black); --bg: var(--paper); --soft: rgba(11,11,11,.64);    --rule: rgba(11,11,11,.18);    --tint: rgba(11,11,11,.05); }
```

Then paste, verbatim from the mockup, the rules from `*, *::before, *::after` down to (not including) `/* Review aids (mockup only) */`. Update the test expectation to match the installed family name if Fontsource registers it as `Inter Tight Variable` (check with `document.fonts`), i.e. `toContain('Inter Tight')` already covers both.

- [ ] **Step 7: Remove the theme bootstrap** `<script>` from `index.html` (the one reading `localStorage.getItem('portfolio-theme')`). Put no theme class on `<html>`: each band sets its own tone through `.dark` or `.light`.

- [ ] **Step 8: Run, expect PASS**

Run: `npm run test:e2e -- --project=desktop -g "type and ink"`

- [ ] **Step 9: Commit** `feat(style): two-ink tokens, Antonio/Barlow/Inter Tight, base type and buttons`

---

### Task 3: Data model to the résumé and vault

**Files:**
- Modify: `src/types/portfolio.ts`, `src/data/facts.ts`, `src/data/projects.ts`, `src/data/experience.ts`, `src/data/site.ts`, `src/data/ask.ts`
- Create: `src/assets/shots/{eduleave,library-catalog,cygnus}.webp` (copy from `docs/assets/shots/`)

**Interfaces:**
- Produces (exact types, used by Tasks 6 to 12):

```ts
// src/types/portfolio.ts
export type ProjectStatus = 'live' | 'internal' | 'demo' | 'in-progress' | 'private'

export type CaseStudy = {
  expansion?: string   // e.g. "Integrated Resource Inventory and Mapping System for Region V"
  lede: string
  problem: string
  approach: string[]
  result: string
}

export type ProjectFacts = {
  slug: string
  title: string
  category: string        // "Regional inventory", "Library circulation", ...
  description: string     // one paragraph shown on the home page
  client?: string
  role?: string
  stack: string           // short, comma-separated, shown in the facts list
  technologies: string[]  // full list, used by the assistant
  features: string[]
  status: ProjectStatus
  featured?: boolean      // appears as a large case row
  hidden?: boolean        // never rendered, never sent to the assistant
  liveUrl?: string
  githubUrl?: string
  caseStudy?: CaseStudy
  metrics?: string[]      // stays empty until the owner confirms numbers
  media?: { poster: string; video?: string }
}

export type TimelineKey = 'r5' | 'co' | 'fl' | 'lg'
export type TimelineEntry = {
  key: TimelineKey
  role: string
  organization: string
  period: string          // display, e.g. "2025 – Present"
  summary: string         // one line
  start: number | null    // year; null when not recorded (Freelance)
  end: number | null      // year; null = ongoing
  award?: string
}
```

- [ ] **Step 1: Failing check.** Add to `tests/site.spec.ts`:

```ts
import { readFileSync } from 'node:fs'

test('assistant context excludes hidden projects', () => {
  const context = readFileSync('api/context.ts', 'utf8')
  expect(context).not.toContain('Eurasian')
  expect(context).toContain('iRIMS-V Library System')
  expect(context).toContain('Cygnus')
})
```

Run: `node scripts/generate-context.mjs && npm run test:e2e -- --project=desktop -g "assistant context"`. Expected: FAIL (Eurasian present, names old).

- [ ] **Step 2: Update `src/data/facts.ts`** to the new type. Values (sources: vault report 2026-09-27, résumé 2026-08-18, captures in `docs/assets/shots/`):

Row order below is the render order on the home page.

| slug | title | category | status | featured | hidden | stack | liveUrl / githubUrl |
|---|---|---|---|---|---|---|---|
| `irims-v` | iRIMS-V | Regional inventory | live | yes | | Laravel 12, PostgreSQL, Blade, htmx, Docker | `https://irimsv.net/` |
| `eduleave` | EDULEAVE | HR workflow | live | yes | | Laravel 12, MySQL, Tailwind, Queues | `https://eduleave.com/welcome` |
| `lrmis` | LRMIS | National platform | live | yes | | Laravel, Blade, Tailwind, Sheets API | `https://lrmis.deped.gov.ph/` |
| `irims-v-library` | iRIMS-V Library System | Library circulation | live | yes | | Laravel 12, Vue, Vite | `https://irimsv-library.net/` |
| `schema-mapper` | schema_mapper | Data integration | internal | | | Python, FastAPI, PostgreSQL, MySQL, Docker Compose | none |
| `irims-v-library-app` | iRIMS-V Library app | Mobile | in-progress | | | Flutter, token API | none |
| `eurasian` | Eurasian | Resort operations | live | | **yes** | PHP, MySQL | keep existing |
| `cygnus` | Cygnus | Voice assistant | demo | | | Python, Whisper, Kokoro, Electron | **no githubUrl** |
| `sticky-brain` | Sticky Brain | Desktop app | demo | | | Electron | `https://github.com/samakatuwid00/sticky-brain` |
| `second-brain` | Second Brain | Knowledge vault | private | | | Python, TurboVec | **no githubUrl** |

`description`, `client`, `role` per featured row are copied verbatim from the mockup's `article.case` blocks (Client and Role `<dd>` values; the `<p>` as `description`). Experiments use the mockup's `.index` `<p>` text. The iRIMS-V `caseStudy` is copied verbatim from the mockup's `#case` section:

```ts
caseStudy: {
  expansion: 'Integrated Resource Inventory and Mapping System for Region V',
  lede: "One inventory for every learning resource in DepEd Region V, from the regional dashboard down to one school's shelf.",
  problem: 'Each office kept its own spreadsheet of learning resources. The regional office could not see totals, shortages, or where resources had moved without asking every office for a fresh file, and the files never matched.',
  approach: [
    'Modeled the region as a four-level station hierarchy, so every record belongs to one place and rolls up to the level above.',
    'PostgreSQL full-text search and triggers keep search fast and totals consistent as records change.',
    'Role-based access, so each office edits only its own stations while the region sees everything.',
    'Excel import, so offices moved their existing spreadsheets in instead of retyping them.',
    'ECharts dashboards for the questions the regional office asks most.',
  ],
  result: 'Launched regionally and recognized with the Full Stack Developer Award from the Regional Director. I still own deployment and releases.',
},
```

- [ ] **Step 3: `src/data/projects.ts`** keys visuals by `slug` and imports the new captures:

```ts
import irimsvPreview from '../assets/irims-v.png?w=768;1152;1536&format=avif;webp&as=picture'
import libraryPreview from '../assets/shots/library-catalog.webp?w=768;1152;1536&format=avif;webp&as=picture'
import eduleavePreview from '../assets/shots/eduleave.webp?w=768;1152;1536&format=avif;webp&as=picture'
import lrmisPreview from '../assets/lrmis.png?w=768;1152;1536&format=avif;webp&as=picture'
import cygnusPreview from '../assets/shots/cygnus.webp?w=480;960&format=avif;webp&as=picture'

const previews: Partial<Record<string, PictureSource>> = {
  'irims-v': irimsvPreview,
  'irims-v-library': libraryPreview,
  eduleave: eduleavePreview,
  lrmis: lrmisPreview,
  cygnus: cygnusPreview,
}

export const visibleProjects = projectFacts.filter((p) => !p.hidden)
export const featuredProjects = visibleProjects.filter((p) => p.featured)
export const moreProjects = visibleProjects.filter((p) => !p.featured && ['internal', 'in-progress'].includes(p.status))
export const experiments = visibleProjects.filter((p) => ['demo', 'private'].includes(p.status))
export const previewFor = (slug: string) => previews[slug]
```

Drop the `icon` field and the `lucide-react` icons from this file. `Project` type becomes `ProjectFacts` everywhere.

- [ ] **Step 4: `src/data/experience.ts`** (résumé dates; summaries from the mockup's `.role-row` text):

```ts
export const experience: TimelineEntry[] = [
  { key: 'r5', role: 'Full-Stack Developer', organization: 'DepEd Region V', period: '2025 – Present', start: 2025, end: null,
    summary: 'Ships and runs the regional systems, inventory and library circulation, and the VPS they run on.', award: 'Full Stack Developer Award' },
  { key: 'co', role: 'Web Systems Developer', organization: 'DepEd Central Office', period: '2024 – 2025', start: 2024, end: 2025,
    summary: 'Feature owner on the national learning-resource platform: authentication, roles, workflows, reporting.' },
  { key: 'fl', role: 'Freelance Web Developer', organization: 'Independent', period: 'Present', start: null, end: null,
    summary: 'Client systems end to end, from requirements to support. EDULEAVE is live.' },
  { key: 'lg', role: 'IT Support Intern', organization: 'LGU Pasacao', period: '2019 – 2020', start: 2019, end: 2020,
    summary: 'Hardware, software, and network support alongside the core IT team.' },
]

export const education = {
  school: 'STI College Naga', degree: 'BS Information Technology', honors: 'Cum Laude', period: '2020 – 2024', start: 2020, end: 2024,
}
```

- [ ] **Step 5: `src/data/site.ts`** adds (copy from the mockup hero, credits, portrait script and FAQ; omit the remote-work question):

```ts
export const hero = {
  name: ['Roger A.', 'Abay Jr.'],
  tagline: 'Full-stack developer. Systems that replace paper.',
  lede: 'I scope, build, deploy, and keep running the Laravel and PostgreSQL systems DepEd offices use every day, from a regional inventory to a national learning-resource platform. Based in Camarines Sur, Philippines.',
}
export const credits = [
  { term: 'Now', detail: 'Full-Stack Developer, DepEd Region V' },
  { term: 'Before', detail: 'Web Systems Developer, DepEd Central Office' },
  { term: 'Recognized', detail: 'Full Stack Developer Award' },
  { term: 'Education', detail: 'BSIT, Cum Laude, STI College Naga' },
] as const
export const thoughts = [
  'Right now: building the iRIMS-V Library app in Flutter.',
  'Still shipping updates to iRIMS-V.',
  'Every paper form is a system waiting to happen.',
  'Ask me about Laravel, PostgreSQL, or keeping a VPS alive.',
  'Cygnus, my voice assistant, is listening. Mostly.',
] as const
export const faq = [
  { q: 'What kind of systems do you build?', a: 'Systems that replace a manual process end to end: records and inventory, approval workflows, and dashboards and reports. iRIMS-V, EDULEAVE, and LRMIS are all live examples.' },
  { q: 'Can you take over or maintain an existing system?', a: 'Yes. Support is part of how I work: I stay available when a system needs to change, and I maintain the regional systems I built.' },
  { q: 'Where does the system run?', a: 'On a Linux VPS I set up and manage, with Docker, Coolify, and Nginx. Deployment and releases are part of the job, not a handoff.' },
  { q: 'How do we start?', a: 'Send a short description of the process as it runs today. I start by understanding how it actually works before proposing anything.' },
] as const
```

- [ ] **Step 6: `src/data/ask.ts`** – in `buildContext()`, iterate `projectFacts.filter((p) => !p.hidden)` instead of `projectFacts`.

- [ ] **Step 7: Regenerate and run**

Run: `node scripts/generate-context.mjs && npx tsc -b && npm run test:e2e -- --project=desktop -g "assistant context"`
Expected: PASS. Fix every type error `tsc` reports in the files that still import removed fields (they are all deleted in Task 13; until then add the minimal `slug`/`stack` fields they need, do not re-add removed ones).

- [ ] **Step 8: Commit** `feat(data): résumé dates, vault names (iRIMS-V, Cygnus), hidden Eurasian, new projects`

---

### Task 4: App shell, header, footer, routes

**Files:**
- Rewrite: `src/App.tsx`, `src/routes/AppRoutes.tsx`, `src/components/SiteFooter.tsx` (move to `layout/`), `src/views/NotFoundView.tsx`
- Create: `src/components/layout/{SiteHeader,MobileSheet,ScrollToHash,Band}.tsx`, `src/components/ui/Niko.tsx`, `src/hooks/{useBandTone,useScrollSpy}.ts`, `src/views/HomeView.tsx` (sections as empty `Band`s with ids for now)
- Modify: `src/main.tsx` (wrap `<BrowserRouter>` and `<AskProvider>` at the root)
- Port CSS: Navbar block, Footer block, mobile header rules from the `@media (max-width: 960px)` block.

**Interfaces:**
- Consumes: `.band/.dark/.light`, `.btn` (Task 2).
- Produces: `<Band id tone="dark|light" flush?>`, `<Niko pose="open|happy" />`, `useBandTone(ref): 'dark'|'light'`, `useScrollSpy(ids: string[], ref): string | null`. Section ids: `work`, `services`, `experience`, `recognition`, `experiments`, `faq`, `contact`.

- [ ] **Step 1: Failing tests**

```ts
test.describe('navigation', () => {
  test('section links and legacy redirects', async ({ page }) => {
    await page.goto('/about')
    await expect(page).toHaveURL('/')
    await page.goto('/projects')
    await expect(page).toHaveURL('/#work')
    await page.goto('/contact')
    await expect(page).toHaveURL('/#contact')
  })
  test('unknown path is a real 404', async ({ page }) => {
    await page.goto('/nope')
    await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible()
  })
  test('header turns paper over a paper band', async ({ page, isMobile }) => {
    test.skip(isMobile, 'desktop header')
    await page.goto('/')
    await expect(page.locator('header.site')).toHaveClass(/dark/)
    await page.locator('#work').scrollIntoViewIfNeeded()
    await page.evaluate(() => window.scrollBy(0, 200))
    await expect(page.locator('header.site')).toHaveClass(/light/)
  })
  test('phone menu opens full screen and closes on Escape', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'phone only')
    await page.goto('/')
    await page.getByRole('button', { name: 'Menu' }).click()
    await expect(page.getByRole('dialog', { name: 'Menu' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog', { name: 'Menu' })).toBeHidden()
  })
})
```

Run: `npm run test:e2e -g navigation` → FAIL.

- [ ] **Step 2: `src/components/layout/Band.tsx`**

```tsx
import type { PropsWithChildren } from 'react'

type BandProps = PropsWithChildren<{ id?: string; tone: 'dark' | 'light'; flush?: boolean; as?: 'section' | 'div' | 'footer' }>

export function Band({ id, tone, flush, as: Tag = 'section', children }: BandProps) {
  return (
    <Tag id={id} data-band={tone} className={`band ${tone}${flush ? ' flush' : ''}`}>
      {children}
    </Tag>
  )
}
```

- [ ] **Step 3: `src/components/ui/Niko.tsx`** (grid from `docs/niko-frames.js`, same algorithm as the mockup script)

```tsx
const EYES = { open: { r: 6, h: 2 }, happy: { r: 6, h: 1 } } as const
const L = [2, 3], R = [9, 10]

export function Niko({ pose = 'open' }: { pose?: keyof typeof EYES }) {
  const e = EYES[pose]
  let d = ''
  for (let r = 3; r <= 9; r++)
    for (let c = 0; c <= 12; c++) {
      const ear = r === 3 && (c === 1 || c === 2 || c === 10 || c === 11)
      const eye = r >= e.r && r < e.r + e.h && ((c >= L[0] && c <= L[1]) || (c >= R[0] && c <= R[1]))
      if ((ear || r >= 4) && !eye) d += `M${c} ${r}h1v1h-1z`
    }
  return (
    <svg className="niko" viewBox="0 0 13 12" shapeRendering="crispEdges" aria-hidden="true">
      <path fill="currentColor" d={d} />
    </svg>
  )
}
```

- [ ] **Step 4: `src/hooks/useBandTone.ts`**

```ts
import { useEffect, useState, type RefObject } from 'react'
import { useLocation } from 'react-router-dom'

export function useBandTone(headerRef: RefObject<HTMLElement | null>) {
  const [tone, setTone] = useState<'dark' | 'light'>('dark')
  const { pathname } = useLocation()
  useEffect(() => {
    const sync = () => {
      const header = headerRef.current
      if (!header) return
      const y = header.getBoundingClientRect().bottom + 1
      const band = [...document.querySelectorAll<HTMLElement>('[data-band]')].find((b) => {
        const r = b.getBoundingClientRect()
        return r.top <= y && r.bottom > y
      })
      setTone(band?.dataset.band === 'light' ? 'light' : 'dark')
    }
    sync()
    addEventListener('scroll', sync, { passive: true })
    addEventListener('resize', sync)
    return () => { removeEventListener('scroll', sync); removeEventListener('resize', sync) }
  }, [headerRef, pathname])
  return tone
}
```

- [ ] **Step 5: `src/hooks/useScrollSpy.ts`**

```ts
import { useEffect, useState, type RefObject } from 'react'

// Every home section counts, so the mark clears over sections without a nav link.
export function useScrollSpy(sectionIds: string[], headerRef: RefObject<HTMLElement | null>) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const sync = () => {
      const y = (headerRef.current?.getBoundingClientRect().bottom ?? 0) + 41
      let current: string | null = null
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= y) current = id
      }
      setActive(current)
    }
    sync()
    addEventListener('scroll', sync, { passive: true })
    return () => removeEventListener('scroll', sync)
  }, [sectionIds, headerRef])
  return active
}
```

- [ ] **Step 6: `src/components/layout/SiteHeader.tsx`**

```tsx
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import resume from '../../assets/full.pdf'
import { useBandTone } from '../../hooks/useBandTone'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { Niko } from '../ui/Niko'
import { MobileSheet } from './MobileSheet'

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'experience', label: 'Experience' },
  { id: 'faq', label: 'FAQ' },
] as const
const ALL_SECTIONS = ['work', 'services', 'experience', 'recognition', 'experiments', 'faq', 'contact']

export function SiteHeader() {
  const ref = useRef<HTMLElement>(null)
  const tone = useBandTone(ref)
  const active = useScrollSpy(ALL_SECTIONS, ref)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header ref={ref} className={`site ${tone}`}>
      <div className="wrap">
        <Link className="brand" to="/" aria-label="Roger A. Abay Jr., home">
          <Niko /> <b>Roger Abay</b> <small>Full-stack developer</small>
        </Link>
        <nav className="links ui" aria-label="Sections">
          {LINKS.map((l) => (
            <Link key={l.id} to={`/#${l.id}`} aria-current={active === l.id ? 'true' : 'false'}>{l.label}</Link>
          ))}
        </nav>
        <div className="actions">
          <Link className="btn line" to="/#contact">Contact</Link>
          <a className="btn solid" href={resume}>Résumé</a>
        </div>
        <button className="btn line menu-btn" type="button" aria-expanded={menuOpen} aria-controls="sheet" onClick={() => setMenuOpen(true)}>
          Menu
        </button>
      </div>
      <MobileSheet open={menuOpen} onClose={() => setMenuOpen(false)} resume={resume} />
    </header>
  )
}
```

(`full.pdf` import: add `declare module '*.pdf' { const src: string; export default src }` to `src/vite-env.d.ts` if not present.)

- [ ] **Step 7: `src/components/layout/MobileSheet.tsx`** (reuse existing `useLockBodyScroll` and `useFocusTrap` hooks; check their signatures in `src/hooks/` and call them with the sheet ref)

```tsx
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Niko } from '../ui/Niko'

export function MobileSheet({ open, onClose, resume }: { open: boolean; onClose: () => void; resume: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    document.body.classList.add('locked')
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    addEventListener('keydown', onKey)
    ref.current?.querySelector<HTMLElement>('button')?.focus()
    return () => { document.body.classList.remove('locked'); removeEventListener('keydown', onKey) }
  }, [open, onClose])
  if (!open) return null
  const go = [['work', 'Work'], ['services', 'Services'], ['experience', 'Experience'], ['faq', 'FAQ'], ['contact', 'Contact']]
  return (
    <div ref={ref} className="sheet open" id="sheet" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="top dark"><Niko pose="happy" /><button className="btn line" type="button" onClick={onClose}>Close</button></div>
      <nav>{go.map(([id, label]) => <Link key={id} to={`/#${id}`} onClick={onClose}>{label}</Link>)}</nav>
      <div className="btns dark"><a className="btn solid" href={resume}>Download résumé</a></div>
    </div>
  )
}
```

- [ ] **Step 8: `src/components/layout/ScrollToHash.tsx`**

```tsx
import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToHash() {
  const { pathname, hash } = useLocation()
  useLayoutEffect(() => {
    const el = hash ? document.getElementById(hash.slice(1)) : null
    if (el) el.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}
```

- [ ] **Step 9: `src/routes/AppRoutes.tsx`**

```tsx
import { Navigate, Route, Routes } from 'react-router-dom'
import { CaseStudyView } from '../views/CaseStudyView'
import { HomeView } from '../views/HomeView'
import { NotFoundView } from '../views/NotFoundView'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/work/:slug" element={<CaseStudyView />} />
      {/* retired paths: keep bookmarks working */}
      <Route path="/about" element={<Navigate to="/" replace />} />
      <Route path="/projects" element={<Navigate to="/#work" replace />} />
      <Route path="/feedback" element={<Navigate to="/#recognition" replace />} />
      <Route path="/contact" element={<Navigate to="/#contact" replace />} />
      <Route path="/history" element={<Navigate to="/#experience" replace />} />
      <Route path="/stack" element={<Navigate to="/#services" replace />} />
      <Route path="/awards" element={<Navigate to="/#recognition" replace />} />
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  )
}
```

`CaseStudyView` is a stub returning `<NotFoundView />` until Task 11.

- [ ] **Step 10: `src/App.tsx`**

```tsx
import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'
import { ScrollToHash } from './components/layout/ScrollToHash'
import { AppRoutes } from './routes/AppRoutes'

export default function App() {
  return (
    <>
      <SiteHeader />
      <ScrollToHash />
      <AppRoutes />
      <SiteFooter />
    </>
  )
}
```

`main.tsx` renders `<StrictMode><BrowserRouter><AskProvider><App /></AskProvider></BrowserRouter></StrictMode>`.

- [ ] **Step 11: `SiteFooter`** ports the mockup `<footer class="band light">` markup (ghost `Abay`, glyph links with `<Niko pose="happy" />`, the GitHub path from the mockup's footer, the LinkedIn path) and `NotFoundView` renders a light `Band` with `<h1 className="display">Not found</h1>`, the requested path, and a link home.

- [ ] **Step 12: Run** `npm run test:e2e -g "navigation|shell"` → PASS. Compare the header against the mockup at 1440 and 390.

- [ ] **Step 13: Commit** `feat(shell): band layout, tone-switching header, phone sheet, footer, redirects`

---

### Task 5: Hero and portrait

**Files:**
- Create: `src/components/home/{Hero,Portrait}.tsx`, `src/assets/portrait/portrait.png` (copy `docs/assets/portrait-dither-light.png`)
- Move: `docs/assets/make-portrait-dither.py` → `scripts/make-portrait-dither.py` (update the path in its docstring)
- Port CSS: Hero block (`.hero`, `.intro`, `.portrait`, `.me`, `.thought`, `.social`, `.credits`) and the Motion rules for `.portrait` (`print`), `.hero h1 span` (`ink`), `.hero .tagline … .credits` (`settle`), and the bubble (`dots-out`, `think`, `ink-line`).

**Interfaces:**
- Consumes: `hero`, `credits`, `thoughts` (Task 3), `Band` (Task 4).
- Produces: `<Hero />`.

- [ ] **Step 1: Failing tests**

```ts
test.describe('hero', () => {
  test('name, tagline, credits', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Roger A\.\s*Abay Jr\./)
    await expect(page.locator('.credits dt')).toHaveText(['Now', 'Before', 'Recognized', 'Education'])
  })
  test('portrait thinks on hover, next line each visit', async ({ page, isMobile }) => {
    test.skip(isMobile, 'hover')
    await page.goto('/')
    await page.hover('#me')
    await expect(page.locator('.thought')).toBeVisible()
    await expect(page.locator('#thought-text')).toHaveText('Right now: building the iRIMS-V Library app in Flutter.')
    await page.mouse.move(5, 5)
    await page.hover('#me')
    await expect(page.locator('#thought-text')).toHaveText('Still shipping updates to iRIMS-V.')
  })
  test('portrait thought toggles on tap', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'touch')
    await page.goto('/')
    await page.tap('#me')
    await expect(page.locator('#me')).toHaveClass(/open/)
    await expect(page.locator('#thought-text')).toHaveText('Right now: building the iRIMS-V Library app in Flutter.')
  })
})
```

Run → FAIL.

- [ ] **Step 2: `src/components/home/Portrait.tsx`**

```tsx
import { useEffect, useRef, useState } from 'react'
import portrait from '../../assets/portrait/portrait.png'
import { thoughts } from '../../data/site'

// The portrait thinks out loud: a paper bubble rises from the head on hover,
// keyboard focus, or tap, and each visit shows the next line.
export function Portrait() {
  const ref = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [line, setLine] = useState<string>(thoughts[0])

  const next = () => {
    setLine(thoughts[index % thoughts.length])
    setIndex((i) => i + 1)
  }

  useEffect(() => {
    const close = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [])

  return (
    <figure
      ref={ref}
      id="me"
      className={`me${open ? ' open' : ''}`}
      tabIndex={0}
      aria-describedby="thought-text"
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') next() }}
      onFocus={(e) => { if (e.currentTarget.matches(':focus-visible')) next() }}
      onPointerUp={(e) => {
        if (e.pointerType === 'mouse') return
        if (!open) next()
        setOpen((o) => !o)
      }}
    >
      <img className="portrait" src={portrait} width={300} height={300} alt="Portrait of Roger A. Abay Jr." />
      <div className="thought" aria-live="polite">
        <span className="dots" aria-hidden="true"><i /><i /><i /></span>
        <p id="thought-text">{line}</p>
      </div>
    </figure>
  )
}
```

- [ ] **Step 3: `src/components/home/Hero.tsx`** – port the mockup's `.band.dark.hero` markup: `<Band tone="dark">`, `.intro` grid with `<Portrait />`, `h1.display` with one `<span>` per `hero.name` entry, `p.tagline`, `p.lede`, `nav.social` (GitHub, LinkedIn, Facebook, Email with the arrow SVG), `.btns` (View work → `/#work`, Résumé with the download SVG), `dl.credits` from `credits`. Render it at the top of `HomeView`.

- [ ] **Step 4: Run** `npm run test:e2e -g hero` → PASS on both projects. Visually compare with the mockup at 1440 and 390: portrait top aligned with the name, bubble above the head on phones.

- [ ] **Step 5: Commit** `feat(hero): dithered portrait with thought bubble, name, credits`

---

### Task 6: Selected work and more work

**Files:**
- Create: `src/components/home/SelectedWork.tsx`, `src/components/ui/Halftone.tsx`
- Port CSS: Halftone wrapper, `.head`, Selected work (`.case`, `.facts`), Tables (`.table`, `.tr`, `.name`, `.go`).

**Interfaces:**
- Consumes: `featuredProjects`, `moreProjects`, `previewFor` (Task 3), `Picture` (existing).
- Produces: `<Halftone source alt />`, `<SelectedWork />` with `id="work"`.

- [ ] **Step 1: Failing tests**

```ts
test.describe('work', () => {
  test('four featured systems in order, Eurasian absent', async ({ page }) => {
    await page.goto('/#work')
    await expect(page.locator('#work article.case h3')).toHaveText(['iRIMS-V', 'EDULEAVE', 'LRMIS', 'iRIMS-V Library System'])
    await expect(page.getByText('Eurasian')).toHaveCount(0)
    await expect(page.locator('a[href="https://irimsv-library.net/"]').first()).toBeVisible()
  })
  test('no placeholder result rows', async ({ page }) => {
    await page.goto('/#work')
    await expect(page.locator('#work .facts dt', { hasText: 'Result' })).toHaveCount(0)
  })
})
```

Featured order is the row order from Task 3. Run → FAIL.

- [ ] **Step 2: `src/components/ui/Halftone.tsx`**

```tsx
import { Picture, type PictureSource } from './Picture'

export function Halftone({ source, alt, className = '' }: { source: PictureSource; alt: string; className?: string }) {
  return (
    <div className={`ht ${className}`}>
      <Picture source={source} alt={alt} sizes="(max-width: 960px) 100vw, 600px" />
    </div>
  )
}
```

- [ ] **Step 3: `src/components/home/SelectedWork.tsx`**

```tsx
import { Link } from 'react-router-dom'
import { featuredProjects, moreProjects, previewFor } from '../../data/projects'
import { Band } from '../layout/Band'
import { Halftone } from '../ui/Halftone'

const host = (url: string) => new URL(url).host.replace(/^www\./, '')

export function SelectedWork() {
  return (
    <Band id="work" tone="light">
      <div className="wrap">
        <div className="head">
          <h2 className="h2">Selected work</h2>
          <p>{featuredProjects.length === 4 ? 'Four' : featuredProjects.length} systems in production. Each one replaced a process an office ran on paper, spreadsheets, or email.</p>
        </div>
        {featuredProjects.map((p) => {
          const preview = previewFor(p.slug)
          const to = p.caseStudy ? `/work/${p.slug}` : p.liveUrl
          return (
            <article className="case" key={p.slug}>
              {preview && to && (
                p.caseStudy
                  ? <Link to={to} aria-label={`${p.title} case study`} viewTransition data-shot={p.slug}><Halftone source={preview} alt={`${p.title} screenshot`} /></Link>
                  : <a href={to} aria-label={`${p.title} live site`}><Halftone source={preview} alt={`${p.title} screenshot`} /></a>
              )}
              <div>
                <h3 className="h3">{p.title}</h3>
                <p>{p.description}</p>
                <dl className="facts">
                  {p.client && (<><dt className="ui">Client</dt><dd>{p.client}</dd></>)}
                  {p.role && (<><dt className="ui">Role</dt><dd>{p.role}</dd></>)}
                  <dt className="ui">Stack</dt><dd>{p.stack}</dd>
                  {p.metrics?.[0] && (<><dt className="ui">Result</dt><dd>{p.metrics[0]}</dd></>)}
                </dl>
                <div className="btns">
                  {p.caseStudy && <Link className="btn solid" to={`/work/${p.slug}`} viewTransition>Case study</Link>}
                  {p.liveUrl && <a className="btn tint live" href={p.liveUrl}>{host(p.liveUrl)}</a>}
                </div>
              </div>
            </article>
          )
        })}
        <div className="table" style={{ marginTop: 40 }}>
          {moreProjects.map((p) => (
            <div className="tr" key={p.slug}>
              <span className="ui">{p.category}</span>
              <div><div className="name">{p.title}</div><p>{p.description}</p></div>
              <span className="ui soft">{p.status === 'in-progress' ? 'In progress' : 'Internal'}</span>
            </div>
          ))}
        </div>
      </div>
    </Band>
  )
}
```

- [ ] **Step 4: Run** `npm run test:e2e -g work` → PASS. Compare with mockup.

- [ ] **Step 5: Commit** `feat(work): featured case rows from data, more-work table`

---

### Task 7: Services figures with motion

**Files:**
- Create: `src/hooks/{useInView,usePrefersReducedMotion}.ts`, `src/components/home/Services.tsx`, `src/components/home/figures/{RecordsFigure,ApprovalsFigure,DashboardsFigure,DeployFigure}.tsx`
- Port CSS: What I do block (`.flow`, `.step`, `.stack`, `.tags`) and the Motion rules under "Services figures" through `@keyframes nudge`.

**Interfaces:**
- Produces:

```ts
// src/hooks/usePrefersReducedMotion.ts
export function usePrefersReducedMotion(): boolean
// src/hooks/useInView.ts
export function useInView(ref: RefObject<Element | null>, threshold?: number): { inView: boolean; seen: boolean }
```

- [ ] **Step 1: Failing tests**

```ts
test.describe('services', () => {
  test('figures play once in view', async ({ page }) => {
    await page.goto('/#services')
    await expect(page.locator('#flow')).toHaveClass(/armed/)
    await expect(page.locator('#flow li.fig-records')).toHaveClass(/\bon\b/)
  })
  test.describe('reduced motion', () => {
    test.use({ contextOptions: { reducedMotion: 'reduce' } })
    test('figures are complete and never armed', async ({ page }) => {
      await page.goto('/#services')
      await expect(page.locator('#flow')).not.toHaveClass(/armed/)
      await expect(page.locator('#flow li')).toHaveCount(4)
    })
  })
})
```

Run → FAIL.

- [ ] **Step 2: Hooks**

```ts
// src/hooks/usePrefersReducedMotion.ts
import { useSyncExternalStore } from 'react'
const QUERY = '(prefers-reduced-motion: reduce)'
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (cb) => { const m = matchMedia(QUERY); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb) },
    () => matchMedia(QUERY).matches,
    () => false,
  )
}
```

```ts
// src/hooks/useInView.ts
import { useEffect, useState, type RefObject } from 'react'
export function useInView(ref: RefObject<Element | null>, threshold = 0.35) {
  const [inView, setInView] = useState(false)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting)
      if (entry.isIntersecting) setSeen(true)
    }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, threshold])
  return { inView, seen }
}
```

- [ ] **Step 3: Figures.** Each figure file exports a component that returns the `<svg>` copied from the mockup's matching `li` (`fig-records`, `fig-approvals`, `fig-dash`, `fig-deploy`), converted with the JSX table above. Example, `ApprovalsFigure.tsx`, in full:

```tsx
const FIG = { viewBox: '0 0 160 104', fill: 'none', stroke: 'currentColor', strokeWidth: 1.25, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const

export function ApprovalsFigure() {
  return (
    <svg {...FIG}>
      <rect x="10" y="40" width="30" height="24" rx="2" /><path d="M16 48h18M16 55h12" />
      <path className="march" d="M40 52h20" strokeDasharray="2 3" />
      <circle cx="72" cy="52" r="12" /><path d="M72 52l5 3" /><path className="hand" d="M72 52v-8" />
      <path className="march" d="M84 52h20" strokeDasharray="2 3" />
      <circle className="done" cx="118" cy="52" r="14" fill="currentColor" fillOpacity={0.12} />
      <path className="tick" pathLength={1} d="m111 52 5 5 9-10" />
      <circle className="token" cx="42" cy="52" r="2.6" fill="currentColor" stroke="none" />
      <path className="nudge" d="M146 52h10m-4-4 4 4-4 4" />
    </svg>
  )
}
```

Export `FIG` from `figures/fig.ts` and reuse it in the other three.

- [ ] **Step 4: `Services.tsx`**

```tsx
import { useRef, type ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { skillGroups } from '../../data/facts'
import { Band } from '../layout/Band'
import { ApprovalsFigure } from './figures/ApprovalsFigure'
import { DashboardsFigure } from './figures/DashboardsFigure'
import { DeployFigure } from './figures/DeployFigure'
import { RecordsFigure } from './figures/RecordsFigure'

const STEPS = [
  { cls: 'fig-records', Figure: RecordsFigure, title: 'Records', text: 'One searchable source instead of a spreadsheet per office.' },
  { cls: 'fig-approvals', Figure: ApprovalsFigure, title: 'Approvals', text: 'Requests route themselves; every decision is kept.' },
  { cls: 'fig-dash', Figure: DashboardsFigure, title: 'Dashboards', text: 'What came in, what is pending, what needs attention.' },
  { cls: 'fig-deploy', Figure: DeployFigure, title: 'Deploy and support', text: 'On servers I run, and I stay on after launch.' },
]

function Step({ cls, children }: { cls: string; children: ReactNode }) {
  const ref = useRef<HTMLLIElement>(null)
  const { inView, seen } = useInView(ref)
  return <li ref={ref} className={`${cls}${seen ? ' on' : ''}${inView ? ' in-view' : ''}`}>{children}</li>
}

export function Services() {
  const reduced = usePrefersReducedMotion()
  return (
    <Band id="services" tone="light" flush>
      <div className="wrap">
        <div className="head">
          <h2 className="h2">What I do</h2>
          <p>One pattern underneath every project: move the record off paper, route it, report on it, and keep it running.</p>
        </div>
        <ol id="flow" className={`flow${reduced ? '' : ' armed'}`}>
          {STEPS.map(({ cls, Figure, title, text }) => (
            <Step key={cls} cls={cls}><Figure /><h3 className="step">{title}</h3><p>{text}</p></Step>
          ))}
        </ol>
        <div className="stack">
          {skillGroups.filter((g) => g.label !== 'Also shipped in production').map((g) => (
            <div key={g.label}><span className="ui">{g.label}</span><ul className="tags">{g.items.map((t) => <li key={t}>{t}</li>)}</ul></div>
          ))}
        </div>
      </div>
    </Band>
  )
}
```

Rename the `CURATED` group labels in `facts.ts` to the mockup's short labels: `Languages`, `Frameworks`, `Databases`, `Testing`, `Deploy and infra`.

- [ ] **Step 5: Run** `npm run test:e2e -g services` → PASS. Record a 6-frame filmstrip (as done for the mockup) and compare timing with the mockup.

- [ ] **Step 6: Commit** `feat(services): process figures with in-view motion, stack tags`

---

### Task 8: Experience timeline

**Files:**
- Create: `src/components/home/Experience.tsx`
- Port CSS: Experience block (`.tl`, `.bar`, `.mark`, `.axis`, `.key`, `.now-line`, `.elapsed`, `.roles`, `.role-row`, `.award`) and the Motion rules from `.tl.armed .bar` through `mark-ping`.

**Interfaces:**
- Consumes: `experience`, `education` (Task 3), `useInView`, `usePrefersReducedMotion` (Task 7).

- [ ] **Step 1: Failing tests**

```ts
test.describe('experience', () => {
  test('timeline and rows', async ({ page }) => {
    await page.goto('/#experience')
    await expect(page.locator('#timeline .bar')).toHaveCount(4)
    await expect(page.locator('.role-row')).toHaveCount(4)
    await expect(page.locator('.role-row > .ui').first()).toHaveText('2025 – Present')
  })
  test('row hover highlights its bar', async ({ page, isMobile }) => {
    test.skip(isMobile, 'hover')
    await page.goto('/#experience')
    await page.hover('.role-row[data-k="co"]')
    await expect(page.locator('#timeline')).toHaveClass(/focus/)
    await expect(page.locator('#timeline .bar[data-k="co"]')).toHaveClass(/hl/)
  })
})
```

Run → FAIL.

- [ ] **Step 2: `Experience.tsx`**

```tsx
import { useRef, useState, type CSSProperties } from 'react'
import { education, experience } from '../../data/experience'
import { useInView } from '../../hooks/useInView'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { Band } from '../layout/Band'

const FIRST = 2019
const YEARS = 9                                  // 2019 through 2027, one grid column each
const col = (year: number) => year - FIRST + 2   // column 1 holds the labels
const now = new Date()
const NOW_PCT = `${(((now.getFullYear() - FIRST) + now.getMonth() / 12) / YEARS) * 100}%`

export function Experience() {
  const ref = useRef<HTMLElement>(null)
  const { inView, seen } = useInView(ref, 0.4)
  const reduced = usePrefersReducedMotion()
  const [focus, setFocus] = useState<string | null>(null)
  const link = (k: string) => ({
    'data-k': k,
    onMouseEnter: () => setFocus(k), onMouseLeave: () => setFocus(null),
    onFocus: () => setFocus(k), onBlur: () => setFocus(null),
  })
  const hl = (k: string) => (focus === k ? ' hl' : '')
  const r5 = experience.find((e) => e.key === 'r5')!
  const co = experience.find((e) => e.key === 'co')!
  const lg = experience.find((e) => e.key === 'lg')!

  const tlClass = ['tl', !reduced && 'armed', seen && 'drawn', inView && 'in-view', focus && 'focus'].filter(Boolean).join(' ')
  const bar = (k: string, row: number, from: number, to: number, kind = '', d = '0s') => (
    <span className={`bar ${kind}${hl(k)}`} {...link(k)} style={{ gridRow: row, gridColumn: `${col(from)} / ${col(to)}`, '--d': d } as CSSProperties} />
  )

  return (
    <Band id="experience" tone="dark">
      <div className="wrap">
        <div className="head">
          <h2 className="h2">Experience</h2>
          <p>Feature ownership inside a national team, then end-to-end ownership of production systems and the servers they run on.</p>
        </div>
        <figure ref={ref} id="timeline" className={tlClass} aria-label="Timeline from 2019 to the present" style={{ '--now': NOW_PCT } as CSSProperties}>
          <span className={`lab ui${hl('r5')}`} {...link('r5')} style={{ gridRow: 1 }}>Region V</span>
          {bar('r5', 1, r5.start!, FIRST + YEARS, 'now')}
          <span className={`lab ui${hl('co')}`} {...link('co')} style={{ gridRow: 2 }}>Central Office</span>
          {bar('co', 2, co.start!, co.end!, '', '.08s')}
          <span className={`lab ui${hl('fl')}`} {...link('fl')} style={{ gridRow: 3 }}>Freelance</span>
          <span className={`mark${hl('fl')}`} {...link('fl')} style={{ gridRow: 3, gridColumn: `${col(now.getFullYear())} / span 1` }}><i />ongoing</span>
          <span className="lab ui" style={{ gridRow: 4 }}>{education.degree.replace('BS Information Technology', 'BSIT')}, {education.honors}</span>
          {bar('ed', 4, education.start, education.end, 'edu', '.16s')}
          <span className={`lab ui${hl('lg')}`} {...link('lg')} style={{ gridRow: 5 }}>LGU internship</span>
          {bar('lg', 5, lg.start!, lg.end!, 'intern', '.24s')}
          <span className="now-line" aria-hidden="true" style={{ gridRow: '1 / 6', gridColumn: `2 / ${YEARS + 2}` }}><b className="ui">Now</b></span>
          <span className="elapsed" aria-hidden="true" style={{ gridRow: 6, gridColumn: `2 / ${YEARS + 2}` }} />
          {Array.from({ length: YEARS - 1 }, (_, i) => (
            <span key={i} className="axis ui" style={{ gridColumn: i + 2 }}>{FIRST + i}</span>
          ))}
          <figcaption className="key ui"><span><i className="k-work" />Work</span><span><i className="k-edu" />Education</span><span><i className="k-intern" />Internship</span></figcaption>
        </figure>
        <div className="roles">
          {experience.map((e) => (
            <div key={e.key} className={`role-row${hl(e.key)}`} tabIndex={0} {...link(e.key)}>
              <span className="ui">{e.period}</span>
              <div>
                <div className="role">{e.role} <span className="org">{e.organization}</span></div>
                <p>{e.summary}</p>
                {e.award && <span className="award ui"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="12" cy="9" r="6" /><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7" /></svg>{e.award}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Band>
  )
}
```

In `site.css`, replace the literal `86%` in `.tl .elapsed { width }`, `.tl .now-line::before { left }` and `.tl .now-line b { left }` with `var(--now)`, so "Now" tracks the real date instead of the mockup's fixed value.

- [ ] **Step 3: Run** `npm run test:e2e -g experience` → PASS.

- [ ] **Step 4: Commit** `feat(experience): animated timeline with live Now marker, linked role rows`

---

### Task 9: Recognition, Experiments, FAQ

**Files:**
- Create: `src/components/home/{Recognition,Experiments,Faq}.tsx`
- Port CSS: Recognition, Experiments (`.index`, `.item`), FAQ blocks and the FAQ `::details-content` rules.

**Interfaces:**
- Consumes: `testimonials`, `site.award` (existing), `experiments`, `previewFor` (Task 3), `faq` (Task 3), `Halftone` (Task 6).

- [ ] **Step 1: Failing tests**

```ts
test.describe('proof and experiments', () => {
  test('three quotes, no private repo links', async ({ page }) => {
    await page.goto('/#recognition')
    await expect(page.locator('#recognition blockquote')).toHaveCount(3)
    await expect(page.locator('a[href*="samakatuwid00/JARVIS"]')).toHaveCount(0)
    await expect(page.locator('a[href*="second-brain-vault"]')).toHaveCount(0)
    await expect(page.locator('#experiments')).toContainText('Cygnus')
  })
  test('faq opens', async ({ page }) => {
    await page.goto('/#faq')
    await page.getByText('Where does the system run?').click()
    await expect(page.getByText(/On a Linux VPS I set up and manage/)).toBeVisible()
  })
})
```

Run → FAIL.

- [ ] **Step 2: Implement.** `Recognition`: port the mockup's `#recognition` markup, award image via existing `award.png` imagetools import (`?w=640;1280&format=avif;webp&as=picture`), quotes from `testimonials`, cite line `name, position`. `Experiments`: for each project in `experiments`, render `<a className=... href={githubUrl}>` when `githubUrl` exists, otherwise `<div className="item">`; the right cell shows `Source` with the arrow SVG when linked, otherwise `<span className="ui soft">Private</span>` for `status === 'private'` and nothing for others (Cygnus shows no link until its repo is cleaned). Cygnus preview uses `<Halftone>` with `style={{ objectPosition: 'center 40%' }}` on the image via a `className="center"` rule `.ht.center img { object-position: center 40%; }`. `Faq`: `<details><summary><span>{q}</span><svg plus/></summary><div className="a">{a}</div></details>` for each `faq` entry, with the head paragraph's "ask the assistant" link calling `useAsk().open()` (added in Task 12; until then render plain text).

- [ ] **Step 3: Run** → PASS. **Step 4: Commit** `feat(home): recognition, experiments index, faq`

---

### Task 10: Contact

**Files:**
- Create: `src/components/home/Contact.tsx`
- Modify: `src/components/ContactForm.tsx` (markup and class names only; keep `contactApi` and validation logic)
- Port CSS: Contact block (`.contact`, `.reach`, `.tabs`, `.pill`, `.reach-row`, `.copy-btn`, `.field`, form rules) and `@keyframes swap`.

- [ ] **Step 1: Failing tests**

```ts
test.describe('contact', () => {
  test('channel tabs switch the address', async ({ page }) => {
    await page.goto('/#contact')
    await page.getByRole('tab', { name: 'GitHub' }).click()
    await expect(page.locator('#reach-v')).toHaveText('github.com/samakatuwid00')
  })
  test('empty form is blocked with a message', async ({ page }) => {
    await page.goto('/#contact')
    await page.getByRole('button', { name: /send message/i }).click()
    await expect(page.getByText(/required|enter/i).first()).toBeVisible()
  })
})
```

- [ ] **Step 2: `Contact.tsx`**

```tsx
import { useState, type CSSProperties } from 'react'
import { site, socialLinks } from '../../data/site'
import { ContactForm } from '../ContactForm'
import { Band } from '../layout/Band'

const CHANNELS = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { label: 'LinkedIn', value: 'linkedin.com/in/roger-abay-30394441b', href: socialLinks[1].href },
  { label: 'GitHub', value: 'github.com/samakatuwid00', href: socialLinks[0].href },
]

export function Contact() {
  const [i, setI] = useState(0)
  const [copied, setCopied] = useState<'idle' | 'done' | 'failed'>('idle')
  const channel = CHANNELS[i]
  const copy = async () => {
    try { await navigator.clipboard.writeText(channel.value); setCopied('done') } catch { setCopied('failed') }
    setTimeout(() => setCopied('idle'), 1800)
  }
  return (
    <Band id="contact" tone="dark">
      <div className="wrap contact">
        <div>
          <h2 className="display">Let's talk</h2>
          <p className="lede">Tell me about the records, approvals, or reports your team still handles by hand.</p>
          <div className="reach">
            <div className="tabs" role="tablist" aria-label="Contact channel" style={{ '--i': i } as CSSProperties}>
              <span className="pill" aria-hidden="true" />
              {CHANNELS.map((c, n) => (
                <button key={c.label} role="tab" aria-selected={n === i} onClick={() => { setI(n); setCopied('idle') }}>{c.label}</button>
              ))}
            </div>
            <div className="reach-row" role="tabpanel">
              <a id="reach-v" key={channel.value} className="swap" href={channel.href}>{channel.value}</a>
              <button className={`copy-btn${copied === 'done' ? ' done' : ''}`} type="button" onClick={copy}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="8" y="8" width="12" height="12" /><path d="M16 8V4H4v12h4" /></svg>
                <span aria-live="polite">{copied === 'done' ? 'Copied' : copied === 'failed' ? 'Press Ctrl+C' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </Band>
  )
}
```

(`key={channel.value}` remounts the link so the `swap` keyframe replays on every switch.)

- [ ] **Step 3: `ContactForm.tsx`**: wrap each input in `<label><span className="ui">…</span><span className="field">…</span></label>`, submit button `className="btn solid"`. Keep field names, validation, and `contactApi`.

- [ ] **Step 4: Run** → PASS. **Step 5: Commit** `feat(contact): channel tabs with copy, restyled form`

---

### Task 11: Case study route with view transition

**Files:**
- Create: `src/views/CaseStudyView.tsx` (replace the stub)
- Port CSS: Case study block and the `::view-transition-*` rules.

- [ ] **Step 1: Failing tests**

```ts
test.describe('case study', () => {
  test('iRIMS-V page renders from data', async ({ page }) => {
    await page.goto('/work/irims-v')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('iRIMS-V')
    await expect(page.getByText('Integrated Resource Inventory and Mapping System for Region V')).toBeVisible()
    await expect(page.getByRole('link', { name: /all work/i })).toHaveAttribute('href', '/#work')
  })
  test('project without a case study is a 404', async ({ page }) => {
    await page.goto('/work/lrmis')
    await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible()
  })
})
```

- [ ] **Step 2: Implement** `CaseStudyView`: `const { slug } = useParams()`; find the visible project; if it has no `caseStudy`, return `<NotFoundView />`. Render the mockup `#case` markup: dark `Band` with back `Link to="/#work" viewTransition`, `h1.display`, `p.lede` = `expansion` + `lede`, `dl.cs-meta` (Role, Client, Stack, Status link), `<Halftone className="cs-shot">` with `style={{ viewTransitionName: 'shot' }}`; light `Band` with Problem, Approach (`<ul>` of `approach`), Result sections. Omit metric rows entirely (no placeholders). "Next" link goes to the next featured project that has a `caseStudy`; hide it when there is none. On the home page, the clicked preview gets `viewTransitionName: 'shot'` via `data-shot` and the `Link viewTransition` prop (React Router 7 wraps the navigation in `document.startViewTransition`).

- [ ] **Step 3: Run** → PASS. **Step 4: Commit** `feat(work): data-driven case study route with shared-screenshot transition`

---

### Task 12: Assistant button and panel

**Files:**
- Create: `src/components/ask/AskButton.tsx`
- Modify: `src/components/AskContext.ts`, `src/components/AskProvider.tsx`, `src/App.tsx` (render `<AskButton />`), `src/components/home/Faq.tsx` (link opens the panel)
- Port CSS: Assistant block and the `.ask-panel.open` `@starting-style` rule.

**Interfaces:**
- Consumes: `useAsk()` → `{ messages, state, isOpen, inputRef, ask, close, reset }` plus new `open: () => void`, and `suggestions` from `src/data/ask.ts`.

- [ ] **Step 1: Failing tests** (the API is mocked so tests never call Groq)

```ts
test.describe('assistant', () => {
  test('button opens the panel; a chip asks', async ({ page }) => {
    await page.route('**/api/ask', (r) => r.fulfill({ json: { answer: 'I build Laravel systems.' } }))
    await page.goto('/')
    await page.getByRole('button', { name: /ask about my work/i }).click()
    await expect(page.getByRole('dialog', { name: /ask about my work/i })).toBeVisible()
    await page.getByRole('button', { name: /what's your stack/i }).click()
    await expect(page.getByText('I build Laravel systems.')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog', { name: /ask about my work/i })).toBeHidden()
  })
})
```

Before writing it, open `src/services/askApi.ts` and match the mocked JSON to the response shape it reads (replace `answer` if the field is named differently).

- [ ] **Step 2: Add `open`** to `AskContextValue` (`open: () => void`) and implement in `AskProvider`:

```ts
const open = useCallback(() => {
  setIsOpen(true)
  requestAnimationFrame(() => inputRef.current?.focus())
}, [])
```

Add `open` to the memoised value and its dependency list.

- [ ] **Step 3: `AskButton.tsx`** renders the mockup's `.ask` button (Niko + visually hidden label on phones) and `.ask-panel` (`role="dialog"`, `aria-label="Ask about my work"`, className `open` when `isOpen`), title "Ask Niko", the chips from `suggestions`, the message list from `messages` (user and assistant turns, `aria-live="polite"`), a thinking indicator when `state === 'thinking'`, and a form whose input uses `inputRef` and calls `ask(value)`. Escape and outside click call `close()`.

- [ ] **Step 4: Run** → PASS. **Step 5: Commit** `feat(ask): floating assistant button and panel on the existing provider`

---

### Task 13: Remove the old shell and dependencies

**Files:** delete everything listed under "Deleted in Task 13" above; update `README.md`.

- [ ] **Step 1: Find dead files.** `npx tsc -b` must pass after each deletion batch. Then:

```bash
npx knip --include files,dependencies || true
```

Delete any remaining file under `src/` that no import reaches. Remove `framer-motion` and `lucide-react` if `grep -r "framer-motion\|lucide-react" src` is empty:

```bash
npm uninstall framer-motion lucide-react @fontsource-variable/inter
```

- [ ] **Step 2: README.** Replace the design section with: the two-ink system, the four fonts, the band pattern, the motion rules (visible defaults, `armed` classes, reduced motion), how to regenerate the portrait (`python scripts/make-portrait-dither.py src/assets/pic.jpg src/assets/portrait/portrait.png --size 600 --ink light --gamma 1.3 --erode 7 --algo floyd --shadow .12 --fade .22 --rim .6`), and `npm run test:e2e`. Correct "FormSubmit" to Formspree.

- [ ] **Step 3: Full gate**

```bash
npm run lint && npm run build && npm run test:e2e
```

Expected: lint clean, build succeeds (prebuild regenerates `api/context.ts`), every test passes on `desktop` and `phone`.

- [ ] **Step 4: Commit** `chore: remove the portfolio-OS shell, intro, Niko engine and unused deps`

---

### Task 14: End-to-end verification and preview

- [ ] **Step 1: Copy rules.** Add and run:

```ts
test('no em dashes, no horizontal scroll', async ({ page }) => {
  for (const path of ['/', '/work/irims-v']) {
    await page.goto(path)
    expect(await page.locator('body').innerText()).not.toContain('—')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
})
```

- [ ] **Step 2: Side-by-side review.** Screenshot `/` and `/work/irims-v` at 1440×900 and 390×844 and compare section by section with `docs/redesign-mockup-v2.html`. List every difference and fix it.
- [ ] **Step 3: Accessibility.** Keyboard pass: Tab reaches header links, portrait (bubble shows), timeline rows (highlight), FAQ, contact tabs, form, assistant. Check focus rings are visible on both inks. Run Lighthouse (Accessibility ≥ 95, Performance ≥ 90 on desktop).
- [ ] **Step 4: Adversarial review.** Dispatch a reviewer subagent with this plan and the full diff (`git diff main...redesign/bw`) to check every Global Constraint and Out-of-Scope line.
- [ ] **Step 5: Preview deploy.** Push the branch and open the Vercel preview. Production deploy waits for the owner's approval.

```bash
git push -u origin redesign/bw
```

- [ ] **Step 6: Commit** any fixes from Steps 2 to 4: `fix: review findings from the redesign verification pass`
