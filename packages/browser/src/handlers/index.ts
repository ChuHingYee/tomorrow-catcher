import { initOnErrorHandler } from './errorHandler'
import { initOnUnhandledrejectionHandler } from './unhandledrejectionHandler'
import { initFetchHandler } from './fetchHandler'
import { initXMLHandler } from './xmlHandler'
import { sourceLoadHandler } from './sourceLoadHandler'
import type { TomorrowBrowser } from '../client'
import type { Handlers } from '../../types/client'

export function initHandlers(
  instance: TomorrowBrowser,
  handlersList: Handlers[]
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
      case 'sourceLoad':
        sourceLoadHandler(instance)
        break
      default:
        // eslint-disable-next-line no-console
        console.warn('unknown instrumentation type:', type)
    }
  })
}
