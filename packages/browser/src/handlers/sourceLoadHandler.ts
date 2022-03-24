import type { TomorrowBrowser } from '../client'

export function sourceLoadHandler(instance: TomorrowBrowser): void {
  window.addEventListener(
    'error',
    (event) => {
      const target = event.target as any
      const nodeName = (target && target.nodeName) || ''
      if (['LINK', 'SCRIPT', 'IMG'].indexOf(nodeName) !== -1) {
        instance.emitEvent({
          time: new Date().getTime(),
          customInfo: {
            url: window.location.href,
            sourceUrl: (target as HTMLSourceElement).src,
            nodeName,
          },
        })
      }
    },
    true
  )
}
