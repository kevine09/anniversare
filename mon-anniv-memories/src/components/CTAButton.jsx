import { motion } from 'framer-motion'
import '../styles/CTAButton.css' // Assurez-vous d'importer le fichier CSS

export default function CTAButton({ onClick, children }) {
  return (
    <motion.button
      className="cta-button"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span>{children}</span>
    </motion.button>
  )
}