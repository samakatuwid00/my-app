import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { AskContext } from './AskContext'
import type { AskState } from './AskContext'
import { site } from '../data/site'
import { askRemote } from '../services/askApi'
import { resolveLocally } from '../services/askRouter'
import { resolveNikoCommand } from './NikoPet/nikoCommands'
import { useNiko } from '../hooks/useNiko'
import type { AskMessage, AskRole } from '../types/portfolio'

const OFFLINE_REPLY =
  `That one is outside what I can answer here. ` +
  `Send it to ${site.email} or use the form at /contact and Roger will reply directly.`

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
}

export function AskProvider({ children }: PropsWithChildren) {
  const [messages, setMessages] = useState<AskMessage[]>([])
  const [state, setState] = useState<AskState>('idle')
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // `event` is a stable callback; the context value around it is not, so only
  // the callback may be captured here.
  const niko = useNiko()
  const nikoEvent = niko?.event

  // Mirrors `messages` so ask() can read the transcript without re-creating
  // itself on every turn — the command bar would lose its stable handler.
  const historyRef = useRef<AskMessage[]>([])
  const nextId = useRef(0)
  const busy = useRef(false)

  const push = useCallback((role: AskRole, text: string) => {
    const message = { id: nextId.current++, role, text }
    historyRef.current = [...historyRef.current, message]
    setMessages(historyRef.current)
  }, [])

  const ask = useCallback(
    async (question: string) => {
      const trimmed = question.trim()
      if (!trimmed || busy.current) return

      setIsOpen(true)
      push('user', trimmed)

      // The pet answers for himself before anything else runs, so `pet niko`
      // never costs a model call.
      const easterEgg = resolveNikoCommand(trimmed)
      if (easterEgg) {
        nikoEvent?.(easterEgg.event)
        push('assistant', easterEgg.reply)
        return
      }

      nikoEvent?.('think')

      const local = resolveLocally(trimmed)
      if (local) {
        push('assistant', local)
        nikoEvent?.('answered')
        return
      }

      busy.current = true
      setState('thinking')
      try {
        const turns = historyRef.current.map(({ role, text }) => ({ role, text }))
        push('assistant', await askRemote(turns))
        nikoEvent?.('answered')
      } catch {
        push('assistant', OFFLINE_REPLY)
        nikoEvent?.('error')
      } finally {
        busy.current = false
        setState('idle')
      }
    },
    [push, nikoEvent],
  )

  const close = useCallback(() => setIsOpen(false), [])

  const reset = useCallback(() => {
    historyRef.current = []
    setMessages([])
    setIsOpen(false)
  }, [])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
        return
      }

      const isShortcut = event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey
      // A project dialog owns the keyboard while it is open.
      if (!isShortcut || isTypingTarget(event.target) || document.querySelector('[role="dialog"]')) return

      event.preventDefault()
      inputRef.current?.focus()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const value = useMemo(
    () => ({ messages, state, isOpen, inputRef, ask, close, reset }),
    [messages, state, isOpen, ask, close, reset],
  )

  return <AskContext.Provider value={value}>{children}</AskContext.Provider>
}
