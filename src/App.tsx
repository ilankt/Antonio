import Navigation from './components/Navigation'
import Footer from './components/Footer'
import HeroSection from './sections/HeroSection'
import ResearchSection from './sections/ResearchSection'
import PublicationsSection from './sections/PublicationsSection'
import AboutSection from './sections/AboutSection'
import AwardsSection from './sections/AwardsSection'
import ContactSection from './sections/ContactSection'

export default function App() {
  return (
    <div className="min-h-screen bg-surface">
      <Navigation />
      <main>
        <HeroSection />
        <ResearchSection />
        <PublicationsSection />
        <AboutSection />
        <AwardsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
