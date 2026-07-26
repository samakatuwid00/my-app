import {
  Activity,
  Boxes,
  Bug,
  CalendarDays,
  Camera,
  ChartArea,
  ChartColumn,
  ChartPie,
  Cloud,
  Code,
  Container,
  Database,
  Feather,
  FileDown,
  FileSpreadsheet,
  FlaskConical,
  Globe,
  HardDrive,
  Hexagon,
  Image,
  Layers,
  LayoutPanelTop,
  MessageCircle,
  PanelsTopLeft,
  QrCode,
  Radar,
  Rocket,
  Route,
  Send,
  Server,
  ServerCog,
  Ship,
  ShieldCheck,
  Sparkles,
  Terminal,
  TestTube,
  Sheet,
  Table,
  Waypoints,
  Webhook,
  Workflow,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { skillGroups } from './facts'
import gitLogo from '../assets/logos/git.svg'
import gmailLogo from '../assets/logos/gmail.svg'
import html5Logo from '../assets/logos/html5.svg'
import javascriptLogo from '../assets/logos/javascript.svg'
import laravelLogo from '../assets/logos/laravel.svg'
import mysqlLogo from '../assets/logos/mysql.svg'
import phpLogo from '../assets/logos/php.svg'
import postgresqlLogo from '../assets/logos/postgresql.svg'
import postmanLogo from '../assets/logos/postman.svg'
import reactLogo from '../assets/logos/react.svg'
import tailwindLogo from '../assets/logos/tailwindcss.svg'
import typescriptLogo from '../assets/logos/typescript.svg'
import vueLogo from '../assets/logos/vuedotjs.svg'

export type Skill = {
  name: string
  logo?: string
  icon?: LucideIcon
}

export type SkillSection = {
  label: string
  items: Skill[]
}

// Brand marks for the technologies with a bundled SVG.
const logos: Record<string, string> = {
  Git: gitLogo,
  HTML5: html5Logo,
  JavaScript: javascriptLogo,
  Laravel: laravelLogo,
  MySQL: mysqlLogo,
  PHP: phpLogo,
  PostgreSQL: postgresqlLogo,
  React: reactLogo,
  'REST API': postmanLogo,
  SMTP: gmailLogo,
  'Tailwind CSS': tailwindLogo,
  TypeScript: typescriptLogo,
  'Vue.js': vueLogo,
}

// Everything else gets a lucide glyph chosen for what the tool does, rather
// than shipping a dozen more brand SVGs.
const icons: Record<string, LucideIcon> = {
  'Alpine.js': Feather,
  Apache: ServerCog,
  'Apache ECharts': ChartColumn,
  ApexCharts: ChartArea,
  'Bacon QR Code': QrCode,
  Blade: PanelsTopLeft,
  Bootstrap: LayoutPanelTop,
  'Chart.js': ChartPie,
  'ClickHouse Three': Database,
  'Cloudflare Turnstile': ShieldCheck,
  Coolify: Cloud,
  DataTables: Table,
  Docker: Container,
  'Docker Compose': Boxes,
  Dokploy: Ship,
  ESLint: Bug,
  FastAPI: Rocket,
  FullCalendar: CalendarDays,
  'Google Sheets API': Sheet,
  Grafana: Activity,
  'html2pdf.js': FileDown,
  'html5-qrcode': Camera,
  htmx: Webhook,
  'Inertia.js': Layers,
  'Intervention Image': Image,
  'Laravel Pint': Sparkles,
  'Laravel Queues': Workflow,
  'Linux VPS': Terminal,
  'Maatwebsite Excel': FileSpreadsheet,
  Nginx: Server,
  'Node.js': Hexagon,
  PHPMailer: Send,
  'PHPStan / Larastan': Radar,
  Pest: FlaskConical,
  Python: Code,
  SQLite: HardDrive,
  SimpleXLSX: FileSpreadsheet,
  Traefik: Waypoints,
  Vercel: Globe,
  Vite: Zap,
  'WhatsApp Cloud API': MessageCircle,
  Ziggy: Route,
  pytest: TestTube,
}

// "Pest (PHP testing)" resolves through "Pest".
const bare = (name: string) => name.replace(/\s*\(.+\)$/, '')

export const skills: SkillSection[] = skillGroups.map((group) => ({
  label: group.label,
  items: group.items.map((name) => {
    const key = bare(name)
    const logo = logos[key]
    const icon = icons[key]
    if (!logo && !icon) throw new Error(`No logo or icon registered for skill "${name}"`)
    return { name, logo, icon }
  }),
}))
