import React from 'react'
import '../../styles/MobileControls.css'

const MobileControls = ({ onLeft, onRight, onUp, onDown, onJump, onStop }) => (
  <div className="mobile-controls">
    <button onTouchStart={onLeft} onTouchEnd={onStop}>←</button>
    <button onTouchStart={onRight} onTouchEnd={onStop}>→</button>
    <button onTouchStart={onUp}>↑</button>
    <button onTouchStart={onDown}>↓</button>
    <button onTouchStart={onJump}>⤴️</button>
  </div>
)

export default MobileControls
