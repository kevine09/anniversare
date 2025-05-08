import { useState, useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import BookCover from '../components/BookCover'
import MessageItem from '../components/MessageItem'
import MessageForm from '../components/MessageForm'
import CTAButton from '../components/CTAButton'
import ConfettiWrapper from '../components/ConfettiWrapper'
import { GiTornado } from 'react-icons/gi'
import disappointedVideo from '../assets/disappointed.mp4'
import '../styles/BookPage.css'
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db, serverTimestamp } from '../firebase'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function BookPage() {
  const [isExploding, setIsExploding] = useState(true)
  const [messages, setMessages] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [newMessage, setNewMessage] = useState({
    type: 'text',
    content: '',
    author: ''
  })
  const bookRef = useRef()

  // Charger les messages
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setMessages(msgs)
      
      // Notification pour nouveaux messages
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          toast.success(`Nouveau message de ${change.doc.data().author}!`, {
            position: "top-right",
            autoClose: 5000,
          })
        }
      })
    })
    
    return unsubscribe
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsExploding(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const addMessage = async (message) => {
    try {
      // Pour les médias, on stocke seulement l'URL (solution temporaire)
      const messageToSave = {
        type: message.type,
        content: message.content,
        author: message.author,
        rotation: Math.floor(Math.random() * 10) - 5,
        color: `hsl(${Math.random() * 60 + 30}, 100%, 80%)`,
        createdAt: serverTimestamp()
      }

      await addDoc(collection(db, 'messages'), messageToSave)
      
      setNewMessage({ 
        type: 'text', 
        content: '', 
        author: '' 
      })
    } catch (error) {
      toast.error(`Erreur: ${error.message}`)
      console.error("Erreur:", error)
    }
  }

  return (
    <div className="fullscreen-book-container" ref={bookRef}>
      <ConfettiWrapper isExploding={isExploding} />

      <div className="fullscreen-book">
        <BookCover>
          <div className="left-page">
            <h2 className="page-title">
              <GiTornado className="tornado-icon" />
              Livre d'Or de Kévine
            </h2>

            <div className="messages-grid">
              <AnimatePresence>
                {messages.map(msg => (
                  <MessageItem key={msg.id} msg={msg} dragConstraints={bookRef} />
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="book-fold"></div>

          <div className="right-page">
            {!showForm ? (
              <div className="cta-container">
                <video
                  src={disappointedVideo}
                  autoPlay
                  loop
                  muted
                  className="disappointed-video"
                />
                <CTAButton onClick={() => setShowForm(true)}>
                  Tu attends quoi pour partager ?
                </CTAButton>
              </div>
            ) : (
              <MessageForm
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                onClose={() => setShowForm(false)}
                onSubmit={addMessage}
              />
            )}
          </div>
        </BookCover>
      </div>
    </div>
  )
}