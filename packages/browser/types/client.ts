import type { StackTrace } from 'tracekit'
import type { Tomorrow } from '@tomorrow-catcher/client'

export interface OriginLog {
  time: number
  customInfo: {
    [key: string]: any
  }
  trace?: StackTrace
}

export interface TomorrowLog extends OriginLog {
  systemInfo: Tomorrow['_systemInfo']
  expireDate: number
  id?: number
}

export interface TomorrowLogList {
  appKey: string
  list: TomorrowLog[]
}

export type Handlers =
  | 'error'
  | 'unhandledrejection'
  | 'fetch'
  | 'xhr'
  | 'sourceLoad'
  | 'lag'

export interface BrowserConfig {
  key: string
  expireDate: number
  reportUrl: string
  sdkVersion: string
  trackDepth?: number
  stackHasContext?: boolean
  handlersList?: Handlers[]
}
