import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Animate text word by word
export const AnimatedWords = ({ 
  text, 
  className = '', 
  delay = 0,
  staggerDelay = 0.05,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const words = text.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  }

  const child = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.span
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em] perspective-1000"
          variants={child}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Animate text letter by letter
export const AnimatedLetters = ({ 
  text, 
  className = '', 
  delay = 0,
  staggerDelay = 0.03,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const letters = text.split('')

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  }

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
  }

  return (
    <motion.span
      ref={ref}
      className={`inline-flex ${className}`}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={child}
          style={{ whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Typewriter effect
export const TypewriterText = ({ 
  text, 
  className = '', 
  speed = 50,
  delay = 0,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
    >
      {inView && (
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: 'auto' }}
          transition={{
            duration: (text.length * speed) / 1000,
            delay: delay,
            ease: 'linear',
          }}
          className="inline-block overflow-hidden whitespace-nowrap"
        >
          {text}
        </motion.span>
      )}
      <motion.span
        className="inline-block w-0.5 h-[1em] bg-cyan ml-1"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </motion.span>
  )
}

// Reveal text with mask
export const RevealText = ({ 
  text, 
  className = '', 
  delay = 0,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <span ref={ref} className={`relative inline-block overflow-hidden ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: '100%' }}
        animate={inView ? { y: 0 } : { y: '100%' }}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {text}
      </motion.span>
    </span>
  )
}

export default AnimatedWords

