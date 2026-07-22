import { Mail } from 'lucide-react'
import { BrandIcon } from './BrandIcon'
import { site, socialLinks } from '../data/site'

const ICON_BUTTON =
  'grid size-7 place-items-center rounded-panel border border-control text-text-2 transition-colors duration-200 hover:border-line-strong hover:text-text'

export function SiteFooter() {
  return (
    <footer className="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line px-6 py-4 lg:px-12">
      {/* The blinking caret moved to the command bar, where it marks the one
          prompt that actually accepts input. */}
      <p className="text-xs text-text-3">{site.shellTitle}$</p>

      <div className="ml-auto flex items-center gap-2">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
            className={ICON_BUTTON}
          >
            <BrandIcon name={link.brand} size={14} />
          </a>
        ))}
        <a href={`mailto:${site.email}`} aria-label="Email" className={ICON_BUTTON}>
          <Mail size={14} />
        </a>
      </div>
    </footer>
  )
}
