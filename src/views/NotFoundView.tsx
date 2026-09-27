import { Link, useLocation } from 'react-router-dom'
import { Band } from '../components/layout/Band'

// A real dead end: the path stays in the address bar and is repeated here, so
// the visitor can see what they asked for.
export function NotFoundView() {
  const { pathname } = useLocation()

  return (
    <Band tone="light">
      <div className="wrap not-found">
        <h1 className="display">Not found</h1>
        <p className="soft">
          Nothing lives at <code>{pathname}</code>. The page may have moved.
        </p>
        <Link className="btn solid" to="/">Back home</Link>
      </div>
    </Band>
  )
}
