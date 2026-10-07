import { figures, type FigureName } from './figures'

// A schematic of the system drawn over its screenshot. It stays still until
// useLiveScreens marks it .on (first time in view) and .in-view (while seen),
// so without script, or with reduced motion, it simply shows its final state.
export function Figure({ name, className = 'fig' }: { name: FigureName; className?: string }) {
  const { viewBox, inner } = figures[name]
  return (
    <svg
      className={className}
      viewBox={viewBox}
      preserveAspectRatio={className === 'fig' ? 'none' : undefined}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  )
}
