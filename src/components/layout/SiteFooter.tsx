import { Link } from 'react-router-dom'
import { GITHUB_URL, socialLinks } from '../../data/site'
import { Niko } from '../ui/Niko'
import { Band } from './Band'

const link = (label: string) => socialLinks.find((l) => l.label === label)?.href ?? ''

export function SiteFooter() {
  return (
    <Band as="footer" tone="light">
      <div className="ghost" aria-hidden="true">Abay</div>
      <div className="wrap foot">
        <div className="ui">
          <p>Systems that replace paper</p>
          <p>© {new Date().getFullYear()} Roger A. Abay Jr.</p>
        </div>
        <div className="glyphs">
          <Link to="/" aria-label="Back to top">
            <Niko pose="happy" />
          </Link>
          <a href={GITHUB_URL} aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          <a href={link('LinkedIn')} aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z" />
            </svg>
          </a>
        </div>
        <div className="ui r">
          <p>Camarines Sur, Philippines</p>
          <p>
            <a href={link('Facebook')}>Facebook</a> · <Link to="/#contact">Contact</Link>
          </p>
        </div>
      </div>
    </Band>
  )
}
