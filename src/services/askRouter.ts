import { intents } from '../data/ask'

export function resolveLocally(question: string): string | null {
  const text = question.trim().toLowerCase()
  if (!text) return null

  const intent = intents.find((candidate) => candidate.patterns.some((pattern) => pattern.test(text)))
  return intent ? intent.answer() : null
}
