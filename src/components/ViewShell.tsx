import type { PropsWithChildren } from 'react'

export function ViewShell({ children }: PropsWithChildren) {
  return <div className="px-6 py-8 lg:px-12 lg:py-10">{children}</div>
}
