import { v4 as uuidv4 } from 'uuid'
import { initPostHog, getPosthog } from './posthogClient'
import { getSessionId, getClientId } from './session'

/**
 * Envia um evento para o PostHog com propriedades padronizadas.
 * A inicialização do cliente é idempotente, garantindo que seja
 * executada apenas uma vez ao longo do ciclo de vida da aplicação.
 *
 * @param eventName Nome do evento a ser rastreado.
 * @param props Propriedades adicionais do evento.
 */
export const track = (
  eventName: string,
  props: Record<string, any> = {},
): void => {
  // Garante que o PostHog esteja inicializado
  initPostHog()

  const properties = {
    ...props,
    session_id: getSessionId(),
    client_id: getClientId(),
    uuid: uuidv4(),
    timestamp: new Date().toISOString(),
  }

  getPosthog().capture(eventName, properties)
}

/**
 * Rastreia a visualização de um passo do fluxo.
 */
export const trackStepView = (step_index: number, step_name: string): void =>
  track('step_view', { step_index, step_name })

/**
 * Rastreia o clique para avançar entre passos.
 */
export const nextClick = (from_step: number, to_step: number): void =>
  track('next_click', { from_step, to_step })

/**
 * Rastreia o clique para retornar à página inicial a partir de um passo.
 */
export const homeClick = (from_step: number): void =>
  track('home_click', { from_step })
