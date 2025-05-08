import { useState, useEffect, useRef, useCallback } from 'react'
import Player from '../../components/PixelGame/Player'
import Platforms from './Platform'
import Enemies from '../../components/PixelGame/entities/Enemy'
import Gifts from '../../components/PixelGame/entities/Gift'
import Boss from '../../components/PixelGame/entities/Boss'
import GameUI from './GameUI'
//import QuizModal from './QuizModal'
import MobileControls from './MobileControls'
import { KEVINE_TRIVIA } from '../../components/PixelGame/data/questions'
import '../../styles/GameEngine.css'
import Cake from '../../components/PixelGame/entities/Cake'

export default function GameEngine({ onGameOver }) {
  const [gameState, setGameState] = useState('running')
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [currentQuiz, setCurrentQuiz] = useState(null)
  const [bossActive, setBossActive] = useState(false)
  const playerRef = useRef()
  const platformsRef = useRef([])
  const enemiesRef = useRef([])
  const giftsRef = useRef([])
  const bossRef = useRef()

  // Contrôles clavier
  const handleKeyDown = useCallback((e) => {
    if (gameState !== 'running') return
    
    switch(e.key) {
      case 'ArrowLeft':
        playerRef.current.moveLeft()
        break
      case 'ArrowRight':
        playerRef.current.moveRight()
        break
      case ' ':
        playerRef.current.jump()
        break
        case 'ArrowUp':
  playerRef.current.moveUp?.()
  break
case 'ArrowDown':
  playerRef.current.moveDown?.()
  break

      default:
        break
    }
  }, [gameState])

  const handleKeyUp = useCallback((e) => {
    if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
      playerRef.current.stop()
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  // Logique du jeu
  useEffect(() => {
    if (score >= 100 && !bossActive) {
      setBossActive(true)
    }
  }, [score, bossActive])

  const startQuiz = () => {
    const randomQuiz = KEVINE_TRIVIA[Math.floor(Math.random() * KEVINE_TRIVIA.length)]
    setCurrentQuiz(randomQuiz)
    setGameState('quiz')
  }

  const answerQuiz = (answerIndex) => {
    if (answerIndex === currentQuiz.correct) {
      setScore(prev => prev + 50)
    } else {
      loseLife()
    }
    setGameState('running')
  }

  const collectGift = (points) => {
    setScore(prev => prev + points)
  }

  const loseLife = () => {
    setLives(prev => {
      if (prev <= 1) {
        onGameOver(score)
        return 0
      }
      return prev - 1
    })
  }

  return (
    <div className="game-area">
      <GameUI score={score} lives={lives} bossActive={bossActive} />
      
      <Player ref={playerRef} gameState={gameState} />
      
      <Platforms ref={platformsRef} />
      
      <Gifts 
        ref={giftsRef}
        onCollect={collectGift}
        onQuizStart={startQuiz}
      />
      
      <Enemies
        ref={enemiesRef}
        onCollision={loseLife}
      />
      
      {bossActive && (
        <Boss
          ref={bossRef}
          onAttack={loseLife}
          onDefeat={() => {
            setScore(prev => prev + 200)
            setTimeout(() => onGameOver(score + 200), 3000)
          }}
        />
      )}
      
      {gameState === 'quiz' && (
        <QuizModal
          question={currentQuiz.question}
          answers={currentQuiz.answers}
          onAnswer={answerQuiz}
        />
      )}
      
      <MobileControls 
        onJump={() => playerRef.current?.jump()}
        onLeft={() => playerRef.current?.moveLeft()}
        onRight={() => playerRef.current?.moveRight()}
        onStop={() => playerRef.current?.stop()}
      />

<Cake onReachCake={() => onGameOver(score + 1000)} />

    </div>

  )
}