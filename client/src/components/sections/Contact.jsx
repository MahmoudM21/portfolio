import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { toast } from 'react-hot-toast'
import { 
  FiMail, FiMapPin, FiSend, FiCheck, FiLoader, 
  FiPhone, FiCopy, FiLinkedin, FiInstagram 
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import api from '../../services/api'
import MagneticWrapper from '../common/MagneticWrapper'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await api.post('/contact', formData)
      
      if (response.data.success) {
        setIsSubmitted(true)
        toast.success('Message sent successfully! I\'ll get back to you soon.')
        setFormData({ name: '', email: '', subject: '', message: '' })
        
        setTimeout(() => setIsSubmitted(false), 3000)
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send message. Please try again.'
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedPhone(true)
      toast.success('Phone number copied!')
      setTimeout(() => setCopiedPhone(false), 2000)
    })
  }

  const contactInfo = {
    phone: '+20 150 8318032',
    phoneClean: '+201508318032',
    whatsapp: '201508318032', // WhatsApp number without + for wa.me link
    linkedin: 'https://www.linkedin.com/in/mahmoud-bmawy-%F0%9F%98%8E-379268262/',
    instagram: 'https://www.instagram.com/mahmoud.hmaad1_bmawy/',
    email: 'contact@mahmoudbmawy.com',
    location: 'Egypt (Open to Remote)',
  }

  const inputClasses = `
    w-full px-5 py-4 rounded-xl
    bg-surface/50 border border-white/10
    text-white placeholder-text-muted
    focus:outline-none focus:border-cyan/50 focus:bg-surface
    transition-all duration-300
    font-body
  `

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-light via-void to-void-light" />
      <div className="grid-lines opacity-20" />
      
      {/* Floating gradients */}
      <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] rounded-full bg-cyan/10 blur-[120px]" />
      <div className="absolute bottom-1/4 -left-64 w-[500px] h-[500px] rounded-full bg-violet/10 blur-[120px]" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-mono text-cyan text-sm tracking-wider mb-4">
            // LET&apos;S CONNECT
          </span>
          <h2 className="font-display text-display-lg font-bold mb-4">
            Ready to Build <span className="gradient-text">Something Great?</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Whether you have a project in mind, want to collaborate, or just want to say hello — 
            I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-display text-2xl font-semibold text-white mb-4">
                Let&apos;s turn your vision into reality
              </h3>
              <p className="text-text-secondary leading-relaxed">
                I&apos;m always excited to work on challenging projects that push boundaries. 
                Whether you need a full-stack application, backend architecture, or AI integration — 
                let&apos;s discuss how I can help.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              {/* WhatsApp Button */}
              <MagneticWrapper strength={0.15}>
                <motion.a
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-surface/30 border border-white/5 hover:border-green-500/50 transition-all group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaWhatsapp className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-text-muted mb-1">Chat on WhatsApp</p>
                    <p className="text-white font-medium group-hover:text-green-400 transition-colors">
                      {contactInfo.phone}
                    </p>
                  </div>
                  <span className="text-text-muted text-sm group-hover:text-white transition-colors">
                    →
                  </span>
                </motion.a>
              </MagneticWrapper>

              {/* Phone with copy */}
              <motion.div
                className="flex items-center gap-4 p-4 rounded-xl bg-surface/30 border border-white/5 hover:border-cyan/30 transition-all group cursor-pointer"
                whileHover={{ x: 5 }}
                onClick={() => copyToClipboard(contactInfo.phoneClean)}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan/20 to-violet/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FiPhone className="w-5 h-5 text-cyan" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-text-muted mb-1">Call or Copy</p>
                  <p className="text-white font-medium group-hover:text-cyan transition-colors font-mono">
                    {contactInfo.phone}
                  </p>
                </div>
                <motion.div
                  className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence mode="wait">
                    {copiedPhone ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <FiCheck className="w-4 h-4 text-green-400" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <FiCopy className="w-4 h-4 text-text-muted group-hover:text-white transition-colors" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>

              {/* LinkedIn */}
              <MagneticWrapper strength={0.15}>
                <motion.a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-surface/30 border border-white/5 hover:border-cyan/30 transition-all group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FiLinkedin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-text-muted mb-1">Connect on LinkedIn</p>
                    <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                      Mahmoud Hammad 😎 BMawy 😎
                    </p>
                  </div>
                  <span className="text-text-muted text-sm group-hover:text-white transition-colors">
                    →
                  </span>
                </motion.a>
              </MagneticWrapper>

              {/* Instagram */}
              <MagneticWrapper strength={0.15}>
                <motion.a
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-surface/30 border border-white/5 hover:border-cyan/30 transition-all group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FiInstagram className="w-5 h-5 text-pink-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-text-muted mb-1">Follow on Instagram</p>
                    <p className="text-white font-medium group-hover:text-pink-400 transition-colors">
                      @mahmoud.hmaad1_bmawy
                    </p>
                  </div>
                  <span className="text-text-muted text-sm group-hover:text-white transition-colors">
                    →
                  </span>
                </motion.a>
              </MagneticWrapper>

              {/* Location */}
              <motion.div
                className="flex items-center gap-4 p-4 rounded-xl bg-surface/30 border border-white/5"
                whileHover={{ x: 5 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan/20 to-violet/20 flex items-center justify-center">
                  <FiMapPin className="w-5 h-5 text-cyan" />
                </div>
                <div>
                  <p className="text-sm text-text-muted mb-1">Based in</p>
                  <p className="text-white font-medium">{contactInfo.location}</p>
                </div>
              </motion.div>
            </div>

            {/* Availability status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <span className="text-green-400 font-medium">
                Available for freelance & full-time opportunities
              </span>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                    Your Name <span className="text-cyan">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                    Your Email <span className="text-cyan">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-2">
                  Subject <span className="text-cyan">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project Inquiry / Collaboration / Job Opportunity"
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                  Message <span className="text-cyan">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project or how I can help..."
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <MagneticWrapper strength={0.1}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`
                    w-full py-4 rounded-xl font-display font-medium
                    flex items-center justify-center gap-2
                    transition-all duration-300
                    ${isSubmitted 
                      ? 'bg-green-500 text-white' 
                      : 'glow-button'
                    }
                    disabled:opacity-70 disabled:cursor-not-allowed
                  `}
                  whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <FiLoader className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : isSubmitted ? (
                    <>
                      <FiCheck className="w-5 h-5" />
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </MagneticWrapper>

              <p className="text-center text-text-muted text-sm">
                I typically respond within 24 hours
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
