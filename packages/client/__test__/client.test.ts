import { Tomorrow } from '../src/client'
const key = 'TEST_KEY'
const type = 'delay'
const expireTime = new Date().getTime()
const reportUrl = 'TEST_REPORT_URL'
const systemInfo = {
  platform: 'platform',
  userAgent: 'userAgent',
  language: 'language',
}

describe('init Tomorrow', () => {
  it('init success', () => {
    const tomorrow = new Tomorrow({
      key,
      type,
      reportUrl,
      expireTime,
      systemInfo,
    })
    expect(tomorrow._key).toEqual(key)
    expect(tomorrow._type).toEqual(type)
    expect(tomorrow._expireTime).toEqual(expireTime * 86400000)
    expect(tomorrow._systemInfo).toEqual(systemInfo)
  })
})
