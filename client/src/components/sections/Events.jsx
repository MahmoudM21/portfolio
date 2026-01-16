import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FiCalendar, FiMapPin, FiUsers, FiAward, 
  FiExternalLink, FiCode, FiZap, FiTarget, FiTrendingUp,
  FiFilm, FiYoutube
} from 'react-icons/fi'
import api from '../../services/api'
import MagneticWrapper from '../common/MagneticWrapper'
import ImageGallery from '../common/ImageGallery'

// Real professional events data
const realEvents = [
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
    images: [], // Will be auto-discovered from folder
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
    images: [], // Will be auto-discovered from folder
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
    images: [], // Will be auto-discovered from folder
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
    images: [], // Will be auto-discovered from folder
    featured: false,
  },
]

// Type badge colors
const typeColors = {
  hackathon: { bg: 'bg-cyan/20', text: 'text-cyan', border: 'border-cyan/30' },
  accelerator: { bg: 'bg-violet/20', text: 'text-violet', border: 'border-violet/30' },
  conference: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
  workshop: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
  competition: { bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/30' },
}

// Type icons
const typeIcons = {
  hackathon: FiCode,
  accelerator: FiTrendingUp,
  conference: FiUsers,
  workshop: FiTarget,
  competition: FiFilm,
}

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

// Event Card Component
const EventCard = ({ event, index }) => {
  const navigate = useNavigate()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const typeStyle = typeColors[event.type] || typeColors.hackathon
  const TypeIcon = typeIcons[event.type] || FiCode

  const handleClick = () => {
    const slug = event.slug || event.title.toLowerCase().replace(/\s+/g, '-')
    navigate(`/events/${slug}`)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onClick={handleClick}
      className="group cursor-pointer"
    >
      <div className="glass-card overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              // Fallback to placeholder if image doesn't load
              e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent" />
          
          {/* Type badge */}
          <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full ${typeStyle.bg} border ${typeStyle.border} backdrop-blur-sm flex items-center gap-1.5`}>
            <TypeIcon className={`w-3.5 h-3.5 ${typeStyle.text}`} />
            <span className={`text-xs font-medium ${typeStyle.text} capitalize`}>
              {event.type}
            </span>
          </div>

          {/* Achievement badge */}
          {event.achievement && (
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 backdrop-blur-sm flex items-center gap-1.5">
              <FiAward className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-xs font-medium text-yellow-400">
                {event.achievement}
              </span>
            </div>
          )}

          {/* Date overlay */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/80">
            <FiCalendar className="w-4 h-4" />
            <span className="text-sm font-medium">{formatDate(event.date)}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="font-display text-xl font-semibold text-white mb-2 group-hover:text-cyan transition-colors line-clamp-2">
            {event.title}
          </h3>
          
          <p className="text-cyan text-sm font-medium mb-3">{event.role}</p>
          
          <p className="text-text-secondary text-sm mb-4 line-clamp-2 flex-1">
            {event.description}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap gap-3 text-text-muted text-xs mb-4">
            <span className="flex items-center gap-1">
              <FiMapPin className="w-3.5 h-3.5" />
              {event.location}
            </span>
            {event.teamSize && (
              <span className="flex items-center gap-1">
                <FiUsers className="w-3.5 h-3.5" />
                Team of {event.teamSize}
              </span>
            )}
          </div>

          {/* Tech stack preview */}
          {event.techStack && event.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {event.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-xs font-mono bg-surface rounded text-text-muted"
                >
                  {tech}
                </span>
              ))}
              {event.techStack.length > 3 && (
                <span className="px-2 py-0.5 text-xs font-mono text-text-muted">
                  +{event.techStack.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan/5 to-violet/5" />
        </div>
      </div>
    </motion.div>
  )
}

// Main Events Component
const Events = () => {
  const [events, setEvents] = useState(realEvents)
  const [loading, setLoading] = useState(true)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Fetch events from backend (optional - falls back to realEvents)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events')
        if (response.data.success && response.data.data.length > 0) {
          setEvents(response.data.data)
        }
      } catch (error) {
        // Use realEvents as fallback
        console.log('Using local events data')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  // Lock body scroll when modal is open

  return (
    <section id="events" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void-light to-void" />
      <div className="aurora-bg opacity-20" />
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
            // EXPERIENCES
          </span>
          <h2 className="font-display text-display-lg font-bold mb-4">
            Events, Hackathons &{' '}
            <span className="gradient-text">Industry Participation</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Active participation in the tech ecosystem—from competitive hackathons 
            to mentoring and knowledge sharing at regional summits.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-8 mb-16"
        >
          {[
            { value: '3rd', label: 'Place Winner' },
            { value: '50K', label: 'EGP Award' },
            { value: '4+', label: 'Events' },
            { value: '500+', label: 'Professionals Networked' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <span className="block font-display text-3xl font-bold gradient-text">
                {stat.value}
              </span>
              <span className="text-sm text-text-muted">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Events grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <EventCard
              key={event._id}
              event={event}
              index={index}
            />
          ))}
        </div>

        {/* Empty state */}
        {events.length === 0 && !loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-text-muted py-12"
          >
            No events to display.
          </motion.p>
        )}

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-text-secondary mb-4">
            Interested in having me at your hackathon or event?
          </p>
          <MagneticWrapper strength={0.2}>
            <motion.a
              href="#contact"
              className="outline-button inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Let&apos;s Connect</span>
              <FiExternalLink className="w-4 h-4" />
            </motion.a>
          </MagneticWrapper>
        </motion.div>
      </div>

    </section>
  )
}

export default Events
