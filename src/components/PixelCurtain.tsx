import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useElementSize } from '../hooks/useElementSize'

// Tiles stay near-square at every viewport by deriving the grid from the measured
// region instead of a fixed 12x7 that stretches to the pane's aspect ratio.
const TILE_PX = 28
const MAX_TILES = 1200

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

  const columns = Math.max(1, Math.round(width / TILE_PX))
  const rows = Math.max(1, Math.round(height / TILE_PX))
  const tileCount = columns * rows
  const isRunning = runId !== null && width > 0 && height > 0 && tileCount <= MAX_TILES
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

            return (
              <span
                key={index}
                className={`pixel-tile ${scope === 'window' ? 'bg-panel' : 'bg-surface'}`}
                style={{ animationDelay: `${sweepDelay + jitterFor(index)}ms` }}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
