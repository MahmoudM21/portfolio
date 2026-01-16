import mongoose from 'mongoose'

/**
 * Event Schema
 * Represents hackathons, accelerators, conferences, and other professional events
 */
const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
      maxlength: [100, 'Role cannot exceed 100 characters'],
    },
    type: {
      type: String,
      required: [true, 'Event type is required'],
      enum: ['hackathon', 'accelerator', 'conference', 'workshop', 'competition', 'meetup'],
      default: 'hackathon',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    longDescription: {
      type: String,
      trim: true,
      maxlength: [2000, 'Long description cannot exceed 2000 characters'],
    },
    highlights: {
      type: [String],
      default: [],
    },
    techStack: {
      type: [String],
      default: [],
    },
    achievement: {
      type: String,
      trim: true,
      // e.g., "1st Place", "Finalist", "Best Technical Implementation"
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    endDate: {
      type: Date,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    isVirtual: {
      type: Boolean,
      default: false,
    },
    organizer: {
      type: String,
      trim: true,
    },
    teamSize: {
      type: Number,
      min: 1,
    },
    projectName: {
      type: String,
      trim: true,
    },
    projectUrl: {
      type: String,
      trim: true,
    },
    certificateUrl: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed'],
      default: 'completed',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Indexes
eventSchema.index({ type: 1 })
eventSchema.index({ date: -1 })
eventSchema.index({ featured: -1, order: 1 })
eventSchema.index({ status: 1 })

// Virtual for formatted date
eventSchema.virtual('formattedDate').get(function () {
  if (!this.date) return null
  return this.date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
})

// Virtual for duration (if endDate exists)
eventSchema.virtual('duration').get(function () {
  if (!this.date || !this.endDate) return null
  const days = Math.ceil((this.endDate - this.date) / (1000 * 60 * 60 * 24))
  return `${days} day${days !== 1 ? 's' : ''}`
})

// Static method to get all events sorted by date
eventSchema.statics.getAllSorted = function () {
  return this.find({ status: 'completed' }).sort({ date: -1 })
}

// Static method to get featured events
eventSchema.statics.getFeatured = function () {
  return this.find({ featured: true, status: 'completed' }).sort({ order: 1, date: -1 })
}

const Event = mongoose.model('Event', eventSchema)

export default Event
