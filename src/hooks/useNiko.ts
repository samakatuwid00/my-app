import { useContext } from 'react'
import { NikoContext } from '../components/NikoPet/NikoContext'
import type { NikoContextValue } from '../components/NikoPet/NikoContext'

/**
 * Returns null outside a `NikoProvider` rather than throwing: call sites wire
 * site events opportunistically and must not care whether the pet is mounted.
 */
export function useNiko(): NikoContextValue | null {
  return useContext(NikoContext)
}
