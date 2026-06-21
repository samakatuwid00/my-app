import {
  CheckCircle2,
  Database,
  Download,
  ExternalLink,
  GitBranch,
  Mail,
  Rocket,
  ShieldCheck,
  Eye,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { ContactForm } from '../components/ContactForm'
import { MotionSection } from '../components/MotionSection'
import { SectionHeading } from '../components/SectionHeading'
import type { Project, Technology, Testimonial } from '../types/portfolio'
import profilePhoto from "../assets/pic.jpg";

const stats = [
  { label: 'Years Experience', value: '2+' },
  { label: 'Completed Projects', value: '6+' },
  { label: 'Development Stack', value: '12+' },
  { label: 'Client Satisfaction', value: '100%' },
]

const projects: Project[] = [
  {
    title: 'IRIMS-V',
    description:
      'Inventory and Learning Resource Management Information System for managing learning resources from regional level down to schools.',
    features: [
      'Inventory Tracking',
      'User Role Management',
      'Reports Generation',
      'Dashboard Analytics',
      'Learning Resource Monitoring',
    ],
    technologies: ['Laravel', 'Vue.js', 'PostgreSQL', 'Tailwind CSS'],
    accent: 'from-[#E5FF00] to-[#E5FF00]',
  },
  {
    title: 'Leave Management System',
    description:
      'A workflow-driven platform for employee leave requests, approvals, notifications, balances, and printable HR reports.',
    features: ['Employee Leave Tracking', 'Approval Workflow', 'Notifications', 'Reports'],
    technologies: ['Laravel', 'React', 'MySQL', 'REST API'],
    accent: 'from-[#E5FF00] to-[#E5FF00]',
  },
  {
    title: 'School Information System',
    description:
      'A school operations system for enrollment, student records, grades, reporting, and administrative monitoring.',
    features: ['Student Management', 'Enrollment', 'Grade Monitoring', 'Reports'],
    technologies: ['PHP', 'Vue.js', 'PostgreSQL', 'SMTP'],
    accent: 'from-[#E5FF00] to-[#E5FF00]',
  },
]

const technologies: Technology[] = [
  { name: 'Laravel', logo: 'https://cdn.simpleicons.org/laravel/FF2D20', color: 'bg-[#ECEBE6] dark:bg-[#1a1a1a]' },
  { name: 'Vue.js', logo: 'https://cdn.simpleicons.org/vuedotjs/4FC08D', color: 'bg-[#ECEBE6] dark:bg-[#1a1a1a]' },
  { name: 'React', logo: 'https://cdn.simpleicons.org/react/61DAFB', color: 'bg-[#ECEBE6] dark:bg-[#1a1a1a]' },
  { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript/3178C6', color: 'bg-[#ECEBE6] dark:bg-[#1a1a1a]' },
  { name: 'JavaScript', logo: 'https://cdn.simpleicons.org/javascript/F7DF1E', color: 'bg-[#ECEBE6] dark:bg-[#1a1a1a]' },
  { name: 'PHP', logo: 'https://cdn.simpleicons.org/php/777BB4', color: 'bg-[#ECEBE6] dark:bg-[#1a1a1a]' },
  { name: 'PostgreSQL', logo: 'https://cdn.simpleicons.org/postgresql/4169E1', color: 'bg-[#ECEBE6] dark:bg-[#1a1a1a]' },
  { name: 'MySQL', logo: 'https://cdn.simpleicons.org/mysql/4479A1', color: 'bg-[#ECEBE6] dark:bg-[#1a1a1a]' },
  { name: 'HTML-5', logo: 'https://cdn.simpleicons.org/html5/E34F26', color: 'bg-[#ECEBE6] dark:bg-[#1a1a1a]' },
  { name: 'Tailwind CSS', logo: 'https://cdn.simpleicons.org/tailwindcss/06B6D4', color: 'bg-[#ECEBE6] dark:bg-[#1a1a1a]' },
  { name: 'REST API', logo: 'https://cdn.simpleicons.org/postman/FF6C37', color: 'bg-[#ECEBE6] dark:bg-[#1a1a1a]' },
  { name: 'SMTP', logo: 'https://cdn.simpleicons.org/gmail/EA4335', color: 'bg-[#ECEBE6] dark:bg-[#1a1a1a]' },
]

const testimonials: Testimonial[] = [
  {
    name: 'Maria Santos',
    position: 'Operations Manager',
    quote:
      'The inventory system gave our team clear visibility from summary dashboards down to individual resource records.',
  },
  {
    name: 'Daniel Reyes',
    position: 'HR Coordinator',
    quote:
      'Our leave approval process became faster, auditable, and easier for employees and administrators to manage.',
  },
  {
    name: 'Alyssa Cruz',
    position: 'School Administrator',
    quote:
      'The system architecture was clean, responsive, and reliable enough for daily school operations and reporting.',
  },
]

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      className="flex h-full flex-col overflow-hidden border-4 border-[#0A0A0A] dark:border-[#333] bg-[#ECEBE6] dark:bg-[#1a1a1a] shadow-[8px_8px_0_#0A0A0A] dark:shadow-[8px_8px_0_#333] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[10px_10px_0_#0A0A0A] dark:hover:shadow-[10px_10px_0_#333]"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`h-48 bg-[#E5FF00] p-4 relative border-b-4 border-[#0A0A0A] dark:border-[#333]`}>
        <div className="relative h-full rounded-none border-2 border-[#0A0A0A] dark:border-[#333] bg-[#0A0A0A]/10 dark:bg-[#333]/10 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex gap-1.5">
              <span className="size-3 border-2 border-[#0A0A0A] dark:border-[#333] bg-[#ff6b6b]" />
              <span className="size-3 border-2 border-[#0A0A0A] dark:border-[#333] bg-[#ffd93d]" />
              <span className="size-3 border-2 border-[#0A0A0A] dark:border-[#333] bg-[#00d4aa]" />
            </div>
            <span className="font-mono text-xs font-bold text-[#0A0A0A] dark:text-[#333]">PROJECT</span>
          </div>
          <div className="grid gap-3">
            <div className="h-4 w-3/5 border-2 border-[#0A0A0A] dark:border-[#333] bg-[#0A0A0A]/10 dark:bg-[#333]/10" />
            <div className="grid grid-cols-3 gap-2">
              <div className="h-16 border-2 border-[#0A0A0A] dark:border-[#333] bg-[#0A0A0A]/5 dark:bg-[#333]/5" />
              <div className="h-16 border-2 border-[#0A0A0A] dark:border-[#333] bg-[#0A0A0A]/5 dark:bg-[#333]/5" />
              <div className="h-16 border-2 border-[#0A0A0A] dark:border-[#333] bg-[#0A0A0A]/5 dark:bg-[#333]/5" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-extrabold uppercase text-[#0A0A0A] dark:text-[#ECEBE6]">{project.title}</h3>
        <p className="mt-3 font-mono leading-7 text-[#333] dark:text-[#aaa]">{project.description}</p>
        <div className="mt-5 grid gap-2">
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
              className="rounded-none border-2 border-[#0A0A0A] dark:border-[#333] bg-[#fff] dark:bg-[#2a2a2a] px-3 py-1.5 font-mono text-xs font-bold text-[#0A0A0A] dark:text-[#ECEBE6]"
            >
              {technology}
            </span>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <a
            href="#contact"
            className="inline-flex flex-1 items-center justify-center gap-2 border-4 border-[#0A0A0A] dark:border-[#333] bg-[#E5FF00] px-4 py-2.5 font-mono text-sm font-bold text-[#0A0A0A] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#0A0A0A] dark:hover:shadow-[4px_4px_0_#333] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <ExternalLink size={16} />
            Live Demo
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 border-4 border-[#0A0A0A] dark:border-[#333] bg-[#fff] dark:bg-[#2a2a2a] px-4 py-2.5 font-mono text-sm font-bold text-[#0A0A0A] dark:text-[#ECEBE6] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#0A0A0A] dark:hover:shadow-[4px_4px_0_#333] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <GitBranch size={16} />
            GitHub
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#f2f2f2] dark:bg-[#0a0a0a] font-mono transition-colors duration-300">
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-5 dark:opacity-[0.03]">
        <svg className="w-full h-full">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.05 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Dot Grid Pattern Body */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.08] dark:opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between border-b-4 border-[#0A0A0A] dark:border-[#333] bg-[#ECEBE6] dark:bg-[#1a1a1a] px-8 py-6 transition-colors duration-300">
        <div className="flex items-center gap-2">
          <div className="relative size-6 rounded-sm border-2 border-[#0A0A0A] dark:border-[#333] bg-[#0A0A0A] dark:bg-[#333]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-1 w-3 bg-[#ECEBE6] dark:bg-[#1a1a1a]" />
            </div>
          </div>
          <span className="font-mono text-xl font-bold uppercase tracking-[-0.05em] text-[#0A0A0A] dark:text-[#ECEBE6]">
            Roger A. Abay Jr.
          </span>
        </div>
        <a
          href="#contact"
          className="font-mono text-sm font-bold uppercase text-[#0A0A0A] dark:text-[#ECEBE6] transition-all duration-200 hover:bg-[#0A0A0A] dark:hover:bg-[#333] hover:px-2 hover:py-0.5 hover:text-[#ECEBE6] dark:hover:text-[#ECEBE6]"
        >
          Contact
        </a>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative z-5 grid min-h-[calc(100vh-5rem)] grid-cols-1 lg:grid-cols-2"
      >
        {/* Left Column - Hero Content */}
        <div className="flex flex-col justify-center border-b-4 border-[#0A0A0A] dark:border-[#333] bg-[#ECEBE6] dark:bg-[#1a1a1a] px-8 py-12 lg:border-b-0 lg:border-r-4 lg:px-[10%] lg:py-16 transition-colors duration-300">
          {/* Tagline Badge */}
          <div className="mb-8 inline-flex w-fit -rotate-1 items-center gap-2 border-4 border-[#0A0A0A] dark:border-[#333] bg-[#0A0A0A] dark:bg-[#333] px-4 py-2 shadow-[4px_4px_0_rgba(0,0,0,0.2)] dark:shadow-[4px_4px_0_rgba(0,0,0,0.4)]">
            <Rocket size={16} className="text-[#E5FF00]" />
            <span className="font-mono text-sm font-bold uppercase tracking-[0.05em] text-[#E5FF00]">
              Full Stack Developer
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-display text-[clamp(3.5rem,8vw,6rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em] text-[#0A0A0A] dark:text-[#ECEBE6]">
            IDEAS⤵ SCALABLE
            <br />
            <span className="bg-[#E5FF00] px-2 [text-shadow:0_0_1px_#000] dark:[-webkit-text-stroke:2px_#0A0A0A]">SYSTEMS.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-[480px] font-mono text-base leading-6 text-[#333] dark:text-[#aaa]">
            Laravel and PHP backends, Vue.js and React interfaces, PostgreSQL and MySQL databases — I build
            enterprise-grade web applications that teams can trust every day.
          </p>

          {/* Upload Dropzone Style CTA */}
          <div className="mt-12 max-w-[480px]">
            <motion.div
              className="group relative cursor-pointer border-4 border-[#0A0A0A] dark:border-[#333] bg-[#fff] dark:bg-[#2a2a2a] p-8 shadow-[8px_8px_0_#0A0A0A] dark:shadow-[8px_8px_0_#333] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[10px_10px_0_#0A0A0A] dark:hover:shadow-[10px_10px_0_#333] active:translate-x-1 active:translate-y-1 active:shadow-[4px_4px_0_#0A0A0A] dark:active:shadow-[4px_4px_0_#333]"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              {/* Stripes Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: 'repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(229,255,0,0.2) 10px, rgba(229,255,0,0.2) 20px)'
                }}
              />

              {/* Ribbon Badge */}
              <div className="absolute -top-2 -right-6 z-10 flex h-6 w-20 rotate-45 items-center justify-center border-t-2 border-b-2 border-[#0A0A0A] dark:border-[#333] bg-[#E5FF00] font-mono text-[0.6rem] font-bold uppercase tracking-[1px] text-[#0A0A0A]">
                CODE
              </div>

              <div className="relative z-5 flex flex-col items-center text-center">
                <Eye size={48} className="mb-4 text-[#0A0A0A] dark:text-[#ECEBE6]" strokeWidth={2} />
                <span className="font-display text-2xl font-extrabold uppercase text-[#0A0A0A] dark:text-[#ECEBE6]">
                  View Projects
                </span>
                <span className="mt-2 font-mono text-xs text-[#666] dark:text-[#999]">
                  Laravel • Vue.js • React • PostgreSQL
                </span>

                <div className="mt-6 flex w-full gap-3">
                  <a
                    href="#projects"
                    className="flex-1 border-4 border-[#0A0A0A] dark:border-[#333] bg-[#E5FF00] px-4 py-2.5 text-center font-mono text-sm font-bold text-[#0A0A0A] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#0A0A0A] dark:hover:shadow-[4px_4px_0_#333] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    Explore
                  </a>
                  <a
                    href="/resume.pdf"
                    download
                    className="flex-1 border-4 border-[#0A0A0A] dark:border-[#333] bg-teal-600 px-4 py-2.5 text-center font-mono text-sm font-bold text-[#fff] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#0A0A0A] dark:hover:shadow-[4px_4px_0_#333] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    <Download size={16} className="inline mr-2" />
                    Resume
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Hero Visual */}
        <div className="relative flex items-center justify-center overflow-hidden bg-[#0A0A0A] dark:bg-[#0A0A0A] px-4 py-12 lg:px-8 transition-colors duration-300">
          {/* Height Chart Background Lines */}
          <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.08]"
            style={{
              backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 48px, #0A0A0A 48px, #0A0A0A 50px)'
            }}
          />

          {/* Height Numbers */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col justify-between h-[380px]">
            {['6\'6"', '6\'0"', '5\'6"', '5\'0"'].map((height) => (
              <span key={height} className="font-mono text-[0.8rem] font-bold text-[rgba(0,0,0,0.4)] dark:text-[rgba(255,255,255,0.2)] border-b-2 border-[rgba(0,0,0,0.4)] dark:border-[rgba(255,255,255,0.1)]">
                {height}
              </span>
            ))}
          </div>

          {/* Polaroid Card */}
          <motion.div
            className="relative w-full max-w-[380px] rotate-3 border-4 border-[#0A0A0A] dark:border-[#333] bg-[#fff] dark:bg-[#1a1a1a] p-4 pb-16 shadow-[12px_12px_0_rgba(0,0,0,0.5)] dark:shadow-[12px_12px_0_rgba(0,0,0,0.8)] transition-transform duration-300 group"
            initial={{ rotate: 3 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }}
          >
            {/* Taped Strip */}
            <div className="absolute -top-4 left-1/2 z-20 h-8 w-24 -translate-x-1/2 -rotate-2 bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.05)]" />

            {/* Photo Frame */}
            <div className="relative h-[380px] border-4 border-[#0A0A0A] dark:border-[#333] bg-[#d9d9d9] dark:bg-[#2a2a2a] overflow-hidden">
              <img
                src={profilePhoto}
                alt="Roger A. Abay Jr. - Full Stack Developer"
                className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02] transition-transform duration-700 hover:scale-100"
              />
              
              {/* Subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0A]/50" />
            </div>

              {/* Police Placard with Hover Animation */}
              <motion.div
                className="absolute bottom-8 left-1/2 z-30 w-[80%] -translate-x-1/2 border-4 border-[#0A0A0A] dark:border-[#333] bg-[#fff] dark:bg-[#1a1a1a] p-2 shadow-[4px_4px_0_rgba(0,0,0,0.25)] dark:shadow-[4px_4px_0_rgba(0,0,0,0.5)]"
                initial={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  opacity: 0, 
                  y: 20, 
                  transition: { duration: 0.35, ease: "easeOut" }
                }}
              >
                <div className="border-2 border-[#0A0A0A] dark:border-[#333] p-2 text-center">
                  <div className="border-b-2 border-[#0A0A0A] dark:border-[#333] pb-1 mb-1">
                    <span className="font-display text-sm font-extrabold uppercase leading-none text-[#0A0A0A] dark:text-[#ECEBE6]">
                      DEVELOPER INFO
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <div>
                      <span className="font-mono text-[0.65rem] font-bold text-[#0A0A0A] dark:text-[#aaa]">GITHUB USERNAME</span>
                      <span className="mt-0 block font-mono text-lg font-bold tracking-widest text-[#0A0A0A] dark:text-[#ECEBE6]">
                        mr-nikoo
                      </span>
                    </div>
                    <div className="font-mono text-[0.65rem] leading-tight font-bold text-[#0A0A0A] dark:text-[#aaa]">
                      ROGER A. ABAY JR.<br />
                      FULL STACK DEVELOPER<br />
                      SPECIALTY: LARAVEL • VUE • REACT
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Evidence Caption */}
              <div className="mt-3 text-center font-mono text-base font-bold uppercase text-[#0A0A0A] dark:text-[#ECEBE6] opacity-30 line-through relative z-10">
                hello world
              </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <MotionSection id="about" className="border-y-4 border-[#0A0A0A] dark:border-[#333] bg-[#ECEBE6] dark:bg-[#1a1a1a] transition-colors duration-300">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="About Me"
            title="System-minded development for real business operations"
            description="I combine backend architecture, polished interfaces, and reliable database design to create systems that teams can trust every day."
          />

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.article
              className="border-4 border-[#0A0A0A] dark:border-[#333] bg-[#ECEBE6] dark:bg-[#1a1a1a] p-8 shadow-[8px_8px_0_#0A0A0A] dark:shadow-[8px_8px_0_#333]"
              whileHover={{ borderColor: '#A0B000' }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="font-display text-2xl font-extrabold uppercase text-[#0A0A0A] dark:text-[#ECEBE6]">Professional Summary</h3>
              <p className="mt-5 font-mono leading-8 text-[#333] dark:text-[#aaa]">
                I specialize in Laravel and PHP development, Vue.js and React interfaces, TypeScript and JavaScript
                frontends, PostgreSQL and MySQL database design, REST API development, SMTP email integration,
                HTML-5 and Tailwind CSS styling, system architecture, and enterprise solutions. My work focuses
                on building dependable business platforms with clean role-based workflows, maintainable APIs,
                responsive interfaces, and analytics dashboards that turn operational data into useful decisions.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  'Laravel and PHP application architecture',
                  'Vue.js and React interfaces',
                  'PostgreSQL and MySQL schema design',
                  'Secure REST API development',
                  'SMTP email service configuration',
                  'JavaScript, TypeScript, HTML-5, Tailwind CSS',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 font-mono text-sm font-bold text-[#0A0A0A] dark:text-[#ECEBE6]">
                    <ShieldCheck className="text-[#E5FF00]" size={17} />
                    {item}
                  </div>
                ))}
              </div>
            </motion.article>

            <div className="grid gap-4 sm:grid-cols-2">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="border-4 border-[#0A0A0A] dark:border-[#333] bg-[#ECEBE6] dark:bg-[#1a1a1a] p-6 shadow-[8px_8px_0_#0A0A0A] dark:shadow-[8px_8px_0_#333]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <p className="font-display text-3xl font-extrabold text-[#0A0A0A] dark:text-[#ECEBE6]">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-mono text-sm font-bold text-[#666] dark:text-[#999]">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Projects Section */}
      <MotionSection id="projects" className="border-y-4 border-[#0A0A0A] dark:border-[#333] bg-[#ECEBE6] dark:bg-[#1a1a1a] transition-colors duration-300">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Featured Projects"
            title="Portfolio systems built around operations, data, and usability"
            description="Representative projects showcasing Laravel, Vue.js, React, PostgreSQL, MySQL, REST API, SMTP, and enterprise workflow development."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </MotionSection>

      {/* Tech Stack Section */}
      <MotionSection id="stack" className="bg-[#f2f2f2] dark:bg-[#0a0a0a] transition-colors duration-300">
        <div className="mx-auto max-w-7xl">
          <a href="#stack" className="block">
            <SectionHeading
              eyebrow="Tech Stack"
              title="Core technologies with official brand marks"
              description="The stack behind scalable Laravel and PHP backends, responsive Vue.js and React products, PostgreSQL and MySQL databases, REST APIs, and SMTP email systems."
            />
          </a>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {technologies.map((technology, index) => (
              <motion.article
                key={technology.name}
                className={`border-4 border-[#0A0A0A] dark:border-[#333] p-5 shadow-[8px_8px_0_#0A0A0A] dark:shadow-[8px_8px_0_#333] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[10px_10px_0_#0A0A0A] dark:hover:shadow-[10px_10px_0_#333] ${technology.color}`}
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

      {/* Testimonials Section */}
      <MotionSection id="testimonials" className="border-y-4 border-[#0A0A0A] dark:border-[#333] bg-[#ECEBE6] dark:bg-[#1a1a1a] transition-colors duration-300">
        <div className="mx-auto max-w-7xl">
          <a href="#testimonials" className="block">
            <SectionHeading
              eyebrow="Testimonials"
              title="Trusted for practical, maintainable systems"
            />
          </a>
          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial.name}
                className="border-4 border-[#0A0A0A] dark:border-[#333] bg-[#ECEBE6] dark:bg-[#1a1a1a] p-6 shadow-[8px_8px_0_#0A0A0A] dark:shadow-[8px_8px_0_#333] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[10px_10px_0_#0A0A0A] dark:hover:shadow-[10px_10px_0_#333]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="grid size-12 place-items-center border-2 border-[#0A0A0A] dark:border-[#333] bg-[#E5FF00] font-mono text-sm font-bold text-[#0A0A0A]">
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

      {/* Contact Section */}
      <MotionSection id="contact" className="bg-[#f2f2f2] dark:bg-[#0a0a0a] transition-colors duration-300">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="mb-3 font-mono text-sm font-bold uppercase text-[#E5FF00] bg-[#0A0A0A] dark:bg-[#333] inline-block px-3 py-1">Contact</p>
            <h2 className="font-display text-3xl font-extrabold uppercase text-[#0A0A0A] dark:text-[#ECEBE6] md:text-4xl">
              Let us turn your ideas into a scalable systems
            </h2>
            <p className="mt-5 font-mono leading-8 text-[#333] dark:text-[#aaa]">
              Send a message about your Laravel or PHP backend, Vue.js or React frontend, PostgreSQL or MySQL
              database, REST API, SMTP integration, or enterprise workflow requirement.
            </p>
            <div className="mt-8 grid gap-4">
              {[
                { icon: Mail, label: 'abaygherjr07@.gmail.com' },
                { icon: GitBranch, label: 'Version-controlled delivery' },
                { icon: Database, label: 'PostgreSQL & MySQL database planning' },
              ].map((item, index) => {
                const Icon = item.icon

                return (
                  <motion.div
                    key={item.label}
                    className="flex items-center gap-3 border-4 border-[#0A0A0A] dark:border-[#333] bg-[#ECEBE6] dark:bg-[#1a1a1a] p-4 shadow-[8px_8px_0_#0A0A0A] dark:shadow-[8px_8px_0_#333]"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="grid size-10 place-items-center border-2 border-[#0A0A0A] dark:border-[#333] bg-[#E5FF00] text-[#0A0A0A]">
                      <Icon size={19} />
                    </div>
                    <span className="font-mono font-bold text-[#0A0A0A] dark:text-[#ECEBE6]">{item.label}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <motion.div
            className="border-4 border-[#0A0A0A] dark:border-[#333] bg-[#ECEBE6] dark:bg-[#1a1a1a] p-6 shadow-[12px_12px_0_#0A0A0A] dark:shadow-[12px_12px_0_#333]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </MotionSection>
    </div>
  )
}