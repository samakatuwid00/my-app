// The live prompt. It is a router as well as a gate: `projects` morphs straight
// into /projects rather than dropping the visitor on /about and making them
// navigate again. The routing table itself lives in `promptRouter.ts`.
import { useState } from 'react'
import { resolvePrompt } from './promptRouter'
import type { PromptResult } from './promptRouter'

type TerminalPromptProps = {
  onSubmit: (result: PromptResult) => void
  reduced?: boolean
}

export function TerminalPrompt({ onSubmit, reduced = false }: TerminalPromptProps) {
  const [value, setValue] = useState('')

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Enter') return
    const result = resolvePrompt(value)
    if (result.kind === 'echo') setValue('')
    onSubmit(result)
  }

  // The caret has to sit immediately after what has been typed, not at the far
  // end of a flexed input. So the input is transparent and stretched across the
  // row for hit area and IME, and a mirror span underneath paints the text and
  // the block caret at the right x.
  return (
    <div className="prompt-row relative flex items-center pt-2 text-[13px]">
      <span className="shrink-0 text-text-2">roger@portfolio</span>
      <span className="shrink-0 text-accent">:~$&nbsp;</span>

      <span className="pointer-events-none relative flex min-w-0 flex-1 items-center whitespace-pre">
        <span className="truncate text-text">{value}</span>
        <span
          className="ml-px block h-[1.05em] w-[0.6em] shrink-0 rounded-xs bg-accent"
          style={{ animation: reduced ? 'none' : 'cursor-blink 1s step-end infinite' }}
          aria-hidden="true"
        />
      </span>

      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Enter a route"
        autoFocus
        autoComplete="off"
        spellCheck={false}
        className="absolute inset-0 w-full bg-transparent text-[13px] text-transparent caret-transparent outline-none"
      />
    </div>
  )
}
