import { useEffect, useRef, useState } from 'react'
import { site } from '../../data/site'
import { projectFacts } from '../../data/facts'

/**
 * The approved boot sequence. Every string that names a person, a role, an
 * employer or a project is read from `src/data/` — the boot log and the site
 * cannot drift apart, and there is exactly one place to correct a fact.
 *
 * Timing, from the motion spec: commands type at ~30ms/char, `[ ok ]` lines
 * land whole in bursts ~150ms apart, and the project mount hangs for ~700ms
 * behind a braille spinner before it resolves.
 */

export type Step =
  /** `$ …`, typed a character at a time. */
  | { type: 'command'; content: string }
  /** `[ ok ] …`, lands whole. */
  | { type: 'ok'; content: string }
  /** `[ .. ] …` with a spinner, then flips to `[ ok ]`. */
  | { type: 'mount'; content: string; ms: number }
  | { type: 'output'; content: string; cls?: 'accent' | 'dim' | 'indent' }
  /** Marks the beat Niko wakes; carries no text of its own. */
  | { type: 'wake' }
  | { type: 'prompt' }
  | { type: 'settle'; ms: number }

export type Line = {
  id: string
  kind: 'command' | 'ok' | 'mount' | 'output'
  text: string
  cls?: 'accent' | 'dim' | 'indent'
  /** Mount lines only: false while the spinner runs. */
  resolved?: boolean
  /** Command lines only: reveal a character at a time. */
  typed?: boolean
}

export type CLIState = {
  lines: Line[]
  complete: boolean
  reduced: boolean
  /** True from `$ niko --wake` onward. */
  awake: boolean
}

/** ~30ms/char, per the spec. */
export const TYPE_SPEED = 30
/** Gap between the `[ ok ]` lines that land in bursts. */
const BURST = 150
/** How long `[ .. ] mounting ~/projects` hangs before it resolves. */
const MOUNT_MS = 700

export const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧']

// The stack line and the project list are the same facts the rail and /projects
// render. Lower-cased here because this is a boot log, not prose.
const STACK = ['laravel', 'react', 'postgresql']

// A boot log lists mount points, so a two-word title contributes its last word:
// "IRIMS-V Library" mounts as `library`, not `irims-v-library`. Order follows
// facts.ts — it is the order /projects renders in.
const PROJECT_SLUGS = projectFacts.map((project) =>
  project.title.split(' ').pop()!.toLowerCase(),
)

// `·` rather than the spec video's em dash: the repo bans em dashes in visible
// text (tests/portfolio.spec.ts) and separates with `·` everywhere else.
const WHOAMI = `> ${site.name} · ${site.role} · ${site.org}`

export const BOOT_STEPS: Step[] = [
  { type: 'command', content: '$ ./boot portfolio-os' },
  { type: 'settle', ms: 220 },
  ...STACK.map((name): Step => ({ type: 'ok', content: name })),
  { type: 'ok', content: `${site.org.toLowerCase().replace(/ /g, '-')} systems` },
  { type: 'settle', ms: 120 },
  { type: 'mount', content: `mounting ~/projects (${PROJECT_SLUGS.length} systems)`, ms: MOUNT_MS },
  { type: 'output', content: PROJECT_SLUGS.join('  '), cls: 'indent' },
  { type: 'settle', ms: 260 },
  { type: 'command', content: '$ niko --wake' },
  { type: 'wake' },
  { type: 'settle', ms: 520 },
  { type: 'command', content: '$ whoami' },
  { type: 'settle', ms: 180 },
  { type: 'output', content: WHOAMI, cls: 'accent' },
  { type: 'settle', ms: 200 },
  { type: 'ok', content: 'boot complete · portfolio-os ready' },
  { type: 'settle', ms: 160 },
  {
    type: 'output',
    content: '> ready · type a route (about · projects · contact) or press enter',
    cls: 'dim',
  },
  { type: 'prompt' },
]

export function useCLIIntro(steps: Step[] = BOOT_STEPS) {
  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const [state, setState] = useState<CLIState>({
    lines: [],
    complete: false,
    reduced,
    awake: false,
  })

  // Bumped by `reset()` so the debug button can replay the sequence.
  const [runId, setRunId] = useState(0)
  const counter = useRef(0)

  useEffect(() => {
    let cancelled = false
    counter.current = 0

    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, reduced ? 0 : ms))

    const append = (line: Omit<Line, 'id'>) => {
      if (cancelled) return
      const id = `row-${counter.current++}`
      setState((s) => ({ ...s, lines: [...s.lines, { id, ...line }] }))
    }

    const resolveMount = () => {
      if (cancelled) return
      setState((s) => ({
        ...s,
        lines: s.lines.map((line) =>
          line.kind === 'mount' && !line.resolved ? { ...line, resolved: true } : line,
        ),
      }))
    }

    const run = async () => {
      await wait(360) // let the window settle before the first character lands

      for (const step of steps) {
        if (cancelled) return

        switch (step.type) {
          case 'command':
            append({ kind: 'command', text: step.content, typed: true })
            await wait(step.content.length * TYPE_SPEED + 120)
            break

          case 'ok':
            append({ kind: 'ok', text: step.content })
            await wait(BURST)
            break

          case 'mount':
            append({ kind: 'mount', text: step.content, resolved: reduced })
            await wait(step.ms)
            resolveMount()
            await wait(BURST)
            break

          case 'output':
            append({ kind: 'output', text: step.content, cls: step.cls })
            await wait(BURST)
            break

          case 'wake':
            if (!cancelled) setState((s) => ({ ...s, awake: true }))
            break

          case 'settle':
            await wait(step.ms)
            break

          case 'prompt':
            if (!cancelled) setState((s) => ({ ...s, complete: true }))
            return
        }
      }

      if (!cancelled) setState((s) => ({ ...s, complete: true }))
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [steps, reduced, runId])

  const reset = () => {
    setState({ lines: [], complete: false, reduced, awake: false })
    setRunId((id) => id + 1)
  }

  return { state, reset }
}
