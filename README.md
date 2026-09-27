# Roger A. Abay Jr.: Developer Portfolio

A one-page portfolio in two inks. The home page is a single scroll of alternating black and paper bands (work, services, experience, recognition, experiments, FAQ, contact), and each featured project with approved copy gets its own case study at `/work/:slug`.

Built for government IT decision-makers and hiring managers evaluating production systems work.

## Highlights

- One scrolling home route, with section links in the header and a full-screen menu on phones
- Case study route (`/work/irims-v`): the screenshot you click carries across with a view transition
- Old paths (`/about`, `/projects`, `/feedback`, `/contact`, `/history`, `/stack`, `/awards`) redirect to their section
- A floating assistant (press `/`) that answers from the same data that renders the site
- Downloadable résumé and a contact form delivered through Formspree
- No external runtime requests: fonts and images are bundled

## Tech Stack

- React 19
- TypeScript 6
- Vite 8, with vite-imagetools for responsive AVIF and WebP screenshots
- React Router 7 (data router)
- Tailwind CSS 4 (import and reset layer only; the styles are plain CSS)
- Playwright for end-to-end tests

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

```bash
git clone <repository-url>
cd my-app
npm install
npm run dev
```

Vite prints the local development URL, typically `http://localhost:5173`.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Regenerate `api/context.ts`, type-check, and create a production build |
| `npm run lint` | Run ESLint across the project |
| `npm run preview` | Preview the production build locally |
| `npm run test:e2e` | Run the Playwright suite on a desktop and a phone viewport |
| `npm run test:e2e:ui` | Open the Playwright UI runner |

`npm run test:e2e` starts the dev server on port 5173 by itself (or reuses one already running there). Run it before every commit that touches the site.

## Project Structure

```text
src/
├── assets/          # Screenshots, portrait, award image, résumé
│   ├── portrait/    # The dithered portrait (generated, see below)
│   └── shots/       # Project screenshots, loaded through vite-imagetools
├── components/
│   ├── ask/         # Assistant button and panel
│   ├── home/        # One component per home section, plus the Services figures
│   ├── layout/      # Header, mobile menu, footer, Band, hash scrolling
│   └── ui/          # Halftone, Picture, the Niko mark
├── data/            # All site content as typed modules
├── hooks/           # In-view, reduced motion, band tone, scroll spy, focus trap
├── routes/          # Route table and redirects
├── services/        # Contact form and assistant calls
├── styles/site.css  # Every style on the site
├── types/           # Shared TypeScript types
└── views/           # Home, case study, 404
tests/site.spec.ts   # Playwright end-to-end suite
```

## Design System

### Two inks

`--black: #0b0b0b` and `--paper: #f2f2f0`, and those two at an alpha. No other colour appears anywhere. The `.dark` and `.light` classes in `src/styles/site.css` map the inks onto `--fg`, `--bg`, `--soft`, `--rule`, and `--tint`, so a component never names an ink directly. Screenshots sit under a halftone dot screen in grayscale (`.ht`); hovering a linked one clears the dots.

### Four fonts

All bundled through @fontsource and imported in `src/main.tsx`:

| Token | Font | Used for |
| --- | --- | --- |
| `--display` | Antonio | Headings, never larger than 96px |
| `--ui` | Barlow Condensed | Labels, buttons, navigation |
| `--body` | Inter Tight | Body copy |
| `--mono` | JetBrains Mono | The email address and other literal data only |

### Bands

Every section is a `<Band tone="dark|light">`: a full-width stripe in one ink, rendered with `data-band`. The sticky header reads the band beneath it (`useBandTone`) and takes that band's tone, and a fixed 6px black frame disappears into black bands and frames the paper ones.

### Motion

- **Visible defaults.** Every section renders complete with JavaScript disabled. Animations only ever start from an already-visible state, so a blocked or failed animation hides nothing.
- **`armed` classes.** The Services flow and the Experience timeline hide their drawn parts only when React adds `armed` (and only when reduced motion is off); `useInView` then adds the class that draws them.
- **Reduced motion.** Under `prefers-reduced-motion: reduce`, `armed` is never set, and site.css switches off every transition, animation, and view transition, so the page simply swaps.

### Portrait

`src/assets/portrait/portrait.png` is generated from `src/assets/pic.jpg`. To regenerate it:

```bash
python scripts/make-portrait-dither.py src/assets/pic.jpg src/assets/portrait/portrait.png --size 600 --ink light --gamma 1.3 --erode 7 --algo floyd --shadow .12 --fade .22 --rim .6
```

## Content

Site content is data, not markup. To update the portfolio, edit the modules in `src/data/`:

| File | Contains |
| --- | --- |
| `site.ts` | Name, role, contact details, hero copy, credits, FAQ |
| `facts.ts` | Project copy, case studies, skill groups (no asset imports) |
| `projects.ts` | Screenshots keyed by project slug, plus the featured, more-work, and experiments lists |
| `experience.ts` | Roles, timeline spans, education |
| `testimonials.ts` | Recognition quotes |
| `services.ts`, `stats.ts` | Service list and figures sent to the assistant |
| `ask.ts` | The assistant's scripted answers and its system prompt context |

## Contact Form

The form posts to Formspree via `src/services/contactApi.ts`, using the form ID in `VITE_FORMSPREE_FORM_ID`. Set that variable in `.env.local` locally and in the Vercel project environment for production. The `VITE_` prefix is correct here and only here: Formspree endpoints are public by design, so the ID is safe to inline in the bundle. Formspree requires a one-time email confirmation before it accepts submissions.

## Assistant

The floating button in the bottom corner (or the `/` key) opens the assistant. It resolves two ways:

1. **Scripted.** `src/data/ask.ts` holds an intent table built from the same modules that render the site. Stack, projects, government systems, availability, résumé, contact, location, education, experience, award, and services all answer instantly in the browser at no cost.
2. **Groq.** Anything else posts to `api/ask.ts`, a Vercel Function that calls Groq's `openai/gpt-oss-120b` with a system prompt assembled by `buildContext()`. If the function is unreachable, the panel falls back to pointing the visitor at the Contact section.

The function cannot import across the `api/` boundary, so `npm run build` runs `scripts/generate-context.mjs` first, which renders `buildContext()` into `api/context.ts`. Keep new copy in `facts.ts`, free of Vite asset imports; `projects.ts` layers the screenshots on top. Hidden projects are never sent to the assistant.

### Setup

Set `GROQ_API_KEY` in the Vercel project environment. Never give it a `VITE_` prefix: Vite inlines every `VITE_*` variable into the client bundle.

Locally, put `GROQ_API_KEY` in `.env.local` and run `npm run dev`. The `askDevServer` plugin in `vite.config.ts` mounts the same `api/ask.ts` handler behind the dev server, so the assistant works end to end without the Vercel CLI. The plugin is `apply: 'serve'`, so it never reaches the production build.

Without the key the scripted answers still work; off-script questions return the client-side fallback in `AskProvider.tsx`, which names Roger's email directly.

Requests are capped at 6 turns, 500 characters per message, and 400 output tokens. The per-IP limit of 20 requests per hour lives in function memory, so it throttles bursts but resets on cold start. Groq's own free-tier limits (30 requests/minute, 14,400/day) are the hard ceiling, and there is no per-token bill behind them. Move the counter to Upstash Redis if the endpoint ever sits behind paid inference.

## Production Build

```bash
npm run build
npm run preview
```

Output lands in `dist/`. The project targets Vercel: `vercel.json` sets the build command, the output directory, and the SPA rewrite that sends unknown routes to `index.html` while leaving `/api/*` to the function. On any other static host, reproduce that rewrite and drop the assistant's remote half.

## Author

**Roger A. Abay Jr.**, Full Stack Developer specializing in workflow automation, records management, reporting, dashboards, APIs, and database-backed systems.

Email: [abaygherjr07@gmail.com](mailto:abaygherjr07@gmail.com)
