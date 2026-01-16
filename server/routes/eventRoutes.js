import express from 'express'
import {
  getEvents,
  getEventById,
  getFeaturedEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventTypes,
} from '../controllers/eventController.js'

const router = express.Router()

// Public routes
router.get('/', getEvents)
router.get('/featured', getFeaturedEvents)
router.get('/types', getEventTypes)
router.get('/:id', getEventById)

// Admin routes (would add auth middleware in production)
router.post('/', createEvent)
router.put('/:id', updateEvent)
router.delete('/:id', deleteEvent)

export default router
