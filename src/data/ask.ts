// Imports here must stay free of Vite asset modules — api/ask.ts bundles this
// file to build the assistant's system prompt.
import { deliverables } from './deliverables'
import { education, experience } from './experience'
import { projectFacts, technologyNames } from './facts'
import { GITHUB_URL, site } from './site'
import { stats } from './stats'

export type Intent = {
  id: string
  patterns: RegExp[]
  answer: () => string
}

const projectLines = () =>
  projectFacts.map((p) => `${p.title} — ${p.description} Stack: ${p.technologies.join(', ')}.`)

export const suggestions = ["what's your stack?", 'show me a government system', 'are you available?']

export const intents: Intent[] = [
  {
    id: 'stack',
    patterns: [/\bstack\b/, /\btech(nolog)/, /\bskills?\b/, /\blanguages?\b/, /what do you (use|work with)/],
    answer: () =>
      `Core stack: ${technologyNames.join(' · ')}.\n` +
      'Most production work is Laravel + PostgreSQL/MySQL on the back end, React or Vue on the front.',
  },
  {
    id: 'government',
    patterns: [/\bgov(ernment)?\b/, /\bdeped\b/, /\bpublic sector\b/, /\blgu\b/],
    answer: () =>
      'Government systems built for DepEd:\n\n' +
      projectFacts
        .filter((p) => /IRIMS|LRMIS|EDULEAVE/i.test(p.title))
        .map((p) => `${p.title} — ${p.description}${p.liveUrl ? `\n${p.liveUrl}` : ''}`)
        .join('\n\n'),
  },
  {
    id: 'projects',
    patterns: [/\bprojects?\b/, /\bbuilt\b/, /\bportfolio\b/, /\bsystems?\b/, /\bwork(ed)? on\b/],
    answer: () => `${projectFacts.length} featured systems:\n\n${projectLines().join('\n\n')}\n\nFull details at /projects.`,
  },
  {
    id: 'availability',
    patterns: [/\bavailab/, /\bhiring\b/, /\bopen to\b/, /\bfreelance\b/, /\bhire\b/, /\bwork together\b/],
    answer: () =>
      `Open to work. ${site.role} based in ${site.location}, available for government and private sector projects.\n` +
      `Reach me at ${site.email} or through /contact.`,
  },
  {
    id: 'resume',
    patterns: [/\bresume\b/, /\bcv\b/, /\bcredentials?\b/],
    answer: () => 'The résumé download sits at the top of /about, next to "view projects".',
  },
  {
    id: 'contact',
    patterns: [/\bcontact\b/, /\bemail\b/, /\breach\b/, /\bphone\b/, /\bmessage you\b/],
    answer: () => `Email: ${site.email}\nPhone: ${site.phone}\nGitHub: ${GITHUB_URL}\n\nOr use the form at /contact.`,
  },
  {
    id: 'location',
    patterns: [/\bwhere\b.*\b(based|located|live|from)\b/, /\blocation\b/, /\bremote\b/, /\btimezone\b/],
    answer: () => `Based in ${site.location}. Works remotely with offices and teams outside the region.`,
  },
  {
    id: 'education',
    patterns: [/\beducat/, /\bdegree\b/, /\bschool\b/, /\bcollege\b/, /\bstudy\b/, /\bgraduat/],
    answer: () => `${education.degree}, ${education.honors} — ${education.school}, ${education.period}.`,
  },
  {
    id: 'experience',
    patterns: [/\bexperience\b/, /\bhow long\b/, /\byears?\b/, /\bbackground\b/, /\bcareer\b/],
    answer: () =>
      `${stats[0].value} years building production systems.\n\n` +
      experience.map((e) => `${e.role} — ${e.organization} (${e.period})`).join('\n'),
  },
  {
    id: 'award',
    patterns: [/\baward/, /\brecogni/, /\bhonou?r/],
    answer: () => `${site.award.title} — ${site.award.caption}. Shown on /feedback.`,
  },
  {
    id: 'services',
    patterns: [/\bservices?\b/, /\bwhat can you (do|build)\b/, /\bhelp me with\b/, /\boffer\b/],
    answer: () => `What I deliver:\n\n${deliverables.map((d) => `· ${d}`).join('\n')}`,
  },
  {
    id: 'who',
    patterns: [/\bwho are you\b/, /\byour name\b/, /\babout you\b/, /\btell me about\b/],
    answer: () => `${site.name} — ${site.role}.\n\n${site.intro}`,
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
    `Intro: ${site.intro}`,
    '',
    `Education: ${education.degree}, ${education.honors} — ${education.school}, ${education.location}, ${education.period}`,
    '',
    'Stats:',
    ...stats.map((s) => `- ${s.label}: ${s.value}`),
    '',
    'Experience:',
    ...experience.flatMap((e) => [
      `- ${e.role}, ${e.organization} (${e.period})`,
      ...e.points.map((p) => `  · ${p}`),
    ]),
    '',
    'Technologies:',
    technologyNames.join(', '),
    '',
    'Services:',
    ...deliverables.map((d) => `- ${d}`),
    '',
    'Projects:',
    ...projectFacts.flatMap((p) => [
      `- ${p.title} (${p.status}${p.liveUrl ? `, ${p.liveUrl}` : ''})`,
      `  ${p.description}`,
      `  Features: ${p.features.join(', ')}`,
      `  Stack: ${p.technologies.join(', ')}`,
    ]),
    '',
    `Award: ${site.award.title} — ${site.award.caption}`,
    '',
    'Site routes: /about, /projects, /feedback, /contact. The résumé downloads from /about.',
  ].join('\n')
}
