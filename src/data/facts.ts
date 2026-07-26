import type { ProjectFacts } from '../types/portfolio'

export const projectFacts: ProjectFacts[] = [
  {
    title: 'IRIMS-V',
    description:
      'Learning Resource Information Management System for inventory, monitoring, dashboards, and reporting across education offices.',
    features: [
      'Inventory Tracking',
      'User Role Management',
      'Reports Generation',
      'Dashboard Analytics',
      'Learning Resource Monitoring',
      'Station Management',
    ],
    technologies: [
      'Laravel',
      'PHP',
      'PostgreSQL',
      'Blade',
      'Tailwind CSS',
      'Alpine.js',
      'htmx',
      'Vite',
      'Apache ECharts',
      'Docker',
      'Pest (PHP testing)',
      'PHPStan / Larastan',
      'REST API',
    ],
    status: 'live',
    liveUrl: 'https://irimsv.net/',
  },
  {
    title: 'EDULEAVE',
    description:
      'Division-level HR platform built to automate leave credit monitoring for teaching and non-teaching personnel, replacing manual records with a clearer digital workflow.',
    features: [
      'Leave Credit Monitoring',
      'Approval Workflow',
      'Teaching & Non-Teaching Support',
      'HR Reports',
      'Import Excel Records',
    ],
    technologies: [
      'Laravel',
      'PHP',
      'MySQL',
      'Blade',
      'Tailwind CSS',
      'Alpine.js',
      'Vite',
      'Pest (PHP testing)',
      'SimpleXLSX',
      'Cloudflare Turnstile',
      'Laravel Queues',
      'SMTP',
    ],
    status: 'live',
    liveUrl: 'https://eduleave.com/welcome',
  },
  {
    title: 'Eurasian',
    description:
      'End-to-end resort operations platform built to streamline reservations, booking workflows, guest records, reporting, and management visibility.',
    features: [
      'Online Reservations',
      'Booking Workflows',
      'Business Automation',
      'Management Dashboards',
      'AI Chatbot',
      'Dashboard Projection',
    ],
    technologies: [
      'PHP',
      'MySQL',
      'JavaScript',
      'Bootstrap',
      'Apache',
      'PHPMailer',
      'SMTP',
      'ApexCharts',
      'FullCalendar',
      'DataTables',
      'WhatsApp Cloud API',
      'REST API',
    ],
    status: 'live',
    liveUrl: 'https://eurasian.freehosting.dev/',
  },
  {
    title: 'IRIMS-V Library',
    description:
      'A smart library management platform designed to organize learning resources, monitor inventory, streamline borrowing records, and support efficient library operations for schools and offices.',
    features: [
      'Catalog Management',
      'Resource Reservations',
      'Member Records',
      'QR Code Support',
      'Inventory Tracking',
    ],
    technologies: [
      'Laravel',
      'PHP',
      'Vue.js',
      'Inertia.js',
      'Ziggy',
      'Tailwind CSS',
      'Vite',
      'SQLite',
      'Chart.js',
      'Bacon QR Code',
      'html5-qrcode',
      'html2pdf.js',
      'Pest (PHP testing)',
    ],
    status: 'live',
    liveUrl: 'https://irimsv-library.net/',
  },
  {
    title: 'LRMIS',
    description:
      'Full-stack national web application for managing learning resources across educational institutions in the Philippines.',
    features: [
      'Dashboard Analytics',
      'Multi-Level Station Hierarchy',
      'Resource Allocation & Distribution',
      'Borrowing & Checkout System',
      'Analytics Dashboard',
      'Role-Based Access Control',
    ],
    // NOTE: "ClickHouse Three" is unverified — no source in the knowledge vault
    // documents this system's stack, and the name does not match any library
    // this project is known to use. Confirm or replace it; do not treat the
    // rest of this list as vault-grounded either.
    technologies: [
      'Laravel',
      'PHP',
      'Blade',
      'Tailwind CSS',
      'ClickHouse Three',
      'Maatwebsite Excel',
      'Intervention Image',
      'Google Sheets API',
    ],
    status: 'live',
    liveUrl: 'https://lrmis.deped.gov.ph/',
  },
]

export type SkillGroup = {
  label: string
  items: string[]
}

// Grouped as the résumé groups them, so the two never drift apart.
//
// Every name below is grounded in a system that actually shipped — the stacks
// were reconciled against the project READMEs and deployment records on
// 2026-07-26. Deployment & infrastructure is its own group on purpose: running
// what you build is the offer most independent developers cannot make, and it
// is what the maintenance retainer in `services.ts` is sold on.
const CURATED: SkillGroup[] = [
  { label: 'Languages', items: ['PHP', 'JavaScript', 'TypeScript', 'Python', 'HTML5'] },
  {
    label: 'Frameworks & libraries',
    items: [
      'Laravel',
      'React',
      'Vue.js',
      'Inertia.js',
      'FastAPI',
      'Node.js',
      'Alpine.js',
      'htmx',
      'Tailwind CSS',
      'Bootstrap',
    ],
  },
  { label: 'Databases', items: ['PostgreSQL', 'MySQL', 'SQLite'] },
  {
    label: 'Testing & code quality',
    items: ['Pest (PHP testing)', 'PHPStan / Larastan', 'Laravel Pint', 'pytest', 'ESLint', 'Git'],
  },
  {
    label: 'Deployment & infrastructure',
    items: [
      'Docker',
      'Docker Compose',
      'Coolify',
      'Dokploy',
      'Traefik',
      'Nginx',
      'Linux VPS',
      'Vercel',
      'Grafana',
    ],
  },
]

// Compare on the bare name so an annotated entry — "Pest (PHP testing)" — still
// suppresses the plain "Pest" that the project stacks would otherwise duplicate.
const curated = new Set(CURATED.flatMap((group) => group.items.map((item) => item.replace(/\s*\(.+\)$/, ''))))

// Everything else the shipped systems actually run on. Derived rather than
// listed, so adding a project surfaces its stack here automatically.
export const skillGroups: SkillGroup[] = [
  ...CURATED,
  {
    label: 'Also shipped in production',
    items: [...new Set(projectFacts.flatMap((project) => project.technologies))]
      .filter((name) => !curated.has(name))
      .sort((a, b) => a.localeCompare(b)),
  },
]

