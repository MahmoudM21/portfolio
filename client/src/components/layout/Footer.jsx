import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiGithub, FiLinkedin, FiInstagram, FiPhone, FiArrowUp } from 'react-icons/fi'
import MagneticWrapper from '../common/MagneticWrapper'

const socialLinks = [
  { 
    name: 'LinkedIn', 
    icon: FiLinkedin, 
    href: 'https://www.linkedin.com/in/mahmoud-bmawy-%F0%9F%98%8E-379268262/',
    color: 'hover:text-blue-400 hover:border-blue-400/50'
  },
  { 
    name: 'Instagram', 
    icon: FiInstagram, 
    href: 'https://www.instagram.com/mahmoud.hmaad1_bmawy/',
    color: 'hover:text-pink-400 hover:border-pink-400/50'
  },
  { 
    name: 'GitHub', 
    icon: FiGithub, 
    href: 'https://github.com/mahmoudbmawy',
    color: 'hover:text-white hover:border-white/50'
  },
  { 
    name: 'Phone', 
    icon: FiPhone, 
    href: 'tel:+201508318032',
    color: 'hover:text-cyan hover:border-cyan/50'
  },
]

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer ref={ref} className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-void-light to-void" />
      
      {/* Grid lines */}
      <div className="grid-lines opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Top section with CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-display-md font-bold mb-4">
            Let&apos;s Build Something{' '}
            <span className="gradient-text">Extraordinary</span>
          </h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0">
            Ready to bring your vision to life? I&apos;m always excited to work on 
            innovative projects that challenge the status quo.
          </p>
          <MagneticWrapper strength={0.2}>
            <motion.a
              href="#contact"
              className="glow-button inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start a Conversation</span>
            </motion.a>
          </MagneticWrapper>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12"
        />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Logo & Copyright */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center md:items-start gap-2"
          >
            <span className="font-display text-xl font-bold">
              <span className="text-white">Mahmoud</span>
              <span className="gradient-text">.</span>
            </span>
            <p className="text-text-muted text-sm">
              © {currentYear} Mahmoud Hammad 😎 BMawy 😎. All rights reserved.
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social, index) => (
              <MagneticWrapper key={social.name} strength={0.3}>
                <motion.a
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`group relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-white/10 text-text-secondary transition-all duration-300 min-h-[44px] ${social.color}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <social.icon className="w-5 h-5" />
                  
                  {/* Tooltip */}
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-surface rounded-lg text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {social.name}
                  </span>
                </motion.a>
              </MagneticWrapper>
            ))}
          </motion.div>

          {/* Back to top */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <MagneticWrapper strength={0.3}>
              <motion.button
                onClick={scrollToTop}
                className="group flex items-center gap-2 text-text-secondary hover:text-white transition-colors"
                whileHover={{ y: -2 }}
              >
                <span className="text-sm font-medium">Back to top</span>
                <motion.div
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 group-hover:border-cyan/50 group-hover:bg-cyan/10 transition-all"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FiArrowUp className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </MagneticWrapper>
          </motion.div>
        </div>

        {/* Decorative text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.02 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none"
        >
          <p className="font-display text-[15vw] font-bold text-white leading-none -mb-[0.15em] text-center whitespace-nowrap">
            BMAWY
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
