import { navItems } from '../../data/navigation'

/**
 * What the intro prompt does with a line of input. Split out from the component
 * so the routing table can be read by tests without mounting a terminal.
 */
export type PromptResult =
  /** Enter the site at this path. */
  | { kind: 'enter'; to: string }
  /** Unknown command — echo it and stay interactive. */
  | { kind: 'echo'; text: string }

/** The words that mean "just take me in". */
const ENTER_WORDS = new Set(['', 'enter', 'enter portfolio', 'yes', 'y'])

/** Every route the rail offers, addressable by its bare name or as a `cd`. */
export const ROUTE_WORDS: Record<string, string> = Object.fromEntries(
  navItems.flatMap(({ to }) => {
    const name = to.replace(/^\//, '')
    return [
      [name, to],
      [`cd ${name}`, to],
      [`cd /${name}`, to],
    ]
  }),
)

export function resolvePrompt(raw: string): PromptResult {
  const trimmed = raw.trim().toLowerCase()
  if (ENTER_WORDS.has(trimmed)) return { kind: 'enter', to: '/about' }
  const route = ROUTE_WORDS[trimmed]
  if (route) return { kind: 'enter', to: route }
  return { kind: 'echo', text: trimmed }
}
