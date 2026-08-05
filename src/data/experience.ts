export type TimelineEntry = {
  role: string
  organization: string
  period: string
  location?: string
  points: string[]
}

// One merged "2+ Years" entry until the versatility revamp. Two rules govern
// the split:
//
// No seniority band in any title — a band published on a portfolio only invites
// the reader to rank the author downward. No ownership claim in a title either:
// the bullets carry that, which is the plan's own fallback and reads as fact
// rather than as a self-awarded label.
//
// And national → regional must not read as a demotion to someone who does not
// know the org chart. What grew is the differentiator: feature ownership inside
// a national platform team, then end-to-end ownership of production systems and
// the infrastructure they run on. Geography carries none of that weight.
//
// Periods stay descriptive because the month-years are unconfirmed, and a
// plausible date is worse here than no date.
export const experience: TimelineEntry[] = [
  {
    role: 'Full-Stack Developer',
    organization: 'DepEd Region V',
    period: 'Current',
    points: [
      'Designs, ships, and maintains the regional production systems end to end, learning-resource inventory and monitoring, and a library circulation platform.',
      'Owns deployment, releases, and the VPS infrastructure those systems run on.',
      'Received the "Full Stack Developer Award" for contributions to a regional government system launch.',
    ],
  },
  {
    role: 'Web Systems Developer',
    organization: 'DepEd Central Office – National Learning Resource Platform',
    period: 'Previous',
    points: [
      'Owned features within the platform team on a national learning-resource system serving educational institutions across the Philippines.',
      'Delivered end-to-end web applications featuring secure authentication, role management, workflow automation, and reporting systems.',
    ],
  },
  {
    role: 'Freelance Web Developer',
    organization: 'Independent Engagements',
    period: 'Ongoing',
    points: [
      'Engaged directly by client offices to build systems end to end, requirements, build, deployment, and support.',
      'EDULEAVE – leave-credit management for the HR unit of DepEd Naga, replacing manual leave cards for teaching and non-teaching personnel with an auditable digital workflow. Live.',
      'Eurasian – resort operations platform: reservations, booking workflows, guest records, and management dashboards.',
    ],
  },
  {
    role: 'IT Support Intern (Work Immersion)',
    organization: 'Local Government Unit (LGU) Pasacao',
    period: 'Internship',
    location: 'Pasacao, Philippines',
    points: [
      'Troubleshot and resolved various hardware and software issues to maintain system stability.',
      'Assisted the core IT team with network configurations to support local infrastructure.',
    ],
  },
]

export const education = {
  school: 'STI College Naga',
  location: 'Naga, Philippines',
  period: '2020 – 2024',
  degree: 'Bachelor of Science in Information Technology',
  honors: 'Cum Laude',
}
