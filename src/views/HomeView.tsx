import type { CSSProperties } from 'react'
import { Band } from '../components/layout/Band'
import { Hero } from '../components/home/Hero'

// Placeholder height so the header has real bands to scroll over until each
// section is filled in.
const PLACEHOLDER: CSSProperties = { minHeight: '100vh' }

export function HomeView() {
  return (
    <>
      <Hero />
      {/* filled in Task 6 */}
      <Band id="work" tone="light" style={PLACEHOLDER}>
        <div className="wrap"><h2 className="h2">Selected work</h2></div>
      </Band>
      {/* filled in Task 7 */}
      <Band id="services" tone="light" flush style={PLACEHOLDER}>
        <div className="wrap"><h2 className="h2">What I do</h2></div>
      </Band>
      {/* filled in Task 8 */}
      <Band id="experience" tone="dark" style={PLACEHOLDER}>
        <div className="wrap"><h2 className="h2">Experience</h2></div>
      </Band>
      {/* filled in Task 9 */}
      <Band id="recognition" tone="light" style={PLACEHOLDER}>
        <div className="wrap"><h2 className="h2">Recognition</h2></div>
      </Band>
      {/* filled in Task 9 */}
      <Band id="experiments" tone="light" flush style={PLACEHOLDER}>
        <div className="wrap"><h2 className="h2">Experiments</h2></div>
      </Band>
      {/* filled in Task 9 */}
      <Band id="faq" tone="light" flush style={PLACEHOLDER}>
        <div className="wrap"><h2 className="h2">FAQ</h2></div>
      </Band>
      {/* filled in Task 10 */}
      <Band id="contact" tone="dark" style={PLACEHOLDER}>
        <div className="wrap"><h2 className="display">Let's talk</h2></div>
      </Band>
    </>
  )
}
