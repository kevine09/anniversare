import { motion } from 'framer-motion'
import { FaBookOpen } from 'react-icons/fa'
import '../styles/FloatingBook.css' // Assurez-vous d'importer le fichier CSS

const FloatingBook = ({ onClick }) => {
  return (
    <motion.div
      className="floating-book"
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
      <FaBookOpen className="book-icon" />
      <motion.span
        className="hint-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Ouvre-moi !
      </motion.span>
    </motion.div>
  )
}

export default FloatingBook