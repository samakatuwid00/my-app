import { createContext, useContext } from 'react'

// Changes whenever the theme flips or the route changes. Content blocks read it
// to run their own dissolve; chrome, rail and footer ignore it and stay calm.
export const TransitionTickContext = createContext('')

export function useTransitionTick() {
  return useContext(TransitionTickContext)
}
