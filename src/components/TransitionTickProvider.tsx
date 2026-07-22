import type { ReactNode } from 'react'
import { TransitionTickContext } from '../hooks/useTransitionTick'

export function TransitionTickProvider({ tick, children }: { tick: string; children: ReactNode }) {
  return <TransitionTickContext.Provider value={tick}>{children}</TransitionTickContext.Provider>
}
