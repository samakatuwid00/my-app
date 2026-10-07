import { AlsoInProduction } from '../components/home/AlsoInProduction'
import { BuildLog } from '../components/home/BuildLog'
import { Contact } from '../components/home/Contact'
import { Experience } from '../components/home/Experience'
import { Faq } from '../components/home/Faq'
import { Hero } from '../components/home/Hero'
import { Recognition } from '../components/home/Recognition'
import { Services } from '../components/home/Services'
import { Suite } from '../components/home/Suite'
import { Moire } from '../components/layout/Moire'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useLiveScreens } from '../hooks/useLiveScreens'
import { useScrollScene } from '../hooks/useScrollScene'

export function HomeView() {
  useDocumentTitle()
  useScrollScene()
  useLiveScreens()
  return (
    <>
      <Hero />
      <Suite />
      <Moire tone="dark" />
      <AlsoInProduction />
      <BuildLog />
      <Moire tone="light" />
      <Services />
      <Moire tone="dark" />
      <Experience />
      <Moire tone="light" />
      <Recognition />
      <Faq />
      <Moire tone="dark" />
      <Contact />
    </>
  )
}
