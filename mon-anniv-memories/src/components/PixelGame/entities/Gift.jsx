import { forwardRef } from 'react'
import QuizBubble from '../QuizBubble'
import { parseLevel } from '../utils/parseLevelMap'
import '../../../styles/Gifts.css'

const Gifts = forwardRef(({ onCollect, onQuizStart }, ref) => {
  const { gifts, quizzes } = parseLevel()

  return (
    <>
      {gifts.map(item => (
        <div
          key={item.id}
          className="gift"
          style={{ left: item.x, top: item.y }}
          onClick={() => onCollect(item.value)}
        />
      ))}
      {quizzes.map(item => (
        <QuizBubble
          key={item.id}
          x={item.x}
          y={item.y}
          onClick={onQuizStart}
        />
      ))}
    </>
  )
})

export default Gifts
