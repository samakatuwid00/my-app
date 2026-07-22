# Roger A. Abay Jr. — Developer Portfolio

A single-page portfolio presented as a terminal window: fixed window chrome, a persistent navigation rail, and a scrolling content pane. Each view opens with a shell prompt (`$ whoami`, `$ ls projects`).

Built for government IT decision-makers and hiring managers evaluating production systems work.

## Highlights

- App-window shell with a four-item rail: `/about`, `/projects`, `/feedback`, `/contact`
- Client-side routing — each view is a real URL, deep-linkable, with working browser history
- Featured systems: IRIMS-V, LRMIS, EDULEAVE, Eurasian, IRIMS-V Library, each with a detail dialog
- Elegant light and dark themes built on CSS custom properties, persisted to `localStorage`
- Pixel-dissolve transitions on view change and theme toggle, disabled under `prefers-reduced-motion`
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

The form posts to FormSubmit via `src/services/contactApi.ts`. To change the destination, update `FORM_ENDPOINT` in that file. FormSubmit requires a one-time email confirmation before it accepts submissions.

## Production Build

```bash
npm run build
npm run preview
```

Output lands in `dist/` and deploys to any static host. Because the app uses browser-based routing, configure the host to rewrite unknown routes to `index.html` — `public/_redirects` covers Netlify-style hosts.

## Author

**Roger A. Abay Jr.** — Full Stack Developer specializing in workflow automation, records management, reporting, dashboards, APIs, and database-backed systems.

Email: [abaygherjr07@gmail.com](mailto:abaygherjr07@gmail.com)
