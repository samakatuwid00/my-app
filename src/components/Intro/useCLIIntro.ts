import { useEffect, useState } from 'react'

export type Step =
  | { type: 'command'; content: string }
  | { type: 'output'; content: string; cls?: string }
  | { type: 'separator' }
  | { type: 'prompt' }
  | { type: 'settle'; ms: number }

export type Line = {
  id: string
  html: string
  cls?: string
  animated?: boolean
}

export type CLIState = {
  lines: Line[]
  complete: boolean
  reduced: boolean
}

// Tightened "hacking animation" sequence — fewer, punchier lines.
// Total ~5s at 28ms/char. ANSI-style green-on-dark via CSS vars.
const DEFAULT_STEPS: Step[] = [
  { type: 'command', content: '$ whoami' },
  { type: 'settle', ms: 200 },
  { type: 'output', content: '> roger@portfolio // full-stack developer', cls: 'accent' },
  { type: 'settle', ms: 160 },
  { type: 'command', content: '$ cat portfolio.json' },
  { type: 'settle', ms: 200 },
  { type: 'output', content: '{' },
  { type: 'output', content: '  "name": "Roger Abay Jr.",' },
  { type: 'output', content: '  "title": "Full-Stack Developer",' },
  { type: 'output', content: '  "location": "Camarines Sur, PH",' },
  { type: 'output', content: '  "sector": "Government / Private",' },
  { type: 'output', content: '  "stack": ["Laravel","React","PostgreSQL"],' },
  { type: 'output', content: '  "availability": "open to remote / Manila roles"' },
  { type: 'output', content: '}' },
  { type: 'settle', ms: 240 },
  { type: 'command', content: '$ ls ~/projects' },
  { type: 'settle', ms: 160 },
  { type: 'output', content: 'irims-v  eduleave  library  eurasian  lrmis  portfolio' },
  { type: 'settle', ms: 200 },
  { type: 'command', content: '$ tree irims-v -L 2' },
  { type: 'settle', ms: 160 },
  { type: 'output', content: 'irims-v' },
  { type: 'output', content: '+-- app' },
  { type: 'output', content: '|   +-- Http' },
  { type: 'output', content: '|   +-- Models' },
  { type: 'output', content: '+-- resources' },
  { type: 'output', content: '|   +-- js' },
  { type: 'output', content: '|       +-- Pages' },
  { type: 'output', content: '+-- routes' },
  { type: 'settle', ms: 200 },
  { type: 'command', content: '$ whoami' },
  { type: 'settle', ms: 180 },
  { type: 'output', content: 'Full-Stack Developer | DepEd Region V', cls: 'accent' },
  { type: 'settle', ms: 140 },
  { type: 'separator' },
  { type: 'output', content: '> ready. enter portfolio to begin.', cls: 'dim' },
  { type: 'prompt' },
]

const TYPE_SPEED = 28
const SETTLE_AFTER_COMMAND = 160

// Builds the colored command line. `at` = cyan user@host, `ps` = dim prompt symbol
function promptHtml(content: string) {
  return `<span class="at">roger@portfolio</span><span class="ps">:~$ </span>${content}`
}

export function useCLIIntro(steps: Step[] = DEFAULT_STEPS) {
  const initialReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [state, setState] = useState<CLIState>({
    lines: [],
    complete: false,
    reduced: initialReduced,
  })

  const { reduced } = state

  useEffect(() => {
    let cancelled = false
    let counter = 0

    const wait = (ms: number) =>
      new Promise<void>(r => setTimeout(r, reduced ? 0 : ms))

    const appendLine = (line: Omit<Line, 'id'>) => {
      if (cancelled) return
      const id = `row-${counter++}`
      setState(s => ({ ...s, lines: [...s.lines, { id, ...line }] }))
    }

    const run = async () => {
      await wait(420) // let the window-drop CSS animation start

      for (const step of steps) {
        if (cancelled) return
        switch (step.type) {
          case 'command':
            appendLine({ html: promptHtml(step.content), cls: 'prompt' })
            await wait(SETTLE_AFTER_COMMAND + step.content.length * TYPE_SPEED)
            break

          case 'output': {
            // Colored outputs (accent/dim) reveal instantly; plain output
            // reveals char-by-char via AnimatedLine for the typewriter effect.
            const isColored = Boolean(step.cls)
            appendLine({
              html: step.content,
              cls: step.cls,
              animated: !isColored,
            })
            // Pace by char length so the AnimatedLine typing (15ms/char) stays synced
            await wait(isColored ? 200 : 5 + step.content.length * 15)
            break
          }

          case 'separator':
            appendLine({ html: '', cls: '' })
            await wait(180)
            break

          case 'prompt':
            appendLine({ html: '', cls: 'prompt-input' })
            setState(s => ({ ...s, complete: true }))
            return

          case 'settle':
            await wait(step.ms)
            break
        }
      }
      if (!cancelled) setState(s => ({ ...s, complete: true }))
    }

    run()
    return () => { cancelled = true }
  }, [steps, reduced])

  const reset = () => setState({ lines: [], complete: false, reduced: false })

  return { state, reset }
}
