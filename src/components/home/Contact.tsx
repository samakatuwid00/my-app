import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { site, socialLinks } from '../../data/site'
import { ContactForm } from '../ContactForm'
import { Band } from '../layout/Band'

function linkFor(brand: (typeof socialLinks)[number]['brand']) {
  const link = socialLinks.find((l) => l.brand === brand)
  if (!link) throw new Error(`No ${brand} link in socialLinks`)
  return link.href
}

// The address is the link without its scheme, so it reads as something to copy.
const bare = (href: string) => href.replace(/^https?:\/\/(www\.)?/, '')

const linkedIn = linkFor('linkedin')
const gitHub = linkFor('github')
const facebook = linkFor('facebook')

const CHANNELS = [
  { id: 'email', label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { id: 'linkedin', label: 'LinkedIn', value: bare(linkedIn), href: linkedIn },
  { id: 'github', label: 'GitHub', value: bare(gitHub), href: gitHub },
  { id: 'facebook', label: 'Facebook', value: bare(facebook), href: facebook },
]

type CopyState = 'idle' | 'done' | 'failed'

export function Contact() {
  const [i, setI] = useState(0)
  const [copied, setCopied] = useState<CopyState>('idle')
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const reset = useRef<number | undefined>(undefined)
  const channel = CHANNELS[i]

  useEffect(() => () => window.clearTimeout(reset.current), [])

  function select(n: number) {
    setI(n)
    setCopied('idle')
    window.clearTimeout(reset.current)
  }

  // Arrow keys move the selection and the focus together (automatic activation).
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = CHANNELS.length - 1
    const next =
      event.key === 'ArrowRight' ? (i === last ? 0 : i + 1)
      : event.key === 'ArrowLeft' ? (i === 0 ? last : i - 1)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : null
    if (next === null) return
    event.preventDefault()
    select(next)
    tabs.current[next]?.focus()
  }

  async function copy() {
    window.clearTimeout(reset.current)
    try {
      await navigator.clipboard.writeText(channel.value)
      setCopied('done')
    } catch {
      setCopied('failed')
    }
    reset.current = window.setTimeout(() => setCopied('idle'), 1800)
  }

  return (
    <Band id="contact" tone="dark">
      <div className="wrap contact">
        <div>
          <h2 className="display">Let's talk</h2>
          <p className="lede">Tell me about the records, approvals, or reports your team still handles by hand.</p>
          <div className="reach">
            <div
              className="tabs"
              role="tablist"
              aria-label="Contact channel"
              style={{ '--i': i, '--n': CHANNELS.length } as CSSProperties}
              onKeyDown={onKeyDown}
            >
              <span className="pill" aria-hidden="true" />
              {CHANNELS.map((c, n) => (
                <button
                  key={c.id}
                  ref={(el) => { tabs.current[n] = el }}
                  id={`reach-tab-${c.id}`}
                  type="button"
                  role="tab"
                  aria-selected={n === i}
                  aria-controls="reach-panel"
                  tabIndex={n === i ? 0 : -1}
                  onClick={() => select(n)}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className="reach-row" id="reach-panel" role="tabpanel" aria-labelledby={`reach-tab-${channel.id}`}>
              {/* key remounts the link on every switch, so the swap keyframe replays */}
              <a id="reach-v" key={channel.id} className="swap" href={channel.href}>{channel.value}</a>
              <button className={`copy-btn${copied === 'done' ? ' done' : ''}`} type="button" onClick={copy}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="8" y="8" width="12" height="12" />
                  <path d="M16 8V4H4v12h4" />
                </svg>
                <span aria-live="polite">{copied === 'done' ? 'Copied' : copied === 'failed' ? 'Press Ctrl+C' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </Band>
  )
}
