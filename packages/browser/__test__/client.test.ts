import { TomorrowBrowser } from '../src/client'
jest.mock('../src/handlers/errorHandler')
jest.mock('../src/handlers/unhandledrejectionHandler')
jest.mock('../src/handlers/fetchHandler')
jest.mock('../src/handlers/xmlHandler')
import { initOnErrorHandler } from '../src/handlers/errorHandler'
import { initOnUnhandledrejectionHandler } from '../src/handlers/unhandledrejectionHandler'
import { initFetchHandler } from '../src/handlers/fetchHandler'
import { initXMLHandler } from '../src/handlers/xmlHandler'
import { key, expireTime, reportUrl, version, sdkInfo } from './constants'
describe('Init TomorrowBrowser', () => {
  it('Init success', () => {
    const tomorrowBrowser = new TomorrowBrowser({
      key,
      type: 'delay',
      reportUrl,
      expireTime,
      sdkInfo,
      handlersList: ['error', 'unhandledrejection', 'fetch', 'xhr'],
    })
    expect(initOnErrorHandler).toHaveBeenCalled()
    expect(initOnUnhandledrejectionHandler).toHaveBeenCalled()
    expect(initFetchHandler).toHaveBeenCalled()
    expect(initXMLHandler).toHaveBeenCalled()
    expect(tomorrowBrowser._tomorrow._key).toEqual(key)
    expect(tomorrowBrowser._tomorrow._type).toEqual('delay')
    expect(tomorrowBrowser._tomorrow._expireTime).toEqual(expireTime * 86400000)
    expect(tomorrowBrowser._sdkInfo.version).toEqual(version)
    expect(tomorrowBrowser._sdkInfo.type).toEqual(sdkInfo.type)
  })
  it('Singleton Pattern', () => {
    const tomorrowBrowserA = new TomorrowBrowser({
      key,
      type: 'delay',
      reportUrl,
      sdkInfo,
      expireTime,
    })
    const tomorrowBrowserB = new TomorrowBrowser({
      key: 'key2',
      type: 'immediate',
      reportUrl,
      sdkInfo,
      expireTime,
    })
    expect(tomorrowBrowserA).toEqual(tomorrowBrowserB)
  })
})
