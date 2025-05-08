import { forwardRef, useState, useEffect, useImperativeHandle } from 'react'
import '../../../styles/Boss.css'

const Boss = forwardRef(({ onAttack, onDefeat }, ref) => {
  const [health, setHealth] = useState(5)
  const [isAttacking, setIsAttacking] = useState(false)

  useImperativeHandle(ref, () => ({
    takeHit() {
      setHealth(prev => {
        if (prev <= 1) {
          onDefeat()
          return 0
        }
        return prev - 1
      })
    }
  }))

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAttacking(true)
      setTimeout(() => {
        setIsAttacking(false)
        onAttack()
      }, 500)
    }, 4000)
    return () => clearInterval(interval)
  }, [onAttack])

  return (
    <div className={`boss-container ${isAttacking ? 'attack' : ''}`}>
      <div className="boss-health">
        {Array(health).fill('❤️').join(' ')}
      </div>
      <div className="boss-sprite" />
    </div>
  )
})

export default Boss
