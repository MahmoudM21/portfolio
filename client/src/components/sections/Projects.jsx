import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'
import api from '../../services/api'
import MagneticWrapper from '../common/MagneticWrapper'

// Projects data - exact content as provided
const fallbackProjects = [
  {
    _id: '1',
    slug: 't1dubb',
    title: 'T1Dubb',
    description: 'AI-powered video dubbing platform built as a real startup product.',
    longDescription: `T1Dubb is an AI-based platform designed to automate video dubbing and localization. The product focuses on making video content accessible across languages using artificial intelligence, while preserving natural timing and delivery.`,
    techStack: ['AI', 'Full-Stack Development', 'Video Processing', 'Product Architecture'],
    image: '/images/projects/t1dubb.jpg',
    images: [], // Will be auto-discovered from folder
    featured: true,
    category: 'Full-Stack',
    type: 'Startup',
    caseStudy: {
      problem: 'Video creators and businesses face high costs and long turnaround times when localizing content for different markets.',
      solution: 'T1Dubb provides an AI-driven workflow that enables fast, scalable video dubbing, reducing cost and effort while maintaining quality.',
      highlights: [
        'Built as a startup, not a prototype',
        'Real-world use case in media localization',
        'Validated through competition and jury evaluation',
        'Winner of a 50,000 EGP award',
      ],
    },
    outcome: 'T1Dubb was developed as a complete startup product, validated through competition where it won a 50,000 EGP award. The project demonstrated the viability of AI-driven video localization and provided valuable experience in building production-ready AI products.',
  },
  {
    _id: '2',
    slug: 'toolbox',
    title: 'Toolbox',
    description: 'A professional desktop application for image editing and processing.',
    longDescription: `Toolbox is a comprehensive image processing application inspired by professional photo-editing tools. It provides a wide range of features for enhancing, analyzing, and manipulating images through an intuitive desktop interface.`,
    techStack: ['Desktop Development', 'Image Processing', 'UI/UX Design'],
    image: '/images/projects/toolbox.jpg',
    images: [], // Will be auto-discovered from folder
    featured: false,
    category: 'Desktop',
    type: 'Desktop App',
    caseStudy: {
      problem: 'Many image processing tools are either too limited or too complex for everyday workflows.',
      solution: 'Toolbox delivers a balanced solution by combining powerful image manipulation features with a clean and user-friendly experience.',
      highlights: [
        'Desktop-focused professional tool',
        'Multiple image processing and enhancement features',
        'Designed for productivity and usability',
        'Dark-themed interface optimized for long sessions',
      ],
    },
    outcome: 'Toolbox successfully combines professional-grade image processing capabilities with an accessible interface, making advanced image manipulation available to a broader audience without sacrificing power or flexibility.',
  },
  {
    _id: '3',
    slug: 'creative-os',
    title: 'Creative OS',
    description: 'An all-in-one creative platform combining photo, design, and video tools.',
    longDescription: `Creative OS is a full-stack desktop application that brings multiple creative workflows into a single unified system. Instead of switching between separate tools, users can handle photo editing, graphic design, and video editing inside one platform.`,
    techStack: ['Full-Stack Development', 'Desktop Applications', 'Media Systems'],
    image: '/images/projects/creative-os.jpg',
    images: [], // Will be auto-discovered from folder
    featured: false,
    category: 'Full-Stack',
    type: 'Startup',
    caseStudy: {
      problem: 'Creative professionals rely on multiple disconnected tools, leading to fragmented workflows and inefficiency.',
      solution: 'Creative OS introduces a unified creative environment with shared resources, consistent workflows, and an integrated experience.',
      highlights: [
        'Startup-level product vision',
        'Three creative modes in one system',
        'Unified core engine',
        'Focus on professional creative workflows',
      ],
    },
    outcome: 'Creative OS represents a comprehensive approach to creative software, unifying multiple workflows into a single cohesive platform. The project demonstrates the ability to architect complex systems that serve diverse user needs while maintaining consistency and performance.',
  },
  {
    _id: '4',
    slug: 'deepclone',
    title: 'DeepClone',
    description: 'A custom-built voice cloning AI system developed from scratch.',
    longDescription: `DeepClone is an end-to-end voice cloning project where the AI model itself was designed and built without relying on ready-made cloning services. The system focuses on replicating voice characteristics and generating synthetic speech based on learned patterns.`,
    techStack: ['Artificial Intelligence', 'Machine Learning', 'Audio Processing'],
    image: '/images/projects/deepclone.jpg',
    images: [], // Will be auto-discovered from folder
    featured: false,
    category: 'AI',
    type: 'AI',
    caseStudy: {
      problem: 'Most voice cloning solutions depend on closed or third-party systems, limiting control and experimentation.',
      solution: 'DeepClone was built to explore voice synthesis deeply, providing full control over the model pipeline and experimentation process.',
      highlights: [
        'Custom-built AI model',
        'Research-driven approach',
        'Focus on experimentation and learning',
        'End-to-end system design experience',
      ],
    },
    outcome: 'DeepClone provided deep hands-on experience in building AI systems from the ground up, from model architecture to audio processing pipelines. The project reinforced the importance of understanding underlying technologies rather than relying solely on pre-built solutions.',
  },
  {
    _id: '5',
    slug: 'el-safa-trading',
    title: 'El Safa Trading',
    description: 'WordPress business website for an established Egyptian company specializing in photocopier and printer supplies.',
    longDescription: `El Safa Trading is an established Egyptian company specializing in photocopier and printer supplies, including inks, toners, cartridges, and spare parts. The website was built to present the company's catalog, strengthen its digital presence, and support customer inquiries.`,
    techStack: ['WordPress', 'WooCommerce', 'Hosting', 'SEO Optimization'],
    image: '/images/projects/el-safa-trading.jpg',
    images: [], // Will be auto-discovered from folder
    featured: false,
    category: 'Full-Stack',
    type: 'Web App',
    liveUrl: 'https://elsafa-egypt.com/',
    caseStudy: {
      problem: 'El Safa Trading needed a professional digital presence to showcase their product catalog and support customer inquiries in the competitive office supplies market.',
      solution: 'A custom WordPress website was designed and developed with structured product categories, optimized performance, and SEO to strengthen the company\'s digital presence and support business growth.',
      highlights: [
        'Full website design and development using WordPress',
        'Structured product categories and content for clarity',
        'Optimized performance and SEO for business visibility',
        'Responsive design across all devices',
      ],
    },
    outcome: 'El Safa Trading now has a professional digital presence that effectively presents their catalog and supports customer inquiries. The website strengthens the company\'s market position and provides a solid foundation for future growth.',
  },
  {
    _id: '6',
    slug: 'taj-restaurant',
    title: 'Taj Restaurant',
    description: 'WordPress restaurant website showcasing brand, menu offerings, and contact information in a clean and modern digital experience.',
    longDescription: `Taj Restaurant is a restaurant located in Nasr City. The website was built to showcase the brand, menu offerings, and contact information in a clean and modern digital experience.`,
    techStack: ['WordPress', 'UI/UX Design', 'Hosting'],
    image: '/images/projects/taj-restaurant.jpg',
    images: [], // Will be auto-discovered from folder
    featured: false,
    category: 'Full-Stack',
    type: 'Web App',
    liveUrl: 'https://taj.restaurant.greennovas.com/',
    caseStudy: {
      problem: 'Taj Restaurant needed a modern digital presence to showcase their brand and menu offerings, making it easy for customers to discover and contact the restaurant.',
      solution: 'A custom WordPress restaurant website was built with structured menu content, mobile-first responsive design, and optimized user experience to effectively showcase the brand and support customer engagement.',
      highlights: [
        'Custom restaurant website using WordPress',
        'Structured menu and content for easy navigation',
        'Mobile-first responsive design',
        'Fast loading and optimized user experience',
      ],
    },
    outcome: 'Taj Restaurant now has a professional website that effectively showcases their brand and menu offerings. The clean, modern design provides an excellent user experience and supports customer engagement.',
  },
]

const categories = ['All', 'Full-Stack', 'Desktop', 'AI']

const ProjectCard = ({ project, index }) => {
  const navigate = useNavigate()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleClick = () => {
    const slug = project.slug || project.title.toLowerCase().replace(/\s+/g, '-')
    navigate(`/projects/${slug}`, { replace: false })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`${project.featured ? 'md:col-span-2' : ''}`}
    >
      <div
        onClick={handleClick}
        className="glass-card overflow-hidden group cursor-pointer hover:border-cyan/30 transition-all"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick(e)
          }
        }}
      >
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
            }}
            />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent pointer-events-none" />
        
          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-cyan/20 border border-cyan/30 backdrop-blur-sm">
              <span className="text-xs font-medium text-cyan">Featured</span>
            </div>
          )}
        
          {/* Category */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
            <span className="text-xs font-medium text-white">{project.category}</span>
          </div>
        </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="font-display text-xl font-semibold text-white mb-2 group-hover:text-cyan transition-colors">
              {project.title}
            </h3>
            <p className="text-text-secondary text-sm mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs font-mono bg-surface-light rounded text-text-muted"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="px-2 py-1 text-xs font-mono text-text-muted">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>

            {/* View case study */}
            <div className="flex items-center text-cyan text-sm font-medium group-hover:gap-2 transition-all">
              <span>View Case Study</span>
              <FiChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </div>
          </div>
        </div>
    </motion.div>
  )
}

const Projects = () => {
  const [projects, setProjects] = useState(fallbackProjects)
  const [filteredProjects, setFilteredProjects] = useState(fallbackProjects)
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects')
        if (response.data.success && response.data.data.length > 0) {
          setProjects(response.data.data)
          setFilteredProjects(response.data.data)
        }
      } catch (error) {
        console.log('Using fallback projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Filter projects by category
  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter((p) => p.category === activeCategory))
    }
  }, [activeCategory, projects])


  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void-light to-void" />
      <div className="grid-lines opacity-20" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-mono text-cyan text-sm tracking-wider mb-4">
            // SELECTED WORK
          </span>
          <h2 className="font-display text-display-lg font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            A collection of projects that showcase my expertise in building 
            scalable, user-centric applications.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-cyan text-void'
                  : 'bg-surface text-text-secondary hover:text-white hover:bg-surface-light'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={index}
            />
          ))}
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && !loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-text-muted py-12"
          >
            No projects found in this category.
          </motion.p>
        )}
      </div>
    </section>
  )
}

export default Projects
