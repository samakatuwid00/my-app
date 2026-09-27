import { faq } from '../../data/site'
import { Band } from '../layout/Band'

export function Faq() {
  return (
    <Band id="faq" tone="light" flush>
      <div className="wrap">
        <div className="head">
          <h2 className="h2">FAQ</h2>
          {/* Task 12: open assistant */}
          <p>Short answers to what clients ask first. Anything else, ask the assistant.</p>
        </div>
        <div className="faq">
          {faq.map(({ q, a }) => (
            <details key={q}>
              <summary>
                <span>{q}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 4v16M4 12h16" /></svg>
              </summary>
              <div className="a">{a}</div>
            </details>
          ))}
        </div>
      </div>
    </Band>
  )
}
