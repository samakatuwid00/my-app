import { useCallback, useEffect, useRef, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ShellLayout } from './layouts/ShellLayout'
import { AppRoutes } from './routes/AppRoutes'
import { CLIIntro } from './components/Intro/CLIIntro'
import { NikoProvider } from './components/NikoPet/NikoProvider'
import { NikoDebugPanel } from './components/NikoPet/NikoDebugPanel'

/**
 * Three phases, not two. The old build swapped the intro for the app; this one
 * overlaps them, because the morph has to measure the app window before the
 * intro can travel to it:
 *
 *   intro     boot log only
 *   morphing  the shell is mounted and curtained; the intro window FLIPs onto it
 *   app       the intro is gone
 */
type Phase = 'intro' | 'morphing' | 'app'

const SEEN_KEY = 'portfolio-intro-seen'

export default function App() {
  const [phase, setPhase] = useState<Phase>(() => {
    if (typeof window === 'undefined') return 'app'
    if (window.location.search.includes('intro-debug=1')) return 'intro'
    return window.localStorage.getItem(SEEN_KEY) === 'true' ? 'app' : 'intro'
  })

  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const replay = () => setPhase('intro')
    window.addEventListener('portfolio-intro-reset', replay)
    return () => window.removeEventListener('portfolio-intro-reset', replay)
  }, [])

  const handleEnter = useCallback(() => setPhase('morphing'), [])
  const handleDone = useCallback(() => setPhase('app'), [])

  const debug =
    typeof window !== 'undefined' && window.location.search.includes('niko-debug=1')

  // A returning visitor never sees the wake beat, so he is simply already home.
  const [skippedIntro] = useState(phase === 'app')

  return (
    <NikoProvider
      initialSlot={skippedIntro ? 'dock' : 'intro'}
      initialVisible={skippedIntro}
    >
      {phase !== 'intro' && (
        <BrowserRouter>
          <ShellLayout windowRef={windowRef} morphing={phase === 'morphing'}>
            <AppRoutes />
          </ShellLayout>
        </BrowserRouter>
      )}

      {phase !== 'app' && (
        <CLIIntro onEnter={handleEnter} onDone={handleDone} targetRef={windowRef} />
      )}

      {debug && <NikoDebugPanel />}
    </NikoProvider>
  )
}
