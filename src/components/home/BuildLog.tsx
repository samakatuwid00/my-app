import type { ReactNode } from 'react'
import { logProjects, phoneSets, previewAltFor, previewFor } from '../../data/projects'
import type { ProjectFacts } from '../../types/portfolio'
import { Band } from '../layout/Band'
import { PhoneFan } from '../screens/PhoneSet'
import { ScreenFrame } from '../screens/ScreenFrame'
import { Arrow } from '../ui/Arrow'

// The label on each card says what kind of thing it is and how far along.
const META: Record<string, { kind: string; status: string; live?: boolean; layout: 'half' | 'wide' | 'third'; foot: string; note?: string }> = {
  cygnus: { kind: 'Voice assistant', status: 'Installer 0.1.0', layout: 'half', foot: 'Python 3.10 · FastAPI · Electron 44 · Playwright · OCR', note: 'HUD, desktop' },
  eurasian: { kind: 'Booking system', status: 'Capstone · 2026 overhaul', layout: 'half', foot: 'PHP 8 · MySQL · PDO · Bootstrap · PHPMailer', note: 'Not deployed · runs on XAMPP' },
  'schema-mapper': { kind: 'Data integration', status: 'Internal', live: true, layout: 'wide', foot: 'Python · FastAPI · psycopg2 · sqlglot · Gemini · Vite + TypeScript console', note: 'Console, sample data' },
  'sticky-brain': { kind: 'Desktop app', status: 'Installer 0.1.0 · MIT', layout: 'third', foot: 'Electron 33 · vanilla JS' },
  'second-brain': { kind: 'Knowledge vault', status: 'Private', layout: 'third', foot: 'Obsidian · Python · TurboVec · sentence-transformers' },
  'cerebrum-sizer': { kind: 'PWA · personal', status: 'In use', layout: 'third', foot: 'Vanilla JS · service worker · web manifest' },
}

// The short line on the page; the full description stays in facts for the assistant.
const BLURB: Record<string, string> = {
  cygnus: 'Windows voice assistant with a wake word, local speech-to-text and a model router with fallbacks. It opens apps, shows what is running, and hands bigger jobs to a coding agent behind a confirm gate.',
  eurasian: 'Guests check availability, book a room or cottage, and send a GCash, PayPal or cash reference; staff confirm it, check guests in and out, and watch occupancy and revenue. A row lock stops double bookings.',
  'schema-mapper': 'Publishes iRIMS-V records into LRMIS so offices never type the same data twice. An outbox makes every retry safe; the console shows the pipeline, drift, and a kill switch per entity.',
  'sticky-brain': 'Always-on-top board of live coding-agent sessions, a pending inbox and a backlog, with quick capture into Markdown. Niko lives on top. Windows installer with CI.',
  'second-brain': 'The Obsidian vault my coding agents read and write. On-device search across 400+ notes in under 50 ms; nothing leaves the machine.',
  'cerebrum-sizer': 'Paste a trade signal and get the exact size to enter at a fixed risk, what the stop would cost, and a warning when the signal is stale. Installable, works offline.',
}

// Three points at most, shown on wider screens only.
const POINTS: Record<string, string[]> = {
  cygnus: ['faster-whisper and sherpa-onnx speech-to-text; Kokoro voice', 'Running panel: agents, servers, apps', 'Phone HUD over Tailscale'],
  'schema-mapper': ['Gemini drafts field mappings; an admin approves them', 'PostgreSQL in, MySQL out, FastAPI, Docker Compose'],
}

function Visual({ p }: { p: ProjectFacts }) {
  if (p.slug === 'cerebrum-sizer') return <PhoneFan phones={phoneSets.sizer} />
  const source = previewFor(p.slug)
  if (!source) return null
  return (
    <figure className={`thumb${p.slug === 'sticky-brain' ? ' tall' : ''}`}>
      <ScreenFrame source={source} alt={previewAltFor(p.slug)!} sizes="(max-width: 700px) 92vw, 600px" />
    </figure>
  )
}

function Cell({ p }: { p: ProjectFacts }) {
  const m = META[p.slug]
  const body: ReactNode = (
    <>
      <div className="top ui"><span>{m.kind}</span><span className={`status${m.live ? ' live' : ''}`}><i />{m.status}</span></div>
      <div>
        <h3 className="h3">{p.title}</h3>
        <p>{BLURB[p.slug]}</p>
        {POINTS[p.slug] && <ul className="feat">{POINTS[p.slug].map((x) => <li key={x}>{x}</li>)}</ul>}
      </div>
      <Visual p={p} />
      <div className="foot">
        <span>{m.foot}</span>
        {p.githubUrl ? <span className="go">Source <Arrow /></span> : m.note && <span>{m.note}</span>}
      </div>
    </>
  )
  const className = `cell c-${m.layout}`
  return p.githubUrl
    ? <a className={className} id={p.slug} href={p.githubUrl}>{body}</a>
    : <div className={className} id={p.slug}>{body}</div>
}

export function BuildLog() {
  return (
    <Band id="more" tone="dark" className="more">
      <div className="wrap">
        <div className="more-head">
          <h2 className="h2">Build log</h2>
          <p>Desktop apps, a booking system, the suite’s data bridge, and the tooling I build to learn. Every screen is a real capture.</p>
        </div>
        <div className="bento">
          {logProjects.map((p) => <Cell key={p.slug} p={p} />)}
        </div>
      </div>
    </Band>
  )
}
