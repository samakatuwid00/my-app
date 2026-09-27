import type { CSSProperties } from 'react'
import { Band } from '../components/layout/Band'
import { Experience } from '../components/home/Experience'
import { Experiments } from '../components/home/Experiments'
import { Faq } from '../components/home/Faq'
import { Hero } from '../components/home/Hero'
import { Recognition } from '../components/home/Recognition'
import { SelectedWork } from '../components/home/SelectedWork'
import { Services } from '../components/home/Services'

// Placeholder height so the header has real bands to scroll over until each
// section is filled in.
const PLACEHOLDER: CSSProperties = { minHeight: '100vh' }

export function HomeView() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Services />
      <Experience />
      <Recognition />
      <Experiments />
      <Faq />
      {/* filled in Task 10 */}
      <Band id="contact" tone="dark" style={PLACEHOLDER}>
        <div className="wrap"><h2 className="display">Let's talk</h2></div>
      </Band>
    </>
  )
}
