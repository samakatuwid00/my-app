import { stackGroups } from '../../data/facts'

// Grouped as the résumé groups it; every name is in a system on this page.
export function StackList() {
  return (
    <section className="stack-block" aria-labelledby="stack-h">
      <div className="stack-head">
        <h3 className="h3" id="stack-h">Stack</h3>
        <p>Grouped as the résumé groups it. Every name is grounded in a system on this page.</p>
      </div>
      <div className="stack-list">
        {stackGroups.map((g) => (
          <div key={g.label}>
            <h4 className="ui">{g.label}</h4>
            <ul>{g.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  )
}
