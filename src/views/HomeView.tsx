import { Contact } from '../components/home/Contact'
import { Experience } from '../components/home/Experience'
import { Experiments } from '../components/home/Experiments'
import { Faq } from '../components/home/Faq'
import { Hero } from '../components/home/Hero'
import { Recognition } from '../components/home/Recognition'
import { SelectedWork } from '../components/home/SelectedWork'
import { Services } from '../components/home/Services'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function HomeView() {
  useDocumentTitle()
  return (
    <>
      <Hero />
      <SelectedWork />
      <Services />
      <Experience />
      <Recognition />
      <Experiments />
      <Faq />
      <Contact />
    </>
  )
}
