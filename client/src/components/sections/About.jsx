import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { RevealText } from '../common/AnimatedText'
import { FiCode, FiServer, FiCpu, FiZap, FiLayers, FiTrendingUp } from 'react-icons/fi'

const highlights = [
  {
    icon: FiLayers,
    title: 'Full-Stack Architecture',
    description: 'End-to-end systems from database design to pixel-perfect UIs',
  },
  {
    icon: FiServer,
    title: 'Backend Engineering',
    description: 'Scalable APIs, microservices, and distributed systems',
  },
  {
    icon: FiCpu,
    title: 'AI Integration',
    description: 'Building intelligent features with LLMs and ML pipelines',
  },
  {
    icon: FiTrendingUp,
    title: 'Product Mindset',
    description: 'Shipping features that drive real business outcomes',
  },
]

const About = () => {
  const containerRef = useRef(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const rotate = useTransform(scrollYProgress, [0, 1], [5, -5])

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void-light to-void" />
      <div className="grid-lines opacity-20" />
      
      {/* Floating accent */}
      <motion.div
        style={{ y, rotate }}
        className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-cyan/10 to-violet/10 blur-3xl"
      />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-20"
        >
          <span className="inline-block font-mono text-cyan text-sm tracking-wider mb-4">
            // ABOUT ME
          </span>
          <h2 className="font-display text-display-lg font-bold mb-8">
            <RevealText text="Engineering the" delay={0.1} />
            <br />
            <span className="gradient-text">
              <RevealText text="Future of Digital" delay={0.2} />
            </span>
          </h2>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Story */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-xl text-white leading-relaxed font-medium">
              I&apos;m Mahmoud Hammad 😎 BMawy 😎 — a Full-Stack Engineer who doesn&apos;t just write code, 
              but architects systems that scale and products that matter.
            </p>
            
            <p className="text-lg text-text-secondary leading-relaxed">
              My journey started with a simple question: <span className="text-white">&quot;How do 
              the best products work under the hood?&quot;</span> That curiosity led me deep into 
              backend systems, database optimization, and eventually to building complete 
              platforms from scratch.
            </p>
            
            <p className="text-lg text-text-secondary leading-relaxed">
              Today, I specialize in the <span className="text-cyan">MERN stack</span>, 
              crafting everything from real-time APIs handling thousands of concurrent 
              connections to AI-powered applications that bring intelligence to everyday 
              workflows. I&apos;ve learned that great engineering isn&apos;t about using the 
              newest framework — it&apos;s about choosing the right tool for the job and 
              executing with precision.
            </p>

            <p className="text-lg text-text-secondary leading-relaxed">
              What drives me? The moment when complex systems click together seamlessly. 
              When a user interacts with something I built and it just <span className="text-white italic">works</span> — 
              fast, intuitive, reliable. That&apos;s the standard I hold myself to.
            </p>

            {/* Philosophy quote */}
            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="border-l-2 border-cyan pl-6 my-8"
            >
              <p className="text-white/90 italic text-lg">
                &quot;I don&apos;t build features. I build foundations that let products evolve.&quot;
              </p>
            </motion.blockquote>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-10 pt-6"
            >
              {[
                { value: '20+', label: 'Projects Delivered' },
                { value: '50K+', label: 'Lines of Production Code' },
                { value: '99.9%', label: 'Uptime on Systems Built' },
              ].map((stat, index) => (
                <div key={index}>
                  <span className="block font-display text-4xl font-bold gradient-text">
                    {stat.value}
                  </span>
                  <span className="text-sm text-text-muted">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Highlight cards */}
          <div className="space-y-6">
            {/* Highlight cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="glass-card p-6 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan/20 to-violet/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6 text-cyan" />
                  </div>
                  <h3 className="font-display font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Code block */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="glass-card p-5 font-mono text-sm overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-text-muted text-xs">mahmoud.config.js</span>
              </div>
              <pre className="text-text-secondary overflow-x-auto text-xs leading-relaxed">
                <code>{`const engineer = {
  name: "Mahmoud Hammad",
  role: "Full-Stack Engineer",
  
  stack: {
    frontend: ["React", "Next.js", "TypeScript"],
    backend: ["Node.js", "Express", "Python"],
    database: ["MongoDB", "PostgreSQL", "Redis"],
    cloud: ["AWS", "Docker", "Vercel"]
  },
  
  philosophy: "Build systems that outlast trends",
  
  currentFocus: [
    "Scalable API architecture",
    "AI-powered applications",
    "Developer experience"
  ]
};`}</code>
              </pre>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
