import { useEffect, lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import Lenis from 'lenis'

// Layout (load immediately)
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import CustomCursor from '../components/common/CustomCursor'
import NoiseOverlay from '../components/common/NoiseOverlay'
import PageLoader from '../components/common/PageLoader'

// Hero loads immediately for best LCP
import Hero from '../components/sections/Hero'

// Lazy load other sections for performance
const About = lazy(() => import('../components/sections/About'))
const Skills = lazy(() => import('../components/sections/Skills'))
const Projects = lazy(() => import('../components/sections/Projects'))
const Experience = lazy(() => import('../components/sections/Experience'))
const Events = lazy(() => import('../components/sections/Events'))
const Resume = lazy(() => import('../components/sections/Resume'))
const Achievements = lazy(() => import('../components/sections/Achievements'))
const Contact = lazy(() => import('../components/sections/Contact'))

// Hooks
import { usePageLoad } from '../hooks/usePageLoad'

// Section loading fallback
const SectionLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-cyan border-t-transparent rounded-full animate-spin" />
  </div>
)

function Home() {
  const isLoading = usePageLoad(300)

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Expose lenis to window for scroll-to functionality
    window.lenis = lenis

    return () => {
      lenis.destroy()
    }
  }, [])

  // Handle smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (target) {
        e.preventDefault()
        const id = target.getAttribute('href').slice(1)
        const element = document.getElementById(id)
        if (element) {
          window.lenis?.scrollTo(element, { offset: -80 })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  return (
    <>
      {/* Page Loader */}
      <PageLoader isLoading={isLoading} />
      
      {/* Custom Cursor (desktop only) */}
      <CustomCursor />
      
      {/* Noise Overlay */}
      <NoiseOverlay />
      
      {/* Toast Notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontFamily: 'General Sans, sans-serif',
          },
          success: {
            iconTheme: {
              primary: '#00FFE0',
              secondary: '#050505',
            },
          },
          error: {
            iconTheme: {
              primary: '#FF4444',
              secondary: '#050505',
            },
          },
        }}
      />
      
      {/* Main Content */}
      <div 
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{ minHeight: '100vh', backgroundColor: '#050505', position: 'relative', zIndex: 1 }}
      >
        <Navbar />
        
        <main className="relative z-10" style={{ backgroundColor: '#050505' }}>
          <Hero />
          
          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Skills />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Projects />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Experience />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Events />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Resume />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Achievements />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
        </main>
        
        <Footer />
      </div>
    </>
  )
}

export default Home

