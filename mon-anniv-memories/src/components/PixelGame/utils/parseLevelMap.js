import { LEVEL_MAP } from '../data/levelDesign'

const TILE_SIZE = 32
const LEVEL_HEIGHT = LEVEL_MAP.length

export function parseLevel() {
  const platforms = []
  const gifts = []
  const enemies = []
  const quizzes = []
  let cake = null

  LEVEL_MAP.forEach((row, rowIndex) => {
    const y = (LEVEL_HEIGHT - rowIndex - 1) * TILE_SIZE

    for (let col = 0; col < row.length; col++) {
      const x = col * TILE_SIZE
      const char = row[col]

      switch (char) {
        case '=':
        case 'P':
          platforms.push({ x, y })
          break
        case 'G':
          gifts.push({ id: `gift-${x}-${y}`, x, y, value: 10 })
          break
        case 'Q':
          quizzes.push({ id: `quiz-${x}-${y}`, x, y })
          break
        case '💀':
          enemies.push({ id: `enemy-${x}-${y}`, x, y })
          break
        case '🎂':
          cake = { x, y }
          break
        default:
          break
      }
    }
  })

  return { platforms, gifts, quizzes, enemies, cake }
}
