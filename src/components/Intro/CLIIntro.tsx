// Full-screen CLI intro overlay. Shows a terminal-typed sequence once per visitor
// (gated by localStorage), then zooms out and reveals the live app beneath.
import { useCallback, useEffect, useState } from 'react'
import { useCLIIntro } from './useCLIIntro'
import { TerminalWindow } from './TerminalWindow'
import { TerminalPrompt } from './TerminalPrompt'

type CLIIntroProps = {
  onComplete: () => void
}

export function CLIIntro({ onComplete }: CLIIntroProps) {
  const { state, reset } = useCLIIntro()
  const { lines, complete, reduced } = state
  const [echo, setEcho] = useState('') // echoed-back bad command
  const [done, setDone] = useState(false) // transition started

  const proceed = useCallback(() => {
    setDone(true)
    // Persist so we never show again; fire after a tick so the callback resolves
    window.localStorage.setItem('portfolio-intro-seen', 'true')
    setTimeout(onComplete, 350) // let zoom-out animation finish
  }, [onComplete])

  // After the prompt line lands, auto-proceed after a grace period
  useEffect(() => {
    if (!complete) return
    if (done) return
    const t = setTimeout(proceed, 1800)
    return () => clearTimeout(t)
  }, [complete, done, proceed])

  function handlePromptEnter(value: string) {
    if (value === '__echo__') {
      setEcho('')
      return
    }
    if (value.startsWith('__echo__')) {
      setEcho(value.slice(8))
      return
    }
    proceed()
  }

  // Keyboard shortcut: Esc skips the sequence
  useEffect(() => {
    if (done) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') proceed()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [done, proceed])

  const handleReset = () => {
    setEcho('')
    reset()
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas"
      style={{
        opacity: done ? 0 : 1,
        transform: done ? 'scale(0.93)' : 'scale(1)',
        filter: done ? 'blur(3px)' : 'none',
        transition: reduced
          ? 'none'
          : 'opacity 650ms ease, transform 650ms cubic-bezier(.16,.16,.05,1), filter 650ms ease',
      }}
      aria-label="Portfolio intro"
    >
      <TerminalWindow reduced={reduced}>
        {/* Pixel header — hacking-style prompt */}
        <div
          className="mb-4 select-none text-[10px] uppercase tracking-[.08em] text-text-3"
          style={{
            opacity: reduced ? 1 : 0,
            animation: reduced ? 'none' : 'pixel-fade-in .4s .2s forwards',
          }}
        >
          {'> roger@portfolio:~$'}
        </div>

        {lines.map((l) => (
          <IntroLine key={l.id} line={l} reduced={reduced} />
        ))}

        {echo && (
          <div className="row text-text-2">{`echo: command not found: ${echo}`}</div>
        )}

        {complete && (
          <div className="pt-2">
            <TerminalPrompt reduced={reduced} onEnter={handlePromptEnter} />
            {window.location.search.includes('intro-debug=1') && (
              <button
                onClick={handleReset}
                className="mt-2 text-[10px] text-text-3 hover:text-text"
              >
                [reset]
              </button>
            )}
          </div>
        )}
      </TerminalWindow>
    </div>
  )
}

// Renders a single sequence line with proper typing/color treatment.
function IntroLine({
  line,
  reduced,
}: {
  line: {
    id: string
    html: string
    cls?: string
    animated?: boolean
  }
  reduced: boolean
}) {
  if (line.cls === 'prompt') {
    // A command line — already carries <span> for coloring, shows instantly
    return <div className="row" dangerouslySetInnerHTML={{ __html: line.html }} />
  }
  if (line.cls === 'prompt-input') {
    // The input row is handled by TerminalPrompt; skip here
    return null
  }
  if (line.animated && line.html && !line.cls) {
    // Plain output — char-by-char typewriter reveal via CSS animation.
    // Each char <span> gets animation-delay: i*60ms. No React re-render per
    // char = fast even for long lines (no 60+ setState calls).
    return <AnimatedLine text={line.html} reduced={reduced} />
  }
  if (line.cls === 'accent') {
    return (
      <div
        className="row text-accent"
        dangerouslySetInnerHTML={{
          __html: line.html.includes('<')
            ? line.html
            : escapeHtml(line.html),
        }}
      />
    )
  }
  if (line.cls === 'dim') {
    return (
      <div className="row text-text-2" dangerouslySetInnerHTML={{ __html: escapeHtml(line.html) }} />
    )
  }
  if (!line.html) return <div className="row h-3" />
  return <div className="row" dangerouslySetInnerHTML={{ __html: escapeHtml(line.html) }} />
}

// Char-by-char typewriter reveal. Each character gets its own <span> with an
// incremental animation-delay, so the reveal is purely CSS — zero React
// re-renders per character (fast, smooth, respects prefers-reduced-motion).
function AnimatedLine({ text, reduced }: { text: string; reduced: boolean }) {
  const [shown, setShown] = useState(false)
  // Defer rendering the spans until the element is mounted so the cascade is
  // reliable across browsers. Reduced-motion → reveal immediately.
  useEffect(() => {
    if (reduced) return
    const t = setTimeout(() => setShown(true), 16)
    return () => clearTimeout(t)
  }, [reduced])

  if (reduced || !shown) {
    return <div className="row">{text}</div>
  }

  return (
    <div className="row" style={{ whiteSpace: 'pre-wrap' }}>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            animation: 'reveal-char .12s ease-out forwards',
            animationDelay: computedelay(i, 15),
            opacity: 0,
          }}
        >
          {ch}
        </span>
      ))}
    </div>
  )
}

// Small helper so TypeScript sees the unit (avoids 'as' assertions inline).
function computedelay(i: number, ms: number): `${number}ms` {
  return `${i * ms}ms` as `${number}ms`
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string),
  )
}
