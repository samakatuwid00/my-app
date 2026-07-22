import { Menu } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { site } from '../data/site'

type WindowChromeProps = {
  onOpenNav: () => void
  onThemeChange: () => void
}

export function WindowChrome({ onOpenNav, onThemeChange }: WindowChromeProps) {
  return (
    <div className="flex h-11 shrink-0 items-center justify-between border-b border-line bg-panel px-4">
      <div aria-hidden="true" className="flex gap-2">
        <span className="size-3 rounded-full bg-dot-close" />
        <span className="size-3 rounded-full bg-dot-minimize" />
        <span className="size-3 rounded-full bg-dot-zoom" />
      </div>

      <p className="hidden text-xs text-text-3 sm:block">{site.shellTitle}</p>

      <div className="flex items-center gap-2">
        <ThemeToggle onToggled={onThemeChange} />
        <button
          type="button"
          onClick={onOpenNav}
          aria-label="Open navigation"
          className="grid size-8 place-items-center rounded-panel border border-control text-text-2 transition-colors duration-200 hover:border-line-strong hover:text-text lg:hidden"
        >
          <Menu size={15} />
        </button>
      </div>
    </div>
  )
}
