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
    technologies: ['Laravel', 'Node.js', 'PHP', 'PostgreSQL', 'Tailwind CSS', 'REST API', 'ApacheEcharts'],
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
    technologies: ['Laravel', 'PHP', 'MySQL', 'REST API', 'Javascript', 'SMTP', 'DataTables', 'Bootstrap'],
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
    technologies: ['PHP', 'MySQL', 'PHPMailer', 'ApexCharts', 'FullCalendar', 'DataTables', 'Javascript'],
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
    technologies: ['Vue', 'Inertia.js', 'Ziggy', 'Laravel', 'Bacon QR Code', 'Pest', 'Vite 7', 'Chart.js'],
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

export const technologyNames = [
  'Laravel',
  'Vue.js',
  'React',
  'TypeScript',
  'JavaScript',
  'PHP',
  'PostgreSQL',
  'MySQL',
  'HTML5',
  'Tailwind CSS',
  'REST API',
  'SMTP',
  'Git',
]
