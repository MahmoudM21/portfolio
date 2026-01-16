import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const SectionWrapper = ({ 
  children, 
  id, 
  className = '',
  fullHeight = false,
  withGrid = false,
  withAurora = false,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      id={id}
      ref={ref}
      className={`
        relative
        ${fullHeight ? 'min-h-screen' : ''}
        ${className}
      `}
    >
      {/* Optional grid background */}
      {withGrid && <div className="grid-lines" />}
      
      {/* Optional aurora background */}
      {withAurora && <div className="aurora-bg" />}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </section>
  )
}

export default SectionWrapper

