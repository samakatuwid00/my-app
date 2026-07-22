import { useContext } from 'react'
import { AskContext } from '../components/AskContext'

export function useAsk() {
  const value = useContext(AskContext)
  if (!value) throw new Error('useAsk must be used inside AskProvider')
  return value
}
