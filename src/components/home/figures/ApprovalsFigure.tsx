import { FIG } from './fig'

// A token carries the request, waits at the clock, lands on the tick.
export function ApprovalsFigure() {
  return (
    <svg {...FIG}>
      <rect x="10" y="40" width="30" height="24" rx="2" /><path d="M16 48h18M16 55h12" />
      <path className="march" d="M40 52h20" strokeDasharray="2 3" />
      <circle cx="72" cy="52" r="12" /><path d="M72 52l5 3" /><path className="hand" d="M72 52v-8" />
      <path className="march" d="M84 52h20" strokeDasharray="2 3" />
      <circle className="done" cx="118" cy="52" r="14" fill="currentColor" fillOpacity={0.12} />
      <path className="tick" pathLength={1} d="m111 52 5 5 9-10" />
      <circle className="token" cx="42" cy="52" r="2.6" fill="currentColor" stroke="none" />
      <path className="nudge" d="M146 52h10m-4-4 4 4-4 4" />
    </svg>
  )
}
