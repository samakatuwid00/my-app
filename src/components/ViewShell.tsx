import React from 'react'

export function ViewShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6 px-6 py-8 lg:py-6 xl:px-12">
      <div>{children}</div>
    </div>
  )
}