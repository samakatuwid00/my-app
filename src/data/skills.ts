import {
  CalendarDays,
  ChartArea,
  ChartColumn,
  ChartPie,
  Database,
  FileSpreadsheet,
  FlaskConical,
  Hexagon,
  Image,
  Layers,
  LayoutPanelTop,
  QrCode,
  Route,
  Send,
  Sheet,
  Table,
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
  'Apache ECharts': ChartColumn,
  ApexCharts: ChartArea,
  'Bacon QR Code': QrCode,
  Bootstrap: LayoutPanelTop,
  'Chart.js': ChartPie,
  'ClickHouse Three': Database,
  DataTables: Table,
  FullCalendar: CalendarDays,
  'Google Sheets API': Sheet,
  'Inertia.js': Layers,
  'Intervention Image': Image,
  'Maatwebsite Excel': FileSpreadsheet,
  'Node.js': Hexagon,
  PHPMailer: Send,
  Pest: FlaskConical,
  Vite: Zap,
  Ziggy: Route,
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
