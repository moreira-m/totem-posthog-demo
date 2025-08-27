import posthog from 'posthog-js'
import { ensureSessionId } from './session'

let initialized = false

/**
 * Initializes PostHog with environment configuration.
 * Ensures initialization occurs only once.
 */
export const initPostHog = (): void => {
  if (initialized) return

  const apiKey = import.meta.env.VITE_POSTHOG_API_KEY
  const host = import.meta.env.VITE_POSTHOG_HOST

  posthog.init(apiKey, {
    api_host: host,
    autocapture: false,
    capture_pageview: true,
  })

  const sessionId = ensureSessionId()
  posthog.identify(sessionId)

  initialized = true
}

/**
 * Returns the PostHog instance.
 */
export const getPosthog = () => posthog

