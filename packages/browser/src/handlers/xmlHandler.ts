import type { TomorrowBrowser } from '../client'
import type { OriginLog } from '../../types'

export function initXMLHandler(instance: TomorrowBrowser): void {
  if (!window.XMLHttpRequest) {
    // eslint-disable-next-line no-console
    console.warn('XMLHttpRequest is not exist~~~')
  }
  const { open, send } = window.XMLHttpRequest.prototype
  const requestRecord = {
    method: '',
    url: '',
  }
  window.XMLHttpRequest.prototype.open = function (
    method: string,
    url: string
  ): void {
    requestRecord.method = method
    requestRecord.url = url
    return open.apply(this, [method, url, false])
  }
  window.XMLHttpRequest.prototype.send = function (
    body?: Document | XMLHttpRequestBodyInit | null
  ): void {
    this.onreadystatechange = () => {
      if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status < 200 || this.status > 400) {
          if (instance._tomorrow._reportUrl !== requestRecord.url) {
            const _time = new Date().getTime()
            const customLog: OriginLog = {
              time: _time,
              customInfo: {
                type: 'network',
                msg: `${requestRecord.method}-${requestRecord.url}`,
              },
              trace: undefined,
            }
            instance.emitEvent(customLog)
          } else {
            // eslint-disable-next-line no-console
            console.warn('tomorrow is not exist')
          }
        }
      }
    }
    return send.apply(this, [body])
  }
}
