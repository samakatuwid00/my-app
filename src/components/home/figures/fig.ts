// The attributes every process figure shares: one 160x104 canvas, drawn in
// the band's ink with a thin round stroke, hidden from assistive tech (the
// step's heading and line carry the meaning).
export const FIG = {
  viewBox: '0 0 160 104',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const
