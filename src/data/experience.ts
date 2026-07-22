export type TimelineEntry = {
  role: string
  organization: string
  period: string
  location?: string
  points: string[]
}

export const experience: TimelineEntry[] = [
  {
    role: 'Full Stack Developer',
    organization: 'Government & Private Sector Systems',
    period: '2+ Years',
    points: [
      'Built production systems for government offices and businesses, including regional and national DepEd platforms, a resort management system, and an HR leave monitoring solution.',
      'Delivered end-to-end web applications featuring secure authentication, role management, workflow automation, and reporting systems.',
      'Received the "Full Stack Developer Award" for contributions to a regional government system launch.',
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
