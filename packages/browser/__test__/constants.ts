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
export const expireDate = 0
export const reportUrl = 'TEST_REPORT_URL'
export const sdkVersion = `${pkg.name}-${pkg.version}`
export const trackDepth = 2
