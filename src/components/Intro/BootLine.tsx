import { useEffect, useState } from 'react'
import { SPINNER_FRAMES, TYPE_SPEED } from './useCLIIntro'
import type { Line } from './useCLIIntro'

/**
 * One row of the boot log.
 *
 * Commands reveal a character at a time through a pure-CSS cascade — every
 * character is a span with its own `animation-delay`, so a 24-character line
 * costs one render, not 24 setState calls. Everything else lands whole, which
 * is what makes the `[ ok ]` bursts read as output rather than as typing.
 */

// `[ ok ]` is six mono characters; sizing the column in `ch` keeps the log's
// second column aligned at every font size.
const MARKER_WIDTH = 'w-[6ch]'

export function BootLine({ line, reduced }: { line: Line; reduced: boolean }) {
  if (line.kind === 'command') return <CommandLine text={line.text} reduced={reduced} />

  if (line.kind === 'ok') {
    return (
      <div className="row flex gap-2">
        <span className={`${MARKER_WIDTH} shrink-0 text-accent`}>[ ok ]</span>
        <span className="min-w-0 text-text-2">{line.text}</span>
      </div>
    )
  }

  if (line.kind === 'mount') {
    return <MountLine line={line} reduced={reduced} />
  }

  if (line.cls === 'accent') {
    return <div className="row text-accent">{line.text}</div>
  }
  if (line.cls === 'dim') {
    return <div className="row text-text-3">{line.text}</div>
  }
  if (line.cls === 'indent') {
    return (
      <div className="row flex gap-2">
        <span className={`${MARKER_WIDTH} shrink-0`} aria-hidden="true" />
        <span className="min-w-0 text-accent">{line.text}</span>
      </div>
    )
  }
  return <div className="row text-text-2">{line.text}</div>
}

function CommandLine({ text, reduced }: { text: string; reduced: boolean }) {
  if (reduced) return <div className="row text-text">{text}</div>

  return (
    <div className="row text-text" style={{ whiteSpace: 'pre-wrap' }}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            opacity: 0,
            animation: 'reveal-char .1s linear forwards',
            animationDelay: `${i * TYPE_SPEED}ms`,
          }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </div>
  )
}

/** `[ .. ]` with a braille spinner until the mount resolves, then `[ ok ]`. */
function MountLine({ line, reduced }: { line: Line; reduced: boolean }) {
  const [tick, setTick] = useState(0)
  const spinning = !line.resolved && !reduced

  useEffect(() => {
    if (!spinning) return
    const timer = setInterval(() => setTick((t) => t + 1), 80)
    return () => clearInterval(timer)
  }, [spinning])

  return (
    <div className="row flex gap-2">
      <span className={`${MARKER_WIDTH} shrink-0 ${line.resolved ? 'text-accent' : 'text-text-3'}`}>
        {line.resolved ? '[ ok ]' : `[ ${SPINNER_FRAMES[tick % SPINNER_FRAMES.length]} ]`}
      </span>
      <span className="min-w-0 text-text-2">{line.text}</span>
    </div>
  )
}
