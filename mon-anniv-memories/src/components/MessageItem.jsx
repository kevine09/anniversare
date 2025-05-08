import { motion } from 'framer-motion'
import { FaPaperclip, FaImage, FaVideo, FaMusic } from 'react-icons/fa'
import '../styles/MessageItem.css' // Assurez-vous d'importer le fichier CSS

export default function MessageItem({ msg, dragConstraints }) {
  return (
    <motion.div
      className={`message-item ${msg.type}`}
      style={{ 
        backgroundColor: msg.color || '#fff',
        rotate: msg.rotation
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      drag
      dragConstraints={dragConstraints}
      whileHover={{ zIndex: 10, scale: 1.05 }}
    >
      {msg.type === 'text' && (
        <>
          <p>{msg.content}</p>
          <span className="author">- {msg.author}</span>
        </>
      )}
      
      {msg.type === 'image' && (
  <div className="media-container">
    <img src={msg.content} alt={`De ${msg.author}`} />
    {msg.text && <p className="media-message">{msg.text}</p>}
    <span className="author">- {msg.author}</span>
  </div>
)}

{msg.type === 'video' && (
  <div className="media-container">
    <video controls>
      <source src={msg.content} type="video/mp4" />
    </video>
    {msg.text && <p className="media-message">{msg.text}</p>}
    <span className="author">- {msg.author}</span>
  </div>
)}

      
      <div className="message-type">
        {msg.type === 'text' && <FaPaperclip />}
        {msg.type === 'image' && <FaImage />}
        {msg.type === 'video' && <FaVideo />}
        {msg.type === 'audio' && <FaMusic />}
      </div>


      
    </motion.div>
  )
}