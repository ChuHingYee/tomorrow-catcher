import type { TomorrowBrowser } from '../client'

export function initOnUnhandledrejectionHandler(
  instance: TomorrowBrowser
): void {
  const _oldUnhandledrejectionHandler = window.onunhandledrejection
  window.onunhandledrejection = (error: any) => {
    instance.emitTraceEvent(error)
    if (_oldUnhandledrejectionHandler) {
      return _oldUnhandledrejectionHandler.apply(window, error)
    }
    return false
  }
}
