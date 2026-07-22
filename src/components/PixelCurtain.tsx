import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useElementSize } from '../hooks/useElementSize'

// Tiles stay near-square at every viewport by deriving the grid from the measured
// region instead of a fixed 12x7 that stretches to the pane's aspect ratio.
// Large regions grow the tile rather than dropping the effect — capping the count
// and bailing out silently killed the wipe on any window wider than ~1300px.
const MIN_TILE_PX = 28
const TILE_BUDGET = 900

const TILE_DURATION = 90
const SWEEP = 100
const JITTER = 30
const CLEANUP_MS = TILE_DURATION + SWEEP + JITTER + 40

function jitterFor(index: number) {
  return (((index * 2654435761) % 101) / 101) * JITTER
}

type PixelCurtainProps = {
  trigger: string | number
  scope?: 'pane' | 'window'
}

export function PixelCurtain({ trigger, scope = 'pane' }: PixelCurtainProps) {
  const prefersReducedMotion = useReducedMotion()
  const [containerRef, { width, height }] = useElementSize<HTMLDivElement>()
  const [runId, setRunId] = useState<string | number | null>(null)
  const [previousTrigger, setPreviousTrigger] = useState(trigger)

  // Adjusted during render so the curtain paints on the same frame as the new
  // content — an effect would show one un-masked frame first.
  if (previousTrigger !== trigger) {
    setPreviousTrigger(trigger)
    if (!prefersReducedMotion) setRunId(trigger)
  }

  useEffect(() => {
    if (runId === null) return

    const timer = setTimeout(() => setRunId(null), CLEANUP_MS)
    return () => clearTimeout(timer)
  }, [runId])

  const tileSize = Math.max(MIN_TILE_PX, Math.sqrt((width * height) / TILE_BUDGET))
  const columns = Math.max(1, Math.ceil(width / tileSize))
  const rows = Math.max(1, Math.ceil(height / tileSize))
  const tileCount = columns * rows
  const isRunning = runId !== null && width > 0 && height > 0
  const lastDiagonal = Math.max(1, columns + rows - 2)

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${scope === 'window' ? 'z-50' : 'z-30'}`}
    >
      {isRunning && (
        <div
          key={runId}
          className="grid h-full w-full"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {Array.from({ length: tileCount }, (_, index) => {
            const column = index % columns
            const row = Math.floor(index / columns)
            const sweepDelay = ((column + row) / lastDiagonal) * SWEEP

            // Two alternating tones give the dissolve a dithered texture and,
            // unlike the old surface-coloured tiles, are actually visible.
            const isEvenTile = (column + row) % 2 === 0

            return (
              <span
                key={index}
                className={`pixel-tile ${isEvenTile ? 'bg-curtain' : 'bg-curtain-2'}`}
                style={{ animationDelay: `${sweepDelay + jitterFor(index)}ms` }}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
