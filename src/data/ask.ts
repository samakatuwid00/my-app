// Imports here must stay free of Vite asset modules — api/ask.ts bundles this
// file to build the assistant's system prompt.
import { services } from './services'
import { education, experience } from './experience'
import { projectFacts, skillGroups } from './facts'
import { aboutBlocks, GITHUB_URL, site } from './site'
import { stats, YEARS_SHIPPING } from './stats'

export type Intent = {
  id: string
  patterns: RegExp[]
  answer: () => string
}

// Grouped the way the page groups them: the four iRIMS-V suite systems, the
// two other production systems, and the build log. Anything not live is named
// with its status so none of it reads as production.
const STATUS_NOTE: Record<string, string> = {
  internal: 'internal tool',
  'in-progress': 'in progress',
  demo: 'not deployed',
  private: 'private',
}
const inGroup = (group: string) => projectFacts.filter((p) => p.group === group)
const statusOf = (p: { status: string }) => (p.status === 'live' ? '' : ` (${STATUS_NOTE[p.status] ?? p.status})`)
const line = (p: (typeof projectFacts)[number]) =>
  `${p.title}${statusOf(p)} – ${p.caseStudy?.problem ?? p.description} Stack: ${p.technologies.join(', ')}.`

export const suggestions = ["what's your stack?", 'show me a government system', 'are you available?']

export const intents: Intent[] = [
  {
    id: 'stack',
    patterns: [/\bstack\b/, /\btech(nolog)/, /\bskills?\b/, /\blanguages?\b/, /what do you (use|work with)/],
    answer: () =>
      'Most production work is Laravel with PostgreSQL or MySQL on the back end, React or Vue on the front.\n\n' +
      skillGroups.map((group) => `${group.label}: ${group.items.join(', ')}`).join('\n\n'),
  },
  {
    id: 'government',
    patterns: [/\bgov(ernment)?\b/, /\bdeped\b/, /\bpublic sector\b/, /\blgu\b/],
    answer: () =>
      'Government systems built for DepEd:\n\n' +
      projectFacts
        .filter((p) => p.status === 'live' && /DepEd/.test(p.client ?? ''))
        .map((p) => `${p.title} – ${p.description}${p.liveUrl ? `\n${p.liveUrl}` : ''}`)
        .join('\n\n'),
  },
  {
    id: 'projects',
    patterns: [/\bprojects?\b/, /\bbuilt\b/, /\bportfolio\b/, /\bsystems?\b/, /\bwork(ed)? on\b/],
    answer: () =>
      `The iRIMS-V suite, four systems for DepEd Region V:\n\n${inGroup('suite').map(line).join('\n\n')}\n\n` +
      `Also in production:\n\n${inGroup('also').map(line).join('\n\n')}\n\n` +
      `Build log: ${inGroup('log').map((p) => `${p.title}${statusOf(p) || ' (live)'}`).join(', ')}.\n\n` +
      'Details in the Work and Build log sections at /#work and /#more, and case studies at /work/irims-v, /work/irims-v-library, /work/eduleave and /work/lrmis.',
  },
  {
    id: 'availability',
    // Visitors will type "freelance" whatever the site calls it, so the pattern
    // has to match a word the answer never uses.
    patterns: [
      /\bavailab/,
      /\bhiring\b/,
      /\bopen to\b/,
      /\bfreelance\b/,
      /\bproject[- ]based\b/,
      /\bhire\b/,
      /\bwork together\b/,
    ],
    answer: () =>
      `Open to project-based work. ${site.role} based in ${site.location}, available for government and private sector engagements.\n` +
      `Reach me at ${site.email} or through the form in the Contact section at /#contact.`,
  },
  {
    id: 'resume',
    patterns: [/\bresume\b/, /\bcv\b/, /\bcredentials?\b/],
    answer: () => 'The résumé downloads from the Résumé button at the top of the home page.',
  },
  {
    id: 'contact',
    patterns: [/\bcontact\b/, /\bemail\b/, /\breach\b/, /\bphone\b/, /\bmessage you\b/],
    answer: () => `Email: ${site.email}\nPhone: ${site.phone}\nGitHub: ${GITHUB_URL}\n\nOr use the form in the Contact section at /#contact.`,
  },
  {
    id: 'location',
    patterns: [/\bwhere\b.*\b(based|located|live|from)\b/, /\blocation\b/, /\btimezone\b/],
    answer: () => `Based in ${site.location}.`,
  },
  {
    id: 'education',
    patterns: [/\beducat/, /\bdegree\b/, /\bschool\b/, /\bcollege\b/, /\bstudy\b/, /\bgraduat/],
    answer: () => `${education.degree}, ${education.honors} – ${education.school}, ${education.period}.`,
  },
  {
    id: 'experience',
    patterns: [/\bexperience\b/, /\bhow long\b/, /\byears?\b/, /\bbackground\b/, /\bcareer\b/],
    answer: () =>
      `${YEARS_SHIPPING} building production systems.\n\n` +
      experience.map((e) => `${e.role} – ${e.organization} (${e.period})`).join('\n'),
  },
  {
    id: 'award',
    patterns: [/\baward/, /\brecogni/, /\bhonou?r/],
    answer: () => `${site.award.title} – ${site.award.caption}. Shown in the Recognition section at /#recognition.`,
  },
  {
    id: 'services',
    patterns: [/\bservices?\b/, /\bwhat can you (do|build)\b/, /\bhelp me with\b/, /\boffer\b/],
    answer: () => `What I can build for you:\n\n${services.map((s) => `· ${s.name} – ${s.pitch}`).join('\n')}`,
  },
  {
    id: 'who',
    patterns: [/\bwho are you\b/, /\byour name\b/, /\babout you\b/, /\btell me about\b/],
    answer: () => `${site.name} – ${site.role}.\n\n${site.intro}`,
  },
  {
    id: 'greeting',
    patterns: [/^(hi|hey|hello|yo|sup|good (morning|afternoon|evening))\b/],
    answer: () =>
      `Hey. Ask about the stack, the government systems, availability, or anything on the résumé.\n` +
      `Try: ${suggestions.join(' · ')}`,
  },
]

export function buildContext(): string {
  return [
    `Name: ${site.name}`,
    `Role: ${site.role}`,
    `Location: ${site.location}`,
    `Email: ${site.email}`,
    `Phone: ${site.phone}`,
    `GitHub: ${GITHUB_URL}`,
    'About:',
    ...aboutBlocks.flatMap((block) => [
      `- ${block.label}: ${block.body}`,
      ...(block.points ?? []).map((point) => `  · ${point.term} – ${point.detail}`),
    ]),
    '',
    `Education: ${education.degree}, ${education.honors} – ${education.school}, ${education.period}`,
    '',
    'Stats:',
    ...stats.map((s) => `- ${s.label}: ${s.value}`),
    '',
    'Experience:',
    ...experience.flatMap((e) => [
      `- ${e.role}, ${e.organization} (${e.period})`,
      `  · ${e.summary}`,
      ...(e.award ? [`  · Award: ${e.award}`] : []),
    ]),
    '',
    'Skills:',
    ...skillGroups.map((group) => `- ${group.label}: ${group.items.join(', ')}`),
    '',
    'Services:',
    ...services.map((s) => `- ${s.name}: ${s.pitch}`),
    '',
    'Projects:',
    ...projectFacts.flatMap((p) => [
      `- ${p.title} (${p.category}; ${p.status}${p.liveUrl ? `, ${p.liveUrl}` : ''}${p.githubUrl ? `, ${p.githubUrl}` : ''})`,
      `  ${p.description}`,
      ...(p.client ? [`  Client: ${p.client}`] : []),
      ...(p.role ? [`  Role: ${p.role}`] : []),
      ...(p.caseStudy?.expansion ? [`  Full name: ${p.caseStudy.expansion}`] : []),
      ...(p.caseStudy ? [`  Problem: ${p.caseStudy.problem}`] : []),
      ...(p.caseStudy ? [`  Approach: ${p.caseStudy.approach.join(' ')}`] : []),
      ...(p.caseStudy ? [`  Result: ${p.caseStudy.result}`] : []),
      ...(p.features.length ? [`  Features: ${p.features.join(', ')}`] : []),
      `  Stack: ${p.technologies.join(', ')}`,
    ]),
    '',
    `Award: ${site.award.title} – ${site.award.caption}`,
    '',
    'Trust signals:',
    ...site.trustBadges.map((badge) => `- ${badge}`),
    '',
    'Site: one page at / with sections Work (the iRIMS-V suite), Also in production, Build log, Services, Experience, Recognition, FAQ and Contact; case studies at /work/irims-v, /work/irims-v-library, /work/eduleave and /work/lrmis. The résumé downloads from the Résumé button at the top of the home page.',
  ].join('\n')
}
