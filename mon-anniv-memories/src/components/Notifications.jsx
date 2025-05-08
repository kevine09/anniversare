import { useEffect } from 'react'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Notifications() {
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          toast.info(`Nouveau message de ${change.doc.data().author}!`, {
            position: "top-right",
            autoClose: 5000,
          })
        }
      })
    })
    
    return unsubscribe
  }, [])

  return null
}