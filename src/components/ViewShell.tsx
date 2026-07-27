import type { PropsWithChildren } from 'react'

export function ViewShell({ children }: PropsWithChildren) {
  // lg:py-8 is CHANGE-PROMPT-02's stated floor — below it the pane crowds the
  // chrome bar and the terminal frame stops reading as a window.
  // px-8 rather than px-12 from lg up: at 1024 the rail already takes 240px, and
  // the 32px returned here goes straight into the text measure, where it buys
  // fewer wrapped lines than the same 32px would buy as vertical space.
  //
  // lg:py-6 is below CHANGE-PROMPT-02's stated floor of py-8, taken deliberately
  // when /about moved its tab bar under a static headline: that layout costs
  // ~101px on two tabs and this is 16 of the 92 that had to come back. Every
  // other lever was spent first. Raise it to py-8 the moment /about loses weight.
  return <div className="px-6 py-8 lg:px-8 lg:py-6 xl:px-12">{children}</div>
}
