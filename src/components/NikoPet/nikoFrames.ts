/**
 * Frame lookup, now generated from `engine.ts` rather than hand-drawn.
 *
 * The nine hand-drawn ASCII frames this file used to hold were an approximation
 * of the spec while the spec was still a document. The spec is code now
 * (`docs/niko-frames.js` -> `engine.ts`, 19 movements), so these are derived:
 * `NIKO_FRAMES[key]` is the first frame of the movement of the same name,
 * rendered as plain text on the 21 × 9 canvas.
 *
 * Kept because the names are the shared vocabulary between the intro script,
 * the event map and the tests — not because anything still needs a static frame.
 */
import { ANIMATIONS, CANVAS_H, CANVAS_W, compose, toText } from './engine'
import type { AnimationName } from './engine'

export { SPRITE_W, SPRITE_ROWS } from './engine'

/** The movements the site scripts by name. A subset of `AnimationName`. */
export type FrameKey = Extract<
  AnimationName,
  'idle' | 'blink' | 'look' | 'walk' | 'wave' | 'think' | 'happy' | 'sleep' | 'poof'
>

const FRAME_KEYS: FrameKey[] = [
  'idle',
  'blink',
  'look',
  'walk',
  'wave',
  'think',
  'happy',
  'sleep',
  'poof',
]

/** First frame of each named movement, as canvas rows. */
export const NIKO_FRAMES = Object.fromEntries(
  FRAME_KEYS.map((key) => [
    key,
    toText(compose(ANIMATIONS[key].frames[0], { w: CANVAS_W, h: CANVAS_H, name: '' })).split('\n'),
  ]),
) as Record<FrameKey, string[]>

/** Ordered idle loop. The engine's `AMBIENT` is the live one; this is the subset
 *  a call site can reference by `FrameKey`. */
export const IDLE_SEQUENCE: FrameKey[] = [
  'idle',
  'blink',
  'look',
  'idle',
  'think',
  'happy',
  'idle',
  'sleep',
  'blink',
  'idle',
]
