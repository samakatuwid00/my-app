// Niko, from docs/niko-frames.js: 13 x 12 grid, body rows 4-9, ears on row 3.
// Only the eye cut changes between poses.
const EYES = { open: { r: 6, h: 2 }, happy: { r: 6, h: 1 } } as const
const L = [2, 3]
const R = [9, 10]

export function Niko({ pose = 'open' }: { pose?: keyof typeof EYES }) {
  const e = EYES[pose]
  let d = ''
  for (let r = 3; r <= 9; r++)
    for (let c = 0; c <= 12; c++) {
      const ear = r === 3 && (c === 1 || c === 2 || c === 10 || c === 11)
      const eye = r >= e.r && r < e.r + e.h && ((c >= L[0] && c <= L[1]) || (c >= R[0] && c <= R[1]))
      if ((ear || r >= 4) && !eye) d += `M${c} ${r}h1v1h-1z`
    }
  return (
    <svg className="niko" viewBox="0 0 13 12" shapeRendering="crispEdges" aria-hidden="true">
      <path fill="currentColor" d={d} />
    </svg>
  )
}
