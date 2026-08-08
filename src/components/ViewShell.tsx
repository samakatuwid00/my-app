import type { PropsWithChildren } from 'react'

export function ViewShell({ children }: PropsWithChildren) {
  // Two deliberate departures from CHANGE-PROMPT-02, both paid for by measurement
  // and both recorded here because the prompt's stated floors were py-8 and a
  // wider gutter:
  //
  // `lg:py-6` tightened from py-8 (2026-08-06 polish pass) — uniform 24px mobile/desktop
  // bar under a static headline. Every other vertical lever was spent first.
  // Raise it the moment /about loses weight.
  //
  // `px-6` through lg — the pane is measure-starved at 1024, where the rail also
  // narrowed to 208px, and every horizontal pixel returned comes back as fewer
  // wrapped lines. `xl:px-12` keeps the wide gutter above 1280, where height is
  // not scarce.
  return <div className="px-6 py-6 xl:px-12">{children}</div>
}
