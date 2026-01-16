import Project from '../models/Project.js'

/**
 * @desc    Get all published projects
 * @route   GET /api/projects
 * @access  Public
 */
export const getProjects = async (req, res, next) => {
  try {
    const { category, featured, limit = 20, page = 1 } = req.query

    // Build query
    const query = { status: 'published' }
    
    if (category && category !== 'All') {
      query.category = category
    }
    
    if (featured === 'true') {
      query.featured = true
    }

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit)
    
    const [projects, total] = await Promise.all([
      Project.find(query)
        .sort({ featured: -1, order: 1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Project.countDocuments(query),
    ])

    res.status(200).json({
      success: true,
      count: projects.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: projects,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Get single project by ID or slug
 * @route   GET /api/projects/:id
 * @access  Public
 */
export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params
    
    // Try to find by ID first, then by slug
    let project = await Project.findById(id)
    
    if (!project) {
      project = await Project.findOne({ slug: id })
    }

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      })
    }

    res.status(200).json({
      success: true,
      data: project,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Get featured projects
 * @route   GET /api/projects/featured
 * @access  Public
 */
export const getFeaturedProjects = async (req, res, next) => {
  try {
    const projects = await Project.getFeatured()

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Create new project
 * @route   POST /api/projects
 * @access  Private (would require auth in production)
 */
export const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body)

    res.status(201).json({
      success: true,
      data: project,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Update project
 * @route   PUT /api/projects/:id
 * @access  Private (would require auth in production)
 */
export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      })
    }

    res.status(200).json({
      success: true,
      data: project,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Delete project
 * @route   DELETE /api/projects/:id
 * @access  Private (would require auth in production)
 */
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Get project categories with counts
 * @route   GET /api/projects/categories
 * @access  Public
 */
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Project.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])

    const totalCount = await Project.countDocuments({ status: 'published' })

    res.status(200).json({
      success: true,
      data: [
        { _id: 'All', count: totalCount },
        ...categories,
      ],
    })
  } catch (error) {
    next(error)
  }
}

