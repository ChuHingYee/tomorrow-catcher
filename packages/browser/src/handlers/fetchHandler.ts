import type { TomorrowBrowser } from '../client'
import type { OriginLog } from '../../types'

export function initFetchHandler(instance: TomorrowBrowser): void {
  if (!window.fetch) {
    // eslint-disable-next-line no-console
    console.warn('fetch is not exist~~~')
    return
  }
  const oldFetch = window.fetch
  const requestRecord = {
    method: '',
    url: '',
  }
  window.fetch = (input, opts) => {
    return new Promise((resolve, reject) => {
      requestRecord.url = input as string
      requestRecord.method = opts && opts.method ? opts.method : 'get'
      const _time = new Date().getTime()
      const customLog: OriginLog = {
        time: _time,
        type: 'network',
        message: `${requestRecord.method}-${requestRecord.url}`,
        url: window.location.href,
      }
      oldFetch(input, opts).then(
        (res) => {
          if (!res.ok) {
            instance.emitEvent(customLog)
          }
          resolve(res)
        },
        (err) => {
          instance.emitEvent(customLog)
          reject(err)
        }
      )
    })
  }
}
