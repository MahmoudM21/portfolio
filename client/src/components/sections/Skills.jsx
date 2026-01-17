import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, 
  SiExpress, SiMongodb, SiPostgresql, SiDocker, SiKubernetes,
  SiAmazonwebservices, SiGooglecloud, SiPython, SiTensorflow, 
  SiOpenai, SiGit, SiRedis, SiGraphql, SiFigma, SiVercel,
  SiWordpress, SiDjango, SiShopify
} from 'react-icons/si'

const skillCategories = [
  {
    title: 'Frontend',
    color: 'from-cyan to-blue-500',
    skills: [
      { name: 'React', icon: SiReact, level: 95 },
      { name: 'Next.js', icon: SiNextdotjs, level: 90 },
      { name: 'TypeScript', icon: SiTypescript, level: 88 },
      { name: 'Tailwind CSS', icon: SiTailwindcss, level: 92 },
    ],
  },
  {
    title: 'Backend',
    color: 'from-green-400 to-emerald-600',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, level: 93 },
      { name: 'Express', icon: SiExpress, level: 90 },
      { name: 'Python', icon: SiPython, level: 85 },
      { name: 'Django', icon: SiDjango, level: 88 },
      { name: 'GraphQL', icon: SiGraphql, level: 82 },
    ],
  },
  {
    title: 'Databases',
    color: 'from-violet to-purple-600',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, level: 90 },
      { name: 'PostgreSQL', icon: SiPostgresql, level: 85 },
      { name: 'Redis', icon: SiRedis, level: 80 },
    ],
  },
  {
    title: 'DevOps',
    color: 'from-orange-400 to-red-500',
    skills: [
      { name: 'Docker', icon: SiDocker, level: 88 },
      { name: 'Kubernetes', icon: SiKubernetes, level: 75 },
      { name: 'AWS', icon: SiAmazonwebservices, level: 82 },
      { name: 'GCP', icon: SiGooglecloud, level: 78 },
      { name: 'Hostinger', icon: SiAmazonwebservices, level: 85 },
    ],
  },
  {
    title: 'AI / ML',
    color: 'from-pink-500 to-rose-500',
    skills: [
      { name: 'TensorFlow', icon: SiTensorflow, level: 75 },
      { name: 'OpenAI', icon: SiOpenai, level: 85 },
    ],
  },
  {
    title: 'CMS / E-Commerce',
    color: 'from-blue-500 to-indigo-600',
    skills: [
      { name: 'WordPress', icon: SiWordpress, level: 90 },
      { name: 'Shopify', icon: SiShopify, level: 85 },
    ],
  },
  {
    title: 'Tools',
    color: 'from-yellow-400 to-amber-500',
    skills: [
      { name: 'Git', icon: SiGit, level: 95 },
      { name: 'Figma', icon: SiFigma, level: 80 },
      { name: 'Vercel', icon: SiVercel, level: 90 },
    ],
  },
]

const SkillCard = ({ skill, index, categoryColor }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card p-4 group"
    >
      <div className="flex items-center gap-4 mb-3">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${categoryColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <skill.icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-white">{skill.name}</h4>
        </div>
        <span className="font-mono text-sm text-text-muted">{skill.level}%</span>
      </div>
      
      {/* Progress bar */}
      <div className="h-1.5 bg-surface rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${categoryColor}`}
        />
      </div>
    </motion.div>
  )
}

const Skills = () => {
  const containerRef = useRef(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], [-50, 50])

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-light via-void to-void-light" />
      <div className="grid-lines opacity-20" />

      {/* Floating gradient */}
      <motion.div
        style={{ x }}
        className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-violet/10 to-cyan/10 blur-3xl"
      />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block font-mono text-cyan text-sm tracking-wider mb-4">
            // SKILLS & EXPERTISE
          </span>
          <h2 className="font-display text-display-lg font-bold mb-4">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            A comprehensive toolkit built over years of solving complex problems 
            and shipping production-grade applications.
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-2 h-8 rounded-full bg-gradient-to-b ${category.color}`} />
                <h3 className="font-display font-semibold text-xl text-white">
                  {category.title}
                </h3>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    index={skillIndex}
                    categoryColor={category.color}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center text-text-muted mt-16"
        >
          And always learning new technologies...
        </motion.p>
      </div>
    </section>
  )
}

export default Skills

