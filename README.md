# Roger A. Abay Jr. — Developer Portfolio

A single-page portfolio presented as a terminal window: fixed window chrome, a persistent navigation rail, and a scrolling content pane. Each view opens with a shell prompt (`$ whoami`, `$ ls projects`).

Built for government IT decision-makers and hiring managers evaluating production systems work.

## Highlights

- App-window shell with a four-item rail: `/about`, `/projects`, `/feedback`, `/contact`
- Client-side routing — each view is a real URL, deep-linkable, with working browser history
- Featured systems: IRIMS-V, LRMIS, EDULEAVE, Eurasian, IRIMS-V Library, each with a detail dialog
- Elegant light and dark themes built on CSS custom properties, persisted to `localStorage`
- Pixel-dissolve transitions on view change and theme toggle, disabled under `prefers-reduced-motion`
- Terminal command bar pinned to the bottom of the window — press `/` to ask about the work
- Downloadable résumé, award lightbox, and a contact form delivered through FormSubmit
- No external runtime requests: fonts and technology logos are bundled

## Tech Stack

- React 19
- TypeScript 6
- Vite 8
- Tailwind CSS 4 (`@theme` design tokens, no config file)
- React Router 7
- Framer Motion
- Lucide React

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
| `npm run build` | Type-check and create a production build |
| `npm run lint` | Run ESLint across the project |
| `npm run preview` | Preview the production build locally |

## Project Structure

```text
src/
├── assets/       # Photos, award image, résumé, bundled technology logos
├── components/   # Shell, cards, dialogs, form, transitions
│   └── ui/       # Panel, Prompt, Tag, ActionLink, StatusDot
├── data/         # All site content as typed modules
├── hooks/        # Theme, focus trap, scroll lock, element size
├── layouts/      # ShellLayout — the window frame
├── routes/       # Route table and redirects
├── sections/     # Whoami, History, Projects, Skills, Feedback, Awards, Contact
├── services/     # Contact form integration
├── types/        # Shared TypeScript types
└── views/        # One component per route
```

## Design System

All colour, spacing, and typography tokens live in `src/index.css` under `@theme`, with a `.dark` block overriding the palette. No hex value appears anywhere else in the source — components reference tokens through Tailwind utilities (`bg-panel`, `text-text-2`, `border-line`).

Interactive controls use a dedicated `--color-control` border token that holds a 3:1 contrast ratio against both surfaces, satisfying WCAG 1.4.11.

## Content

Site content is data, not markup. To update the portfolio, edit the modules in `src/data/`:

| File | Contains |
| --- | --- |
| `site.ts` | Name, role, contact details, section copy |
| `projects.ts` | Project entries, features, stacks, live URLs |
| `experience.ts` | Work history and education |
| `technologies.ts` | Stack chips |
| `testimonials.ts` | Feedback quotes |
| `stats.ts`, `deliverables.ts` | Hero stats and service list |
| `navigation.ts` | Rail items |

## Contact Form

The form posts to Formspree via `src/services/contactApi.ts`, using the form ID in `VITE_FORMSPREE_FORM_ID`. Set that variable in `.env.local` locally and in the Vercel project environment for production. The `VITE_` prefix is correct here and only here — Formspree endpoints are public by design, so the ID is safe to inline in the bundle. Formspree requires a one-time email confirmation before it accepts submissions.

## Assistant

The command bar at the bottom of the window answers questions about the work. It resolves two ways:

1. **Scripted** — `src/data/ask.ts` holds an intent table built from the same modules that render the site. Stack, projects, government systems, availability, résumé, contact, location, education, experience, award, and services all answer instantly in the browser at no cost.
2. **Groq** — anything else posts to `api/ask.ts`, a Vercel Function that calls Groq's `openai/gpt-oss-120b` with a system prompt assembled by `buildContext()`. If the function is unreachable, the bar falls back to pointing the visitor at `/contact`.

Because the function bundles the site's copy, the text lives in `src/data/facts.ts` — free of Vite asset imports — and `projects.ts` / `technologies.ts` layer the images and logos on top. Keep new copy in `facts.ts`.

### Setup

Set `GROQ_API_KEY` in the Vercel project environment. Never give it a `VITE_` prefix — Vite inlines every `VITE_*` variable into the client bundle.

Locally, put `GROQ_API_KEY` in `.env.local` and run `npm run dev`. The `askDevServer` plugin in `vite.config.ts` mounts the same `api/ask.ts` handler behind the dev server, so the assistant works end to end without the Vercel CLI. The plugin is `apply: 'serve'`, so it never reaches the production build.

Without the key the scripted answers still work; off-script questions return the client-side fallback in `AskProvider.tsx`. The two are easy to tell apart — the fallback names Roger's email directly, while a real model reply cites `/contact`.

Requests are capped at 6 turns, 500 characters per message, and 400 output tokens. The per-IP limit of 20 requests per hour lives in function memory, so it throttles bursts but resets on cold start — Groq's own free-tier limits (30 requests/minute, 14,400/day) are the hard ceiling, and there is no per-token bill behind them. Move the counter to Upstash Redis if the endpoint ever sits behind paid inference.

## Production Build

```bash
npm run build
npm run preview
```

Output lands in `dist/`. The project targets Vercel: `vercel.json` sets the build command, the output directory, and the SPA rewrite that sends unknown routes to `index.html` while leaving `/api/*` to the function. On any other static host, reproduce that rewrite and drop the assistant's remote half.

## Author

**Roger A. Abay Jr.** — Full Stack Developer specializing in workflow automation, records management, reporting, dashboards, APIs, and database-backed systems.

Email: [abaygherjr07@gmail.com](mailto:abaygherjr07@gmail.com)
