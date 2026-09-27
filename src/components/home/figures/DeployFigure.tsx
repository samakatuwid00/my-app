import type { CSSProperties } from 'react'
import { FIG } from './fig'

// --d staggers the servers racking in; --b offsets each LED's blink and the
// second pulse, so the lights take turns.
const SERVERS = [
  { d: '0.10s', b: '0.0s', y: 14 },
  { d: '0.24s', b: '0.8s', y: 41 },
  { d: '0.38s', b: '1.6s', y: 68 },
]

// Servers stack in, lights blink in turn, a pulse runs the line.
export function DeployFigure() {
  return (
    <svg {...FIG}>
      {SERVERS.map((s) => (
        <g key={s.y} className="srv" style={{ '--d': s.d } as CSSProperties}>
          <rect x="40" y={s.y} width="80" height="22" rx="2" /><path d={`M50 ${s.y + 11}h26`} />
          <circle className="led" style={{ '--b': s.b } as CSSProperties} cx="104" cy={s.y + 11} r="2.5" fill="currentColor" />
          <circle cx="112" cy={s.y + 11} r="2.5" />
        </g>
      ))}
      <path d="M8 52h10l4-8 5 16 4-8h9" opacity=".25" /><path d="M121 52h8l4-8 5 16 4-8h10" opacity=".25" />
      <path className="beat" pathLength={1} d="M8 52h10l4-8 5 16 4-8h9" />
      <path className="beat" pathLength={1} style={{ '--b': '1s' } as CSSProperties} d="M121 52h8l4-8 5 16 4-8h10" />
    </svg>
  )
}
