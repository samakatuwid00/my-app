import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { Niko } from '../ui/Niko'

const GO = [
  ['work', 'Work'],
  ['services', 'Services'],
  ['experience', 'Experience'],
  ['faq', 'FAQ'],
  ['contact', 'Contact'],
] as const

type MobileSheetProps = { open: boolean; onClose: () => void; resume: string }

// Stays in the DOM (display: none while shut) so the Menu button's
// aria-controls always resolves, and so .open can wipe it in from @starting-style.
export function MobileSheet({ open, onClose, resume }: MobileSheetProps) {
  // Escape, the Tab loop and returning focus to the Menu button all live here.
  const ref = useFocusTrap<HTMLDivElement>(open, onClose)

  useEffect(() => {
    if (!open) return
    document.body.classList.add('locked')
    return () => document.body.classList.remove('locked')
  }, [open])

  return (
    <div
      ref={ref}
      className={`sheet${open ? ' open' : ''}`}
      id="sheet"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <div className="top dark">
        <Niko pose="happy" />
        <button className="btn line" type="button" style={{ height: 36 }} onClick={onClose}>
          Close
        </button>
      </div>
      <nav>
        {GO.map(([id, label]) => (
          <Link key={id} to={`/#${id}`} onClick={onClose}>
            {label}
          </Link>
        ))}
      </nav>
      <div className="btns dark">
        <a className="btn solid" href={resume}>Download résumé</a>
      </div>
    </div>
  )
}
