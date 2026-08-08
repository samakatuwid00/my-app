import { useMemo } from 'react'
import type { CSSProperties } from 'react'
import { CANVAS_H, CANVAS_W, compose, runs } from './engine'
import type { CellKind, Frame } from './engine'

/**
 * Paints one composed frame. Consecutive cells of the same kind collapse into a
 * single span, so a 21 × 9 canvas costs a few dozen nodes per frame rather than
 * 189 — which matters when the frame swaps up to eight times a second.
 *
 * Colours resolve from tokens, never from the spec's terminal RGB:
 *   body -> --niko, accent fx -> --color-accent-2, dim fx + tag -> --color-text-3.
 */

const KIND_CLASS: Record<CellKind, string> = {
  b: 'niko-cell--body',
  a: 'niko-cell--fx',
  d: 'niko-cell--dim',
}

type NikoSpriteProps = {
  frame: Frame
  /** The ground+1 `NIKO` tag. Docked only — the intro rail has no room for it. */
  showTag?: boolean
  /** 13px in the intro rail, 11.5px docked (21ch ≈ 145px inside the 240px rail). */
  fontSize?: number
  /**
   * Canvas height. 9 is the spec's canvas: a blank row, the six sprite rows
   * (which `hop` and `celebrate` rise into), and the ground+1 name tag. Pass 8
   * where the tag is never shown and the row it would occupy costs real height
   * — the navbar, where the whole sprite has 44px to live in.
   */
  rows?: number
  label: string
  /** Surfaced as `data-niko-move` so tests can assert what he is doing. */
  move?: string
  className?: string
  style?: CSSProperties
}

export function NikoSprite({
  frame,
  showTag = false,
  fontSize = 13,
  rows = CANVAS_H,
  label,
  move,
  className = '',
  style,
}: NikoSpriteProps) {
  // `ground` is pinned rather than left to default to `h - 2`, so trimming the
  // canvas takes the row off the bottom instead of sliding the sprite down it.
  const grid = useMemo(
    () => compose(frame, { w: CANVAS_W, h: rows, ground: CANVAS_H - 2, name: showTag ? 'NIKO' : '' }),
    [frame, rows, showTag],
  )

  return (
    <span
      className={`niko-sprite ${className}`}
      style={{ fontSize: `${fontSize}px`, ...style }}
      role="img"
      aria-label={label}
      data-niko-move={move}
    >
      {grid.map((row, ri) => (
        <span className="niko-sprite__row" key={ri} aria-hidden="true">
          {runs(row).map((run, i) =>
            run.kind ? (
              <span key={i} className={KIND_CLASS[run.kind]}>
                {run.text}
              </span>
            ) : (
              <span key={i}>{run.text}</span>
            ),
          )}
        </span>
      ))}
    </span>
  )
}
