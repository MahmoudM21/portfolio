import Event from '../models/Event.js'

/**
 * @desc    Get all events
 * @route   GET /api/events
 * @access  Public
 */
export const getEvents = async (req, res, next) => {
  try {
    const { type, featured, limit = 20, page = 1 } = req.query

    // Build query
    const query = { status: 'completed' }
    
    if (type) {
      query.type = type
    }
    
    if (featured === 'true') {
      query.featured = true
    }

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit)
    
    const [events, total] = await Promise.all([
      Event.find(query)
        .sort({ featured: -1, date: -1, order: 1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Event.countDocuments(query),
    ])

    res.status(200).json({
      success: true,
      count: events.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: events,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Get single event by ID
 * @route   GET /api/events/:id
 * @access  Public
 */
export const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      })
    }

    res.status(200).json({
      success: true,
      data: event,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Get featured events
 * @route   GET /api/events/featured
 * @access  Public
 */
export const getFeaturedEvents = async (req, res, next) => {
  try {
    const events = await Event.getFeatured()

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Create new event
 * @route   POST /api/events
 * @access  Private
 */
export const createEvent = async (req, res, next) => {
  try {
    const event = await Event.create(req.body)

    res.status(201).json({
      success: true,
      data: event,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Update event
 * @route   PUT /api/events/:id
 * @access  Private
 */
export const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      })
    }

    res.status(200).json({
      success: true,
      data: event,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Delete event
 * @route   DELETE /api/events/:id
 * @access  Private
 */
export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id)

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Get event types with counts
 * @route   GET /api/events/types
 * @access  Public
 */
export const getEventTypes = async (req, res, next) => {
  try {
    const types = await Event.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: '$type', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])

    const totalCount = await Event.countDocuments({ status: 'completed' })

    res.status(200).json({
      success: true,
      data: [
        { _id: 'all', count: totalCount },
        ...types,
      ],
    })
  } catch (error) {
    next(error)
  }
}
