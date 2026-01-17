import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FiArrowLeft, FiCalendar, FiMapPin, FiUsers, FiAward, 
  FiCode, FiTarget, FiExternalLink, FiYoutube
} from 'react-icons/fi'
import api from '../services/api'
import MagneticWrapper from '../components/common/MagneticWrapper'
import ImageGallery from '../components/common/ImageGallery'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

// Fallback events data
const fallbackEvents = [
  {
    _id: '1',
    slug: 'cairo-ai-hackathon',
    title: 'Cairo AI Hackathon 2024',
    role: 'AI & Full-Stack Engineer',
    type: 'hackathon',
    description: 'A competitive AI-focused hackathon supporting startups and early-stage ideas, focused on innovation, idea validation, and feasibility assessment.',
    longDescription: `The Cairo AI Hackathon, organized by Athar Accelerator and Plan International, brought together ambitious developers and entrepreneurs to build AI-driven solutions that address real-world challenges. The event emphasized not just technical execution, but also market viability and social impact.

As an AI & Full-Stack Engineer, I worked intensively over 48 hours to develop a comprehensive solution that leveraged machine learning for practical applications. The hackathon environment pushed us to think critically about problem-solution fit, user experience, and technical feasibility under significant time constraints.

The experience was transformative—from rapid prototyping and iterative development to pitching our solution to a panel of judges from leading accelerators and investment firms. The collaborative atmosphere and mentorship opportunities provided invaluable insights into building products that matter.

Winning 3rd place and the 50,000 EGP award validated our technical approach and reinforced the importance of combining strong engineering with clear value proposition. This achievement reflects not just coding ability, but the capacity to execute under pressure and communicate technical concepts effectively.`,
    highlights: [
      'Won 3rd Place out of 50+ competing teams',
      'Awarded 50,000 EGP prize for technical excellence',
      'Built full-stack AI solution in 48-hour timeframe',
      'Presented to judges from Athar Accelerator and Plan International',
      'Validated technical approach through rigorous evaluation',
    ],
    techStack: ['Python', 'React', 'Node.js', 'TensorFlow', 'OpenAI API', 'MongoDB'],
    achievement: '3rd Place Winner • 50,000 EGP',
    date: '2024-03-15',
    endDate: '2024-03-17',
    location: 'Cairo, Egypt',
    organizer: 'Athar Accelerator & Plan International',
    teamSize: 4,
    image: '/images/events/cairo-ai-hackathon/cairo-ai-hackathon.jpg',
    images: [],
    featured: true,
  },
  {
    _id: '2',
    slug: 'ai-caravan-summit',
    title: 'AI Caravan – MENA Region Summit',
    role: 'Volunteer, Youth Mentor & Project Evaluator',
    type: 'conference',
    description: 'Regional summit focused on AI advancements and digital transformation, organized by IEEE in collaboration with Egyptian Ministry of Finance and Tax Authority.',
    longDescription: `The AI Caravan MENA Region Summit represents one of the most significant gatherings of AI professionals, researchers, and policymakers in the Middle East and North Africa. Organized by IEEE in collaboration with the Egyptian Ministry of Finance and Egyptian Tax Authority, the summit addressed critical topics around AI adoption in government, finance, and enterprise systems.

My involvement spanned multiple roles: as a volunteer, I helped coordinate technical sessions and workshops; as a youth projects mentor, I guided emerging developers in building AI-powered solutions; and as a project evaluator, I assessed technical submissions from across the region.

The summit covered transformative topics including AI-driven automation in tax systems, data governance frameworks, and digital transformation strategies for government services. Being part of the evaluation process gave me unique insights into how AI solutions are being deployed at scale in public sector contexts.

This experience reinforced my understanding that AI's impact extends far beyond code—it requires careful consideration of ethics, governance, and real-world deployment challenges. Mentoring young developers and evaluating regional projects was particularly rewarding, as it allowed me to contribute to the growing AI ecosystem in MENA.`,
    highlights: [
      'Volunteered at IEEE-organized regional summit',
      'Mentored youth AI projects from across MENA',
      'Evaluated technical submissions as project judge',
      'Engaged with government officials on AI policy',
      'Networked with 500+ AI professionals and researchers',
    ],
    techStack: ['AI/ML', 'Data Governance', 'Digital Transformation', 'Public Sector Tech'],
    date: '2024-01-20',
    endDate: '2024-01-22',
    location: 'Cairo, Egypt',
    organizer: 'IEEE, Egyptian Ministry of Finance, Egyptian Tax Authority',
    image: '/images/events/ai-caravan-summit/ai-caravan-summit.jpg',
    images: [],
    featured: true,
  },
  {
    _id: '3',
    slug: '1billion-summit',
    title: '1Billion Summit – AI Film Award',
    role: 'AI Filmmaker & Creative Technologist',
    type: 'competition',
    description: 'Global summit featuring AI Film Award category. Submitted "The Racer" — an AI-powered short film exploring the intersection of artificial intelligence and storytelling.',
    longDescription: `The 1Billion Summit is a global platform that brings together innovators, creators, and technologists to explore the future of AI across industries. The AI Film Award category specifically challenged participants to create short films that meaningfully integrate artificial intelligence—not just as a tool, but as a narrative element or creative collaborator.

My submission, "The Racer," was an experimental short film that explored themes of human-AI interaction through the lens of competitive racing. The project required deep technical work in AI video generation, scene composition, and narrative coherence—all while maintaining artistic integrity.

The film leveraged multiple AI tools for visual generation, scene transitions, and stylistic consistency. This wasn't just about using AI as a post-production tool; it was about understanding how AI can be a creative partner in storytelling, making decisions about pacing, visual style, and emotional tone.

While the film didn't win the award, the experience was invaluable. It pushed me to think about AI beyond traditional software applications and explore its potential in creative domains. The feedback from judges and fellow participants provided insights into how the industry views AI's role in media and entertainment.

This project reinforced that innovation isn't always about winning—it's about experimentation, learning, and contributing to the broader conversation about AI's creative potential.`,
    highlights: [
      'Created AI-powered short film "The Racer"',
      'Explored AI as creative storytelling partner',
      'Integrated multiple AI tools for visual generation',
      'Submitted to global competition with 1000+ entries',
      'Gained insights into AI\'s role in creative industries',
    ],
    techStack: ['AI Video Generation', 'Creative AI', 'Film Production', 'Narrative Design'],
    achievement: 'Official Selection',
    date: '2024-05-10',
    location: 'Global (Virtual)',
    organizer: '1Billion Summit',
    projectName: 'The Racer',
    projectUrl: 'https://youtu.be/mOMM3hP7Up0',
    image: '/images/events/1billion-summit/1billion-summit.jpg',
    images: [],
    featured: true,
  },
  {
    _id: '4',
    slug: 'ai-innovation-forum',
    title: 'Egypt AI Innovation Forum',
    role: 'Technical Speaker & Panelist',
    type: 'conference',
    description: 'Annual forum bringing together AI researchers, industry leaders, and policymakers to discuss the future of AI in Egypt and the broader MENA region.',
    longDescription: `The Egypt AI Innovation Forum serves as a critical platform for dialogue between academia, industry, and government on advancing AI capabilities in the region. The event featured keynotes from leading AI researchers, panel discussions on policy and ethics, and technical workshops on cutting-edge AI applications.

As a technical speaker, I presented on "Building Production-Ready AI Systems: From Prototype to Scale," sharing practical insights from my experience deploying AI solutions in real-world contexts. The talk covered topics including model optimization, infrastructure considerations, and maintaining reliability at scale.

Participating in a panel discussion on "AI Talent Development in MENA" allowed me to contribute to the conversation about building sustainable AI ecosystems. We discussed educational pathways, industry-academia collaboration, and strategies for retaining technical talent in the region.

The forum provided valuable networking opportunities with researchers from Egyptian universities, representatives from multinational tech companies, and government officials working on AI strategy. These connections have led to ongoing collaborations and knowledge exchange.`,
    highlights: [
      'Presented technical talk on production AI systems',
      'Participated in panel on AI talent development',
      'Networked with 200+ AI professionals and researchers',
      'Engaged with government officials on AI policy',
      'Contributed to regional AI ecosystem development',
    ],
    techStack: ['AI Systems Architecture', 'MLOps', 'Production AI', 'Technical Leadership'],
    date: '2023-11-15',
    endDate: '2023-11-17',
    location: 'Cairo, Egypt',
    organizer: 'Egypt AI Innovation Forum',
    image: '/images/events/ai-innovation-forum/ai-innovation-forum.jpg',
    images: [],
    featured: false,
  },
]

const typeColors = {
  hackathon: { bg: 'bg-cyan/20', text: 'text-cyan', border: 'border-cyan/30' },
  accelerator: { bg: 'bg-violet/20', text: 'text-violet', border: 'border-violet/30' },
  conference: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
  workshop: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
  competition: { bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/30' },
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const EventDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true)
      try {
        const response = await api.get('/events')
        if (response.data.success && response.data.data.length > 0) {
          const found = response.data.data.find(e => 
            e.slug === slug || 
            e.title.toLowerCase().replace(/\s+/g, '-') === slug
          )
          if (found) {
            setEvent(found)
            setLoading(false)
            return
          }
        }
      } catch (error) {
        console.log('Using fallback events:', error.message)
      }

      const found = fallbackEvents.find(e => e.slug === slug)
      if (found) {
        setEvent(found)
        setLoading(false)
      } else {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [slug])

  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [overviewRef, overviewInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [highlightsRef, highlightsInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-void" style={{ backgroundColor: '#050505' }}>
        <div className="w-12 h-12 border-2 border-cyan border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-void" style={{ backgroundColor: '#050505' }}>
        <div className="text-center">
          <h2 className="text-white text-2xl mb-4">Event not found</h2>
          <p className="text-text-secondary mb-6">The event "{slug}" could not be found.</p>
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

  const typeStyle = typeColors[event.type] || typeColors.conference

  return (
    <div className="min-h-screen bg-void" style={{ backgroundColor: '#050505' }}>
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover opacity-20"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'
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
          className="relative z-10 container mx-auto px-4 sm:px-6 text-center"
        >
          {/* Back button */}
          <MagneticWrapper strength={0.2}>
            <motion.button
              onClick={() => navigate('/')}
              className="absolute top-0 left-4 sm:left-6 flex items-center gap-2 text-text-secondary hover:text-white transition-colors mb-8 text-sm sm:text-base min-h-[44px]"
              whileHover={{ x: -5 }}
            >
              <FiArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Back to Events</span>
              <span className="sm:hidden">Back</span>
            </motion.button>
          </MagneticWrapper>

          {/* Type badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`inline-block px-4 py-2 rounded-full ${typeStyle.bg} border ${typeStyle.border} backdrop-blur-sm mb-6`}
          >
            <span className={`text-sm font-medium ${typeStyle.text} capitalize`}>{event.type}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-display text-3xl sm:text-4xl md:text-display-xl font-bold mb-4 sm:mb-6 text-white px-4 sm:px-0"
          >
            {event.title}
          </motion.h1>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-cyan mb-4 px-4 sm:px-0"
          >
            {event.role}
          </motion.p>

          {/* Achievement */}
          {event.achievement && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/30 backdrop-blur-sm"
            >
              <FiAward className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">{event.achievement}</span>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        {/* Overview */}
        <motion.section
          ref={overviewRef}
          initial={{ opacity: 0, y: 40 }}
          animate={overviewInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-display-md font-bold text-white mb-4 sm:mb-6">Overview</h2>
          <p className="text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed whitespace-pre-line">
            {event.longDescription || event.description}
          </p>
        </motion.section>

        {/* Meta Info */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={overviewInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-surface/50 border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <FiCalendar className="w-5 h-5 text-cyan" />
                <h3 className="font-display font-semibold text-white">Date</h3>
              </div>
              <p className="text-text-secondary">
                {formatDate(event.date)}
                {event.endDate && ` - ${formatDate(event.endDate)}`}
              </p>
            </div>
            <div className="p-6 rounded-xl bg-surface/50 border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <FiMapPin className="w-5 h-5 text-cyan" />
                <h3 className="font-display font-semibold text-white">Location</h3>
              </div>
              <p className="text-text-secondary">{event.location}</p>
            </div>
            {event.teamSize && (
              <div className="p-6 rounded-xl bg-surface/50 border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <FiUsers className="w-5 h-5 text-cyan" />
                  <h3 className="font-display font-semibold text-white">Team Size</h3>
                </div>
                <p className="text-text-secondary">Team of {event.teamSize}</p>
              </div>
            )}
            {event.organizer && (
              <div className="p-6 rounded-xl bg-surface/50 border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <FiAward className="w-5 h-5 text-cyan" />
                  <h3 className="font-display font-semibold text-white">Organizer</h3>
                </div>
                <p className="text-text-secondary">{event.organizer}</p>
              </div>
            )}
          </div>
        </motion.section>

        {/* Highlights */}
        {event.highlights && event.highlights.length > 0 && (
          <motion.section
            ref={highlightsRef}
            initial={{ opacity: 0, y: 40 }}
            animate={highlightsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto mb-20"
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-display-md font-bold text-white mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
              <FiTarget className="text-cyan w-5 h-5 sm:w-6 sm:h-6" /> Key Highlights
            </h2>
            <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
              {event.highlights.map((highlight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={highlightsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-surface/50 border border-white/5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan mt-2 shrink-0" />
                  <span className="text-xs sm:text-sm text-text-secondary">{highlight}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Tech Stack */}
        {event.techStack && event.techStack.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={highlightsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-20"
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-display-md font-bold text-white mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
              <FiCode className="text-cyan w-5 h-5 sm:w-6 sm:h-6" /> Technologies & Focus Areas
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {event.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-mono bg-surface rounded-lg text-white border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.section>
        )}

        {/* Project Link */}
        {event.projectName && event.projectUrl && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={highlightsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl mx-auto mb-20"
          >
            <div className="p-4 sm:p-6 rounded-xl bg-surface/50 border border-white/5">
              <p className="text-xs sm:text-sm text-text-muted mb-2">Project</p>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-white font-medium text-sm sm:text-base md:text-lg truncate">{event.projectName}</span>
                <MagneticWrapper strength={0.2}>
                  <motion.a
                    href={event.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan hover:text-white transition-colors shrink-0 min-h-[44px] flex items-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FiYoutube className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.a>
                </MagneticWrapper>
              </div>
            </div>
          </motion.section>
        )}

        {/* Image Gallery */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={highlightsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-6xl mx-auto mb-20"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-display-md font-bold text-white mb-6 sm:mb-8">Event Gallery</h2>
          <ImageGallery 
            images={event.images || []} 
            title={event.title}
            folderPath={(() => {
              const folderMap = {
                '1': 'Cairo-ai',
                '2': 'ai-region-summit',
                '3': '1billion-summit',
                '4': 'ai-innovation-forum'
              }
              const folder = folderMap[event._id] || event._id
              const path = `/images/events/${folder}`
              console.log('Event Detail Gallery - Folder path:', path, 'Event:', event.title)
              return path
            })()}
          />
        </motion.section>
      </div>

      <Footer />
    </div>
  )
}

export default EventDetail

