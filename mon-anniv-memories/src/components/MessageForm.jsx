import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaTimes, FaPaperclip, FaImage, FaVideo } from 'react-icons/fa'
import { uploadToCloudinary } from '../utils/cloudinary'
import '../styles/MessageForm.css'
import { useRef } from 'react'; // Ajoute cette importation

export default function MessageForm({ 
  newMessage, 
  setNewMessage, 
  onClose, 
  onSubmit 
}) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null); // Initialise correctement la ref


  

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('Fichier trop volumineux (max 10MB)');
      return;
    }

    setIsUploading(true);
    
    try {
      // 1. Prévisualisation locale immédiate
      const previewUrl = URL.createObjectURL(file);
      setNewMessage(prev => ({
        ...prev,
        content: previewUrl,
        file // Stocke temporairement le fichier
      }));

      // 2. Upload vers Cloudinary
      const folder = window.location.pathname.includes('map') 
        ? 'map-markers' 
        : 'guestbook';
      const cloudinaryUrl = await uploadToCloudinary(file, folder);
      
      // 3. Remplace par l'URL Cloudinary
      setNewMessage(prev => ({
        ...prev,
        content: cloudinaryUrl,
        file: null // Nettoie le fichier après upload
      }));

    } catch (error) {
      console.error("Upload failed:", error);
      setNewMessage(prev => ({
        ...prev,
        content: '',
        file: null
      }));
      alert("Échec de l'upload, veuillez réessayer");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div 
      className="message-form"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <button className="close-form" onClick={onClose}>
        <FaTimes />
      </button>
      
      <h3>Ajoute ton message</h3>
      
      <div className="type-selector">
    {['text', 'image', 'video'].map(type => (
      <button
        key={type}
        className={newMessage.type === type ? 'active' : ''}
        onClick={() => {
          setNewMessage({
            ...newMessage,
            type,
            content: ''
          });
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }}
        disabled={isUploading}
      >
        {type === 'text' && <><FaPaperclip /> Texte</>}
        {type === 'image' && <><FaImage /> Photo</>}
        {type === 'video' && <><FaVideo /> Vidéo</>}
      </button>
    ))}
  </div>

  <input 
    ref={fileInputRef}
    type="file" 
    accept={newMessage.type === 'image' ? 'image/*' : 'video/*'}
    onChange={handleFileChange}
    disabled={isUploading}
  />
      
      {newMessage.type === 'text' ? (
        <textarea 
          placeholder="Ton message..." 
          value={newMessage.content}
          onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
          disabled={isUploading}
        />
      ) : (
        <div className="media-upload">
          <label>
            <input 
              ref={fileInputRef}
              type="file" 
              accept={newMessage.type === 'image' ? 'image/*' : 'video/*'}
              onChange={handleFileChange}
              disabled={isUploading}
            />
            {!newMessage.content ? (
              <div className="upload-placeholder">
                {isUploading ? 'Upload en cours...' : 
                  `Clique pour ${newMessage.type === 'image' ? 'ajouter une photo' : 'ajouter une vidéo'}`}
              </div>
            ) : newMessage.type === 'image' ? (
              <img src={newMessage.content} alt="Preview" />
            ) : (
              <video controls src={newMessage.content} />
            )}
          </label>
        </div>
      )}
      
      <input 
        type="text" 
        placeholder="Ton nom" 
        value={newMessage.author}
        onChange={(e) => setNewMessage({...newMessage, author: e.target.value})}
        disabled={isUploading}
      />
      
      <button 
        className="submit-button"
        onClick={() => onSubmit(newMessage)}
        disabled={!newMessage.content || !newMessage.author || isUploading}
      >
        {isUploading ? 'Envoi en cours...' : 'Ajouter'}
      </button>
    </motion.div>
  )
}