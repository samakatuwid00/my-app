import { Link } from 'react-router-dom'
import { services } from '../../data/services'
import { Band } from '../layout/Band'
import { Arrow } from '../ui/Arrow'

// Named for what a client is buying; each offer points to the system on this
// page that already does it.
export function Services() {
  return (
    <Band id="services" tone="light" className="services">
      <div className="wrap">
        <div className="head">
          <h2 className="h2">What you<br />can hire</h2>
          <p>Named for what a client is buying. Each one points to a system on this page that already does it.</p>
        </div>
        <div className="offers">
          {services.map((s) => (
            <div key={s.id} className="offer rv">
              <h3>{s.name}</h3>
              <p>{s.pitch}</p>
              <Link className="proof" to={`/${s.proof.href}`}>
                <span className="ui">Already running in</span>
                <span className="sys">{s.proof.label} <Arrow /></span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Band>
  )
}
