import { motion } from 'framer-motion'
import '../../styles/QuizBubble.css'

export default function QuizBubble({ x, y }) {
  return (
    <motion.div
      className="quiz-bubble"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -10, 0],
        opacity: [0.8, 1, 0.8]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      💭
    </motion.div>
  )
}