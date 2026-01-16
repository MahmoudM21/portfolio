import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiX, FiMaximize2 } from 'react-icons/fi'
import api from '../../services/api'

const ImageGallery = ({ images, title = 'Gallery', folderPath = null }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [discoveredImages, setDiscoveredImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const scrollContainerRef = useRef(null)

  // Fast discovery using backend API
  useEffect(() => {
    if (folderPath) {
      setIsLoading(true)
      console.log('ImageGallery: Fetching images from API for folder:', folderPath)
      
      // Extract folder name from path (e.g., "/images/projects/T1Dubb" -> "projects/T1Dubb")
      const folderName = folderPath.replace(/^\/images\//, '')
      
      // Try to fetch from backend API first (fastest)
      api.get('/images/list', { params: { folder: folderName } })
        .then(response => {
          if (response.data.success && response.data.images.length > 0) {
            console.log('ImageGallery: Found', response.data.images.length, 'images from API:', response.data.images)
            setDiscoveredImages(response.data.images)
            setIsLoading(false)
          } else {
            console.log('ImageGallery: No images from API, trying fallback discovery')
            setIsLoading(false) // Stop loading if no images
            // Fallback to client-side discovery if API fails
            discoverImagesClientSide(folderPath)
          }
        })
        .catch(error => {
          console.log('ImageGallery: API error, using fallback:', error.message)
          // Fallback to client-side discovery
          setIsLoading(false) // Stop loading on error
          discoverImagesClientSide(folderPath)
        })
    }
  }, [folderPath])

  // Fallback: Client-side image discovery (slower but works without backend)
  const discoverImagesClientSide = (folderPath) => {
    setIsLoading(true)
    const imagePaths = []
    
    // PRIORITY 1: Screenshot patterns (most common) - wider range
    for (let i = 1020; i <= 1220; i++) {
      imagePaths.push(`${folderPath}/Screenshot (${i}).png`)
      imagePaths.push(`${folderPath}/Screenshot (${i}).jpg`)
      imagePaths.push(`${folderPath}/Screenshot (${i}).JPG`)
      imagePaths.push(`${folderPath}/Screenshot (${i}).PNG`)
    }
    
    // PRIORITY 2: IMG patterns - wider range
    for (let i = 1000; i <= 2000; i++) {
      imagePaths.push(`${folderPath}/IMG_${i}.JPG`)
      imagePaths.push(`${folderPath}/IMG_${i}.jpg`)
      imagePaths.push(`${folderPath}/IMG_${i}.PNG`)
      imagePaths.push(`${folderPath}/IMG_${i}.png`)
    }
    
    // PRIORITY 3: WhatsApp Image patterns - optimized for actual files
    // Format: "WhatsApp Image 2026-01-06 at 20.09.13.jpeg"
    // Only check specific dates/times that are likely (based on actual files)
    const whatsappDates = [
      { year: 2026, month: 1, day: 6, hours: [20], minutes: [9, 10, 11, 12, 13, 14, 38, 39] }
    ]
    whatsappDates.forEach(({ year, month, day, hours, minutes }) => {
      const dayStr = String(day).padStart(2, '0')
      const monthStr = String(month).padStart(2, '0')
      hours.forEach(hour => {
        minutes.forEach(min => {
          for (let sec = 0; sec < 60; sec++) {
            const timeStr = `${String(hour).padStart(2, '0')}.${String(min).padStart(2, '0')}.${String(sec).padStart(2, '0')}`
            imagePaths.push(`${folderPath}/WhatsApp Image ${year}-${monthStr}-${dayStr} at ${timeStr}.jpeg`)
            imagePaths.push(`${folderPath}/WhatsApp Image ${year}-${monthStr}-${dayStr} at ${timeStr} (1).jpeg`)
            imagePaths.push(`${folderPath}/WhatsApp Image ${year}-${monthStr}-${dayStr} at ${timeStr}.jpg`)
            imagePaths.push(`${folderPath}/WhatsApp Image ${year}-${monthStr}-${dayStr} at ${timeStr} (1).jpg`)
          }
        })
      })
    })
    
    // PRIORITY 4: Specific known files
    imagePaths.push(`${folderPath}/sddefault.jpg`)
    imagePaths.push(`${folderPath}/162A0661.JPG`)
    imagePaths.push(`${folderPath}/162A1002 (1).png`)
    imagePaths.push(`${folderPath}/162A1002(1).png`)
    imagePaths.push(`${folderPath}/screencapture-localhost-3000-2025-12-01-01_36_30.png`)
    
    // PRIORITY 5: Numbered images (1-100)
    const extensions = ['jpg', 'jpeg', 'png', 'webp', 'JPG', 'JPEG', 'PNG', 'WEBP']
    for (let i = 1; i <= 100; i++) {
      extensions.forEach(ext => {
        imagePaths.push(`${folderPath}/${i}.${ext}`)
        imagePaths.push(`${folderPath}/image${i}.${ext}`)
        imagePaths.push(`${folderPath}/img${i}.${ext}`)
      })
    }
    
    // PRIORITY 6: Common names
    extensions.forEach(ext => {
      imagePaths.push(`${folderPath}/main.${ext}`)
      imagePaths.push(`${folderPath}/hero.${ext}`)
      imagePaths.push(`${folderPath}/cover.${ext}`)
      imagePaths.push(`${folderPath}/${title.toLowerCase().replace(/\s+/g, '-')}.${ext}`)
    })
    
    console.log('ImageGallery: Testing', imagePaths.length, 'image paths (fallback)')
    
    // Test in smaller batches to avoid overwhelming
    const batchSize = 200
    const batches = []
    for (let i = 0; i < imagePaths.length; i += batchSize) {
      batches.push(imagePaths.slice(i, i + batchSize))
    }
    
    const testBatch = (batch) => {
      return Promise.all(
        batch.map((path) => {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(null), 30) // Very short timeout
            const img = new Image()
            img.onload = () => {
              clearTimeout(timeout)
              resolve(path)
            }
            img.onerror = () => {
              clearTimeout(timeout)
              resolve(null)
            }
            img.src = path
          })
        })
      )
    }
    
    // Process batches
    const processBatches = async () => {
      const allValid = []
      for (let i = 0; i < batches.length; i++) {
        const batch = batches[i]
        const results = await testBatch(batch)
        const valid = results.filter(Boolean)
        if (valid.length > 0) {
          allValid.push(...valid)
          setDiscoveredImages([...allValid])
          console.log(`ImageGallery: Batch ${i + 1}/${batches.length} - Found ${valid.length} images. Total: ${allValid.length}`)
        }
        // Small delay
        if (i < batches.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1))
        }
      }
      setIsLoading(false)
      console.log('ImageGallery: Fallback discovery complete. Total images found:', allValid.length, allValid)
    }
    
    processBatches()
  }

  // Combine provided images with discovered images, removing duplicates
  const processedImages = React.useMemo(() => {
    const provided = Array.isArray(images) 
      ? images.filter(Boolean)
      : images 
        ? [images] 
        : []
    
    // Normalize paths for comparison
    const normalizePath = (path) => {
      return path.toLowerCase()
        .replace(/\/$/, '')
        .replace(/\s+/g, ' ')
        .trim()
    }
    
    // Create a map to track seen images
    const seen = new Set()
    const combined = []
    
    // First add discovered images
    discoveredImages.forEach(img => {
      const normalized = normalizePath(img)
      if (!seen.has(normalized)) {
        seen.add(normalized)
        combined.push(img)
      }
    })
    
    // Then add provided images that aren't duplicates
    provided.forEach(img => {
      const normalized = normalizePath(img)
      if (!seen.has(normalized)) {
        seen.add(normalized)
        combined.push(img)
      }
    })
    
    return combined
  }, [images, discoveredImages])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }

  const openLightbox = (index) => {
    setSelectedImage(processedImages[index])
    setCurrentIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const next = (currentIndex + 1) % processedImages.length
    setCurrentIndex(next)
    setSelectedImage(processedImages[next])
  }

  const prevImage = () => {
    const prev = (currentIndex - 1 + processedImages.length) % processedImages.length
    setCurrentIndex(prev)
    setSelectedImage(processedImages[prev])
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage) {
        if (e.key === 'ArrowRight') nextImage()
        if (e.key === 'ArrowLeft') prevImage()
        if (e.key === 'Escape') closeLightbox()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, currentIndex, processedImages.length])

  // Show loading only if we have no images at all
  if (isLoading && processedImages.length === 0) {
    return (
      <div className="text-center py-12 text-text-secondary">
        <div className="w-8 h-8 border-2 border-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p>Loading images...</p>
        {folderPath && (
          <p className="text-sm mt-2 opacity-50">Folder: {folderPath}</p>
        )}
      </div>
    )
  }

  if (!processedImages || processedImages.length === 0) {
    return (
      <div className="text-center py-12 text-text-secondary">
        <p>No images found</p>
        {folderPath && (
          <p className="text-sm mt-2 opacity-50">Folder: {folderPath}</p>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="relative">
        {/* Scrollable Gallery */}
        <div className="relative group">
          {/* Scroll buttons */}
          {processedImages.length > 1 && (
            <>
              <button
                onClick={scrollLeft}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-void/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-void hover:border-cyan/30"
                aria-label="Scroll left"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={scrollRight}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-void/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-void hover:border-cyan/30"
                aria-label="Scroll right"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {processedImages.map((img, index) => (
              <motion.div
                key={`${img}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative shrink-0 w-[600px] h-[400px] rounded-2xl overflow-hidden group/item cursor-pointer snap-start"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={img}
                  alt={`${title} - Image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                  onError={(e) => {
                    console.error('Failed to load image:', img)
                    e.target.style.display = 'none'
                  }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity" />
                
                {/* Expand icon */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-void/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/item:opacity-100 transition-opacity">
                  <FiMaximize2 className="w-5 h-5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        {processedImages.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {processedImages.map((_, index) => (
              <div
                key={index}
                className="h-1 rounded-full bg-surface transition-all"
                style={{
                  width: scrollContainerRef.current?.scrollLeft === 0 && index === 0 ? '24px' : '8px',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-void/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center text-white hover:bg-surface-light transition-colors z-10"
              aria-label="Close"
            >
              <FiX className="w-6 h-6" />
            </button>

            {/* Navigation buttons */}
            {processedImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                  className="absolute left-4 w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center text-white hover:bg-surface-light transition-colors z-10"
                  aria-label="Previous image"
                >
                  <FiChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                  className="absolute right-4 w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center text-white hover:bg-surface-light transition-colors z-10"
                  aria-label="Next image"
                >
                  <FiChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image */}
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt={`${title} - Full view`}
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                console.error('Failed to load image in lightbox:', selectedImage)
                e.target.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
              }}
            />

            {/* Image counter */}
            {processedImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-surface border border-white/10 text-white text-sm">
                {currentIndex + 1} / {processedImages.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ImageGallery
