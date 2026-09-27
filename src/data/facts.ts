import type { ProjectFacts } from '../types/portfolio'

// Row order is the render order: the featured rows appear on the home page in
// this order, then the "more work" table, then the experiments index.
//
// `description`, `client`, and `role` are copied verbatim from the approved
// mockup (docs/redesign-mockup-v2.html): the featured `article.case` blocks, the
// "more work" table rows, and the experiments index. Do not paraphrase them.
export const projectFacts: ProjectFacts[] = [
  {
    slug: 'irims-v',
    title: 'iRIMS-V',
    category: 'Regional inventory',
    description:
      'Learning resources across a region lived in a spreadsheet per office, so no one could see totals or shortages. iRIMS-V tracks every print and non-print resource from region to division, district, and school, and reports coverage against enrolment.',
    client: 'DepEd Region V',
    role: 'Designed, built, deployed, maintain',
    stack: 'Laravel 12, PostgreSQL, Blade, htmx, Docker',
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
    featured: true,
    liveUrl: 'https://irimsv.net/',
    caseStudy: {
      expansion: 'Integrated Resource Inventory and Mapping System for Region V',
      lede: "One inventory for every learning resource in DepEd Region V, from the regional dashboard down to one school's shelf.",
      problem:
        'Each office kept its own spreadsheet of learning resources. The regional office could not see totals, shortages, or where resources had moved without asking every office for a fresh file, and the files never matched.',
      approach: [
        'Modeled the region as a four-level station hierarchy, so every record belongs to one place and rolls up to the level above.',
        'PostgreSQL full-text search and triggers keep search fast and totals consistent as records change.',
        'Role-based access, so each office edits only its own stations while the region sees everything.',
        'Excel import, so offices moved their existing spreadsheets in instead of retyping them.',
        'ECharts dashboards for the questions the regional office asks most.',
      ],
      result:
        'Launched regionally and recognized with the Full Stack Developer Award from the Regional Director. I still own deployment and releases.',
    },
  },
  {
    slug: 'eduleave',
    title: 'EDULEAVE',
    category: 'HR workflow',
    description:
      'A DepEd division HR office tracked leave credits for teaching and non-teaching staff on paper cards. EDULEAVE replaced them with a workflow where requests route for approval and every decision stays on record.',
    client: 'DepEd division HR office, on contract',
    role: 'Sole developer, requirements to support',
    stack: 'Laravel 12, MySQL, Tailwind, Queues',
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
    featured: true,
    liveUrl: 'https://eduleave.com/welcome',
  },
  {
    slug: 'lrmis',
    title: 'LRMIS',
    category: 'National platform',
    description:
      'The national system for managing learning resources across Philippine schools. I owned features inside the platform team: the station hierarchy, allocation and distribution, and role-based access.',
    client: 'DepEd Central Office',
    role: 'Feature owner, platform team',
    stack: 'Laravel, Blade, Tailwind, Sheets API',
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
    featured: true,
    liveUrl: 'https://lrmis.deped.gov.ph/',
  },
  {
    slug: 'irims-v-library',
    title: 'iRIMS-V Library System',
    category: 'Library circulation',
    description:
      'School and office libraries tracked borrowing on logbooks. The Library System gives every resource a catalog entry and a QR label, so teachers and students reserve with a cart, borrow by scan, and get a receipt.',
    client: 'DepEd Region V',
    role: 'Designed, built, maintain',
    stack: 'Laravel 12, Vue, Vite',
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
    featured: true,
    // irimsv-library.net, no hyphen after "irims". The résumé PDF's
    // irims-v-library.net is a typo.
    liveUrl: 'https://irimsv-library.net/',
  },
  {
    slug: 'schema-mapper',
    title: 'schema_mapper',
    category: 'Data integration',
    description:
      'Integration service that publishes iRIMS-V records into LRMIS staging, so offices do not enter the same data twice. Python, FastAPI, PostgreSQL, MySQL, Docker Compose.',
    stack: 'Python, FastAPI, PostgreSQL, MySQL, Docker Compose',
    features: ['Publishes iRIMS-V records into LRMIS staging'],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'MySQL', 'Docker Compose'],
    status: 'internal',
  },
  {
    slug: 'irims-v-library-app',
    title: 'iRIMS-V Library app',
    category: 'Mobile',
    description:
      'Flutter app for teachers and students, backed by a new token API on the library system. Core phases done; APK and a school pilot next.',
    stack: 'Flutter, token API',
    features: ['Token API on the library system'],
    technologies: ['Flutter'],
    status: 'in-progress',
  },
  {
    // Hidden: never rendered and never sent to the assistant while its
    // credential is unrotated (vault: wiki/Eurasian Paradise Resort System.md).
    slug: 'eurasian',
    title: 'Eurasian',
    category: 'Resort operations',
    description:
      'End-to-end resort operations platform built to streamline reservations, booking workflows, guest records, reporting, and management visibility.',
    stack: 'PHP, MySQL',
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
    hidden: true,
    liveUrl: 'https://eurasian.freehosting.dev/',
  },
  {
    // Formerly JARVIS HUD. No githubUrl: the JARVIS repo exposes private data
    // and stays unlinked until it is cleaned up.
    slug: 'cygnus',
    title: 'Cygnus',
    category: 'Voice assistant',
    description:
      'Voice assistant, formerly JARVIS HUD: Whisper speech-to-text, Kokoro text-to-speech, and multi-provider LLM routing, in a Python core with an Electron desktop app.',
    stack: 'Python, Whisper, Kokoro, Electron',
    features: ['Whisper speech-to-text', 'Kokoro text-to-speech', 'Multi-provider LLM routing', 'Electron desktop app'],
    technologies: ['Python', 'Whisper (STT)', 'Kokoro (TTS)', 'Electron'],
    status: 'demo',
  },
  {
    slug: 'sticky-brain',
    title: 'Sticky Brain',
    category: 'Desktop app',
    description:
      'Electron desktop board that captures AI-agent sessions and triages the tasks they produce. Ships as a Windows installer with a tray icon.',
    stack: 'Electron',
    features: [
      'Session capture board',
      'Task triage with backlog strikes',
      'Niko pixel-art pet + floating mode',
      'One-key task → CLI chat launch',
      'Mark-done writes straight to the vault',
      'Second Brain link: live sessions, pending, backlogs surfaced from the vault so all tasks live in one board',
    ],
    technologies: [
      'Electron',
      'Vanilla JavaScript',
      'HTML / CSS',
      'JSON persistence',
      'Hermes CLI',
    ],
    status: 'demo',
    githubUrl: 'https://github.com/samakatuwid00/sticky-brain',
  },
  {
    // No githubUrl: second-brain-vault is private and 404s for visitors.
    slug: 'second-brain',
    title: 'Second Brain',
    category: 'Knowledge vault',
    description: 'Knowledge vault with on-device semantic search under 50 ms across 400+ notes. Python, TurboVec.',
    stack: 'Python, TurboVec',
    features: [
      'Local semantic search (no cloud)',
      'TurboQuant 2-bit embeddings',
      'Sub-50ms query time',
      'Obsidian-based vault',
      'Folder-mapped knowledge areas',
    ],
    technologies: [
      'Python',
      'TurboVec',
      'sentence-transformers',
      'Obsidian',
      'Markdown',
    ],
    status: 'private',
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
// 2026-07-26. Deploy and infra is its own group on purpose: running
// what you build is the offer most independent developers cannot make, and it
// is what the maintenance retainer in `services.ts` is sold on.
const CURATED: SkillGroup[] = [
  { label: 'Languages', items: ['PHP', 'JavaScript', 'TypeScript', 'Python', 'HTML5'] },
  {
    label: 'Frameworks',
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
    label: 'Testing',
    items: ['Pest (PHP testing)', 'PHPStan / Larastan', 'Laravel Pint', 'pytest', 'ESLint', 'Git'],
  },
  {
    label: 'Deploy and infra',
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

