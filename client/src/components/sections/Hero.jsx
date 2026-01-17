import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { AnimatedWords } from '../common/AnimatedText'
import MagneticWrapper from '../common/MagneticWrapper'
import FloatingShapes from '../three/FloatingShapes'
import { FiArrowDown, FiLinkedin, FiInstagram, FiPhone } from 'react-icons/fi'

const roles = [
  'Full-Stack Engineer',
  'Backend Architect',
  'System Designer',
  'Problem Solver',
]

const Hero = () => {
  const containerRef = useRef(null)
  const [currentRole, setCurrentRole] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  // Cycle through roles
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#050505' }}
    >
      {/* 3D Background */}
      <FloatingShapes />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-void/50 via-transparent to-void pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-cyan/5 via-transparent to-transparent pointer-events-none" />

      {/* Grid lines */}
      <div className="grid-lines opacity-30" />

      {/* Main content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 container mx-auto px-6 text-center"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan/30 bg-cyan/5 backdrop-blur-sm mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan" />
          </span>
          <span className="text-sm font-medium text-cyan">Open for opportunities</span>
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-text-secondary text-base sm:text-lg mb-3 sm:mb-4 font-mono"
        >
          Hi, I&apos;m
        </motion.p>

        {/* Main headline */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-display-xl font-bold mb-4 sm:mb-6">
          <AnimatedWords
            text="Mahmoud Hammad"
            className="block text-white"
            delay={0.4}
          />
        </h1>
        
        {/* Nickname */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-cyan text-lg sm:text-xl font-medium mb-4 sm:mb-6"
        >
          😎 BMawy 😎
        </motion.p>

        {/* Animated role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="h-12 mb-8 overflow-hidden"
        >
          <motion.div
            key={currentRole}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="font-display text-xl sm:text-2xl md:text-3xl font-semibold gradient-text"
          >
            {roles[currentRole]}
          </motion.div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-text-secondary mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0"
        >
          I build <span className="text-white">scalable systems</span>, craft{' '}
          <span className="text-white">elegant backends</span>, and turn complex problems 
          into <span className="text-cyan">seamless digital experiences</span>. 
          Specializing in the MERN stack with a passion for clean architecture.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0"
        >
          <MagneticWrapper strength={0.2}>
            <motion.a
              href="#projects"
              className="glow-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View My Work</span>
            </motion.a>
          </MagneticWrapper>

          <MagneticWrapper strength={0.2}>
            <motion.a
              href="#contact"
              className="outline-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get in Touch</span>
            </motion.a>
          </MagneticWrapper>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex items-center justify-center gap-6 mt-12"
        >
          {[
            { icon: FiLinkedin, href: 'https://www.linkedin.com/in/mahmoud-bmawy-%F0%9F%98%8E-379268262/', label: 'LinkedIn' },
            { icon: FiInstagram, href: 'https://www.instagram.com/mahmoud.hmaad1_bmawy/', label: 'Instagram' },
            { icon: FiPhone, href: 'tel:+201508318032', label: 'Phone' },
          ].map((social) => (
            <MagneticWrapper key={social.label} strength={0.4}>
              <motion.a
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-text-muted hover:text-cyan transition-colors duration-300"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            </MagneticWrapper>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-text-muted hover:text-white transition-colors group"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs font-mono tracking-wider">SCROLL</span>
          <FiArrowDown className="w-5 h-5 group-hover:text-cyan transition-colors" />
        </motion.a>
      </motion.div>

      {/* Corner decorations */}
      <div className="hidden sm:block absolute top-20 left-10 w-20 h-20 border-l-2 border-t-2 border-white/5" />
      <div className="hidden sm:block absolute top-20 right-10 w-20 h-20 border-r-2 border-t-2 border-white/5" />
      <div className="hidden sm:block absolute bottom-20 left-10 w-20 h-20 border-l-2 border-b-2 border-white/5" />
      <div className="hidden sm:block absolute bottom-20 right-10 w-20 h-20 border-r-2 border-b-2 border-white/5" />
    </section>
  )
}

export default Hero
