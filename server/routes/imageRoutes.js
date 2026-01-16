import express from 'express'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

// Get all images from a folder
router.get('/list', async (req, res) => {
  try {
    const { folder } = req.query
    
    if (!folder) {
      return res.status(400).json({
        success: false,
        message: 'Folder parameter is required'
      })
    }

    // Security: Only allow access to images folder
    const imagesBasePath = path.join(__dirname, '../../client/public/images')
    const requestedPath = path.join(imagesBasePath, folder)
    
    // Ensure the requested path is within the images folder
    if (!requestedPath.startsWith(path.resolve(imagesBasePath))) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      })
    }

    // Check if folder exists
    try {
      const stats = await fs.stat(requestedPath)
      if (!stats.isDirectory()) {
        return res.status(400).json({
          success: false,
          message: 'Path is not a directory'
        })
      }
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: 'Folder not found',
        images: []
      })
    }

    // Read all files in the folder
    const files = await fs.readdir(requestedPath)
    
    // Filter for image files only
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.JPG', '.JPEG', '.PNG', '.WEBP', '.GIF']
    const imageFiles = files.filter(file => {
      const ext = path.extname(file)
      return imageExtensions.includes(ext)
    })

    // Build full paths relative to public folder
    const imagePaths = imageFiles.map(file => `/images/${folder}/${file}`)

    res.json({
      success: true,
      images: imagePaths,
      count: imagePaths.length
    })
  } catch (error) {
    console.error('Error listing images:', error)
    res.status(500).json({
      success: false,
      message: 'Error listing images',
      images: []
    })
  }
})

export default router
