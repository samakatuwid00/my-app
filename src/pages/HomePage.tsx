import { useState } from 'react'
import {
  CheckCircle2,
  Database,
  Download,
  ExternalLink,
  Eye,
  GitBranch,
  Mail,
  Rocket,
  X,
  ZoomIn,
  File,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ContactForm } from '../components/ContactForm'
import { MotionSection } from '../components/MotionSection'
import { SectionHeading } from '../components/SectionHeading'
import type { Project, Technology, Testimonial } from '../types/portfolio'
import awardPhoto from '../assets/award.png'
import profilePhoto from '../assets/pic.jpg'
import resortPreview from '../assets/eurasian.png'
import eduleavePreview from '../assets/eduleave.png'
import irimsvPreview from '../assets/irims-v.png'
import libraryPreview from '../assets/library.png'
import projectPreviewPlaceholder from '../assets/project-preview-placeholder.png'

const stats = [
  { label: 'Years Experience', value: '2+' },
  { label: 'DepEd Systems', value: 'Regional + National' },
  { label: 'Sector Experience', value: 'Gov + Private' },
  { label: 'Recognition', value: 'Awarded' },
]

const deliverables = [
  'End-to-end web application development',
  'Secure authentication and role management',
  'Workflow automation',
  'Reporting systems',
  'API integration',
  'Maintainable system architecture',
]

const projects: Project[] = [
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
    accent: 'from-[#E5FF00] to-[#E5FF00]',
    liveUrl: 'https://irimsv.net/', // ← add this
    previewImage: irimsvPreview
  },
  {
    title: 'Leave Card Monitoring System',
    description:
      'Division-level HR platform built to automate leave credit monitoring for teaching and non-teaching personnel, replacing manual records with a clearer digital workflow.',
    features: ['Leave Credit Monitoring', 'Approval Workflow', 'Teaching & Non-Teaching Support', 'HR Reports', 'Import Excel Records'],
    technologies: ['Laravel', 'PHP', 'MySQL', 'REST API', 'Javascript', 'SMTP', 'DataTables', 'Bootstrap'],
    accent: 'from-[#E5FF00] to-[#E5FF00]',
    liveUrl: 'https://eduleave.com/welcome', // ← add this
    previewImage: eduleavePreview

  },
  {
    title: 'Resort Management System',
    description:
      'End-to-end resort operations platform built to streamline reservations, booking workflows, guest records, reporting, and management visibility.',
    features: ['Online Reservations', 'Booking Workflows', 'Business Automation', 'Management Dashboards', 'AI Chatbot', 'Dashboard Projection'],
    technologies: ['PHP', 'MySQL', 'PHPMailer', 'ApexCharts', 'FullCalendar', 'DataTables', 'Javascript'],
    accent: 'from-[#E5FF00] to-[#E5FF00]',
    liveUrl: 'https://eurasian.freehosting.dev/', // ← add this
    previewImage: resortPreview
  },
  {
    title: 'Library Management System',
    description:
      'Placeholder description for an upcoming library platform project. Replace this copy with the final project summary when it is ready.',
    features: ['Catalog Management', 'Resource Reservations', 'Member Records', 'QR Code Support', 'Inventory Tracking'],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'REST API'],
    accent: 'from-[#E5FF00] to-[#E5FF00]',
    previewImage: libraryPreview,
  },
  {
    title: 'Upcoming Project',
    description:
      'Placeholder project card reserved for the next live demo. Replace the title, description, features, technologies, link, and preview when available.',
    features: ['Feature Placeholder One', 'Feature Placeholder Two', 'Feature Placeholder Three', 'Responsive Interface'],
    technologies: ['Technology One', 'Technology Two', 'Technology Three'],
    accent: 'from-[#E5FF00] to-[#E5FF00]',
  },
]

const flagshipProject = projects[0]
const secondaryProjects = projects.slice(1)

const technologies: Technology[] = [
  { name: 'Laravel', logo: 'https://cdn.simpleicons.org/laravel/FF2D20', color: 'bg-[#ECEBE6] dark:bg-[#1a1a1a]' },
  { name: 'Vue.js', logo: 'https://cdn.simpleicons.org/vuedotjs/4FC08D', color: 'bg-[#ECEBE6] dark:bg-[#1a1a1a]' },
  { name: 'React', logo: 'https://cdn.simpleicons.org/react/61DAFB', color: 'bg-[#ECEBE6] dark:bg-[#1a1a1a]' },
  { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript/3178C6', color: 'bg-[#ECEBE6] dark:bg-[#1a1a1a]' },
  { name: 'JavaScript', logo: 'https://cdn.simpleicons.org/javascript/F7DF1E', color: 'bg-[#ECEBE6] dark:bg-[#1a1a1a]' },
  { name: 'PHP', logo: 'https://cdn.simpleicons.org/php/777BB4', color: 'bg-[#ECEBE6] dark:bg-[#1a1a1a]' },
  { name: 'PostgreSQL', logo: 'https://cdn.simpleicons.org/postgresql/4169E1', color: 'bg-[#ECEBE6] dark:bg-[#1a1a1a]' },
  { name: 'MySQL', logo: 'https://cdn.simpleicons.org/mysql/4479A1', color: 'bg-[#ECEBE6] dark:bg-[#1a1a1a]' },
  { name: 'HTML5', logo: 'https://cdn.simpleicons.org/html5/E34F26', color: 'bg-[#ECEBE6] dark:bg-[#1a1a1a]' },
  { name: 'Tailwind CSS', logo: 'https://cdn.simpleicons.org/tailwindcss/06B6D4', color: 'bg-[#ECEBE6] dark:bg-[#1a1a1a]' },
  { name: 'REST API', logo: 'https://cdn.simpleicons.org/postman/FF6C37', color: 'bg-[#ECEBE6] dark:bg-[#1a1a1a]' },
  { name: 'SMTP', logo: 'https://cdn.simpleicons.org/gmail/EA4335', color: 'bg-[#ECEBE6] dark:bg-[#1a1a1a]' },
]

const testimonials: Testimonial[] = [
  {
    name: 'Cesar Arriola',
    position: 'DEPED LRMS Supervisor',
    quote:
      'The inventory system gave our team clear visibility from summary dashboards down to individual resource records.',
  },
  {
    name: 'Rose Burce',
    position: 'DEPED HR Coordinator',
    quote:
      'Our leave approval process became faster, auditable, and easier for employees and administrators to manage.',
  },
  {
    name: 'Chloe Kealsay Iñigo',
    position: 'Student',
    quote: 'Clean, responsive, and incredibly easy to use. It turned daily mood tracking into a habit as simple as journaling.'
  }
]

type ProjectCardProps = {
  project: Project
  variant?: 'default' | 'featured'
}

function ProjectCard({ project, variant = 'default' }: ProjectCardProps) {
  const isFeatured = variant === 'featured'

  return (
    <motion.article
      className={`h-full overflow-hidden border-4 border-[#0A0A0A] bg-[#ECEBE6] shadow-[8px_8px_0_#0A0A0A] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[10px_10px_0_#0A0A0A] dark:border-[#333] dark:bg-[#1a1a1a] dark:shadow-[8px_8px_0_#333] dark:hover:shadow-[10px_10px_0_#333] ${
        isFeatured
          ? 'flex flex-col lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:min-h-[480px]'
          : 'flex flex-col'
      }`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={`relative overflow-hidden border-b-4 border-[#0A0A0A] bg-[#D6D5CF] dark:border-[#333] dark:bg-[#101010] ${
          isFeatured
            ? 'aspect-video lg:aspect-auto lg:h-full lg:min-h-0 lg:border-r-4 lg:border-b-0'
            : 'aspect-video'
        }`}
      >
        {project.previewImage ? (
          <>
            {isFeatured && (
              <img
                src={projectPreviewPlaceholder}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-center"
              />
            )}
            <img
              src={project.previewImage}
              alt={`${project.title} preview`}
              className="relative z-10 h-full w-full object-cover object-top"
            />
          </>
        ) : (
          <div className={`h-full bg-gradient-to-br ${project.accent} p-4`}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="size-3 border-2 border-[#0A0A0A] bg-[#ff6b6b] dark:border-[#333]" />
                <span className="size-3 border-2 border-[#0A0A0A] bg-[#ffd93d] dark:border-[#333]" />
                <span className="size-3 border-2 border-[#0A0A0A] bg-[#00d4aa] dark:border-[#333]" />
              </div>
              <span className="font-mono text-xs font-bold text-[#0A0A0A]">PROJECT</span>
            </div>
            <div className="grid gap-3">
              <div className="h-4 w-3/5 border-2 border-[#0A0A0A] bg-[#0A0A0A]/10 dark:border-[#333] dark:bg-[#333]/10" />
              <div className="grid grid-cols-3 gap-2">
                <div className="h-16 border-2 border-[#0A0A0A] bg-[#0A0A0A]/5 dark:border-[#333] dark:bg-[#333]/5" />
                <div className="h-16 border-2 border-[#0A0A0A] bg-[#0A0A0A]/5 dark:border-[#333] dark:bg-[#333]/5" />
                <div className="h-16 border-2 border-[#0A0A0A] bg-[#0A0A0A]/5 dark:border-[#333] dark:bg-[#333]/5" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={`flex flex-1 flex-col ${isFeatured ? 'p-6 sm:p-8 lg:p-10' : 'p-6'}`}>
        {isFeatured && (
          <span className="mb-4 inline-flex w-fit border-2 border-[#0A0A0A] bg-[#E5FF00] px-3 py-1 font-mono text-xs font-extrabold uppercase tracking-[0.16em] text-[#0A0A0A] dark:border-[#333]">
            Flagship Project
          </span>
        )}
        <h3
          className={`font-display font-extrabold uppercase text-[#0A0A0A] dark:text-[#ECEBE6] ${
            isFeatured ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl'
          }`}
        >
          {project.title}
        </h3>
        <p className="mt-3 font-mono leading-7 text-[#333] dark:text-[#aaa]">{project.description}</p>
        <div className={`mt-5 grid gap-2 ${isFeatured ? 'sm:grid-cols-2' : ''}`}>
          {project.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2 font-mono text-sm text-[#0A0A0A] dark:text-[#ECEBE6]">
              <CheckCircle2 className="shrink-0 text-[#E5FF00]" size={16} />
              {feature}
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="border-2 border-[#0A0A0A] bg-white px-3 py-1.5 font-mono text-xs font-bold text-[#0A0A0A] dark:border-[#333] dark:bg-[#2a2a2a] dark:text-[#ECEBE6]"
            >
              {technology}
            </span>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 border-4 border-[#0A0A0A] bg-[#E5FF00] px-4 py-2.5 font-mono text-sm font-bold text-[#0A0A0A] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#0A0A0A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none dark:border-[#333] dark:hover:shadow-[4px_4px_0_#333]"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          ) : (
            <a
              href="#contact"
              className="inline-flex flex-1 items-center justify-center gap-2 border-4 border-[#0A0A0A] bg-[#E5FF00] px-4 py-2.5 font-mono text-sm font-bold text-[#0A0A0A] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#0A0A0A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none dark:border-[#333] dark:hover:shadow-[4px_4px_0_#333]"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export function HomePage() {
  const [awardLightboxOpen, setAwardLightboxOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f2f2f2] font-mono transition-colors duration-300 dark:bg-[#0a0a0a]">
      <div className="pointer-events-none fixed inset-0 z-50 opacity-5 dark:opacity-[0.03]">
        <svg className="h-full w-full">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.05 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div
        className="pointer-events-none fixed inset-0 opacity-[0.08] dark:opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <nav className="relative z-10 flex items-center justify-between border-b-4 border-[#0A0A0A] bg-[#ECEBE6] px-8 py-6 transition-colors duration-300 dark:border-[#333] dark:bg-[#1a1a1a]">
        <div className="flex items-center gap-2">
          <div className="relative size-6 rounded-sm border-2 border-[#0A0A0A] bg-[#0A0A0A] dark:border-[#333] dark:bg-[#333]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-1 w-3 bg-[#ECEBE6] dark:bg-[#1a1a1a]" />
            </div>
          </div>
          <span className="font-mono text-xl font-bold uppercase text-[#0A0A0A] dark:text-[#ECEBE6]">
            Roger A. Abay Jr.
          </span>
        </div>
        <a
          href="#contact"
          className="font-mono text-sm font-bold uppercase text-[#0A0A0A] transition-all duration-200 hover:bg-[#0A0A0A] hover:px-2 hover:py-0.5 hover:text-[#ECEBE6] dark:text-[#ECEBE6] dark:hover:bg-[#333]"
        >
          Contact
        </a>
      </nav>

      <section id="home" className="relative z-5 grid min-h-[calc(100vh-5rem)] grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center border-b-4 border-[#0A0A0A] bg-[#ECEBE6] px-8 py-12 transition-colors duration-300 dark:border-[#333] dark:bg-[#1a1a1a] lg:border-b-0 lg:border-r-4 lg:px-[10%] lg:py-16">
          <div className="mb-8 inline-flex w-fit -rotate-1 items-center gap-2 border-4 border-[#0A0A0A] bg-[#0A0A0A] px-4 py-2 shadow-[4px_4px_0_rgba(0,0,0,0.2)] dark:border-[#333] dark:bg-[#333] dark:shadow-[4px_4px_0_rgba(0,0,0,0.4)]">
            <Rocket size={16} className="text-[#E5FF00]" />
            <span className="font-mono text-sm font-bold uppercase text-[#E5FF00]">Full Stack Developer</span>
          </div>

          <h1 className="font-display text-[clamp(3.5rem,8vw,6rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em] text-[#0A0A0A] dark:text-[#ECEBE6]">
            IDEAS⤵ SCALABLE
            <br />
            <span className="bg-[#E5FF00] px-2 [text-shadow:0_0_1px_#000] dark:[-webkit-text-stroke:2px_#0A0A0A]">SYSTEMS.</span>
          </h1>

          <p className="mt-6 max-w-[560px] font-mono text-base leading-7 text-[#333] dark:text-[#aaa]">
            I build production web systems that help government offices, businesses, and privates replace manual processes with
            reliable workflows, records management, reporting, and analytics dashboards. 
          </p>

          <div className="mt-12 max-w-[520px]">
            <motion.div
              className="group relative cursor-pointer border-4 border-[#0A0A0A] bg-white p-8 shadow-[8px_8px_0_#0A0A0A] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[10px_10px_0_#0A0A0A] active:translate-x-1 active:translate-y-1 active:shadow-[4px_4px_0_#0A0A0A] dark:border-[#333] dark:bg-[#2a2a2a] dark:shadow-[8px_8px_0_#333] dark:hover:shadow-[10px_10px_0_#333] dark:active:shadow-[4px_4px_0_#333]"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    'repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(229,255,0,0.2) 10px, rgba(229,255,0,0.2) 20px)',
                }}
              />
              <div className="absolute -right-6 -top-2 z-10 flex h-6 w-20 rotate-45 items-center justify-center border-b-2 border-t-2 border-[#0A0A0A] bg-[#E5FF00] font-mono text-[0.6rem] font-bold uppercase text-[#0A0A0A] dark:border-[#333]">
                Build
              </div>
              <div className="relative z-5 flex flex-col items-center text-center">
                <Eye size={48} className="mb-4 text-[#0A0A0A] dark:text-[#ECEBE6]" strokeWidth={2} />
                <span className="font-display text-2xl font-extrabold uppercase text-[#0A0A0A] dark:text-[#ECEBE6]">
                  View Systems
                </span>
                <span className="mt-2 font-mono text-xs text-[#666] dark:text-[#999]">
                  Government systems - HR automation - dashboards
                </span>

                <div className="mt-6 flex w-full gap-3">
                  <a
                    href="#projects"
                    className="flex-1 border-4 border-[#0A0A0A] bg-[#E5FF00] px-4 py-2.5 text-center font-mono text-sm font-bold text-[#0A0A0A] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#0A0A0A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none dark:border-[#333] dark:hover:shadow-[4px_4px_0_#333]"
                  >
                    <File size={16} className="mr-2 inline" />
                    Projects
                  </a>
                  <a
                    href="/resume.pdf"
                    download
                    className="flex-1 border-4 border-[#0A0A0A] bg-teal-600 px-4 py-2.5 text-center font-mono text-sm font-bold text-white transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#0A0A0A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none dark:border-[#333] dark:hover:shadow-[4px_4px_0_#333]"
                  >
                    <Download size={16} className="mr-2 inline" />
                    Resume
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative flex items-center justify-center overflow-hidden bg-[#0A0A0A] px-4 py-12 transition-colors duration-300 lg:px-8">
          <motion.div
            className="group relative w-full max-w-[380px] rotate-3 border-4 border-[#0A0A0A] bg-white p-4 pb-16 shadow-[12px_12px_0_rgba(0,0,0,0.5)] transition-transform duration-300 dark:border-[#333] dark:bg-[#1a1a1a] dark:shadow-[12px_12px_0_rgba(0,0,0,0.8)]"
            initial={{ rotate: 3 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }}
          >
            <div className="absolute -top-4 left-1/2 z-20 h-8 w-24 -translate-x-1/2 -rotate-2 border border-[rgba(0,0,0,0.1)] bg-white/60 backdrop-blur-sm dark:border-[rgba(255,255,255,0.05)] dark:bg-white/10" />
            <div className="relative h-[380px] overflow-hidden border-4 border-[#0A0A0A] bg-[#d9d9d9] dark:border-[#333] dark:bg-[#2a2a2a]">
              <img
                src={profilePhoto}
                alt="Roger A. Abay Jr. - Full Stack Developer"
                className="absolute inset-0 h-full w-full object-cover object-center scale-[1.02] transition-transform duration-700 hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0A]/50" />
            </div>
            <motion.div
              className="absolute bottom-8 left-1/2 z-30 w-[80%] -translate-x-1/2 border-4 border-[#0A0A0A] bg-white p-2 shadow-[4px_4px_0_rgba(0,0,0,0.25)] dark:border-[#333] dark:bg-[#1a1a1a] dark:shadow-[4px_4px_0_rgba(0,0,0,0.5)]"
              initial={{ opacity: 1, y: 0 }}
              whileHover={{ opacity: 0, y: 20, transition: { duration: 0.35, ease: 'easeOut' } }}
            >
              <div className="border-2 border-[#0A0A0A] p-2 text-center dark:border-[#333]">
                <div className="mb-1 border-b-2 border-[#0A0A0A] pb-1 dark:border-[#333]">
                  <span className="font-display text-sm font-extrabold uppercase leading-none text-[#0A0A0A] dark:text-[#ECEBE6]">
                    Developer Info
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="font-mono text-[0.65rem] font-bold text-[#0A0A0A] dark:text-[#aaa]">
                    GitHub Username
                  </span>
                  <span className="mt-0 block font-mono text-lg font-bold text-[#0A0A0A] dark:text-[#ECEBE6]">
                    mr-nikoo
                  </span>
                  <div className="font-mono text-[0.65rem] font-bold leading-tight text-[#0A0A0A] dark:text-[#aaa]">
                    Roger A. Abay Jr.
                    <br />
                    Full Stack Developer
                    <br />
                    Government and business systems
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <MotionSection id="about" className="border-y-4 border-[#0A0A0A] bg-[#f2f2f2] transition-colors duration-300 dark:border-[#333] dark:bg-[#111]">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="About Me"
            title="Full-stack developer for real organizational systems"
            description="Two years building government and private-sector platforms — DepEd regional and national systems, HR automation, and operations software."
          />

          {/* Top row: award photo + bio card side by side */}
          <div className="grid items-stretch gap-6 lg:grid-cols-[360px_minmax(0,1fr)] xl:grid-cols-[420px_minmax(0,1fr)]">
            {/* Award photo */}
            <motion.div
              className="group relative flex flex-col overflow-hidden border-4 border-[#0A0A0A] shadow-[8px_8px_0_#0A0A0A] dark:border-[#333] dark:shadow-[8px_8px_0_#333]"
              initial={{ opacity: 0, x: 40, rotateY: -5 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              {/* Image zone — explicit height so the award is always visible */}
              <div className="relative h-72 sm:h-80 lg:h-96 overflow-hidden cursor-pointer" onClick={() => setAwardLightboxOpen(true)}>
                <motion.img
                  src={awardPhoto}
                  alt="Full Stack Developer Award plaque"
                  className="h-full w-full object-cover object-center"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent" />

                {/* Zoom icon on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#0A0A0A]/0 transition-colors duration-300 group-hover:bg-[#0A0A0A]/30">
                  <motion.button
                    onClick={() => setAwardLightboxOpen(true)}
                    className="flex size-12 items-center justify-center border-2 border-[#E5FF00] bg-[#0A0A0A] text-[#E5FF00] opacity-0 shadow-[4px_4px_0_#E5FF00] transition-all duration-300 group-hover:opacity-100 hover:bg-[#E5FF00] hover:text-[#0A0A0A]"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="View award image"
                  >
                    <ZoomIn className="size-5" />
                  </motion.button>
                </div>

                {/* Pulsing glow border */}
                <motion.div
                  className="pointer-events-none absolute inset-0 border-4 border-[#E5FF00]/0"
                  animate={{ borderColor: ['rgba(229,255,0,0)', 'rgba(229,255,0,0.4)', 'rgba(229,255,0,0)'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              {/* Award badge — sits below the image, not overlapping it */}
              <motion.div
                className="border-t-4 border-[#E5FF00] bg-[#0A0A0A] px-5 py-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[#E5FF00]">
                  Awards &amp; Recognition
                </p>
                <p className="mt-0.5 font-display text-base font-extrabold uppercase text-white">
                  Full Stack Developer Award
                </p>
                <p className="mt-1 font-mono text-xs leading-5 text-white/60">
                  Regional government system launch
                </p>
              </motion.div>
            </motion.div>

            {/* Bio card */}
            <motion.div
              className="flex h-full flex-col justify-center border-4 border-[#0A0A0A] bg-white p-6 shadow-[8px_8px_0_#0A0A0A] dark:border-[#333] dark:bg-[#1a1a1a] dark:shadow-[8px_8px_0_#333] sm:p-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-mono text-base leading-8 text-[#333] dark:text-[#bbb]">
                I build production systems for government offices and businesses — including DepEd regional and national
                platforms, a resort management system, and an HR leave monitoring solution. My work turns manual processes
                into maintainable software with secure roles, records, reporting, and dashboards.
              </p>

              {/* Stats grid */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="group border-4 border-[#0A0A0A] bg-[#ECEBE6] p-4 shadow-[4px_4px_0_#0A0A0A] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0_#0A0A0A] dark:border-[#333] dark:bg-[#2a2a2a] dark:shadow-[4px_4px_0_#333] dark:hover:shadow-[6px_6px_0_#333]"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <motion.div
                      className="mb-2 h-1 w-8 bg-black transition-colors duration-300 dark:bg-[#E5FF00]"
                      initial={{ width: 0 }}
                      whileInView={{ width: 32 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                    />
                    <p className="font-display text-xl font-extrabold leading-tight text-[#0A0A0A] dark:text-[#ECEBE6]">
                      {stat.value}
                    </p>
                    <p className="mt-1 font-mono text-[0.6rem] font-bold uppercase leading-tight tracking-wide text-[#666] dark:text-[#777]">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom row: Deliverables */}
          <div className="mt-6">

            {/* Deliverables - full width */}
            <motion.div
              className="border-4 border-[#0A0A0A] bg-white shadow-[8px_8px_0_#0A0A0A] dark:border-[#333] dark:bg-[#1a1a1a] dark:shadow-[8px_8px_0_#333]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="border-b-4 border-[#0A0A0A] bg-[#E5FF00] px-6 py-3 dark:border-[#333]">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#0A0A0A]">What I Deliver</p>
              </div>
              <div className="divide-y-4 divide-[#0A0A0A] dark:divide-[#333]">
                {deliverables.map((item, index) => (
                  <motion.div
                    key={item}
                    className="group flex items-center gap-5 px-6 py-4 transition-colors duration-150 hover:bg-[#fffde8] dark:hover:bg-[#222]"
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.07 }}
                  >
                    <CheckCircle2
                      className="shrink-0 text-[#0A0A0A] transition-colors duration-150 group-hover:text-[#0A0A0A] dark:text-[#555] dark:group-hover:text-[#E5FF00]"
                      size={18}
                    />
                    <p className="font-mono text-sm font-bold text-[#0A0A0A] dark:text-[#ECEBE6]">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </MotionSection>

      <MotionSection
        id="projects"
        viewportAmount={0.01}
        className="border-y-4 border-[#0A0A0A] bg-[#ECEBE6] transition-colors duration-300 dark:border-[#333] dark:bg-[#1a1a1a]"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Featured Projects"
            title="Production systems built around operations, reporting, and automation"
            description="These projects show experience with the kind of software organizations actually depend on: inventory, HR, reservations, dashboards, and role-based workflows."
          />
          <div className="space-y-8">
            {flagshipProject && <ProjectCard project={flagshipProject} variant="featured" />}
            {secondaryProjects.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2">
                {secondaryProjects.map((project) => (
                  <ProjectCard key={project.title} project={project} />
                ))}
              </div>
            )}
          </div>
        </div>
      </MotionSection>

      <MotionSection id="stack" className="bg-[#f2f2f2] transition-colors duration-300 dark:bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Tech Stack"
            title="Core technologies behind the systems"
            description="The tools matter because they support maintainable APIs, reliable databases, responsive interfaces, and practical reporting workflows."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {technologies.map((technology, index) => (
              <motion.article
                key={technology.name}
                className={`border-4 border-[#0A0A0A] p-5 shadow-[8px_8px_0_#0A0A0A] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[10px_10px_0_#0A0A0A] dark:border-[#333] dark:shadow-[8px_8px_0_#333] dark:hover:shadow-[10px_10px_0_#333] ${technology.color}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                whileHover={{ y: -2 }}
              >
                <img src={technology.logo} alt={`${technology.name} logo`} className="h-11 w-11" loading="lazy" />
                <h3 className="mt-5 font-mono font-bold text-[#0A0A0A] dark:text-[#ECEBE6]">{technology.name}</h3>
              </motion.article>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection id="testimonials" className="border-y-4 border-[#0A0A0A] bg-[#ECEBE6] transition-colors duration-300 dark:border-[#333] dark:bg-[#1a1a1a]">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Testimonials" title="Trusted for practical, maintainable systems" />
          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial.name}
                className="border-4 border-[#0A0A0A] bg-[#ECEBE6] p-6 shadow-[8px_8px_0_#0A0A0A] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[10px_10px_0_#0A0A0A] dark:border-[#333] dark:bg-[#1a1a1a] dark:shadow-[8px_8px_0_#333] dark:hover:shadow-[10px_10px_0_#333]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="grid size-12 place-items-center border-2 border-[#0A0A0A] bg-[#E5FF00] font-mono text-sm font-bold text-[#0A0A0A] dark:border-[#333]">
                    {testimonial.name
                      .split(' ')
                      .map((part) => part[0])
                      .join('')}
                  </div>
                  <div>
                    <h3 className="font-mono font-bold text-[#0A0A0A] dark:text-[#ECEBE6]">{testimonial.name}</h3>
                    <p className="font-mono text-sm text-[#666] dark:text-[#999]">{testimonial.position}</p>
                  </div>
                </div>
                <p className="font-mono leading-8 text-[#333] dark:text-[#aaa]">"{testimonial.quote}"</p>
              </motion.article>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection id="contact" className="bg-[#f2f2f2] transition-colors duration-300 dark:bg-[#0a0a0a]">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="mb-3 inline-block bg-[#0A0A0A] px-3 py-1 font-mono text-sm font-bold uppercase text-[#E5FF00] dark:bg-[#333]">
              Contact
            </p>
            <h2 className="font-display text-3xl font-extrabold uppercase text-[#0A0A0A] dark:text-[#ECEBE6] md:text-4xl">
              Let us turn your ideas into a scalable system
            </h2>
            <p className="mt-5 font-mono leading-8 text-[#333] dark:text-[#aaa]">
              Send a message about your government system, business platform, dashboard, HR workflow, reporting process,
              API integration, or database-backed application requirement.
            </p>
            <div className="mt-8 grid gap-4">
              {[
                { icon: Mail, label: 'abaygherjr07@gmail.com' },
                { icon: GitBranch, label: 'Version-controlled delivery' },
                { icon: Database, label: 'PostgreSQL & MySQL database planning' },
              ].map((item, index) => {
                const Icon = item.icon

                return (
                  <motion.div
                    key={item.label}
                    className="flex items-center gap-3 border-4 border-[#0A0A0A] bg-[#ECEBE6] p-4 shadow-[8px_8px_0_#0A0A0A] dark:border-[#333] dark:bg-[#1a1a1a] dark:shadow-[8px_8px_0_#333]"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="grid size-10 place-items-center border-2 border-[#0A0A0A] bg-[#E5FF00] text-[#0A0A0A] dark:border-[#333]">
                      <Icon size={19} />
                    </div>
                    <span className="font-mono font-bold text-[#0A0A0A] dark:text-[#ECEBE6]">{item.label}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <motion.div
            className="border-4 border-[#0A0A0A] bg-[#ECEBE6] p-6 shadow-[12px_12px_0_#0A0A0A] dark:border-[#333] dark:bg-[#1a1a1a] dark:shadow-[12px_12px_0_#333]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </MotionSection>

      {/* Award Image Lightbox */}
      <AnimatePresence>
        {awardLightboxOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[#0A0A0A]/90 backdrop-blur-sm"
              onClick={() => setAwardLightboxOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Lightbox content */}
            <motion.div
              className="relative z-10 max-h-[90vh] max-w-4xl"
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="border-4 border-[#E5FF00] bg-[#0A0A0A] shadow-[12px_12px_0_#E5FF00]">
                {/* Header bar */}
                <div className="flex items-center justify-between border-b-4 border-[#E5FF00] bg-[#0A0A0A] px-5 py-3">
                  <div>
                    <p className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[#E5FF00]">
                      Awards &amp; Recognition
                    </p>
                    <p className="font-display text-sm font-extrabold uppercase text-white">
                      Full Stack Developer Award
                    </p>
                  </div>
                  <motion.button
                    onClick={() => setAwardLightboxOpen(false)}
                    className="flex size-10 items-center justify-center border-2 border-[#E5FF00] bg-[#0A0A0A] text-[#E5FF00] hover:bg-[#E5FF00] hover:text-[#0A0A0A]"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close lightbox"
                  >
                    <X className="size-5" />
                  </motion.button>
                </div>

                {/* Image */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={awardPhoto}
                    alt="Full Stack Developer Award plaque"
                    className="max-h-[70vh] w-full object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  />
                </div>

                {/* Footer */}
                <div className="border-t-4 border-[#E5FF00] bg-[#0A0A0A] px-5 py-3">
                  <p className="font-mono text-xs text-white/60">
                    Regional government system launch
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
