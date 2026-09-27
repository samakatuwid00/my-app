import type { CSSProperties } from 'react'
import { FIG } from './fig'

const d = (v: string) => ({ '--d': v }) as CSSProperties

// Paper recedes as the table draws in row by row; the lens keeps scanning.
export function RecordsFigure() {
  return (
    <svg {...FIG}>
      <g className="paper"><path d="M18 30 30 22l12 8M18 30v44h24V30" /><path d="M22 40h16M22 48h16M22 56h10" /></g>
      <rect className="head-fill" x="56" y="18" width="80" height="14" fill="currentColor" fillOpacity={0.12} stroke="none" />
      <rect className="draw" pathLength={1} style={d('0s')} x="56" y="18" width="80" height="68" rx="2" />
      <path className="draw" pathLength={1} style={d('.2s')} d="M56 32h80M56 46h80M56 60h80M56 74h80M80 32v54M106 32v54" />
      <path className="draw data" pathLength={1} style={d('0.45s')} d="M60 39h14M84 39h16M110 39h18" />
      <path className="draw data" pathLength={1} style={d('0.63s')} d="M60 53h14M84 53h16M110 53h18" />
      <path className="draw data" pathLength={1} style={d('0.81s')} d="M60 67h14M84 67h16M110 67h18" />
      <path className="draw data" pathLength={1} style={d('0.99s')} d="M60 80h14M84 80h16M110 80h18" />
      <g className="lens"><circle cx="128" cy="78" r="9" fill="var(--bg)" /><path d="m134.5 84.5 7 7" /></g>
      <path className="nudge" d="M146 52h10m-4-4 4 4-4 4" />
    </svg>
  )
}
