import { Navigate, type RouteObject } from 'react-router-dom'
import { CaseStudyView } from '../views/CaseStudyView'
import { HomeView } from '../views/HomeView'
import { NotFoundView } from '../views/NotFoundView'

// Children of the App layout route. They are data routes (not a nested <Routes>)
// on purpose: only inside a data route does <Link viewTransition> reach the router,
// which then wraps the navigation in document.startViewTransition.
export const appRoutes: RouteObject[] = [
  { index: true, element: <HomeView /> },
  { path: 'work/:slug', element: <CaseStudyView /> },
  // retired paths: keep bookmarks working
  { path: 'about', element: <Navigate to="/" replace /> },
  { path: 'projects', element: <Navigate to="/#work" replace /> },
  { path: 'feedback', element: <Navigate to="/#recognition" replace /> },
  { path: 'contact', element: <Navigate to="/#contact" replace /> },
  { path: 'history', element: <Navigate to="/#experience" replace /> },
  { path: 'stack', element: <Navigate to="/#services" replace /> },
  { path: 'awards', element: <Navigate to="/#recognition" replace /> },
  // Not a redirect: an unknown path stays in the address bar so the visitor sees what they asked for.
  { path: '*', element: <NotFoundView /> },
]
