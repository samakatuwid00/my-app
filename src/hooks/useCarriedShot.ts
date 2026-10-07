import { useViewTransitionState } from 'react-router-dom'

// The screenshot beside a "Case study" button carries across to the case-study
// page. It takes view-transition-name "shot" only while a transition to or from
// its own case study runs, so two elements never share the name.
export function useCarriedShot(slug: string) {
  return useViewTransitionState(`/work/${slug}`) ? { viewTransitionName: 'shot' } : undefined
}
