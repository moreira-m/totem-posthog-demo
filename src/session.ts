import { track } from './track'

export const startSession = () => track('session_start')
export const endSession = () => track('session_end')
