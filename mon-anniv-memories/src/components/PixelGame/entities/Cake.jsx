import { parseLevel } from '../utils/parseLevelMap'
import '../../../styles/Cake.css'

export default function Cake({ onReachCake }) {
  const { cake } = parseLevel()

  if (!cake) return null

  return (
    <div
      className="cake"
      style={{ left: cake.x, top: cake.y }}
      onClick={onReachCake}
    />
  )
}
