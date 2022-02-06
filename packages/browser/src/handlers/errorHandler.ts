import type { TomorrowBrowser } from '../client'

export function initOnErrorHandler(instance: TomorrowBrowser): void {
  const _oldErrorHandler = window.onerror
  window.onerror = function (error: any) {
    instance.emitTraceEvent(error)
    if (_oldErrorHandler) {
      return _oldErrorHandler.apply(this, error)
    }
    return false
  }
}
