import type { CSSProperties } from 'react'
import { FIG } from './fig'

// --d staggers each bar's entrance; --t gives each its own breathing period,
// so the chart never moves in lockstep.
const BARS = [
  { d: '0.10s', t: '3.1s', x: 32, y: 58, h: 28 },
  { d: '0.19s', t: '3.7s', x: 52, y: 44, h: 42 },
  { d: '0.28s', t: '2.9s', x: 72, y: 50, h: 36 },
  { d: '0.37s', t: '4.1s', x: 92, y: 32, h: 54 },
  { d: '0.46s', t: '3.4s', x: 112, y: 24, h: 62 },
]

// Bars grow in, then breathe like live data; the latest point pings.
export function DashboardsFigure() {
  return (
    <svg {...FIG}>
      <path d="M22 16v70h118" />
      {BARS.map((b) => (
        <rect
          key={b.x}
          className="bar"
          style={{ '--d': b.d, '--t': b.t } as CSSProperties}
          x={b.x}
          y={b.y}
          width="12"
          height={b.h}
          fill="currentColor"
          fillOpacity={0.12}
        />
      ))}
      <path className="draw" pathLength={1} style={{ '--d': '.6s' } as CSSProperties} d="M38 48 58 36l20 8 20-18 20-8" />
      <circle className="ping" cx="118" cy="18" r="2.5" /><circle className="dot" cx="118" cy="18" r="2.5" fill="currentColor" />
      <path className="nudge" d="M146 52h10m-4-4 4 4-4 4" />
    </svg>
  )
}
