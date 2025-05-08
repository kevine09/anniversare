import BookSpine from '../components/BookSpine'
import '../styles/BookCover.css'

export default function BookCover({ children }) {
  return (
    <div className="book-cover">
      <BookSpine />
      <div className="book-content">
        {children}
      </div>
    </div>
  )
}