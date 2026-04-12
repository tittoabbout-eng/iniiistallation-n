/**
 * Fires a GA4 custom event via window.gtag if the script is loaded.
 * Uses optional chaining so it is a no-op when GA4 is not present (e.g. local dev).
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  window.gtag?.('event', eventName, params)
}
