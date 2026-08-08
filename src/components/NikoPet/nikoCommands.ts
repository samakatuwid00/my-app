import type { NikoEventName } from './engine'

/**
 * The command bar's Niko easter eggs. They are resolved before the question
 * reaches the assistant, so `pet niko` never costs a model call.
 *
 * Each returns the event to fire and the line the drawer echoes back.
 */
export type NikoCommand = { event: NikoEventName; reply: string }

const COMMANDS: Record<string, NikoCommand> = {
  niko: { event: 'hop', reply: 'niko: here. click him to pet, double-click to feed.' },
  'pet niko': { event: 'pet', reply: 'niko: ♥' },
  'feed niko': { event: 'snack', reply: 'niko: ate the snack. no notes.' },
  'niko dance': { event: 'dance', reply: 'niko: dancing.' },
}

export function resolveNikoCommand(question: string): NikoCommand | null {
  return COMMANDS[question.trim().toLowerCase()] ?? null
}
