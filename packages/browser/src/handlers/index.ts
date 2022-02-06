import type { TomorrowBrowser } from '../client'
import { initOnErrorHandler } from './errorHandler'
import { initOnUnhandledrejectionHandler } from './unhandledrejectionHandler'
import { initFetchHandler } from './fetchHandler'
import { initXMLHandler } from './xmlHandler'

export function initHandlers(
  instance: TomorrowBrowser,
  handlersList: string[]
) {
  handlersList.forEach((type) => {
    switch (type) {
      case 'error':
        initOnErrorHandler(instance)
        break
      case 'unhandledrejection':
        initOnUnhandledrejectionHandler(instance)
        break
      case 'fetch':
        initFetchHandler(instance)
        break
      case 'xhr':
        initXMLHandler(instance)
        break
      default:
        // eslint-disable-next-line no-console
        console.warn('unknown instrumentation type:', type)
    }
  })
}
