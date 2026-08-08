// Niko — the site's brand mark, drawn as a terminal sprite.
//
// The movement itself lives in `engine.ts` (a port of the approved motion spec)
// and the clock lives in `NikoProvider`. This component is only placement: it
// picks the size and whether the name tag shows, then paints whatever frame the
// provider is on.
//
// He is on by default. `niko-hidden` is the opt-OUT flag; the old opt-IN flag
// (`niko-pet-shown`) is gone.
import { ANIMATIONS } from './engine'
import type { AnimationName } from './engine'
import { NikoSprite } from './NikoSprite'
import { useNiko } from '../../hooks/useNiko'

export type NikoVariant = 'float' | 'inline' | 'rail' | 'dock'

export type NikoPetProps = {
  /** 'rail' = intro terminal column, 'dock' = permanent SideRail home,
   *  'float' = mobile corner pet, 'inline' = in text flow. */
  variant?: NikoVariant
  /** Pin a movement instead of following the provider. */
  frame?: AnimationName
  /** Honour reduced-motion (one static frame, no timers). */
  reduced?: boolean
  /** Optional class for external styling. */
  className?: string
}

// 21ch at 11.5px is ~145px, which clears the 240px rail's 40px of padding.
const SIZE: Record<NikoVariant, number> = { rail: 13, dock: 11.5, float: 12, inline: 13 }
// Only the dock is a labelled home, so only the dock earns the ground+1 tag.
const TAGGED: Record<NikoVariant, boolean> = { rail: false, dock: true, float: false, inline: false }

export function NikoPet({
  variant = 'inline',
  frame,
  reduced = false,
  className = '',
}: NikoPetProps) {
  const niko = useNiko()
  const isStatic = reduced || niko?.reduced

  // A pinned movement still animates — it just ignores the queue. The provider's
  // frame index drives it so no second timer is ever created.
  const pinned = frame ? ANIMATIONS[frame] : null
  const painted = pinned
    ? pinned.frames[isStatic ? 0 : (niko?.index ?? 0) % pinned.frames.length]
    : isStatic
      ? ANIMATIONS.idle.frames[0]
      : (niko?.frame ?? ANIMATIONS.idle.frames[0])

  const move = frame ?? niko?.move ?? 'idle'

  return (
    <NikoSprite
      frame={painted}
      showTag={TAGGED[variant]}
      fontSize={SIZE[variant]}
      label={`Niko, ${ANIMATIONS[move].desc.split('—')[0].trim()}`}
      move={move}
      className={`niko-pet--${variant} ${className}`}
    />
  )
}
