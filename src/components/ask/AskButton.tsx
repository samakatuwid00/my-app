import { useEffect, useRef } from 'react'
import type { FormEvent } from 'react'
import { suggestions } from '../../data/ask'
import { useAsk } from '../../hooks/useAsk'
import { Niko } from '../ui/Niko'

const PANEL_ID = 'ask-panel'

// The suggestions are stored lower case (they double as the greeting's hint);
// the chips read in sentence case, as in the mockup.
const chips = suggestions.map((text) => text.charAt(0).toUpperCase() + text.slice(1))

// A non-modal dialog on the shared AskProvider: the page stays usable behind it.
// Escape (handled by the provider) and a click outside both close it.
export function AskButton() {
  const { messages, state, isOpen, inputRef, ask, open, close } = useAsk()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const wasOpen = useRef(isOpen)

  useEffect(() => {
    if (!isOpen) return
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node
      if (panelRef.current?.contains(target) || buttonRef.current?.contains(target)) return
      close()
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [isOpen, close])

  // Closing hands focus back to the button, unless the visitor has already
  // moved it somewhere else (an outside click on a link or a field).
  useEffect(() => {
    if (wasOpen.current && !isOpen) {
      const active = document.activeElement
      if (!active || active === document.body || panelRef.current?.contains(active)) buttonRef.current?.focus()
    }
    wasOpen.current = isOpen
  }, [isOpen])

  // Bring the newest exchange into view from its question down, so a long
  // answer is read from its first line rather than landing on its last.
  useEffect(() => {
    const log = logRef.current
    if (!log) return
    const questions = log.querySelectorAll<HTMLElement>('.turn.user')
    const question = questions[questions.length - 1]
    if (question) log.scrollTop = question.offsetTop
  }, [messages, state])

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const input = inputRef.current
    if (!input || state === 'thinking' || !input.value.trim()) return
    ask(input.value)
    input.value = ''
  }

  return (
    <>
      <button
        ref={buttonRef}
        className="btn ask"
        type="button"
        aria-expanded={isOpen}
        aria-controls={PANEL_ID}
        onClick={() => (isOpen ? close() : open())}
      >
        <Niko />
        <span className="label">Ask about my work</span>
      </button>
      <div
        ref={panelRef}
        className={`ask-panel dark${isOpen ? ' open' : ''}`}
        id={PANEL_ID}
        role="dialog"
        aria-label="Ask about my work"
      >
        <div className="h3">Ask Niko</div>
        <p>Answers from this site's content: projects, stack, availability.</p>
        <div className="chips">
          {chips.map((chip) => (
            <button key={chip} type="button" onClick={() => ask(chip)}>
              {chip}
            </button>
          ))}
        </div>
        {/* Always mounted, so screen readers already track the live region when
            the first answer lands; it takes no space while empty. */}
        <div ref={logRef} className="ask-log" role="log" aria-live="polite">
          {messages.map((message) => (
            <div key={message.id} className={`turn ${message.role}`}>
              <span className="ui">{message.role === 'user' ? 'You' : 'Niko'}</span>
              <p>{message.text}</p>
            </div>
          ))}
          {state === 'thinking' && (
            <div className="turn assistant thinking">
              <span className="ui">Niko</span>
              <p>Thinking<span aria-hidden="true">...</span></p>
            </div>
          )}
        </div>
        <form className="ask-form" onSubmit={onSubmit}>
          <span className="field">
            <input ref={inputRef} type="text" placeholder="Type a question" aria-label="Your question" autoComplete="off" />
          </span>
        </form>
      </div>
    </>
  )
}
