import { motion } from 'framer-motion'
import '../styles/HomeScreen.css'

export default function HomeScreen({ startGame }) {
  return (
    <motion.div 
      className="home-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="title-container">
        <motion.h1
          className="game-title"
          animate={{
            y: [0, -5, 0],
            textShadow: ["0 0 8px #ff6f3c", "0 0 16px #ff6f3c", "0 0 8px #ff6f3c"]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          KÉVINE'S BIRTHDAY QUEST
        </motion.h1>
        
        <motion.div
          className="cake-icon"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity
          }}
        >
          🎂
        </motion.div>
      </div>

      <motion.div
        className="instructions-bubble"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bubble-content">
          <p>🎯 Collecte les cadeaux</p>
          <p>💭 Réponds aux quiz</p>
          <p>👾 Évite les Trouble-Fêtes</p>
          <p>🎂 Atteins le gâteau final!</p>
        </div>
      </motion.div>

      <motion.button
        className="start-button"
        onClick={startGame}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        COMMENCER
      </motion.button>

      <div className="controls-hint">
        <p>Utilise ← → pour bouger et ESPACE pour sauter</p>
      </div>
    </motion.div>
  )
}