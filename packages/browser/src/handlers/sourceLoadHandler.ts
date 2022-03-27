import type { TomorrowBrowser } from '../client'
const sourcesMap = {
  LINK: true,
  IMG: true,
  VIDEO: true,
  AUDIO: true,
  SCRIPT: true,
}
export function initSourceLoadHandler(instance: TomorrowBrowser): void {
  window.addEventListener(
    'error',
    (event) => {
      const target = event.target || event.srcElement
      const nodeName = (target as Node).nodeName || ''
      if (sourcesMap[nodeName]) {
        instance.emitEvent({
          time: new Date().getTime(),
          url: window.location.href,
          message: `${
            nodeName === 'LINK'
              ? (target as HTMLLinkElement).href
              : (
                  target as
                    | HTMLImageElement
                    | HTMLVideoElement
                    | HTMLAudioElement
                    | HTMLScriptElement
                ).src
          }#${nodeName}`,
          type: 'sourceLoad',
        })
      }
    },
    true
  )
}
