import { motion } from 'framer-motion'
import { FaGlobeAmericas } from 'react-icons/fa'
import '../styles/FloatingGlobe.css'

const FloatingGlobe = ({ onClick }) => {
  return (
    <motion.div
      className="floating-globe"
      onClick={onClick}
      initial={{ y: 0 }}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }}
      whileHover={{
        scale: 1.2,
        rotate: 10
      }}
    >
      <FaGlobeAmericas className="globe-icon" />
      <motion.span
        className="hint-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Explorons Ooooh !!!
      </motion.span>
    </motion.div>
  )
}

export default FloatingGlobe