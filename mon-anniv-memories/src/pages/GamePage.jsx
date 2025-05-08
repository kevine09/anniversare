import { useState } from 'react'
import HomeScreen from '../components/HomeScreen'
import GameEngine from '../components/PixelGame/GameEngine'
import GameOver from '../components/PixelGame/GameOver'
import '../styles/GamePage.css'

export default function GamePage() {
  const [gameStatus, setGameStatus] = useState('home') // 'home' | 'playing' | 'over'
  const [finalScore, setFinalScore] = useState(0)

  const startGame = () => setGameStatus('playing')
  
  const handleGameOver = (score) => {
    setFinalScore(score)
    setGameStatus('over')
  }

  const restartGame = () => {
    setGameStatus('playing')
  }

  return (
    <div className="game-container">
      {gameStatus === 'home' && <HomeScreen startGame={startGame} />}
      {gameStatus === 'playing' && <GameEngine onGameOver={handleGameOver} />}
      {gameStatus === 'over' && <GameOver score={finalScore} onRestart={restartGame} />}
    </div>
  )
}