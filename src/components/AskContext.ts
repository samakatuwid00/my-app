import { createContext } from 'react'
import type { RefObject } from 'react'
import type { AskMessage } from '../types/portfolio'

export type AskState = 'idle' | 'thinking'

export type AskContextValue = {
  messages: AskMessage[]
  state: AskState
  isOpen: boolean
  inputRef: RefObject<HTMLInputElement | null>
  ask: (question: string) => void
  close: () => void
  reset: () => void
}

export const AskContext = createContext<AskContextValue | null>(null)
