import type { ProjectFacts } from '../types/portfolio'

// `group` decides where a project shows on the home page: the four iRIMS-V
// suite cards, the "Also in production" pair, or the build log. Within a group
// the order is set in projects.ts, not here.
//
// `card` is the short copy the page shows; `description`, `caseStudy` and the
// rest stay complete because the assistant and the case-study pages read them.
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
    group: 'suite',
    card: {
      name: 'iRIMS-V Inventory',
      label: 'Inventory',
      note: 'live · 13 divisions',
      lede: 'One inventory for every learning resource in Region V, from the regional dashboard down to one school’s shelf.',
      points: [
        'A four-level station hierarchy: school, district, division, region',
        'A masterlist queue checks each new title against existing ones before approval',
        'ECharts dashboards and beginning-of-school-year monitoring per station',
      ],
      role: 'Designed, built, deployed, maintain',
      stack: 'Laravel 12 · PostgreSQL · htmx · ECharts',
    },
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
    group: 'also',
    card: {
      name: 'EDULEAVE',
      label: 'HR workflow · on contract',
      note: 'live',
      lede: 'Leave cards for a DepEd division HR office, off paper: requests route for approval and every decision stays on record.',
      points: [
      ],
      role: 'Sole developer',
      stack: 'Laravel 12 · MySQL · Queues',
    },
    liveUrl: 'https://card.eduleave.com/welcome',
    caseStudy: {
      lede: 'Leave credits and approvals for a DepEd division HR office, moved off paper cards and into one record.',
      problem:
        'The HR office tracked leave credits for teaching and non-teaching staff on paper cards, so every balance check and every approval depended on finding and updating the right card by hand.',
      approach: [
        'Leave credit monitoring for both teaching and non-teaching staff, in one place.',
        'Requests route through an approval workflow, and every decision stays on record.',
        'Excel import, so the office brought its existing records in instead of retyping them.',
        'Email goes out through Laravel queues over SMTP, and Cloudflare Turnstile keeps bots off the forms.',
        'HR reports built from the same records the workflow writes.',
      ],
      result: 'Live for the division HR office. I built it alone, from requirements to support.',
    },
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
    // NOTE: no source in the knowledge vault documents this system's stack, so
    // do not treat this list as vault-grounded.
    technologies: [
      'Laravel',
      'PHP',
      'Blade',
      'Tailwind CSS',
      'Maatwebsite Excel',
      'Intervention Image',
      'Google Sheets API',
    ],
    status: 'live',
    group: 'also',
    card: {
      name: 'LRMIS',
      label: 'National platform · DepEd Central Office',
      note: 'live',
      lede: 'The national learning-resource platform. I owned the station hierarchy, allocation and distribution, and role-based access.',
      points: [
      ],
      role: 'Feature owner',
      stack: 'Laravel 11 · ClickHouse · Sheets API',
    },
    liveUrl: 'https://lrmis.deped.gov.ph/',
    caseStudy: {
      lede: 'The national learning-resource platform for Philippine schools, where I owned features inside the platform team.',
      problem:
        'A national system has to answer the same questions at every level at once: what each station holds, where resources go, and who may change a record.',
      approach: [
        'Owned the multi-level station hierarchy, so every record belongs to one place and rolls up to the level above.',
        'Owned resource allocation and distribution between those levels.',
        'Owned role-based access control, so each role sees and changes only what it should.',
      ],
      result:
        'Live nationally for DepEd, with the station hierarchy, allocation and distribution, and role-based access among its core features.',
    },
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
    group: 'suite',
    card: {
      name: 'iRIMS-V Library System',
      label: 'Library',
      note: 'live · Region V',
      lede: 'Catalog, QR labels and borrowing for school and office libraries that used to run on logbooks.',
      points: [
        'Every copy gets a catalog entry and a QR label',
        'Reserve with a cart, borrow by scan, get a receipt in the browser',
        'Live updates over Reverb and a token API for the mobile app',
      ],
      role: 'Designed, built, maintain',
      stack: 'Laravel 12 · Inertia · Vue 3 · Reverb',
    },
    // irimsv-library.net, no hyphen after "irims". The résumé PDF's
    // irims-v-library.net is a typo.
    liveUrl: 'https://irimsv-library.net/',
    caseStudy: {
      lede: 'Catalog, QR labels, and borrowing for school and office libraries in DepEd Region V.',
      problem:
        'School and office libraries tracked borrowing in logbooks. Finding what was available, or who had a resource, meant reading back through the pages.',
      approach: [
        'Every resource gets a catalog entry and a QR label.',
        'Teachers and students reserve with a cart, then borrow by scanning the label.',
        'Every loan produces a receipt, generated in the browser.',
        'Member records and inventory tracking, with Chart.js dashboards.',
        'Vue on Inertia, so the interface runs as one app on top of Laravel.',
      ],
      result: 'Live for libraries in DepEd Region V. I designed and built it, and I maintain it.',
    },
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
    group: 'log',
  },
  {
    slug: 'irims-v-library-app',
    title: 'iRIMS-V Library app',
    category: 'Mobile',
    description:
      'Flutter app for students and teachers in DepEd Region V, on the same accounts, catalog and reservation rules as the library system. Seventeen test builds since October 3, now at v0.5.9; a one-division pilot is next.',
    stack: 'Flutter, Sanctum token API, Reverb',
    features: ['Student sign-up approved by the teacher', 'School and division hub shelves', 'Cart, reservation and a 3-day claim window', 'Reading goals, badges and leaderboards', 'Live updates over Reverb websockets'],
    technologies: ['Flutter', 'Dart', 'provider', 'dio', 'Laravel Sanctum', 'Laravel Reverb'],
    status: 'in-progress',
    group: 'suite',
    card: {
      name: 'iRIMS-V Library app',
      label: 'Mobile',
      note: 'test builds · v0.5.9',
      lede: 'The library in a student’s pocket: browse the school shelf, reserve a copy, pick it up.',
      points: [
        'Students sign up by school; their teacher approves them on the web',
        'Reading goals, badges, and leaderboards from school up to region',
        'A junior look for Kinder to Grade 6, a teen look for Grades 7 to 12',
      ],
      role: 'Designed, built',
      stack: 'Flutter 3.47 · Sanctum tokens · Reverb',
    },
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
    group: 'log',
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
    group: 'log',
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
    group: 'log',
  },
  {
    slug: 'irims-v-accounts',
    title: 'iRIMS-V Accounts',
    category: 'Single sign-on',
    description:
      'One sign-in for the iRIMS-V suite: a six-step registration with a school search that tells same-named schools apart, sign-in, password reset, and a launcher that opens Inventory, Library or the Support Center with a signed, single-use token. Signing out of a system ends the Accounts session too. Running locally; the screens are moving to Vue 3 with Inertia.',
    client: 'DepEd Region V',
    role: 'Designing, building',
    stack: 'Laravel 12, Tailwind 4, Vite 7, moving to Vue 3 + Inertia',
    features: ['Six-step registration with school search by ID, district and division', 'Launcher that opens the last-used system first', 'Signed single-use SSO tokens with a nonce table', 'Sign-out from a system ends the Accounts session', 'Throttled auth routes and per-system access rules'],
    technologies: ['Laravel', 'PHP', 'PostgreSQL', 'Tailwind CSS', 'Vite', 'Vue.js', 'Inertia.js'],
    status: 'in-progress',
    group: 'suite',
    card: {
      name: 'iRIMS-V Accounts',
      label: 'Single sign-on',
      note: 'running locally · Oct 2026',
      lede: 'One sign-in for the whole suite, so nobody keeps three passwords.',
      points: [
        'Six-step registration; the school search shows the ID, district and division, so same-named schools stay apart',
        'A launcher opens Inventory, Library or the Support Center with a signed, single-use token',
        'Signing out of a system ends the Accounts session too, so a shared school computer stays safe',
      ],
      role: 'Designing, building',
      stack: 'Laravel 12 · PostgreSQL · moving to Vue 3 + Inertia',
    },
  },
  {
    // A capstone overhauled in 2026. Not deployed: it runs locally on XAMPP.
    slug: 'eurasian',
    title: 'Eurasian Paradise Resort',
    category: 'Booking system',
    description:
      'Guests check availability, book a room or cottage, and send a GCash, PayPal or cash reference; staff confirm it, check guests in and out, and watch occupancy and revenue. A row lock stops double bookings.',
    stack: 'PHP 8, MySQL, PDO, Bootstrap, PHPMailer',
    features: [
      'Availability search by dates and headcount',
      'Payment references verified by staff',
      'Booking calendar with check-in and check-out',
      'AI concierge chatbot',
    ],
    technologies: ['PHP', 'MySQL', 'PDO', 'Bootstrap', 'jQuery', 'PHPMailer', 'WhatsApp Cloud API'],
    status: 'demo',
    group: 'log',
  },
  {
    slug: 'cerebrum-sizer',
    title: 'Cerebrum Sizer',
    category: 'PWA',
    description:
      'Paste a trade signal and get the exact size to enter at a fixed risk, what the stop would cost, and a warning when the signal is stale. Installable, works offline.',
    stack: 'Vanilla JS, service worker',
    features: ['Signal parsing', 'Fixed-risk sizing', 'Stale-signal warning', 'Result log'],
    technologies: ['JavaScript', 'Service worker', 'Web app manifest'],
    status: 'private',
    group: 'log',
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
  { label: 'Languages', items: ['PHP 8.2', 'TypeScript', 'JavaScript', 'Python 3.10+', 'Dart 3.13'] },
  {
    label: 'Frameworks',
    items: ['Laravel 11 · 12', 'Inertia 2 + Vue 3.5', 'React 19', 'Flutter 3.47', 'FastAPI', 'Electron', 'Alpine.js · htmx', 'Tailwind CSS 4'],
  },
  { label: 'Data', items: ['PostgreSQL · tsvector, UUID', 'MySQL', 'SQLite', 'ClickHouse', 'Apache ECharts 6', 'Chart.js 4'] },
  { label: 'Realtime and auth', items: ['Laravel Reverb', 'Sanctum tokens', 'Laravel Queues', 'Resend · SMTP', 'Cloudflare Turnstile', 'Signed SSO tokens'] },
  { label: 'Testing and quality', items: ['Pest 3', 'Larastan · PHPStan L5', 'Laravel Pint', 'Playwright', 'pytest', 'flutter test', 'ESLint'] },
  { label: 'Deploy and infra', items: ['Docker · Compose', 'Coolify · Dokploy', 'Traefik · Nginx', 'Linux VPS', 'Hostinger', 'Vercel', 'Grafana'] },
  { label: 'Applied AI', items: ['faster-whisper · sherpa-onnx', 'Kokoro · edge-tts', 'Gemini structured output', 'Tesseract OCR', 'Ollama', 'model2vec', 'scikit-learn'] },
]

// Project technology names the curated groups above already cover, so the
// derived list below does not repeat them under their plain names.
const curated = new Set([
  'PHP', 'TypeScript', 'JavaScript', 'Python', 'Dart',
  'Laravel', 'Inertia.js', 'Vue.js', 'React', 'Flutter', 'FastAPI', 'Electron', 'Alpine.js', 'htmx', 'Tailwind CSS',
  'PostgreSQL', 'MySQL', 'SQLite', 'ClickHouse', 'Apache ECharts', 'Chart.js',
  'Laravel Reverb', 'Laravel Sanctum', 'Laravel Queues', 'SMTP', 'Cloudflare Turnstile',
  'Pest (PHP testing)', 'PHPStan / Larastan', 'Docker', 'Docker Compose',
])

// Everything else the shipped systems actually run on. Derived rather than
// listed, so adding a project surfaces its stack here automatically. Only live
// and internal systems count: a demo or an unfinished app is not production.
const inProduction = projectFacts.filter((project) => project.status === 'live' || project.status === 'internal')

export const stackGroups = CURATED

export const skillGroups: SkillGroup[] = [
  ...CURATED,
  {
    label: 'Also shipped in production',
    items: [...new Set(inProduction.flatMap((project) => project.technologies))]
      .filter((name) => !curated.has(name))
      .sort((a, b) => a.localeCompare(b)),
  },
]

