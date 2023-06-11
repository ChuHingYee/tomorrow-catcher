export type ConnectionEffectiveType = 'slow-2g' | '2g' | '3g' | '4g' | 'unknown'

export type ConnectionType =
  | 'bluetooth'
  | 'cellular'
  | 'ethernet'
  | 'none'
  | 'wifi'
  | 'wimax'
  | 'other'
  | 'unknown'

export interface SystemInfo {
  platform: string
  userAgent: string
  language: string
  connection: {
    effectiveType: ConnectionEffectiveType
    type: ConnectionType
  }
  baseVersion: string
  sdkVersion: string
}

export interface Config {
  key: string
  expireDate: number
  reportUrl: string
  systemInfo: SystemInfo
}
