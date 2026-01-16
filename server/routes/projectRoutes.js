import express from 'express'
import {
  getProjects,
  getProjectById,
  getFeaturedProjects,
  createProject,
  updateProject,
  deleteProject,
  getCategories,
} from '../controllers/projectController.js'

const router = express.Router()

// Public routes
router.get('/', getProjects)
router.get('/featured', getFeaturedProjects)
router.get('/categories', getCategories)
router.get('/:id', getProjectById)

// Admin routes (would add auth middleware in production)
router.post('/', createProject)
router.put('/:id', updateProject)
router.delete('/:id', deleteProject)

export default router

