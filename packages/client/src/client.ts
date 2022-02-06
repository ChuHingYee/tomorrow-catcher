import type { SystemInfo, Config } from '../types'
export class Tomorrow {
  readonly _key: string
  readonly _reportUrl: string
  readonly _expireDate: number
  readonly _systemInfo: SystemInfo
  private static instance: Tomorrow
  constructor({ key, reportUrl, expireDate, systemInfo }: Config) {
    this._key = key
    this._reportUrl = reportUrl
    this._expireDate = expireDate * 86400000
    this._systemInfo = {
      platform: systemInfo.platform,
      userAgent: systemInfo.userAgent,
      language: systemInfo.language,
      baseVersion: systemInfo.baseVersion,
      sdkVersion: systemInfo.sdkVersion,
    }
    if (!Tomorrow.instance) {
      Tomorrow.instance = this
      return Tomorrow.instance
    } else {
      return Tomorrow.instance
    }
  }
}
