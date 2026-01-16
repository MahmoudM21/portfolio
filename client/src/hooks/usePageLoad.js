import { useState, useEffect } from 'react'

export function usePageLoad(minLoadTime = 500) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const startTime = Date.now()

    const handleLoad = () => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, minLoadTime - elapsed)
      
      setTimeout(() => {
        setIsLoading(false)
      }, remaining)
    }

    // Fallback timeout to ensure loader doesn't get stuck (max 1 second)
    const fallbackTimeout = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    // Check if document is already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => {
      clearTimeout(fallbackTimeout)
      window.removeEventListener('load', handleLoad)
    }
  }, [minLoadTime])

  return isLoading
}

