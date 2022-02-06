import { TomorrowBrowser } from '../src/client'
import { key, expireTime, reportUrl, log, sdkInfo } from './constants'

describe('Emit normal event', () => {
  const tomorrowBrowser = new TomorrowBrowser({
    key,
    type: 'immediate',
    reportUrl,
    expireTime,
    sdkInfo,
  })
  it('sendBeacon is exist', () => {
    navigator.sendBeacon = jest.fn().mockReturnValue(true)
    tomorrowBrowser.emitEvent(log)
    expect(navigator.sendBeacon).toHaveBeenCalled()
    expect(navigator.sendBeacon).toHaveBeenCalledTimes(1)
    expect(navigator.sendBeacon).toHaveReturnedWith(true)
  })
  it('XML', () => {
    ;(navigator.sendBeacon as unknown) = null
    const xhrMock = {
      open: jest.fn(),
      send: jest.fn(),
      setRequestHeader: jest.fn(),
      readyState: 4,
      status: 200,
      onreadystatechange: jest.fn(),
    }
    jest
      .spyOn(window, 'XMLHttpRequest')
      .mockImplementation(() => xhrMock as unknown as XMLHttpRequest)
    tomorrowBrowser.emitEvent(log)
    expect(xhrMock.open).toBeCalledWith(
      'POST',
      tomorrowBrowser._tomorrow._reportUrl,
      false
    )
    expect(xhrMock.setRequestHeader).toBeCalledWith(
      'Content-Type',
      'application/json;charset=UTF-8'
    )
    // expect(xhrMock.send).toBeCalledWith(JSON.stringify(data))
    xhrMock.onreadystatechange(new Event(''))
  })
})
