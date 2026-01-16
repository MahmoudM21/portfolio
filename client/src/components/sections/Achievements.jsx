import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiAward, FiUsers, FiZap, FiTrendingUp, FiStar, FiCode, FiGlobe, FiCpu } from 'react-icons/fi'

const achievements = [
  {
    icon: FiCode,
    value: '50K+',
    label: 'Lines of Code',
    description: 'In production applications',
  },
  {
    icon: FiGlobe,
    value: '20+',
    label: 'Projects Shipped',
    description: 'From MVPs to enterprise',
  },
  {
    icon: FiZap,
    value: '99.9%',
    label: 'Uptime Achieved',
    description: 'On critical systems',
  },
  {
    icon: FiUsers,
    value: '100K+',
    label: 'Users Served',
    description: 'Across all platforms',
  },
]

const highlights = [
  {
    title: 'API Gateway Architecture',
    organization: 'Enterprise Project',
    year: '2024',
    description: 'Designed and built a high-performance API gateway handling 50K+ requests per minute with sub-30ms response times.',
    icon: FiTrendingUp,
    color: 'from-cyan to-blue-500',
  },
  {
    title: 'AI Integration Specialist',
    organization: 'Multiple Projects',
    year: '2024',
    description: 'Implemented AI-powered features using OpenAI, LangChain, and custom ML pipelines for enterprise clients.',
    icon: FiCpu,
    color: 'from-violet to-purple-600',
  },
  {
    title: 'Open Source Contributor',
    organization: 'GitHub Community',
    year: '2023',
    description: 'Active contributor to React and Node.js ecosystems with focus on developer tooling and performance.',
    icon: FiCode,
    color: 'from-green-400 to-emerald-500',
  },
  {
    title: 'System Design Excellence',
    organization: 'Freelance Portfolio',
    year: '2023',
    description: 'Architected scalable microservices infrastructure reducing client costs by 40% while improving performance.',
    icon: FiAward,
    color: 'from-yellow-400 to-orange-500',
  },
]

const Achievements = () => {
  const containerRef = useRef(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section
      ref={containerRef}
      id="achievements"
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void-light to-void" />
      <div className="aurora-bg opacity-30" />
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
            // TRACK RECORD
          </span>
          <h2 className="font-display text-display-lg font-bold mb-4">
            Impact & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Numbers that reflect my commitment to building software that 
            performs, scales, and delivers real business value.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 text-center group"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan/20 to-violet/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <achievement.icon className="w-7 h-7 text-cyan" />
              </div>
              <div className="font-display text-4xl font-bold gradient-text mb-2">
                {achievement.value}
              </div>
              <h3 className="font-medium text-white mb-1">{achievement.label}</h3>
              <p className="text-sm text-text-muted">{achievement.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Highlights grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="font-display text-2xl font-semibold text-white text-center mb-10">
            Key Highlights
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="glass-card p-6 group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br ${highlight.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <highlight.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-display font-semibold text-white group-hover:text-cyan transition-colors">
                        {highlight.title}
                      </h4>
                      <span className="text-sm text-text-muted font-mono">
                        {highlight.year}
                      </span>
                    </div>
                    <p className="text-sm text-cyan mb-2">{highlight.organization}</p>
                    <p className="text-sm text-text-secondary leading-relaxed">{highlight.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Philosophy quote */}
        <motion.blockquote
          style={{ y }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="font-display text-2xl md:text-3xl text-white/80 italic max-w-3xl mx-auto leading-relaxed">
            &ldquo;The best code is the one that solves real problems elegantly — 
            not the one that shows off technical complexity.&rdquo;
          </p>
          <cite className="block mt-4 text-cyan not-italic font-medium">
            — My Engineering Philosophy
          </cite>
        </motion.blockquote>
      </div>
    </section>
  )
}

export default Achievements
