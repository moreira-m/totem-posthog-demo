import { initPostHog, getPosthog } from './posthogClient'

initPostHog()

export const track = (event: string, properties?: Record<string, any>) => {
  getPosthog().capture(event, properties)
}
