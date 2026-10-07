// A strip of fine lines between two bands; useScrollScene twists one layer
// against the other as it passes, so the lines shimmer into a moiré.
export function Moire({ tone }: { tone: 'dark' | 'light' }) {
  return <div className={`moire ${tone}`} data-band={tone} data-moire aria-hidden="true" />
}
