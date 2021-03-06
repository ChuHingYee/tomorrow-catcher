import type { TomorrowBrowser } from '../client'

export function initOnUnhandledrejectionHandler(
  instance: TomorrowBrowser
): void {
  window.addEventListener('unhandledrejection', (event) => {
    const { reason } = event
    instance.emitEvent({
      time: new Date().getTime(),
      message: reason.message,
      stack: reason.stack,
      type: 'unhandledrejection',
    })
  })
}
