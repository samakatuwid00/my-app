import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useElementSize } from '../hooks/useElementSize'
import { useTransitionTick } from '../hooks/useTransitionTick'

// Sized from the element it covers, so tiles stay square whatever the block's
// aspect ratio. Large blocks grow the tile rather than multiplying the count.
const MIN_TILE_PX = 24
const TILE_BUDGET = 400

const TILE_DURATION = 90
const SWEEP = 100
const JITTER = 30
const CLEANUP_MS = TILE_DURATION + SWEEP + JITTER + 40

function jitterFor(index: number) {
  return (((index * 2654435761) % 101) / 101) * JITTER
}

type PixelOverlayProps = {
  /**
   * Run from a caller-owned key instead of the route/theme tick. The intro
   * morph needs a curtain that is not tied to a navigation, but must be the
   * same tiles, colours and sweep as every route transition.
   */
  runKey?: string | null
  /**
   * Hold the tiles fully opaque this long before the sweep begins. The morph
   * uses it so the window can travel for 600ms without the boot log — or the
   * app arriving underneath it — ever showing through.
   */
  holdMs?: number
}

export function PixelOverlay({ runKey, holdMs = 0 }: PixelOverlayProps = {}) {
  const tick = useTransitionTick()
  const prefersReducedMotion = useReducedMotion()
  const [containerRef, { width, height }] = useElementSize<HTMLDivElement>()
  const [runId, setRunId] = useState<string | null>(null)
  const [previousTick, setPreviousTick] = useState(tick)
  const [previousRunKey, setPreviousRunKey] = useState<string | null>(null)

  const isDriven = runKey !== undefined
  const driverKey = runKey ?? null

  // Adjusted during render so the tiles paint on the same frame as the new
  // content — an effect would show one un-masked frame first. Same reasoning
  // for the caller-driven key, which covers the intro morph.
  if (!isDriven && previousTick !== tick) {
    setPreviousTick(tick)
    if (!prefersReducedMotion) setRunId(tick)
  }
  if (isDriven && previousRunKey !== driverKey) {
    setPreviousRunKey(driverKey)
    setRunId(prefersReducedMotion ? null : driverKey)
  }

  useEffect(() => {
    if (runId === null) return

    const timer = setTimeout(() => setRunId(null), CLEANUP_MS + holdMs)
    return () => clearTimeout(timer)
  }, [runId, holdMs])

  const tileSize = Math.max(MIN_TILE_PX, Math.sqrt((width * height) / TILE_BUDGET))
  const columns = Math.max(1, Math.ceil(width / tileSize))
  const rows = Math.max(1, Math.ceil(height / tileSize))
  const isRunning = runId !== null && width > 0 && height > 0
  const lastDiagonal = Math.max(1, columns + rows - 2)

  return (
    <div ref={containerRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
      {isRunning && (
        <div
          key={runId}
          className="grid h-full w-full overflow-hidden rounded-panel"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {Array.from({ length: columns * rows }, (_, index) => {
            const column = index % columns
            const row = Math.floor(index / columns)
            const sweepDelay = ((column + row) / lastDiagonal) * SWEEP
            const isEvenTile = (column + row) % 2 === 0

            return (
              <span
                key={index}
                className={`pixel-tile ${isEvenTile ? 'bg-curtain' : 'bg-curtain-2'}`}
                style={{ animationDelay: `${holdMs + sweepDelay + jitterFor(index)}ms` }}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
