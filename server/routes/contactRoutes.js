import express from 'express'
import { body } from 'express-validator'
import { validateRequest } from '../middleware/validateMiddleware.js'
import {
  submitContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  getContactStats,
} from '../controllers/contactController.js'

const router = express.Router()

// Validation rules for contact form
const contactValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 5000 })
    .withMessage('Message must be between 10 and 5000 characters'),
]

// Public routes
router.post('/', contactValidation, validateRequest, submitContact)

// Admin routes (would add auth middleware in production)
router.get('/', getContacts)
router.get('/stats', getContactStats)
router.get('/:id', getContactById)
router.patch('/:id', updateContactStatus)
router.delete('/:id', deleteContact)

export default router

