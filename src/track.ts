import posthog from './posthogClient'

export const track = (event: string, properties?: Record<string, any>) => {
  posthog.capture(event, properties)
}
