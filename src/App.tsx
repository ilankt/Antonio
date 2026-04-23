import { HashRouter, Routes, Route, useLocation } from 'react-router'
import { useEffect } from 'react'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ResearchPage from './pages/ResearchPage'
import TeachingPage from './pages/TeachingPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-surface flex flex-col">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/teaching" element={<TeachingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
