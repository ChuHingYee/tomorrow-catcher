import { TomorrowBrowser } from '../src/client'
jest.mock('../src/handlers/errorHandler')
jest.mock('../src/handlers/unhandledrejectionHandler')
jest.mock('../src/handlers/fetchHandler')
jest.mock('../src/handlers/xmlHandler')
import { initOnErrorHandler } from '../src/handlers/errorHandler'
import { initOnUnhandledrejectionHandler } from '../src/handlers/unhandledrejectionHandler'
import { initFetchHandler } from '../src/handlers/fetchHandler'
import { initXMLHandler } from '../src/handlers/xmlHandler'
import { key, expireDate, reportUrl, sdkVersion, trackDepth } from './constants'
describe('Init TomorrowBrowser', () => {
  it('Init success', () => {
    const tomorrowBrowser = new TomorrowBrowser({
      key,
      reportUrl,
      expireDate,
      sdkVersion,
      trackDepth,
      handlersList: ['error', 'unhandledrejection', 'fetch', 'xhr'],
    })
    expect(initOnErrorHandler).toHaveBeenCalled()
    expect(initOnUnhandledrejectionHandler).toHaveBeenCalled()
    expect(initFetchHandler).toHaveBeenCalled()
    expect(initXMLHandler).toHaveBeenCalled()
    expect(tomorrowBrowser._tomorrow._key).toEqual(key)
    expect(tomorrowBrowser._tomorrow._expireDate).toEqual(0)
    expect(tomorrowBrowser._store).toEqual(null)
    expect(tomorrowBrowser._trackDepth).toEqual(2)
  })
  it('Singleton Pattern', () => {
    const tomorrowBrowserA = new TomorrowBrowser({
      key,
      reportUrl,
      sdkVersion,
      expireDate,
    })
    const tomorrowBrowserB = new TomorrowBrowser({
      key: 'key2',
      reportUrl,
      sdkVersion,
      expireDate,
    })
    expect(tomorrowBrowserA).toEqual(tomorrowBrowserB)
  })
})
