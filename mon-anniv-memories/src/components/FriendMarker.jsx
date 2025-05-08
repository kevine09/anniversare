import { motion } from 'framer-motion'
import '../styles/FriendMarker.css' // Assurez-vous d'importer le fichier CSS

export default function FriendMarker({ friend, onClick }) {
  return (
    <motion.div
      className="friend-marker"
      onClick={onClick}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="marker-pin">
        <div className="marker-avatar">
          {friend.photo ? (
            <img src={friend.photo} alt={friend.name} />
          ) : (
            <span>{friend.name.charAt(0)}</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}