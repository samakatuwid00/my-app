import { useLayoutEffect, useState } from 'react'
import { NikoSprite } from './NikoSprite'
import { ANIMATIONS, CANVAS_W } from './engine'
import type { AnimationName, Frame } from './engine'
import type { NikoSlotName } from './NikoContext'

/**
 * The single Niko element for the whole page.
 *
 * He is `position: fixed` and centred on whichever slot is active, so moving
 * him from the intro's boot-log rail to the SideRail dock is one transform
 * tween on one element that never unmounts — the requirement the morph is built
 * around. Slots are empty divs that only reserve space; nothing about the
 * layout knows this component exists.
 *
 * Four nested elements, one transform each, so none of them fight:
 *   travel  translate3d(x, y)          — the tween between slots
 *   roam    translateX                 — wandering inside the navbar strip
 *   fit     translate(-50%,-50%) scale — centring and the 13px -> 11.5px change
 *   bob     translateY keyframe        — the walk's small vertical rock
 * Only `transform` and `opacity` ever animate.
 */

// 4.5px in the navbar is not a typo. The chrome bar is 44px tall and the sprite
// is 8 rows at 1.05 line-height, so anything larger overhangs the bar and lands
// on the content beneath it. At this size he reads as a pixel mark beside the
// window controls, which is what a chrome-height pet can be.
const SLOT_SIZE: Record<NikoSlotName, number> = { intro: 13, dock: 11.5, navbar: 4.5 }
const SLOT_TAG: Record<NikoSlotName, boolean> = { intro: false, dock: true, navbar: false }
const SLOT_VARIANT: Record<NikoSlotName, string> = {
  intro: 'rail',
  dock: 'dock',
  navbar: 'navbar',
}

/** Painted once at this size; every slot is a scale of it, so nothing reflows. */
const BASE_SIZE = 13

const TIP_KEY = 'niko-tip-seen'

/** JetBrains Mono's advance width. The canvas is `CANVAS_W` of these. */
const CHAR_RATIO = 0.6
/** One walk is 4 frames at 4fps; the stroll should land as the legs stop. */
const ROAM_MS = 1000

/**
 * A repeatable stand-in for `Math.random()`, in [-1, 1].
 *
 * It has to be pure — this is read during render, and a real random number
 * there would give a different answer on every re-render, which at 8fps means
 * he would jitter rather than walk. Keyed on the walk count, so each walk gets
 * one destination and holds it.
 */
function drift(step: number) {
  const n = Math.sin(step * 12.9898 + 78.233) * 43758.5453
  const raw = (n - Math.floor(n)) * 2 - 1
  // Square-rooted toward the ends. Raw values cluster near zero, and half his
  // walks landing within a few pixels of where he started reads as a twitch
  // rather than a stroll.
  return Math.sign(raw) * Math.sqrt(Math.abs(raw))
}

type Rect = { left: number; top: number; width: number; height: number }

type NikoStageProps = {
  anchor: HTMLElement | null
  slot: NikoSlotName
  travelMs: number
  visible: boolean
  frame: Frame
  move: AnimationName
  reduced: boolean
  onPet: () => void
  onFeed: () => void
}

export function NikoStage({
  anchor,
  slot,
  travelMs,
  visible,
  frame,
  move,
  reduced,
  onPet,
  onFeed,
}: NikoStageProps) {
  const [rect, setRect] = useState<Rect | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [tipSeen, setTipSeen] = useState(
    () => typeof window === 'undefined' || window.sessionStorage.getItem(TIP_KEY) === 'true',
  )

  // Each `walk` earns him one new spot in the strip. Counted during render
  // against the previous move rather than in an effect, so the destination is
  // decided on the same frame the legs start moving.
  const [walkCount, setWalkCount] = useState(0)
  const [previousMove, setPreviousMove] = useState(move)
  if (previousMove !== move) {
    setPreviousMove(move)
    if (move === 'walk') setWalkCount((count) => count + 1)
  }

  // Measure on every anchor change and keep tracking it — the rail collapses,
  // the drawer opens, the window resizes, the pane scrolls.
  useLayoutEffect(() => {
    if (!anchor) return
    const measure = () => {
      const box = anchor.getBoundingClientRect()
      setRect({ left: box.left, top: box.top, width: box.width, height: box.height })
    }
    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(anchor)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, true)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure, true)
    }
  }, [anchor])

  function markTipSeen() {
    window.sessionStorage.setItem(TIP_KEY, 'true')
    setTipSeen(true)
    setIsHovered(false)
  }

  if (!anchor || !rect) return null

  const scale = SLOT_SIZE[slot] / BASE_SIZE
  const travelling = !reduced && travelMs > 0
  // Near-linear on purpose. The window's FLIP uses the spec's front-loaded
  // curve, which is right for a window snapping into place and wrong for a
  // creature crossing a room — on that curve he covers half the distance in the
  // first tenth of the walk and then crawls.
  const ease = 'cubic-bezier(.45,.05,.55,.95)'

  // The navbar slot is a strip, not a point: he walks along it and stops
  // wherever the last walk took him, never past its ends. Every other slot is a
  // fixed home, and roaming is suppressed mid-morph so the walk in from the
  // intro is one clean line rather than a line plus a wobble.
  const spriteWidth = CANVAS_W * SLOT_SIZE[slot] * CHAR_RATIO
  const roamRange = Math.max(0, (rect.width - spriteWidth) / 2)
  const roamX =
    slot === 'navbar' && !travelling && !reduced ? drift(walkCount) * roamRange : 0

  // z-110 puts him above the intro overlay (z-100), which is opaque: any lower
  // and he wakes up behind it and is never seen.
  return (
    <div
      aria-hidden={!visible}
      className="pointer-events-none fixed left-0 top-0 z-[110]"
      style={{
        transform: `translate3d(${rect.left + rect.width / 2}px, ${rect.top + rect.height / 2}px, 0)`,
        transition: travelling ? `transform ${travelMs}ms ${ease}` : 'none',
        willChange: 'transform',
      }}
      data-niko-slot={slot}
      data-niko-visible={visible}
    >
      <div
        style={{
          transform: `translateX(${roamX}px)`,
          transition: reduced ? 'none' : `transform ${ROAM_MS}ms ${ease}`,
          willChange: 'transform',
        }}
      >
      <div
        className="relative"
        style={{
          transform: `translate(-50%, -50%) scale(${scale})`,
          transition: reduced ? 'none' : `transform ${travelMs || 260}ms ${ease}, opacity 260ms ease`,
          opacity: visible ? 1 : 0,
        }}
      >
        <div
          className={`niko-bob ${travelling ? 'niko-bob--walking' : ''} ${
            visible ? 'pointer-events-auto' : ''
          }`}
          onClick={() => {
            onPet()
            if (!tipSeen) markTipSeen()
          }}
          onDoubleClick={onFeed}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* The tag is a label for a place he has arrived at, so it waits for
              him to land rather than trailing him across the window. */}
          <NikoSprite
            frame={frame}
            showTag={SLOT_TAG[slot] && !travelling}
            fontSize={BASE_SIZE}
            rows={slot === 'navbar' ? 8 : undefined}
            label={`Niko, ${ANIMATIONS[move].desc.split('—')[0].trim()}`}
            move={move}
            className={`niko-pet--${SLOT_VARIANT[slot]} cursor-pointer`}
          />
        </div>

        {/* Both of these ride inside the scaled box so they stay anchored to the
            sprite's corners, and both undo that scale so they render at their
            own size — at the navbar's 0.35 a 16px control would be 5px. */}
        {visible && isHovered && !tipSeen && (
          <p
            className="absolute left-1/2 top-full whitespace-nowrap rounded-panel border border-line bg-panel px-2 py-1 text-[10px] text-text-2"
            style={{ transform: `translateX(-50%) scale(${1 / scale})`, transformOrigin: 'top center' }}
          >
            click to pet
          </p>
        )}
      </div>
      </div>
    </div>
  )
}
