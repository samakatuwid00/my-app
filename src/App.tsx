import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ShellLayout } from './layouts/ShellLayout'
import { AppRoutes } from './routes/AppRoutes'
import { CLIIntro } from './components/Intro/CLIIntro'

export default function App() {
  // The CLI intro is a one-time gate. After the visitor has seen it once,
  // `portfolio-intro-seen` is persisted and the ShellLayout mounts directly.
  // The flag is read lazily so the check is a single localStorage hit on mount.
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem('portfolio-intro-seen') !== 'true'
  })

  // Re-evaluate on mount in case the flag is toggled (e.g. dev tools). Not
  // critical, but keeps a hard-refresh during dev honest.
  useEffect(() => {
    window.addEventListener('portfolio-intro-reset', () => setShowIntro(true))
    return () => window.removeEventListener('portfolio-intro-reset', () => setShowIntro(true))
  }, [])

  return (
    <>
      {showIntro ? (
        <CLIIntro onComplete={() => setShowIntro(false)} />
      ) : (
        <BrowserRouter>
          <ShellLayout>
            <AppRoutes />
          </ShellLayout>
        </BrowserRouter>
      )}
    </>
  )
}
