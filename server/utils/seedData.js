import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Project from '../models/Project.js'

dotenv.config()

/**
 * Projects data - exact content as provided
 */
const projects = [
  {
    title: 'T1Dubb',
    slug: 't1dubb',
    description: 'AI-powered video dubbing platform built as a real startup product.',
    longDescription: 'T1Dubb is an AI-based platform designed to automate video dubbing and localization. The product focuses on making video content accessible across languages using artificial intelligence, while preserving natural timing and delivery.',
    techStack: ['AI', 'Full-Stack Development', 'Video Processing', 'Product Architecture'],
    image: '/images/projects/t1dubb.jpg',
    category: 'Full-Stack',
    type: 'Startup',
    featured: true,
    order: 1,
    highlights: [
      'Built as a startup, not a prototype',
      'Real-world use case in media localization',
      'Validated through competition and jury evaluation',
      'Winner of a 50,000 EGP award',
    ],
    outcome: 'T1Dubb was developed as a complete startup product, validated through competition where it won a 50,000 EGP award. The project demonstrated the viability of AI-driven video localization and provided valuable experience in building production-ready AI products.',
  },
  {
    title: 'Toolbox',
    slug: 'toolbox',
    description: 'A professional desktop application for image editing and processing.',
    longDescription: 'Toolbox is a comprehensive image processing application inspired by professional photo-editing tools. It provides a wide range of features for enhancing, analyzing, and manipulating images through an intuitive desktop interface.',
    techStack: ['Desktop Development', 'Image Processing', 'UI/UX Design'],
    image: '/images/projects/toolbox.jpg',
    category: 'Desktop',
    type: 'Desktop App',
    featured: false,
    order: 2,
    highlights: [
      'Desktop-focused professional tool',
      'Multiple image processing and enhancement features',
      'Designed for productivity and usability',
      'Dark-themed interface optimized for long sessions',
    ],
    outcome: 'Toolbox successfully combines professional-grade image processing capabilities with an accessible interface, making advanced image manipulation available to a broader audience without sacrificing power or flexibility.',
  },
  {
    title: 'Creative OS',
    slug: 'creative-os',
    description: 'An all-in-one creative platform combining photo, design, and video tools.',
    longDescription: 'Creative OS is a full-stack desktop application that brings multiple creative workflows into a single unified system. Instead of switching between separate tools, users can handle photo editing, graphic design, and video editing inside one platform.',
    techStack: ['Full-Stack Development', 'Desktop Applications', 'Media Systems'],
    image: '/images/projects/creative-os.jpg',
    category: 'Full-Stack',
    type: 'Startup',
    featured: false,
    order: 3,
    highlights: [
      'Startup-level product vision',
      'Three creative modes in one system',
      'Unified core engine',
      'Focus on professional creative workflows',
    ],
    outcome: 'Creative OS represents a comprehensive approach to creative software, unifying multiple workflows into a single cohesive platform. The project demonstrates the ability to architect complex systems that serve diverse user needs while maintaining consistency and performance.',
  },
  {
    title: 'DeepClone',
    slug: 'deepclone',
    description: 'A custom-built voice cloning AI system developed from scratch.',
    longDescription: 'DeepClone is an end-to-end voice cloning project where the AI model itself was designed and built without relying on ready-made cloning services. The system focuses on replicating voice characteristics and generating synthetic speech based on learned patterns.',
    techStack: ['Artificial Intelligence', 'Machine Learning', 'Audio Processing'],
    image: '/images/projects/deepclone.jpg',
    category: 'AI',
    type: 'AI',
    featured: false,
    order: 4,
    highlights: [
      'Custom-built AI model',
      'Research-driven approach',
      'Focus on experimentation and learning',
      'End-to-end system design experience',
    ],
    outcome: 'DeepClone provided deep hands-on experience in building AI systems from the ground up, from model architecture to audio processing pipelines. The project reinforced the importance of understanding underlying technologies rather than relying solely on pre-built solutions.',
  },
  {
    title: 'El Safa Trading',
    slug: 'el-safa-trading',
    description: 'WordPress business website for an established Egyptian company specializing in photocopier and printer supplies.',
    longDescription: 'El Safa Trading is an established Egyptian company specializing in photocopier and printer supplies, including inks, toners, cartridges, and spare parts. The website was built to present the company\'s catalog, strengthen its digital presence, and support customer inquiries.',
    techStack: ['WordPress', 'WooCommerce', 'Hosting', 'SEO Optimization'],
    image: '/images/projects/el-safa-trading.jpg',
    category: 'Full-Stack',
    type: 'Web App',
    featured: false,
    order: 5,
    liveUrl: 'https://elsafa-egypt.com/',
    highlights: [
      'Full website design and development using WordPress',
      'Structured product categories and content for clarity',
      'Optimized performance and SEO for business visibility',
      'Responsive design across all devices',
    ],
    outcome: 'El Safa Trading now has a professional digital presence that effectively presents their catalog and supports customer inquiries. The website strengthens the company\'s market position and provides a solid foundation for future growth.',
  },
  {
    title: 'Taj Restaurant',
    slug: 'taj-restaurant',
    description: 'WordPress restaurant website showcasing brand, menu offerings, and contact information in a clean and modern digital experience.',
    longDescription: 'Taj Restaurant is a restaurant located in Nasr City. The website was built to showcase the brand, menu offerings, and contact information in a clean and modern digital experience.',
    techStack: ['WordPress', 'UI/UX Design', 'Hosting'],
    image: '/images/projects/taj-restaurant.jpg',
    category: 'Full-Stack',
    type: 'Web App',
    featured: false,
    order: 6,
    liveUrl: 'https://taj.restaurant.greennovas.com/',
    highlights: [
      'Custom restaurant website using WordPress',
      'Structured menu and content for easy navigation',
      'Mobile-first responsive design',
      'Fast loading and optimized user experience',
    ],
    outcome: 'Taj Restaurant now has a professional website that effectively showcases their brand and menu offerings. The clean, modern design provides an excellent user experience and supports customer engagement.',
  },
]

/**
 * Seed the database with projects
 */
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio')
    console.log('Connected to MongoDB')

    // Clear existing projects
    await Project.deleteMany({})
    console.log('Cleared existing projects')

    // Insert projects
    const inserted = await Project.insertMany(projects)
    console.log(`Inserted ${inserted.length} projects`)

    console.log('✓ Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('✗ Seeding failed:', error.message)
    process.exit(1)
  }
}

// Run seeder
seedDatabase()
