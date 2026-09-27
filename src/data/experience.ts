import type { TimelineEntry } from '../types/portfolio'

// Dates are the résumé's (2026-08-18). Summaries are the approved mockup's
// `.role-row` lines, one each.
//
// No seniority band in any title: a band published on a portfolio only invites
// the reader to rank the author downward. National to regional must not read as
// a demotion to someone who does not know the org chart. What grew is the
// ownership: features inside a national platform team, then production systems
// end to end and the servers they run on.
//
// `start` / `end` drive the timeline bars. Freelance has no recorded start, so
// both are null and the timeline shows it as an "ongoing" mark, not a bar.
export const experience: TimelineEntry[] = [
  {
    key: 'r5',
    role: 'Full-Stack Developer',
    organization: 'DepEd Region V',
    period: '2025 – Present',
    start: 2025,
    end: null,
    summary: 'Ships and runs the regional systems, inventory and library circulation, and the VPS they run on.',
    award: 'Full Stack Developer Award',
  },
  {
    key: 'co',
    role: 'Web Systems Developer',
    organization: 'DepEd Central Office',
    period: '2024 – 2025',
    start: 2024,
    end: 2025,
    summary: 'Feature owner on the national learning-resource platform: authentication, roles, workflows, reporting.',
  },
  {
    key: 'fl',
    role: 'Freelance Web Developer',
    organization: 'Independent',
    period: 'Present',
    start: null,
    end: null,
    summary: 'Client systems end to end, from requirements to support. EDULEAVE is live.',
  },
  {
    key: 'lg',
    role: 'IT Support Intern',
    organization: 'LGU Pasacao',
    period: '2019 – 2020',
    start: 2019,
    end: 2020,
    summary: 'Hardware, software, and network support alongside the core IT team.',
  },
]

export const education = {
  school: 'STI College Naga',
  degree: 'BS Information Technology',
  honors: 'Cum Laude',
  period: '2020 – 2024',
  start: 2020,
  end: 2024,
}
