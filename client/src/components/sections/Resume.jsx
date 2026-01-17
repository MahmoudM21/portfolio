import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { 
  FiDownload, FiBriefcase, FiCode, FiAward, 
  FiBook, FiZap, FiExternalLink
} from 'react-icons/fi'
import MagneticWrapper from '../common/MagneticWrapper'
import SectionWrapper from '../common/SectionWrapper'

const Resume = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skills = {
    'Frontend': ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
    'Backend': ['Node.js', 'Express.js', 'Python', 'Django', 'REST APIs', 'MongoDB', 'Mongoose', 'PostgreSQL'],
    'CMS / E-Commerce': ['WordPress', 'Shopify'],
    'AI/ML': ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'TensorFlow', 'PyTorch'],
    'DevOps': ['Docker', 'CI/CD', 'AWS', 'Hostinger', 'Git', 'Linux', 'Nginx'],
    'Tools': ['Figma', 'VS Code', 'Postman', 'MongoDB Compass', 'Jira', 'Agile/Scrum'],
  }

  const selectedProjects = [
    { title: 'T1Dubb', slug: 't1dubb', category: 'AI Startup' },
    { title: 'Creative OS', slug: 'creative-os', category: 'Full-Stack' },
    { title: 'Toolbox', slug: 'toolbox', category: 'Desktop App' },
    { title: 'DeepClone', slug: 'deepclone', category: 'AI Research' },
  ]

  const events = [
    { title: 'Cairo AI Hackathon', role: 'Winner', achievement: '50,000 EGP Award' },
    { title: 'AI Caravan – MENA Region Summit', role: 'Participant' },
    { title: '1Billion Summit – AI Film Award', role: 'Finalist' },
  ]

  const handleDownloadCV = () => {
    // Open PDF in new tab, or download if browser supports it
    window.open('/cv/resume.pdf', '_blank')
  }

  return (
    <SectionWrapper id="resume" className="relative py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-block px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-sm font-medium mb-6"
            >
              Professional Resume
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-3xl sm:text-4xl md:text-display-lg font-bold text-white mb-4 sm:mb-6"
            >
              Curriculum Vitae
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto px-4 sm:px-0"
            >
              Full-Stack Engineer specializing in AI, backend systems, and product development
            </motion.p>
          </div>

          {/* Download Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mb-16"
          >
            <MagneticWrapper strength={0.3}>
            <motion.button
              onClick={handleDownloadCV}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-cyan/10 border border-cyan/30 backdrop-blur-sm text-white text-sm sm:text-base font-medium overflow-hidden min-h-[48px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-3">
                  <FiDownload className="w-5 h-5 text-cyan" />
                  <span>Download CV (PDF)</span>
                </div>
              </motion.button>
            </MagneticWrapper>
          </motion.div>

          {/* CV Preview Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="glass-card p-4 sm:p-6 md:p-8 lg:p-12 mb-8 sm:mb-12"
            >
            {/* Professional Summary */}
            <div className="mb-10">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                <FiBriefcase className="text-cyan w-5 h-5 sm:w-6 sm:h-6" />
                Professional Summary
              </h3>
              <p className="text-text-secondary leading-relaxed text-sm sm:text-base md:text-lg">
                Full-Stack Software Engineer with a strong focus on backend architecture, AI/ML systems, 
                and scalable product development. Experienced in building production-ready applications 
                from concept to deployment, with a proven track record in startup environments and 
                competitive hackathons. Passionate about leveraging AI to solve real-world problems 
                and creating elegant, performant systems.
              </p>
            </div>

            {/* Key Skills */}
            <div className="mb-10">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <FiCode className="text-cyan w-5 h-5 sm:w-6 sm:h-6" />
                Technical Skills
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {Object.entries(skills).map(([category, items], idx) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                    className="p-3 sm:p-4 rounded-xl bg-surface/50 border border-white/5"
                  >
                    <h4 className="font-semibold text-white mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">
                      {category}
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-mono bg-void rounded text-text-muted border border-white/5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Selected Projects */}
            <div className="mb-10">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <FiZap className="text-cyan w-5 h-5 sm:w-6 sm:h-6" />
                Selected Projects
              </h3>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {selectedProjects.map((project, idx) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 + idx * 0.1 }}
                  >
                    <Link
                      to={`/projects/${project.slug}`}
                      className="block p-3 sm:p-4 rounded-xl bg-surface/50 border border-white/5 hover:border-cyan/30 transition-all group min-h-[60px]"
                    >
                      <div className="flex items-start justify-between gap-3 sm:gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm sm:text-base text-white mb-1 group-hover:text-cyan transition-colors truncate">
                            {project.title}
                          </h4>
                          <p className="text-xs text-text-muted">{project.category}</p>
                        </div>
                        <FiExternalLink className="w-4 h-4 text-text-muted group-hover:text-cyan transition-colors shrink-0" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Events & Hackathons */}
            <div className="mb-10">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <FiAward className="text-cyan w-5 h-5 sm:w-6 sm:h-6" />
                Events & Hackathons
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {events.map((event, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
                    className="p-3 sm:p-4 rounded-xl bg-surface/50 border border-white/5"
                  >
                    <div className="flex items-start justify-between gap-3 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm sm:text-base text-white mb-1">{event.title}</h4>
                        <p className="text-xs sm:text-sm text-text-secondary">{event.role}</p>
                        {event.achievement && (
                          <p className="text-xs text-cyan mt-1">{event.achievement}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <FiBook className="text-cyan w-5 h-5 sm:w-6 sm:h-6" />
                Education
              </h3>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="p-3 sm:p-4 rounded-xl bg-surface/50 border border-white/5"
              >
                <h4 className="font-semibold text-sm sm:text-base text-white mb-1">Computer Science / Software Engineering</h4>
                <p className="text-xs sm:text-sm text-text-secondary">
                  Focus on Full-Stack Development, AI/ML, and System Design
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

export default Resume

