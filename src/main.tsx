import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '@fontsource-variable/antonio'
import '@fontsource/barlow-condensed/500.css'
import '@fontsource/barlow-condensed/600.css'
import '@fontsource-variable/inter-tight'
import '@fontsource-variable/jetbrains-mono'
import './index.css'
import App from './App'
import { AskProvider } from './components/AskProvider'
import { appRoutes } from './routes/AppRoutes'

// A data router, not <BrowserRouter>: only RouterProvider honours <Link viewTransition>
// (wrapping the navigation in document.startViewTransition) and provides
// useViewTransitionState. App is the layout; the pages render into its <Outlet />.
const router = createBrowserRouter([
  {
    path: '/',
    children: appRoutes,
    element: (
      <AskProvider>
        <App />
      </AskProvider>
    ),
  },
])

// The Fontsource faces are font-display: swap and the first paint is React's,
// so rendering straight away paints Arial Narrow / system-ui and then jumps to
// Antonio and Inter Tight. Hold the first render until the faces the first
// screen uses are in (the build preloads them, so this is usually instant),
// capped so a slow or failed font never holds the page back.
const FIRST_PAINT_FACES = [
  '300 1em "Antonio Variable"',
  '500 1em "Barlow Condensed"',
  '600 1em "Barlow Condensed"',
  '400 1em "Inter Tight Variable"',
  '400 1em "JetBrains Mono Variable"',
]
const FONT_WAIT_MS = 1000

function firstPaintFonts(): Promise<unknown> {
  if (!document.fonts) return Promise.resolve()
  return Promise.race([
    Promise.allSettled(FIRST_PAINT_FACES.map((face) => document.fonts.load(face))),
    new Promise((resolve) => setTimeout(resolve, FONT_WAIT_MS)),
  ])
}

firstPaintFonts().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
})
