export function getGlobalTomorrow() {
  return typeof window !== 'undefined' ? window.__tomorrowBrowser__ : null
}
