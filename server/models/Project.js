import mongoose from 'mongoose'

/**
 * Project Schema
 * Represents portfolio projects
 */
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
    },
    tagline: {
      type: String,
      trim: true,
      maxlength: [200, 'Tagline cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    longDescription: {
      type: String,
      trim: true,
      maxlength: [2000, 'Long description cannot exceed 2000 characters'],
    },
    techStack: {
      type: [String],
      required: [true, 'At least one technology is required'],
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'At least one technology is required',
      },
    },
    image: {
      type: String,
      required: [true, 'Project image URL is required'],
    },
    images: {
      type: [String],
      default: [],
    },
    liveUrl: {
      type: String,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Full-Stack', 'Frontend', 'Backend', 'Mobile', 'DevOps', 'AI/ML', 'Blockchain', 'Desktop', 'AI', 'Other'],
    },
    type: {
      type: String,
      enum: ['Startup', 'AI', 'Desktop App', 'Web App', 'Mobile App', 'Other'],
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
      enum: ['draft', 'published', 'archived'],
      default: 'published',
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    highlights: {
      type: [String],
      default: [],
    },
    caseStudy: {
      problem: {
        type: String,
        trim: true,
      },
      solution: {
        type: String,
        trim: true,
      },
      highlights: {
        type: [String],
        default: [],
      },
    },
    outcome: {
      type: String,
      trim: true,
      maxlength: [1000, 'Outcome cannot exceed 1000 characters'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Indexes
projectSchema.index({ category: 1 })
projectSchema.index({ slug: 1 })
projectSchema.index({ featured: -1, order: 1 })
projectSchema.index({ status: 1 })
projectSchema.index({ createdAt: -1 })

// Virtual for project duration
projectSchema.virtual('duration').get(function () {
  if (!this.startDate) return null
  const end = this.endDate || new Date()
  const months = Math.ceil((end - this.startDate) / (1000 * 60 * 60 * 24 * 30))
  return `${months} month${months !== 1 ? 's' : ''}`
})

// Static method to get published projects
projectSchema.statics.getPublished = function () {
  return this.find({ status: 'published' }).sort({ featured: -1, order: 1, createdAt: -1 })
}

// Static method to get featured projects
projectSchema.statics.getFeatured = function () {
  return this.find({ status: 'published', featured: true }).sort({ order: 1 })
}

const Project = mongoose.model('Project', projectSchema)

export default Project

