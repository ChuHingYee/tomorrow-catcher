export interface SystemInfo {
  platform: string
  userAgent: string
  language: string
  connection: {
    effectiveType: string
    type: NetworkInformation['type']
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
