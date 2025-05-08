import { forwardRef, useEffect, useState } from 'react'
import '../../../styles/Enemies.css'

const Enemies = forwardRef(({ onCollision }, ref) => {
  const [activeEnemies, setActiveEnemies] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      const newEnemy = {
        id: Date.now(),
        x: Math.random() * 700 + 50,
        y: Math.random() * 200 + 100,
        type: 'bouffe-ta-part'
      }
      setActiveEnemies(prev => [...prev, newEnemy])
      // Auto-remove enemy after 6s
      setTimeout(() => {
        setActiveEnemies(prev => prev.filter(e => e.id !== newEnemy.id))
      }, 6000)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {activeEnemies.map(enemy => (
        <div
          key={enemy.id}
          className={`enemy ${enemy.type} enemy-moving`}
          style={{ left: `${enemy.x}px`, top: `${enemy.y}px` }}
        />
      ))}
    </>
  )
})

export default Enemies
