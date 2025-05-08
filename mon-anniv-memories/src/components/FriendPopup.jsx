import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaMapMarkerAlt } from 'react-icons/fa'
import '../styles/FriendPopup.css' // Assurez-vous d'importer le fichier CSS

export default function FriendPopup({ friend, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="friend-popup"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="popup-header">
          <div className="friend-avatar">
            {friend.photo ? (
              <img src={friend.photo} alt={friend.name} />
            ) : (
              <span>{friend.name.charAt(0)}</span>
            )}
          </div>
          <h3>{friend.name}</h3>
          <div className="location">
            <FaMapMarkerAlt />
            <span>{friend.location}</span>
          </div>
        </div>
        
        <div className="popup-content">
          <p className="message">{friend.message}</p>
          
          {friend.audio && (
            <audio controls className="audio-message">
              <source src={friend.audio} type="audio/mpeg" />
            </audio>
          )}
          
          {friend.video && (
            <video controls className="video-message">
              <source src={friend.video} type="video/mp4" />
            </video>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}