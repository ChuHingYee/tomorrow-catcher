export interface SystemInfo {
  platform: string
  userAgent: string
  language: string
  baseVersion: string
  sdkVersion: string
}

export interface Config {
  key: string
  expireDate: number
  reportUrl: string
  systemInfo: SystemInfo
}
