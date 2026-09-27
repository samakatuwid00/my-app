import { faq } from '../../data/site'
import { useAsk } from '../../hooks/useAsk'
import { Band } from '../layout/Band'

export function Faq() {
  const { open } = useAsk()
  return (
    <Band id="faq" tone="light" flush>
      <div className="wrap">
        <div className="head">
          <h2 className="h2">FAQ</h2>
          <p>
            Short answers to what clients ask first. Anything else,{' '}
            <button type="button" className="inline-link" onClick={open}>ask the assistant</button>.
          </p>
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
