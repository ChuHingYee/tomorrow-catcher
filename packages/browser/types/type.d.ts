import type { TomorrowBrowser } from '../src/client'

declare global {
  interface Window {
    __tomorrowBrowser__: TomorrowBrowser
  }
}
