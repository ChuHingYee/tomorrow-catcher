import { Tomorrow } from '@tomorrow-catcher/client'
import TraceKit from 'tracekit'
import { Store } from './store'
import { initHandlers } from './handlers'
import pkg from '../package.json'
import type {
  BrowserConfig,
  TomorrowLogList,
  OriginLog,
  TomorrowLog,
} from '../types'
const _version = `${pkg.name}-${pkg.version}`
class TomorrowBrowser {
  _tomorrow: Tomorrow
  _store: Store | null
  _trackDepth: number
  _stackHasContext: boolean
  private static instance: TomorrowBrowser
  constructor(config: BrowserConfig) {
    const {
      handlersList,
      handlersOpts,
      sdkVersion,
      trackDepth,
      stackHasContext,
      ...rest
    } = config
    const navigator = window.navigator
    this._tomorrow = new Tomorrow({
      ...rest,
      systemInfo: {
        platform: navigator.platform,
        userAgent: navigator.userAgent,
        language: navigator.language,
        connection: {
          effectiveType:
            (navigator as any).connection?.effectiveType || 'unknow',
          type: (navigator as any).connection.type || 'unknow',
        },
        baseVersion: _version,
        sdkVersion: sdkVersion || _version,
      },
    })
    if (this._tomorrow._expireDate === 0) {
      this._store = null
    } else {
      this._store = new Store(this)
    }
    this._trackDepth = trackDepth || 0
    this._stackHasContext = stackHasContext || false
    if (handlersList && handlersList.length > 0) {
      initHandlers(this, handlersList, handlersOpts)
    }
    if (!TomorrowBrowser.instance) {
      TomorrowBrowser.instance = this
      return TomorrowBrowser.instance
    } else {
      return TomorrowBrowser.instance
    }
  }
  report(data: TomorrowLogList) {
    const dataStr = JSON.stringify(data.list)
    const formData = new FormData()
    formData.append('appKey', data.appKey)
    formData.append('list', dataStr)
    if (navigator.sendBeacon) {
      return navigator.sendBeacon(this._tomorrow._reportUrl, formData)
    } else {
      return new Promise<boolean>((resolve) => {
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) return resolve(true)
            resolve(false)
          } else {
            resolve(false)
          }
        }
        xhr.open('POST', this._tomorrow._reportUrl, false)
        xhr.send(formData)
      })
    }
  }
  emitTraceEvent(err: Error, customInfo?: OriginLog['customInfo']): void {
    const trace = TraceKit.computeStackTrace(err)
    if (this._trackDepth !== 0 && trace.stack.length) {
      trace.stack = trace.stack.splice(0, this._trackDepth)
    }
    if (!this._stackHasContext) {
      trace.stack = trace.stack.map((item) => {
        return {
          ...item,
          context: [],
        }
      })
    }
    const _time = Date.now()
    const log: OriginLog = {
      time: _time,
      customInfo: customInfo || {},
      trace,
      type: 'unknow',
    }
    this.emitEvent(log)
  }
  emitEvent(log: OriginLog): void {
    const tomorrowLog: TomorrowLog = {
      ...log,
      href: window.location.href,
      expireDate: this._tomorrow._expireDate * 86400000 + log.time,
      systemInfo: this._tomorrow._systemInfo,
    }
    if (this._tomorrow._expireDate === 0 || !this._store) {
      this.report({
        appKey: this._tomorrow._key,
        list: [tomorrowLog],
      })
    } else {
      if (!this._store.dbIsInit) {
        this._store.logsCache.push(tomorrowLog)
      } else {
        if (this._store.db) {
          this._store.addLog(tomorrowLog)
        } else {
          this.report({
            appKey: this._tomorrow._key,
            list: [tomorrowLog],
          })
        }
      }
    }
  }
}

export { TomorrowBrowser }
