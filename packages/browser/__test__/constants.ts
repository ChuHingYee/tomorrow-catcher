import pkg from '../package.json'
export const log = {
  time: Date.now(),
  customInfo: {
    a: 'a',
    b: 'b',
    c: 1,
  },
  trace: undefined,
}
export const key = 'TEST_KEY'
export const type = 'delay'
export const expireTime = new Date().getTime()
export const reportUrl = 'TEST_REPORT_URL'
export const version = `${pkg.name}-${pkg.version}`
export const sdkInfo = {
  type: 'normal',
}
