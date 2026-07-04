# Roger A. Abay Jr. — Developer Portfolio

A responsive personal portfolio showcasing production web systems built for government offices and private organizations. The site highlights full-stack projects, technical capabilities, awards, testimonials, and ways to get in touch.

## Highlights

- Featured systems including IRIMS-V, EDULEAVE, Eurasian, IRIMS-V Library, and LRMIS
- Project previews, feature summaries, technology tags, and live-demo links
- Responsive neo-brutalist interface with light and dark themes
- Scroll and interaction animations powered by Framer Motion
- Downloadable resume and award-image lightbox
- Contact form delivery through FormSubmit
- Accessible, reusable React components and typed portfolio data

## Tech Stack

- React 19
- TypeScript 6
- Vite 8
- Tailwind CSS 4
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

Vite will print the local development URL, typically `http://localhost:5173`.

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
├── assets/       # Project images, profile media, and resume
├── components/   # Reusable UI and form components
├── hooks/        # Shared React hooks, including dark mode
├── layouts/      # Site-wide layout
├── pages/        # Portfolio page content
├── routes/       # Application routing
├── services/     # Contact-form integration
├── types/        # Shared TypeScript types
├── App.tsx
└── main.tsx
```

## Contact Form

The contact form submits inquiries to FormSubmit through `src/services/contactApi.ts`. If the destination email changes, update `FORM_ENDPOINT` and the generated inquiry subject in that file. FormSubmit may require a one-time email confirmation before accepting submissions.

## Production Build

```bash
npm run build
npm run preview
```

The optimized output is generated in `dist/` and can be deployed to any static hosting provider. Because the app uses browser-based routing, configure the host to fall back to `index.html` for unknown routes.

## Author

**Roger A. Abay Jr.** — Full Stack Developer specializing in workflow automation, records management, reporting, dashboards, APIs, and database-backed systems.

Email: [abaygherjr07@gmail.com](mailto:abaygherjr07@gmail.com)
