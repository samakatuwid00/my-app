import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { suggestions } from '../data/ask'
import { useAsk } from '../hooks/useAsk'

export function AskDrawer() {
  const { messages, state, isOpen, ask } = useAsk()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pane = scrollRef.current
    if (pane) pane.scrollTop = pane.scrollHeight
  }, [messages, state])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute inset-x-0 bottom-0 z-30 flex max-h-[65%] flex-col border-t border-line bg-panel"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <div className="flex shrink-0 items-center gap-3 border-b border-line px-4 py-2 lg:px-6">
            <p className="text-[11px] uppercase tracking-[0.08em] text-text-3">Assistant</p>
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
          </div>

          <div
            ref={scrollRef}
            role="log"
            aria-live="polite"
            aria-label="Assistant transcript"
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 lg:px-6"
          >
            {messages.length === 0 ? (
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => void ask(suggestion)}
                    className="rounded-panel border border-control px-3 py-1.5 text-[12px] text-text-2 transition-colors duration-200 hover:border-accent hover:text-accent"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {messages.map((message) =>
                  message.role === 'user' ? (
                    <p key={message.id} className="text-[13px] text-text">
                      <span aria-hidden="true" className="text-accent">
                        {'> '}
                      </span>
                      {message.text}
                    </p>
                  ) : (
                    <p
                      key={message.id}
                      className="prose-body max-w-[78ch] whitespace-pre-line text-[13px] leading-relaxed"
                    >
                      {message.text}
                    </p>
                  ),
                )}
              </div>
            )}

            {state === 'thinking' && (
              <p role="status" className="mt-3 text-[13px] text-text-3">
                thinking <span className="cursor-blink text-accent">▌</span>
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
