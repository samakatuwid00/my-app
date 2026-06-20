import type { PropsWithChildren } from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

export function SiteLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
