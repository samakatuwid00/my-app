import { Navigate, Route, Routes } from 'react-router-dom'
import { CaseStudyView } from '../views/CaseStudyView'
import { HomeView } from '../views/HomeView'
import { NotFoundView } from '../views/NotFoundView'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/work/:slug" element={<CaseStudyView />} />
      {/* retired paths: keep bookmarks working */}
      <Route path="/about" element={<Navigate to="/" replace />} />
      <Route path="/projects" element={<Navigate to="/#work" replace />} />
      <Route path="/feedback" element={<Navigate to="/#recognition" replace />} />
      <Route path="/contact" element={<Navigate to="/#contact" replace />} />
      <Route path="/history" element={<Navigate to="/#experience" replace />} />
      <Route path="/stack" element={<Navigate to="/#services" replace />} />
      <Route path="/awards" element={<Navigate to="/#recognition" replace />} />
      {/* Not a redirect: an unknown path stays in the address bar so the visitor sees what they asked for. */}
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  )
}
