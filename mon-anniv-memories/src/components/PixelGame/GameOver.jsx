import { useState } from 'react'
import '../../styles/PixelArt.css'

export default function GameOver({ score, onRestart }) {
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Ici tu devras appeler saveScore avec le nom
    onRestart()
  }

  return (
    <div className="game-over-screen">
      <h1 className="pixel-text">GAME OVER</h1>
      <p className="pixel-text">Score: {score}</p>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ton prénom"
          className="pixel-input"
          required
        />
        <button type="submit" className="pixel-button">
          Enregistrer
        </button>
      </form>
      
      <button 
        onClick={onRestart} 
        className="pixel-button"
      >
        Rejouer
      </button>
    </div>
  )
}