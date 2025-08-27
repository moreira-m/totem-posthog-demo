import React, { useEffect, useState } from 'react'
import { initPostHog } from './posthogClient'
import { track, trackStepView, nextClick, homeClick } from './track'
import { getSessionId, getClientId, resetSession } from './session'

const stepNames = ['home', 'step1', 'step2', 'step3', 'confirmation']

const App = () => {
  const [step, setStep] = useState(0)
  const [sessionId, setSessionId] = useState('')
  const clientId = getClientId()

  useEffect(() => {
    initPostHog()
    track('session_start')
    trackStepView(0, stepNames[0])
    setSessionId(getSessionId())
  }, [])

  const handleNext = () => {
    const next = Math.min(step + 1, stepNames.length - 1)
    nextClick(step, next)
    setStep(next)
    trackStepView(next, stepNames[next])
  }

  const handleHome = () => {
    homeClick(step)
    setStep(0)
    trackStepView(0, stepNames[0])
  }

  const handleResetSession = () => {
    setSessionId(resetSession())
    track('session_start')
  }

  const stepName = stepNames[step]

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '1rem' }}>
      <h1>Totem PostHog Demo</h1>
      <div style={{ marginBottom: '1rem' }}>
        <div>session_id: {sessionId}</div>
        <div>client_id: {clientId}</div>
        <div>step: {step}</div>
        <div>stepName: {stepName}</div>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={handleNext}>Próximo</button>
        <button onClick={handleHome}>Home</button>
        <button onClick={handleResetSession}>Reiniciar sessão</button>
      </div>
    </div>
  )
}

export default App
