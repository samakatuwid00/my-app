import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ViewShell } from '../components/ViewShell'
import { Prompt } from '../components/ui/Prompt'
import { useNiko } from '../hooks/useNiko'

/**
 * A real dead end. The routes used to send every unknown path to /about, which
 * quietly told the visitor their link was fine when it was not — and left the
 * address bar rewritten so they could not see what they had asked for.
 */
export function NotFoundView() {
  const { pathname } = useLocation()
  const niko = useNiko()
  const event = niko?.event

  useEffect(() => {
    event?.('deadEnd')
  }, [event])

  return (
    <ViewShell>
      <Prompt command={`cd ${pathname}`} />

      <div className="py-10">
        <p className="text-[64px] leading-none tracking-[-0.02em] text-text sm:text-[96px]">404</p>
        <p className="prose-body mt-3 max-w-[52ch] text-text-3">
          no such route – the path may have moved
        </p>

        <Link
          to="/about"
          className="group mt-6 inline-flex items-center gap-2 text-sm text-accent transition-colors duration-200 hover:text-text"
        >
          <span aria-hidden="true">&gt;</span>
          <span className="underline-offset-4 group-hover:underline">cd /about</span>
        </Link>
      </div>
    </ViewShell>
  )
}
