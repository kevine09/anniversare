import Confetti from 'react-confetti'
import '../styles/ConfettiWrapper.css'

export default function ConfettiWrapper({ isExploding }) {
  return (
    <div className="confetti-wrapper">
      {isExploding && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
        />
      )}
    </div>
  )
}