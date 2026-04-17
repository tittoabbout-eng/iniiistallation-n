
import { Navigate, Route, Routes } from 'react-router-dom'
import Analytics from './components/Analytics'
import FloatingCTA from './components/FloatingCTA'
import Footer from './components/Footer'
import Navigation from './components/Navigation'
import ScrollToTop from './components/ScrollToTop'
import { areaPages, legacyRouteRedirects, projects, services } from './data/site'
import AreaDetail from './pages/AreaDetail'
import Contact from './pages/Contact'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProjectDetail from './pages/ProjectDetail'
import Projects from './pages/Projects'
import ServiceAreas from './pages/ServiceAreas'
import ServiceDetail from './pages/ServiceDetail'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'

export default function App() {
  return (
    <div className="min-h-screen bg-white text-navy-950">
      <Analytics />
      <ScrollToTop />
      <Navigation />

      <main className="flex-1 pb-24 md:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          {projects.map((project) => (
            <Route
              key={project.slug}
              path={`/projects/${project.slug}`}
              element={<ProjectDetail project={project} />}
            />
          ))}

          {services.map((service) => (
            <Route
              key={service.slug}
              path={`/${service.slug}`}
              element={<ServiceDetail service={service} />}
            />
          ))}

          <Route path="/service-areas" element={<ServiceAreas />} />
          {areaPages.map((area) => (
            <Route
              key={area.slug}
              path={`/service-areas/${area.slug}`}
              element={<AreaDetail area={area} />}
            />
          ))}

          <Route path="/contact" element={<Contact />} />

          {legacyRouteRedirects.map((route) => (
            <Route
              key={route.from}
              path={route.from}
              element={<Navigate to={route.to} replace />}
            />
          ))}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <FloatingCTA />
      <Footer />
    </div>
  )
}
