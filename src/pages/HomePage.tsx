import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Code2,
  Database,
  Download,
  ExternalLink,
  Gauge,
  GitBranch,
  Layers3,
  Mail,
  Rocket,
  Server,
  ShieldCheck,
  Terminal,
  Workflow,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { ContactForm } from '../components/ContactForm'
import { DashboardMockup } from '../components/DashboardMockup'
import { MotionSection } from '../components/MotionSection'
import { PhotoPlaceholder } from '../components/PhotoPlaceholder'
import { SectionHeading } from '../components/SectionHeading'
import type { Project, Service, SkillGroup, Technology, Testimonial, TimelineItem } from '../types/portfolio'

const stats = [
  { label: 'Years Experience', value: '5+' },
  { label: 'Completed Projects', value: '30+' },
  { label: 'Technologies Mastered', value: '20+' },
  { label: 'Client Satisfaction', value: '100%' },
]

const skillGroups: SkillGroup[] = [
  {
    category: 'Backend',
    icon: Server,
    skills: [
      { name: 'Laravel', level: 96 },
      { name: 'PHP', level: 92 },
      { name: 'REST API', level: 94 },
      { name: 'PostgreSQL', level: 91 },
      { name: 'MySQL', level: 86 },
      { name: 'Authentication & Authorization', level: 90 },
    ],
  },
  {
    category: 'Frontend',
    icon: Code2,
    skills: [
      { name: 'React', level: 93 },
      { name: 'TypeScript', level: 90 },
      { name: 'JavaScript', level: 92 },
      { name: 'Tailwind CSS', level: 91 },
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 90 },
    ],
  },
  {
    category: 'Tools',
    icon: Terminal,
    skills: [
      { name: 'Git', level: 92 },
      { name: 'GitHub', level: 90 },
      { name: 'Docker', level: 82 },
      { name: 'VS Code', level: 94 },
      { name: 'Postman', level: 88 },
      { name: 'Linux', level: 84 },
    ],
  },
  {
    category: 'Data Visualization',
    icon: BarChart3,
    skills: [
      { name: 'ECharts', level: 90 },
      { name: 'DataTables', level: 88 },
      { name: 'Chart.js', level: 84 },
    ],
  },
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
    technologies: ['Laravel', 'PostgreSQL', 'ECharts', 'AJAX'],
    accent: 'from-teal-500 to-sky-500',
  },
  {
    title: 'Leave Management System',
    description:
      'A workflow-driven platform for employee leave requests, approvals, notifications, balances, and printable HR reports.',
    features: ['Employee Leave Tracking', 'Approval Workflow', 'Notifications', 'Reports'],
    technologies: ['Laravel', 'React', 'PostgreSQL'],
    accent: 'from-sky-500 to-indigo-500',
  },
  {
    title: 'School Information System',
    description:
      'A school operations system for enrollment, student records, grades, reporting, and administrative monitoring.',
    features: ['Student Management', 'Enrollment', 'Grade Monitoring', 'Reports'],
    technologies: ['Laravel', 'React', 'PostgreSQL'],
    accent: 'from-coral-400 to-rose-500',
  },
]

const timeline: TimelineItem[] = [
  {
    role: 'System Developer',
    summary: 'Designed enterprise web applications and system workflows for operational teams.',
    achievements: [
      'Developed REST APIs',
      'Optimized PostgreSQL databases',
      'Built analytics dashboards',
      'Implemented access-controlled business modules',
    ],
  },
  {
    role: 'Full Stack Developer',
    summary: 'Delivered frontend and backend features from database architecture through deployment.',
    achievements: [
      'Frontend and backend development',
      'Database architecture',
      'Deployment and maintenance',
      'Production support and performance tuning',
    ],
  },
]

const services: Service[] = [
  {
    title: 'Web Application Development',
    description: 'Custom business systems and enterprise solutions.',
    icon: Layers3,
  },
  {
    title: 'API Development',
    description: 'Secure and scalable Laravel REST APIs.',
    icon: Workflow,
  },
  {
    title: 'Database Design',
    description: 'PostgreSQL schema optimization and management.',
    icon: Database,
  },
  {
    title: 'System Maintenance',
    description: 'Performance optimization and support.',
    icon: Gauge,
  },
]

const technologies: Technology[] = [
  { name: 'Laravel', logo: 'https://cdn.simpleicons.org/laravel/FF2D20', color: 'bg-coral-50 dark:bg-coral-500/10' },
  { name: 'React', logo: 'https://cdn.simpleicons.org/react/61DAFB', color: 'bg-sky-50 dark:bg-sky-500/10' },
  { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript/3178C6', color: 'bg-blue-50 dark:bg-blue-500/10' },
  { name: 'PostgreSQL', logo: 'https://cdn.simpleicons.org/postgresql/4169E1', color: 'bg-indigo-50 dark:bg-indigo-500/10' },
  { name: 'Docker', logo: 'https://cdn.simpleicons.org/docker/2496ED', color: 'bg-sky-50 dark:bg-sky-500/10' },
  { name: 'Git', logo: 'https://cdn.simpleicons.org/git/F05032', color: 'bg-coral-50 dark:bg-coral-500/10' },
  { name: 'Tailwind CSS', logo: 'https://cdn.simpleicons.org/tailwindcss/06B6D4', color: 'bg-cyan-50 dark:bg-cyan-500/10' },
  { name: 'Linux', logo: 'https://cdn.simpleicons.org/linux/FCC624', color: 'bg-amber-50 dark:bg-amber-500/10' },
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

function SkillCard({ group }: { group: SkillGroup }) {
  const Icon = group.icon

  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-900/5 dark:border-white/10 dark:bg-white/5 dark:hover:shadow-black/20">
      <div className="mb-5 flex items-center gap-3">
        <div className="grid size-11 place-items-center rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300">
          <Icon size={22} />
        </div>
        <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">{group.category}</h3>
      </div>
      <div className="grid gap-4">
        {group.skills.map((skill) => (
          <div key={skill.name}>
            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-zinc-700 dark:text-zinc-200">{skill.name}</span>
              <span className="text-zinc-500 dark:text-zinc-400">{skill.level}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-teal-500 to-sky-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-900/5 dark:border-white/10 dark:bg-white/5 dark:hover:shadow-black/20">
      <div className={`h-48 bg-gradient-to-br ${project.accent} p-4`}>
        <div className="h-full rounded-lg border border-white/30 bg-zinc-950/85 p-4 text-white shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex gap-1.5">
              <span className="size-2 rounded-full bg-coral-400" />
              <span className="size-2 rounded-full bg-amber-300" />
              <span className="size-2 rounded-full bg-teal-300" />
            </div>
            <span className="text-xs text-zinc-400">Screenshot placeholder</span>
          </div>
          <div className="grid gap-3">
            <div className="h-4 w-3/5 rounded bg-white/20" />
            <div className="grid grid-cols-3 gap-2">
              <div className="h-16 rounded bg-white/10" />
              <div className="h-16 rounded bg-white/10" />
              <div className="h-16 rounded bg-white/10" />
            </div>
            <div className="h-12 rounded bg-gradient-to-r from-white/15 to-white/5" />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">{project.title}</h3>
        <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-300">{project.description}</p>
        <div className="mt-5 grid gap-2">
          {project.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
              <CheckCircle2 className="shrink-0 text-teal-600 dark:text-teal-300" size={16} />
              {feature}
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:bg-white/10 dark:text-zinc-200"
            >
              {technology}
            </span>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <a
            href="#contact"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-teal-200"
          >
            <ExternalLink size={16} />
            Live Demo
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-200 px-4 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-teal-300 hover:text-teal-700 dark:border-white/10 dark:text-zinc-200 dark:hover:border-teal-300 dark:hover:text-teal-200"
          >
            <GitBranch size={16} />
            GitHub
          </a>
        </div>
      </div>
    </article>
  )
}

export function HomePage() {
  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden border-b border-zinc-200 bg-[linear-gradient(135deg,#f7fafa_0%,#ffffff_42%,#ecfeff_100%)] px-5 pb-20 pt-28 dark:border-white/10 dark:bg-[linear-gradient(135deg,#09090b_0%,#18181b_55%,#042f2e_100%)] sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1fr] lg:items-center">
            <PhotoPlaceholder />
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-teal-200 bg-white/70 px-3 py-2 text-sm font-medium text-teal-800 shadow-sm backdrop-blur dark:border-teal-400/20 dark:bg-white/10 dark:text-teal-200">
                <Rocket size={16} />
                Laravel APIs. React interfaces. PostgreSQL systems.
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-zinc-950 sm:text-5xl lg:text-6xl dark:text-white">
                Your Name
              </h1>
              <p className="mt-4 text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
                Full Stack Laravel & React Developer
              </p>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
                I build scalable web applications, inventory systems, management systems, and enterprise solutions using
                Laravel, React, TypeScript, and PostgreSQL.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:bg-white dark:text-zinc-950 dark:hover:bg-teal-200"
                >
                  View Projects
                  <ArrowRight size={18} />
                </a>
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white/70 px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:border-teal-300 hover:text-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:border-white/10 dark:bg-white/10 dark:text-zinc-100 dark:hover:border-teal-300 dark:hover:text-teal-200"
                >
                  <Download size={18} />
                  Download Resume
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white/70 px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:border-teal-300 hover:text-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:border-white/10 dark:bg-white/10 dark:text-zinc-100 dark:hover:border-teal-300 dark:hover:text-teal-200"
                >
                  <Mail size={18} />
                  Contact Me
                </a>
              </div>
            </div>
          </div>

          <DashboardMockup />
        </div>
      </section>

      <MotionSection id="about" className="bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="About Me"
            title="System-minded development for real business operations"
            description="I combine backend architecture, polished interfaces, and reliable database design to create systems that teams can trust every day."
          />

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="rounded-xl border border-zinc-200 bg-zinc-50 p-8 dark:border-white/10 dark:bg-white/5">
              <h3 className="text-2xl font-semibold text-zinc-950 dark:text-white">Professional Summary</h3>
              <p className="mt-5 leading-8 text-zinc-600 dark:text-zinc-300">
                I specialize in Laravel development, React development, PostgreSQL database design, REST API
                development, system architecture, and enterprise solutions. My work focuses on building dependable
                business platforms with clean role-based workflows, maintainable APIs, responsive interfaces, and
                analytics dashboards that turn operational data into useful decisions.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  'Laravel application architecture',
                  'React and TypeScript interfaces',
                  'PostgreSQL schema design',
                  'Secure REST API development',
                  'Enterprise workflow automation',
                  'Dashboard analytics and reporting',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                    <ShieldCheck className="text-teal-600 dark:text-teal-300" size={17} />
                    {item}
                  </div>
                ))}
              </div>
            </article>

            <div className="grid gap-4 sm:grid-cols-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
                >
                  <p className="text-3xl font-semibold text-zinc-950 dark:text-white">{stat.value}</p>
                  <p className="mt-2 text-sm font-medium text-zinc-600 dark:text-zinc-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection id="skills" className="bg-zinc-50 dark:bg-zinc-900/40">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Skills"
            title="A practical stack for enterprise-grade web systems"
            description="Backend, frontend, infrastructure, and analytics tools organized around building maintainable production applications."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {skillGroups.map((group) => (
              <SkillCard key={group.category} group={group} />
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection id="projects" className="bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Featured Projects"
            title="Portfolio systems built around operations, data, and usability"
            description="Representative projects showcasing Laravel, React, PostgreSQL, analytics, reporting, and enterprise workflow development."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection id="experience" className="bg-zinc-50 dark:bg-zinc-900/40">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Experience"
            title="From architecture to deployment"
            description="A concise timeline of full-stack responsibilities across system development and long-term application support."
          />
          <div className="relative border-l border-zinc-200 pl-7 dark:border-white/10">
            {timeline.map((item) => (
              <article key={item.role} className="relative mb-10 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm last:mb-0 dark:border-white/10 dark:bg-white/5">
                <span className="absolute -left-[2.2rem] top-7 grid size-4 rounded-full border-4 border-white bg-teal-500 dark:border-zinc-900" />
                <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">{item.role}</h3>
                <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-300">{item.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.achievements.map((achievement) => (
                    <span key={achievement} className="rounded-lg bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-700 dark:bg-white/10 dark:text-zinc-200">
                      {achievement}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection id="services" className="bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Services"
            title="Focused development services for business systems"
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon

              return (
                <article
                  key={service.title}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-zinc-900/5 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <div className="grid size-12 place-items-center rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300">
                    <Icon size={23} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-zinc-950 dark:text-white">{service.title}</h3>
                  <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-300">{service.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </MotionSection>

      <MotionSection id="stack" className="bg-zinc-50 dark:bg-zinc-900/40">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Tech Stack"
            title="Core technologies with official brand marks"
            description="The stack behind scalable Laravel APIs, responsive React products, and database-centered enterprise systems."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {technologies.map((technology, index) => (
              <motion.article
                key={technology.name}
                className={`rounded-xl border border-zinc-200 p-5 shadow-sm dark:border-white/10 ${technology.color}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
              >
                <img src={technology.logo} alt={`${technology.name} logo`} className="h-11 w-11" loading="lazy" />
                <h3 className="mt-5 font-semibold text-zinc-950 dark:text-white">{technology.name}</h3>
              </motion.article>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection id="testimonials" className="bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Testimonials"
            title="Trusted for practical, maintainable systems"
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-white/10 dark:bg-white/5">
                <div className="mb-5 flex items-center gap-3">
                  <div className="grid size-12 place-items-center rounded-full bg-zinc-950 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">
                    {testimonial.name
                      .split(' ')
                      .map((part) => part[0])
                      .join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-950 dark:text-white">{testimonial.name}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{testimonial.position}</p>
                  </div>
                </div>
                <p className="leading-8 text-zinc-600 dark:text-zinc-300">"{testimonial.quote}"</p>
              </article>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection id="contact" className="bg-zinc-50 dark:bg-zinc-900/40">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase text-teal-600 dark:text-teal-300">Contact</p>
            <h2 className="text-3xl font-semibold text-zinc-950 md:text-4xl dark:text-white">
              Let us build a dependable system for your team
            </h2>
            <p className="mt-5 leading-8 text-zinc-600 dark:text-zinc-300">
              Send a message about your Laravel API, React application, PostgreSQL database, dashboard, or enterprise
              workflow requirement.
            </p>
            <div className="mt-8 grid gap-4">
              {[
                { icon: Mail, label: 'hello@example.com' },
                { icon: GitBranch, label: 'Version-controlled delivery' },
                { icon: Database, label: 'Database-first planning' },
              ].map((item) => {
                const Icon = item.icon

                return (
                  <div key={item.label} className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="grid size-10 place-items-center rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300">
                      <Icon size={19} />
                    </div>
                    <span className="font-medium text-zinc-700 dark:text-zinc-200">{item.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-900/5 dark:border-white/10 dark:bg-white/5 dark:shadow-black/20">
            <ContactForm />
          </div>
        </div>
      </MotionSection>
    </>
  )
}
