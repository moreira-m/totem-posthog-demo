import { v4 as uuidv4 } from 'uuid'
import { track } from './track'

// Chave utilizada no armazenamento local para identificar a sessão atual.
const SESSION_KEY = 'ph_session_id'

/**
 * Garante que exista um identificador de sessão.
 * Caso não exista, gera um novo UUID v4 e o salva no localStorage.
 * @returns Identificador atual da sessão.
 */
export const ensureSessionId = (): string => {
  const current = getSessionId()
  if (current) return current

  const id = uuidv4()
  localStorage.setItem(SESSION_KEY, id)
  return id
}

/**
 * Obtém o identificador de sessão armazenado.
 * @returns Identificador salvo ou string vazia caso ausente.
 */
export const getSessionId = (): string => {
  return localStorage.getItem(SESSION_KEY) || ''
}

/**
 * Gera um novo identificador de sessão, substituindo o existente.
 * @returns Novo identificador de sessão gerado.
 */
export const resetSession = (): string => {
  const id = uuidv4()
  localStorage.setItem(SESSION_KEY, id)
  return id
}

/**
 * Obtém o identificador do cliente definido via variável de ambiente.
 * Caso não seja definido, retorna "totem-unknown".
 * @returns Identificador do cliente.
 */
export const getClientId = (): string => {
  return import.meta.env.VITE_TOTEM_CLIENT_ID ?? 'totem-unknown'
}

// Funções utilitárias para rastrear início e fim de sessão no PostHog.
export const startSession = () => track('session_start')
export const endSession = () => track('session_end')
