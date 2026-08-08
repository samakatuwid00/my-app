import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { NikoContext } from './NikoContext'
import type { NikoContextValue, NikoSlotName } from './NikoContext'
import { NikoStage } from './NikoStage'
import { AMBIENT, ANIMATIONS, EVENTS } from './engine'
import type { AnimationName, NikoEventName } from './engine'

/**
 * The clock for the whole pet. One timer lives here and steps frames at each
 * animation's own fps — every Niko on the page reads the same frame, so the
 * intro rail sprite and the docked sprite are literally the same performance.
 *
 * Priority is held > queued > ambient. Held movements come from the intro and
 * the morph, which are scripted; queued movements come from site events; the
 * ambient loop free-runs when neither has anything to say.
 */

/** Deliberately shallow. Two reactions in flight is a pet; ten is a backlog. */
const MAX_QUEUE = 2
/** How long a one-shot's last frame sits before the ambient loop takes over. */
const HOLD_MS = 1400
/** Quiet for this long and he sleeps. */
const QUIET_MS = 3 * 60 * 1000
const NIGHT_START = 22
const NIGHT_END = 7

/**
 * Two opt-out flags, both honoured, neither required. Nothing in the UI sets
 * either one — Niko is the brand mark and has no dismiss control — so these are
 * the escape hatch for anyone who wants him gone:
 *   `niko-hidden`     session-scoped
 *   `niko-pet-shown`  repurposed. It used to be the opt-IN gate, so its meaning
 *                     is inverted — present and 'true' means "keep him off".
 *                     Kept rather than renamed so anyone who set it deliberately
 *                     is not surprised twice.
 */
const HIDE_KEY = 'niko-hidden'
const LEGACY_KEY = 'niko-pet-shown'

/** Below lg the rail is off-canvas, so the dock is not on screen. */
const COMPACT_QUERY = '(max-width: 1023px)'

function readHidden() {
  if (typeof window === 'undefined') return false
  if (window.location.search.includes('intro-debug=1')) {
    window.sessionStorage.removeItem(HIDE_KEY)
    window.localStorage.removeItem(LEGACY_KEY)
    return false
  }
  return (
    window.sessionStorage.getItem(HIDE_KEY) === 'true' ||
    window.localStorage.getItem(LEGACY_KEY) === 'true'
  )
}

function isNight(now = new Date()) {
  const hour = now.getHours()
  return hour >= NIGHT_START || hour < NIGHT_END
}

type Playback = {
  move: AnimationName
  index: number
  /** Frames emitted so far, against `total`. */
  played: number
  /** `Infinity` while held. */
  total: number
  /** Came from an event queue rather than the ambient loop. */
  fromEvent: boolean
}

function begin(move: AnimationName, fromEvent: boolean, held = false): Playback {
  const animation = ANIMATIONS[move]
  // Looping movements get two cycles before the next one is picked, matching
  // the spec player. One-shots get exactly one.
  const total = held ? Infinity : animation.frames.length * (animation.once ? 1 : 2)
  return { move, index: 0, played: 0, total, fromEvent }
}

type NikoProviderProps = PropsWithChildren<{
  /** Where he starts. A returning visitor skips the intro, so he starts docked. */
  initialSlot?: NikoSlotName
  /** A returning visitor also skips the `$ niko --wake` poof. */
  initialVisible?: boolean
}>

export function NikoProvider({
  children,
  initialSlot = 'intro',
  initialVisible = false,
}: NikoProviderProps) {
  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const [current, setCurrent] = useState<{ move: AnimationName; index: number }>({
    move: 'idle',
    index: 0,
  })

  const queueRef = useRef<AnimationName[]>([])
  const heldRef = useRef<AnimationName | null>(null)
  const ambientRef = useRef(0)
  // Seeded on the first tick rather than at render — reading the clock during
  // render is impure, and 0 already reads as "nothing has happened yet".
  const lastEventRef = useRef(0)
  // Set when a fresh event should cut an ambient movement short rather than
  // waiting for it to finish. Reactions that arrive two seconds late read as a
  // bug, not as patience.
  const cutRef = useRef(false)
  const playRef = useRef<Playback>(begin('idle', false))

  const enqueue = useCallback((moves: AnimationName[]) => {
    if (!moves.length) return
    lastEventRef.current = Date.now()
    const room = MAX_QUEUE - queueRef.current.length
    if (room <= 0) return // drop, don't backlog
    queueRef.current.push(...moves.slice(0, room))
    if (!playRef.current.fromEvent) cutRef.current = true
  }, [])

  const event = useCallback(
    (name: NikoEventName) => {
      const moves = EVENTS[name]
      if (moves) enqueue([...moves])
    },
    [enqueue],
  )

  const play = useCallback((...moves: AnimationName[]) => enqueue(moves), [enqueue])

  const hold = useCallback((move: AnimationName | null) => {
    heldRef.current = move
    if (move) lastEventRef.current = Date.now()
  }, [])

  /* ---------- placement ---------- */

  // Slots are elements, not React nodes: the sprite itself never remounts, it
  // just retargets. That is what lets him survive the intro -> app morph. Held
  // in state rather than a ref because the stage has to re-render — and
  // re-measure — the moment a slot mounts or leaves.
  const [slots, setSlots] = useState<Partial<Record<NikoSlotName, HTMLElement>>>({})
  const [placement, setPlacement] = useState<{ slot: NikoSlotName; travelMs: number }>({
    slot: initialSlot,
    travelMs: 0,
  })
  const [visible, setVisible] = useState(initialVisible)
  const [hidden] = useState(readHidden)
  const [compact, setCompact] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(COMPACT_QUERY).matches,
  )

  useEffect(() => {
    const query = window.matchMedia(COMPACT_QUERY)
    const sync = () => setCompact(query.matches)
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  const registerSlot = useCallback((name: NikoSlotName, element: HTMLElement | null) => {
    setSlots((current) => {
      if (current[name] === (element ?? undefined)) return current
      const next = { ...current }
      if (element) next[name] = element
      else delete next[name]
      return next
    })
  }, [])

  const place = useCallback((name: NikoSlotName, travelMs = 0) => {
    setPlacement({ slot: name, travelMs })
  }, [])

  const show = useCallback((next: boolean) => setVisible(next), [])

  useEffect(() => {
    if (reduced) return

    let timer = 0
    let cancelled = false
    if (lastEventRef.current === 0) lastEventRef.current = Date.now()

    function pickNext(): Playback {
      const queued = queueRef.current.shift()
      if (queued) return begin(queued, true)
      if (isNight() || Date.now() - lastEventRef.current > QUIET_MS) return begin('sleep', false)
      const move = AMBIENT[ambientRef.current % AMBIENT.length]
      ambientRef.current += 1
      return begin(move, false)
    }

    function schedule(ms: number, next: () => void) {
      timer = window.setTimeout(() => {
        if (!cancelled) next()
      }, ms)
    }

    function tick() {
      const playback = playRef.current
      const animation = ANIMATIONS[playback.move]
      setCurrent({ move: playback.move, index: playback.index })

      schedule(1000 / animation.fps, () => {
        const p = playRef.current
        p.played += 1

        // A held movement takes over the moment it is set, and releases back to
        // the queue the moment it is cleared.
        const held = heldRef.current
        if (held && (held !== p.move || p.total !== Infinity)) {
          playRef.current = begin(held, true, true)
          tick()
          return
        }
        if (!held && p.total === Infinity) {
          playRef.current = pickNext()
          tick()
          return
        }
        if (held) {
          p.index = (p.index + 1) % animation.frames.length
          tick()
          return
        }

        if (cutRef.current) {
          cutRef.current = false
          playRef.current = pickNext()
          tick()
          return
        }

        if (p.played >= p.total) {
          // A one-shot with nothing queued behind it holds its last frame —
          // the pop of `happy` should land and stay landed for a beat.
          if (animation.once && !queueRef.current.length) {
            p.index = animation.frames.length - 1
            setCurrent({ move: p.move, index: p.index })
            schedule(HOLD_MS, () => {
              playRef.current = pickNext()
              tick()
            })
            return
          }
          playRef.current = pickNext()
          tick()
          return
        }

        p.index = (p.index + 1) % animation.frames.length
        tick()
      })
    }

    tick()

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [reduced])

  // `dock` is a request for "his home". Below lg the rail is an off-canvas
  // drawer, so home is the window chrome — resolved here so nothing else has to
  // know the breakpoint, and a resize simply re-targets him.
  const resolvedSlot: NikoSlotName =
    placement.slot === 'dock' && compact ? 'navbar' : placement.slot

  const value = useMemo<NikoContextValue>(() => {
    const animation = ANIMATIONS[current.move]
    const index = Math.min(current.index, animation.frames.length - 1)
    return {
      move: current.move,
      index,
      frame: animation.frames[index],
      reduced,
      event,
      play,
      hold,
      registerSlot,
      place,
      slot: resolvedSlot,
      travelMs: placement.travelMs,
      visible: visible && !hidden,
      show,
    }
  }, [
    current,
    reduced,
    event,
    play,
    hold,
    registerSlot,
    place,
    resolvedSlot,
    placement.travelMs,
    visible,
    hidden,
    show,
  ])

  // Resolved here rather than inside the stage so the stage stays a pure
  // "paint this frame at this rect" component.
  const anchor = slots[resolvedSlot] ?? null

  return (
    <NikoContext.Provider value={value}>
      {children}
      <NikoStage
        anchor={anchor}
        slot={resolvedSlot}
        travelMs={placement.travelMs}
        visible={visible && !hidden}
        frame={value.frame}
        move={value.move}
        reduced={reduced}
        onPet={() => event('pet')}
        onFeed={() => event('snack')}
      />
    </NikoContext.Provider>
  )
}
