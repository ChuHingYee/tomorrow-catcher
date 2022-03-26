import type { TomorrowBrowser } from '../client'

export function initErrorHandler(instance: TomorrowBrowser): void {
  window.addEventListener('error', (event) => {
    const { error } = event
    const target = event.target || event.srcElement
    if (target && !(target as Node).nodeName) {
      instance.emitTraceEvent(error)
    }
  })
}
