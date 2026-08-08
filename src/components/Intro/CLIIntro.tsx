// The CLI intro. It does not fade out and it does not zoom away: on proceed the
// terminal window FLIPs onto the exact rect of the app window and hands over
// underneath a pixel curtain, so the chrome the visitor is looking at during the
// boot log is the chrome they keep.
//
// Contract kept from the previous build: `portfolio-intro-seen`,
// the `portfolio-intro-reset` event, `?intro-debug=1`, and everything the intro
// needs living inside this folder.
import { useCallback, useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { useCLIIntro } from './useCLIIntro'
import { BootLine } from './BootLine'
import { TerminalWindow } from './TerminalWindow'
import { TerminalPrompt } from './TerminalPrompt'
import type { PromptResult } from './promptRouter'
import { PixelOverlay } from '../PixelOverlay'
import { useNiko } from '../../hooks/useNiko'

/** The morph, per the spec. */
export const MORPH_MS = 600
export const MORPH_EASE = 'cubic-bezier(.16,.16,.05,1)'
/** How long Niko takes to walk from the intro rail to the dock. */
export const WALK_MS = 1800
/** Below this the rects are close enough that travelling them reads as jitter. */
const TRIVIAL_DELTA = 24

type Rect = { left: number; top: number; width: number; height: number }

type CLIIntroProps = {
  /** The visitor has chosen a route; mount the app so its rect can be measured. */
  onEnter: (to: string) => void
  /** The morph has landed; the intro can leave the DOM. */
  onDone: () => void
  /** The app window element, available once `onEnter` has mounted the shell. */
  targetRef: RefObject<HTMLDivElement | null>
}

function readRect(element: HTMLElement): Rect {
  const box = element.getBoundingClientRect()
  return { left: box.left, top: box.top, width: box.width, height: box.height }
}

export function CLIIntro({ onEnter, onDone, targetRef }: CLIIntroProps) {
  const { state, reset } = useCLIIntro()
  const { lines, complete, reduced, awake } = state

  // The context value changes on every animation frame, so nothing here may
  // depend on it as a whole: an effect keyed on `niko` re-runs at up to 8Hz,
  // which re-queues the beat it just played and re-arms the grace timer
  // forever. The command callbacks are stable, so they are what we hold.
  const niko = useNiko()
  const { show: nikoShow, play: nikoPlay, hold: nikoHold, place: nikoPlace } = niko ?? {}

  const [echo, setEcho] = useState('')
  const [morph, setMorph] = useState<{ from: Rect; to: Rect } | null>(null)
  const [flipped, setFlipped] = useState(false)
  const started = useRef(false)
  const frameRef = useRef<HTMLDivElement>(null)

  const isDebug =
    typeof window !== 'undefined' && window.location.search.includes('intro-debug=1')

  /* ---------- Niko's beats through the boot log ---------- */

  // `$ niko --wake`: poof, then wave. He is not on screen before this.
  useEffect(() => {
    if (!awake || !nikoShow || !nikoPlay) return
    nikoShow(true)
    nikoPlay('poof', 'wave')
  }, [awake, nikoShow, nikoPlay])

  // `···` builds while `$ whoami` is still typing.
  const whoamiTyping = awake && lines.some((line) => line.text === '$ whoami')
  useEffect(() => {
    if (!whoamiTyping || !nikoPlay) return
    nikoPlay('think')
  }, [whoamiTyping, nikoPlay])

  // The fifth `[ ok ]` is `boot complete`.
  const bootComplete = lines.filter((line) => line.kind === 'ok').length >= 5
  useEffect(() => {
    if (!bootComplete || !nikoPlay) return
    nikoPlay('celebrate', 'happy')
  }, [bootComplete, nikoPlay])

  // Then he watches the visitor type.
  useEffect(() => {
    if (!complete || !nikoPlay) return
    nikoPlay('look')
  }, [complete, nikoPlay])

  /* ---------- the morph ---------- */

  const proceed = useCallback(
    (to: string) => {
      if (started.current) return
      started.current = true
      window.localStorage.setItem('portfolio-intro-seen', 'true')

      // The router reads the URL on mount, so a typed `projects` has to be in
      // the address bar before the shell exists.
      window.history.replaceState(null, '', to)
      onEnter(to)

      if (reduced || !frameRef.current) {
        onDone()
        return
      }

      const from = readRect(frameRef.current)

      // One frame for the shell to mount and lay out, then measure it.
      requestAnimationFrame(() => {
        const target = targetRef.current
        const to2 = target ? readRect(target) : from
        setMorph({ from, to: to2 })

        // Niko leaves with the window rather than after it.
        nikoPlace?.('dock', WALK_MS)
        nikoHold?.('walk')
        window.setTimeout(() => {
          // Settle at the dock (travelMs back to 0) so the name tag appears and
          // any later re-measure is a jump, not another 1.8s stroll.
          nikoPlace?.('dock', 0)
          nikoHold?.(null)
          nikoPlay?.('hop')
        }, WALK_MS)

        // Second frame: the `from` styles are committed, so the transition to
        // `to` actually animates instead of snapping.
        requestAnimationFrame(() => setFlipped(true))
        window.setTimeout(onDone, MORPH_MS)
      })
    },
    [onEnter, onDone, reduced, targetRef, nikoPlace, nikoHold, nikoPlay],
  )

  function handleSubmit(result: PromptResult) {
    if (result.kind === 'echo') {
      setEcho(result.text)
      return
    }
    setEcho('')
    proceed(result.to)
  }

  // The grace timer: land on /about if nobody types.
  useEffect(() => {
    if (!complete || started.current) return
    const timer = setTimeout(() => proceed('/about'), 1400)
    return () => clearTimeout(timer)
  }, [complete, proceed])

  // Esc always works, from the first frame.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') proceed('/about')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [proceed])

  const rect = morph ? (flipped ? morph.to : morph.from) : null
  // On a phone the two rects are nearly the same box; travelling them reads as
  // jitter, so the morph reduces to the size settle and the curtain.
  const trivial =
    morph !== null &&
    Math.abs(morph.to.left - morph.from.left) < TRIVIAL_DELTA &&
    Math.abs(morph.to.top - morph.from.top) < TRIVIAL_DELTA

  return (
    <div
      className={`fixed inset-0 z-[100] ${morph ? '' : 'flex items-center justify-center p-4'} bg-canvas`}
      aria-label="Portfolio intro"
    >
      {!morph && (
        <p className="label pointer-events-none absolute inset-x-0 top-4 text-center">
          [esc] skip
        </p>
      )}

      <div
        style={
          rect
            ? {
                position: 'fixed',
                left: 0,
                top: 0,
                width: `${rect.width}px`,
                height: `${rect.height}px`,
                transform: `translate3d(${trivial ? morph!.to.left : rect.left}px, ${rect.top}px, 0)`,
                transition: flipped
                  ? `transform ${MORPH_MS}ms ${MORPH_EASE}, width ${MORPH_MS}ms ${MORPH_EASE}, height ${MORPH_MS}ms ${MORPH_EASE}`
                  : 'none',
                willChange: 'transform, width, height',
              }
            : { width: '100%', maxWidth: '48rem' }
        }
      >
        <TerminalWindow
          reduced={reduced}
          frameRef={frameRef}
          morphing={morph !== null}
          body={
            morph ? (
              // The boot log is gone the instant the morph starts. The curtain
              // holds opaque for the whole FLIP; the app's own curtain,
              // already at the destination rect, does the sweep out.
              <div className="relative flex-1 bg-panel">
                <PixelOverlay runKey="morph" holdMs={MORPH_MS + 200} />
              </div>
            ) : undefined
          }
        >
          {lines.map((line) => (
            <BootLine key={line.id} line={line} reduced={reduced} />
          ))}

          {echo && (
            <div className="row text-text-3">{`command not found: ${echo}`}</div>
          )}

          {complete && (
            <>
              <TerminalPrompt reduced={reduced} onSubmit={handleSubmit} />
              {isDebug && (
                <button
                  type="button"
                  onClick={() => {
                    setEcho('')
                    nikoShow?.(false)
                    reset()
                  }}
                  className="mt-2 text-[10px] text-text-3 hover:text-text"
                >
                  [reset]
                </button>
              )}
            </>
          )}
        </TerminalWindow>
      </div>
    </div>
  )
}
