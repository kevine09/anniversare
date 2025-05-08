export default function GameUI({ score, lives }) {
  return (
    <div className="pixel-ui">
      <div className="score">SCORE: {score}</div>
      <div className="lives">VIES: {Array(lives).fill('❤️').join(' ')}</div>
    </div>
  )
}
  