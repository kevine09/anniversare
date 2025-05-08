import { forwardRef } from 'react'
import { parseLevel } from '../../components/PixelGame/utils/parseLevelMap'
import '../../styles/Platform.css'

const Platforms = forwardRef((props, ref) => {
  const { platforms } = parseLevel()

  return (
    <>
      {platforms.map((plat, i) => (
        <div
          key={`platform-${i}`}
          className="platform"
          style={{
            left: `${plat.x}px`,
            top: `${plat.y}px`,
            width: '64px'
          }}
        />
      ))}
    </>
  )
})

export default Platforms
