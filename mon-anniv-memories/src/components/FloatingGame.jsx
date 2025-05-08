import { motion } from 'framer-motion'
import { FaGamepad } from 'react-icons/fa'
import '../styles/FloatingGame.css'

const FloatingGame = ({ onClick }) => {
  return (
    <motion.div
      className="floating-game"
      onClick={onClick}
      initial={{ y: 0 }}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }}
      whileHover={{
        scale: 1.2,
        rotate: 10
      }}
    >
      <div className="pixel-icon">
        <FaGamepad className="game-icon" />
      </div>
      <motion.span
        className="hint-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Jouez à mon jeu !
      </motion.span>
    </motion.div>
  )
}

export default FloatingGame