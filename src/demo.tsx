import React from 'react'
import { track } from './track'
import { startSession, endSession } from './session'

const Demo = () => {
  return (
    <div>
      <button onClick={startSession}>Start session</button>
      <button onClick={endSession}>End session</button>
      <button onClick={() => track('demo_click')}>Track event</button>
    </div>
  )
}

export default Demo
