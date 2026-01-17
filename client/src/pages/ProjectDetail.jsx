import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FiArrowLeft, FiExternalLink, FiCode, FiTarget, 
  FiShield, FiZap, FiLayers, FiCheck
} from 'react-icons/fi'
import api from '../services/api'
import MagneticWrapper from '../components/common/MagneticWrapper'
import ImageGallery from '../components/common/ImageGallery'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

// Fallback projects data (same as Projects.jsx)
const fallbackProjects = [
  {
    _id: '1',
    slug: 't1dubb',
    title: 'T1Dubb',
    tagline: 'AI-powered video dubbing platform built as a real startup product.',
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
    tagline: 'A professional desktop application for image editing and processing.',
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
    tagline: 'An all-in-one creative platform combining photo, design, and video tools.',
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
    tagline: 'A custom-built voice cloning AI system developed from scratch.',
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
    tagline: 'WordPress business website for an established Egyptian company specializing in photocopier and printer supplies.',
    description: 'WordPress business website for an established Egyptian company specializing in photocopier and printer supplies.',
    longDescription: `El Safa Trading is an established Egyptian company specializing in photocopier and printer supplies, including inks, toners, cartridges, and spare parts. The website was built to present the company's catalog, strengthen its digital presence, and support customer inquiries.`,
    techStack: ['WordPress', 'WooCommerce', 'Hosting', 'SEO Optimization'],
    image: '/images/projects/ElSafa/elsafa.png',
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
    tagline: 'WordPress restaurant website showcasing brand, menu offerings, and contact information in a clean and modern digital experience.',
    description: 'WordPress restaurant website showcasing brand, menu offerings, and contact information in a clean and modern digital experience.',
    longDescription: `Taj Restaurant is a restaurant located in Nasr City. The website was built to showcase the brand, menu offerings, and contact information in a clean and modern digital experience.`,
    techStack: ['WordPress', 'UI/UX Design', 'Hosting'],
    image: '/images/projects/Taj/taj-h.png',
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

const ProjectDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  console.log('ProjectDetail rendered with slug:', slug)

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true)
      try {
        // Try to fetch from API first
        const response = await api.get('/projects')
        if (response.data.success && response.data.data.length > 0) {
          const found = response.data.data.find(p => 
            p.slug === slug || 
            p.title.toLowerCase().replace(/\s+/g, '-') === slug
          )
          if (found) {
            setProject(found)
            setLoading(false)
            return
          }
        }
      } catch (error) {
        console.log('Using fallback projects:', error.message)
      }

      // Fallback to local data
      const found = fallbackProjects.find(p => p.slug === slug)
      console.log('Looking for slug:', slug)
      console.log('Available projects:', fallbackProjects.map(p => p.slug))
      if (found) {
        console.log('Found project:', found.title)
        setProject(found)
        setLoading(false)
      } else {
        console.log('Project not found for slug:', slug)
        // Project not found, but don't redirect immediately - show error
        setLoading(false)
      }
    }

    fetchProject()
  }, [slug])

  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [overviewRef, overviewInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [problemRef, problemInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-void" style={{ backgroundColor: '#050505' }}>
        <div className="w-12 h-12 border-2 border-cyan border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-void" style={{ backgroundColor: '#050505' }}>
        <div className="text-center">
          <h2 className="text-white text-2xl mb-4">Project not found</h2>
          <p className="text-text-secondary mb-6">The project "{slug}" could not be found.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-cyan text-void rounded-lg font-medium hover:bg-cyan/80 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-void" style={{ backgroundColor: '#050505' }}>
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-20"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-void via-void/80 to-void" />
        </div>

        {/* Grid lines */}
        <div className="grid-lines opacity-20" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative z-10 container mx-auto px-6 text-center"
        >
          {/* Back button */}
          <MagneticWrapper strength={0.2}>
            <motion.button
              onClick={() => navigate('/')}
              className="absolute top-0 left-6 flex items-center gap-2 text-text-secondary hover:text-white transition-colors mb-8"
              whileHover={{ x: -5 }}
            >
              <FiArrowLeft className="w-5 h-5" />
              <span>Back to Projects</span>
            </motion.button>
          </MagneticWrapper>

          {/* Type badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block px-4 py-2 rounded-full bg-cyan/20 border border-cyan/30 backdrop-blur-sm mb-6"
          >
            <span className="text-sm font-medium text-cyan">{project.type}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-display text-display-xl font-bold mb-6 text-white"
          >
            {project.title}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-text-secondary max-w-2xl mx-auto"
          >
            {project.tagline}
          </motion.p>
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-20">
        {/* Overview */}
        <motion.section
          ref={overviewRef}
          initial={{ opacity: 0, y: 40 }}
          animate={overviewInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <h2 className="font-display text-display-md font-bold text-white mb-6 flex items-center gap-3">
            <FiLayers className="text-cyan" />
            Overview
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            {project.longDescription}
          </p>
        </motion.section>

        {/* Problem & Solution */}
        {project.caseStudy && (
          <motion.section
            ref={problemRef}
            initial={{ opacity: 0, y: 40 }}
            animate={problemInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto mb-20"
          >
            <h2 className="font-display text-display-md font-bold text-white mb-8">
              Problem & Solution
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20">
                <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
                  <FiShield className="text-red-400" /> The Problem
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {project.caseStudy.problem}
                </p>
              </div>
              <div className="p-6 rounded-xl bg-green-500/5 border border-green-500/20">
                <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
                  <FiZap className="text-green-400" /> The Solution
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {project.caseStudy.solution}
                </p>
              </div>
            </div>
          </motion.section>
        )}

        {/* Key Features */}
        {project.caseStudy?.highlights && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={problemInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-20"
          >
            <h2 className="font-display text-display-md font-bold text-white mb-8 flex items-center gap-3">
              <FiTarget className="text-cyan" /> Key Features
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {project.caseStudy.highlights.map((highlight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={problemInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-surface/50 border border-white/5"
                >
                  <FiCheck className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
                  <span className="text-text-secondary">{highlight}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Technologies */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={problemInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <h2 className="font-display text-display-md font-bold text-white mb-8 flex items-center gap-3">
            <FiCode className="text-cyan" /> Technologies Used
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 text-sm font-mono bg-surface rounded-lg text-white border border-white/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Live Website Button */}
        {project.liveUrl && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={problemInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="max-w-4xl mx-auto mb-20"
          >
            <MagneticWrapper strength={0.1}>
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-cyan/10 border border-cyan/30 text-cyan font-medium hover:bg-cyan/20 transition-all group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiExternalLink className="w-5 h-5" />
                <span>Visit Live Website</span>
                <FiExternalLink className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
              </motion.a>
            </MagneticWrapper>
          </motion.section>
        )}

        {/* Media Gallery */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={problemInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-6xl mx-auto mb-20"
        >
          <h2 className="font-display text-display-md font-bold text-white mb-8">
            Project Gallery
          </h2>
          <ImageGallery 
            images={project.images || [project.image]} 
            title={project.title}
            folderPath={(() => {
              // Map project titles/slugs to actual folder names
              const folderMap = {
                'T1Dubb': 'T1Dubb',
                't1dubb': 'T1Dubb',
                'Toolbox': 'ToolBox',
                'toolbox': 'ToolBox',
                'Creative OS': 'Creative-OS',
                'creative-os': 'Creative-OS',
                'DeepClone': 'DeepClone',
                'deepclone': 'DeepClone',
                'El Safa Trading': 'El-Safa-Trading',
                'el-safa-trading': 'El-Safa-Trading',
                'Taj Restaurant': 'Taj-Restaurant',
                'taj-restaurant': 'Taj-Restaurant'
              }
              const folder = folderMap[project.title] || folderMap[project.slug] || project.slug
              const path = `/images/projects/${folder}`
              console.log('Project Gallery - Folder path:', path, 'Project:', project.title, 'Slug:', project.slug)
              return path
            })()}
          />
        </motion.section>

        {/* Outcome */}
        {project.outcome && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={problemInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-4xl mx-auto mb-20"
          >
            <h2 className="font-display text-display-md font-bold text-white mb-6">
              Outcome & Experience
            </h2>
            <div className="p-8 rounded-xl bg-surface/50 border border-white/5">
              <p className="text-lg text-text-secondary leading-relaxed">
                {project.outcome}
              </p>
            </div>
          </motion.section>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default ProjectDetail
