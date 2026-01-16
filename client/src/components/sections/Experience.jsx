import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiBriefcase, FiCalendar, FiMapPin, FiExternalLink } from 'react-icons/fi'
import MagneticWrapper from '../common/MagneticWrapper'

const experiences = [
  {
    id: 1,
    role: 'Full-Stack Engineer',
    company: 'Freelance / Contract',
    location: 'Remote',
    period: '2023 - Present',
    type: 'current',
    description: 'Building scalable web applications and backend systems for startups and enterprises. Specializing in MERN stack development with focus on performance and maintainability.',
    achievements: [
      'Delivered 15+ production applications with 99.9% uptime',
      'Architected API gateway handling 50K+ requests/minute',
      'Reduced client infrastructure costs by 40% through optimization',
      'Integrated AI features using OpenAI and custom ML pipelines',
    ],
    techStack: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
  },
  {
    id: 2,
    role: 'Backend Developer',
    company: 'Tech Startup',
    location: 'Cairo, Egypt',
    period: '2022 - 2023',
    type: 'past',
    description: 'Led backend development for a growing SaaS platform, building robust APIs and real-time features that scaled with rapid user growth.',
    achievements: [
      'Built real-time notification system serving 10K+ concurrent users',
      'Implemented caching layer reducing database load by 60%',
      'Established CI/CD pipeline cutting deployment time by 75%',
      'Mentored 2 junior developers in best practices',
    ],
    techStack: ['Express', 'PostgreSQL', 'Redis', 'Socket.io'],
  },
  {
    id: 3,
    role: 'Junior Developer',
    company: 'Digital Agency',
    location: 'Alexandria, Egypt',
    period: '2021 - 2022',
    type: 'past',
    description: 'Started my professional journey building responsive websites and gradually transitioned to full-stack development.',
    achievements: [
      'Developed 20+ client websites with modern UI/UX',
      'Learned React ecosystem and modern JavaScript',
      'Built first full-stack application (e-commerce platform)',
      'Contributed to open-source projects',
    ],
    techStack: ['JavaScript', 'React', 'HTML/CSS', 'PHP'],
  },
]

const ExperienceCard = ({ experience, index, isLeft }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const isCurrent = experience.type === 'current'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`relative flex ${isLeft ? 'md:justify-end' : 'md:justify-start'} md:w-1/2 ${
        isLeft ? 'md:pr-12' : 'md:pl-12 md:ml-auto'
      }`}
    >
      {/* Timeline dot */}
      <div
        className={`hidden md:flex absolute top-8 ${
          isLeft ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'
        } w-4 h-4 rounded-full z-10 items-center justify-center ${
          isCurrent ? 'bg-cyan' : 'bg-surface-light border-2 border-cyan/50'
        }`}
      >
        {isCurrent && (
          <span className="absolute w-8 h-8 rounded-full bg-cyan/20 animate-ping" />
        )}
      </div>

      {/* Card */}
      <div className={`glass-card p-6 md:p-8 w-full md:max-w-lg group ${
        isCurrent ? 'border-cyan/20' : ''
      }`}>
        {/* Current badge */}
        {isCurrent && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/30 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan" />
            </span>
            <span className="text-xs font-medium text-cyan">Current Role</span>
          </div>
        )}

        {/* Header */}
        <div className="mb-4">
          <h3 className="font-display text-xl font-semibold text-white group-hover:text-cyan transition-colors">
            {experience.role}
          </h3>
          <p className="text-cyan font-medium">{experience.company}</p>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-text-muted">
            <span className="flex items-center gap-1">
              <FiCalendar className="w-4 h-4" />
              {experience.period}
            </span>
            <span className="flex items-center gap-1">
              <FiMapPin className="w-4 h-4" />
              {experience.location}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-text-secondary mb-4 text-sm leading-relaxed">
          {experience.description}
        </p>

        {/* Achievements */}
        <ul className="space-y-2 mb-6">
          {experience.achievements.map((achievement, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan mt-2 shrink-0" />
              {achievement}
            </li>
          ))}
        </ul>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {experience.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-mono bg-surface rounded text-text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const Experience = () => {
  const containerRef = useRef(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ['0%', '100%'])

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-light via-void to-void-light" />
      <div className="grid-lines opacity-20" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block font-mono text-cyan text-sm tracking-wider mb-4">
            // CAREER JOURNEY
          </span>
          <h2 className="font-display text-display-lg font-bold mb-4">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            From writing my first lines of code to architecting enterprise systems — 
            every step has been about continuous learning and delivering value.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-surface">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-cyan to-violet"
            />
          </div>

          {/* Mobile line */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-surface">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-cyan to-violet"
            />
          </div>

          {/* Experience cards */}
          <div className="space-y-12 md:space-y-0">
            {experiences.map((experience, index) => (
              <div key={experience.id} className="relative pl-12 md:pl-0 mb-12 md:mb-16">
                {/* Mobile dot */}
                <div className={`md:hidden absolute left-4 top-8 -translate-x-1/2 w-3 h-3 rounded-full z-10 ${
                  experience.type === 'current' ? 'bg-cyan' : 'bg-surface-light border-2 border-cyan/50'
                }`}>
                  {experience.type === 'current' && (
                    <span className="absolute w-6 h-6 -inset-1.5 rounded-full bg-cyan/20 animate-ping" />
                  )}
                </div>
                
                <ExperienceCard
                  experience={experience}
                  index={index}
                  isLeft={index % 2 === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Download Resume CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <MagneticWrapper strength={0.2}>
            <motion.a
              href="/mahmoud-bmawy-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="outline-button inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiBriefcase className="w-4 h-4" />
              <span>Download Full Resume</span>
              <FiExternalLink className="w-4 h-4" />
            </motion.a>
          </MagneticWrapper>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
