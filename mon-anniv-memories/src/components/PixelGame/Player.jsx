import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import '../../styles/Player.css'

const Player = forwardRef(({ gameState }, ref) => {
  const [position, setPosition] = useState({ x: 100, y: 300 })
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  const [facing, setFacing] = useState('right')
  const [isJumping, setIsJumping] = useState(false)
  const requestRef = useRef()

  const gravity = 0.6
  const friction = 0.8
  const groundLevel = 300

  // Expose methods
  useImperativeHandle(ref, () => ({
    jump() {
      if (!isJumping && gameState === 'running') {
        setVelocity(v => ({ ...v, y: -12 }))
        setIsJumping(true)
      }
    },
    moveLeft() {
      setFacing('left')
      setVelocity(v => ({ ...v, x: -4 }))
    },
    moveRight() {
      setFacing('right')
      setVelocity(v => ({ ...v, x: 4 }))
    },
    stop() {
      setVelocity(v => ({ ...v, x: 0 }))
    },moveUp() {
      setVelocity(v => ({ ...v, y: -4 }))
    },
    moveDown() {
      setVelocity(v => ({ ...v, y: 4 }))
    },
    
    getPosition() {
      return position
    }
  }))

  const update = () => {
    setPosition(prev => {
      let newX = prev.x + velocity.x
      let newY = prev.y + velocity.y

      if (newY < groundLevel) {
        setVelocity(v => ({ ...v, y: v.y + gravity }))
      } else {
        newY = groundLevel
        setVelocity(v => ({ ...v, y: 0 }))
        setIsJumping(false)
      }

      return { x: newX, y: newY }
    })

    requestRef.current = requestAnimationFrame(update)
  }

  useEffect(() => {
    if (gameState === 'running') {
      requestRef.current = requestAnimationFrame(update)
      return () => cancelAnimationFrame(requestRef.current)
    }
  }, [velocity, gameState])

  return (
    <div
      className={`player ${facing} ${isJumping ? 'jumping' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scaleX(${facing === 'right' ? 1 : -1})`
      }}
    >
      <div className="sprite" />
    </div>
  )
})

export default Player
