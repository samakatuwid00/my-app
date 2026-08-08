import { createContext } from 'react'
import type { AnimationName, Frame, NikoEventName } from './engine'

/**
 * Where Niko can stand. He is one element for the life of the page, so a
 * "placement" is never a remount — it is a target rect the fixed sprite tweens
 * to. `intro` is the boot-log rail, `dock` his permanent SideRail home, and
 * `navbar` is that home below `lg`, where the rail is an off-canvas drawer and
 * the window chrome is the only bar always on screen.
 */
export type NikoSlotName = 'intro' | 'dock' | 'navbar'

export type NikoContextValue = {
  /** The movement playing right now. */
  move: AnimationName
  /** Index into that movement's frame list. */
  index: number
  /** The frame to paint. */
  frame: Frame
  /** Honouring `prefers-reduced-motion` — one static frame, no timers. */
  reduced: boolean

  /** Queue the movements a site event maps to. Drops when the queue is full. */
  event: (name: NikoEventName) => void
  /** Queue explicit movements. Same drop-don't-backlog rule as `event`. */
  play: (...moves: AnimationName[]) => void
  /**
   * Pin a looping movement until `hold(null)` releases it. The intro and the
   * morph drive Niko directly rather than through the queue, because their
   * beats are scripted against the boot log and the FLIP timeline.
   */
  hold: (move: AnimationName | null) => void

  /** Slots publish their element here; the stage measures whichever is active. */
  registerSlot: (name: NikoSlotName, element: HTMLElement | null) => void
  /** Move him to a slot. `travelMs` > 0 walks; 0 cuts. */
  place: (name: NikoSlotName, travelMs?: number) => void
  slot: NikoSlotName
  travelMs: number
  /** He does not exist until `$ niko --wake` poofs him in. */
  visible: boolean
  show: (visible: boolean) => void
}

export const NikoContext = createContext<NikoContextValue | null>(null)
