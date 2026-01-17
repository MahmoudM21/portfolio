import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'

// Import routes
import projectRoutes from './routes/projectRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import imageRoutes from './routes/imageRoutes.js'

// Import middleware
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()
const __dirname = path.resolve()
// ======================
// MIDDLEWARE
// ======================

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
}))

// Body parser
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Request logging (development)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
  })
}

// ======================
// ROUTES
// ======================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Portfolio API is running',
    timestamp: new Date().toISOString(),
  })
})

// API routes
app.use('/api/projects', projectRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/images', imageRoutes)

// ======================
// SERVE REACT (IMPORTANT)
// ======================

app.use(express.static(path.join(__dirname, '../client/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

// ======================
// ERROR HANDLING
// ======================

app.use(notFound)
app.use(errorHandler)

// ======================
// DATABASE & SERVER
// ======================

const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI 

// Connect to MongoDB
const connectDB = async () => {
  if (!MONGO_URI) {
    console.log('⚠ No MONGO_URI provided – skipping DB connection')
    return
  }

  try {
    const conn = await mongoose.connect(MONGO_URI)
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`✗ MongoDB Error: ${error.message}`)
    console.log('⚠ Server will continue without database connection')
  }
}

// Start server
const startServer = async () => {
  await connectDB()
  
  app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║                                        ║
║   🚀 Portfolio API Server              ║
║                                        ║
║   Port: ${PORT}                          ║
║   Mode: ${process.env.NODE_ENV || 'development'}               ║
║                                        ║
╚════════════════════════════════════════╝
    `)
  })
}

startServer()

