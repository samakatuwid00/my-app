import type { AskTurn } from '../types/portfolio'

const ASK_ENDPOINT = '/api/ask'

// Only the tail of the transcript is sent — the function caps history anyway,
// and a long client-side conversation should not grow the request unbounded.
const HISTORY_LIMIT = 6

export async function askRemote(turns: AskTurn[]): Promise<string> {
  const response = await fetch(ASK_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: turns.slice(-HISTORY_LIMIT) }),
  })

  const payload = (await response.json().catch(() => null)) as { answer?: string; error?: string } | null

  if (!response.ok || !payload?.answer) {
    throw new Error(payload?.error ?? 'The assistant is unavailable right now.')
  }

  return payload.answer
}
