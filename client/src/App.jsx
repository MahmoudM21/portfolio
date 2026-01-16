import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'

// Layout components
import CustomCursor from './components/common/CustomCursor'
import NoiseOverlay from './components/common/NoiseOverlay'
import PageLoader from './components/common/PageLoader'
import PageTransition from './components/common/PageTransition'

// Pages
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import EventDetail from './pages/EventDetail'

// Hooks
import { usePageLoad } from './hooks/usePageLoad'

function AppContent() {
  const isLoading = usePageLoad(100) // Very short load time
  const location = useLocation()

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#050505', position: 'relative' }}>
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
      
      {/* Page Transitions */}
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/events/:slug" element={<EventDetail />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
