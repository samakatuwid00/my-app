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
    technologies: ['Laravel', 'Node.js', 'PHP', 'PostgreSQL', 'Tailwind CSS', 'REST API', 'Apache ECharts'],
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
    technologies: ['Laravel', 'PHP', 'MySQL', 'REST API', 'JavaScript', 'SMTP', 'DataTables', 'Bootstrap'],
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
    technologies: ['PHP', 'MySQL', 'PHPMailer', 'ApexCharts', 'FullCalendar', 'DataTables', 'JavaScript'],
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
    technologies: ['Vue.js', 'Inertia.js', 'Ziggy', 'Laravel', 'Bacon QR Code', 'Pest', 'Vite', 'Chart.js'],
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
    technologies: [
      'Laravel',
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
const CURATED: SkillGroup[] = [
  { label: 'Languages', items: ['PHP', 'JavaScript', 'TypeScript', 'HTML5'] },
  {
    label: 'Frameworks & libraries',
    items: ['Laravel', 'React', 'Vue.js', 'Node.js', 'Inertia.js', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    label: 'Databases & tooling',
    items: ['PostgreSQL', 'MySQL', 'REST API', 'SMTP', 'Git', 'Vite', 'Pest (PHP testing)'],
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

