import { TomorrowBrowser } from './client'
import type { BrowserConfig } from '../types/index'
function init(config: BrowserConfig) {
  const tomorrowBrowser = new TomorrowBrowser(config)
  window.__tomorrowBrowser__ = tomorrowBrowser
  return tomorrowBrowser
}

export { init }
