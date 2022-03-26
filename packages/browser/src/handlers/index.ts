import { initErrorHandler } from './errorHandler'
import { initOnUnhandledrejectionHandler } from './unhandledrejectionHandler'
import { initFetchHandler } from './fetchHandler'
import { initXMLHandler } from './xmlHandler'
import { initSourceLoadHandler } from './sourceLoadHandler'
import { initLagHandler } from './lagHandler'
import type { TomorrowBrowser } from '../client'
import type { Handlers, BrowserConfig } from '../../types/client'

export function initHandlers(
  instance: TomorrowBrowser,
  handlersList: Handlers[],
  handlersOpts: BrowserConfig['handlersOpts']
) {
  handlersList.forEach((type) => {
    switch (type) {
      case 'error':
        initErrorHandler(instance)
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
        initSourceLoadHandler(instance)
        break
      case 'lag':
        initLagHandler(instance, handlersOpts?.lag)
        break
      default:
        // eslint-disable-next-line no-console
        console.warn('unknown instrumentation type:', type)
    }
  })
}
