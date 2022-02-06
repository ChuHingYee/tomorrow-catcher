import type { TomorrowLog } from '../types'
import type { TomorrowBrowser } from './client'
class Store {
  private _instance: TomorrowBrowser
  logsCache: TomorrowLog[]
  db: IDBDatabase | null
  dbIsInit: boolean
  constructor(instance: TomorrowBrowser) {
    this._instance = instance
    this.dbIsInit = false
    this.db = null
    this.logsCache = []
    this.initDb().then((result) => {
      if (result) {
        if (this._instance._tomorrow._expireDate !== 0) {
          this.handleDelay()
        } else {
          if (this.logsCache.length) {
            this.logsCache.forEach((log) => {
              this.addLog(log)
            })
            this.logsCache = []
          }
        }
      }
    })
  }
  private initDb(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        // eslint-disable-next-line no-console
        console.warn('indexedDB is not exist~')
        this.dbIsInit = true
        resolve(false)
        return
      }
      const request: IDBOpenDBRequest = indexedDB.open('tomorrow', 1)
      request.onerror = () => {
        // eslint-disable-next-line no-console
        console.warn('open indexedDB error')
        this.dbIsInit = true
        reject(false)
      }
      request.onsuccess = (event: any) => {
        this.db = event.target.result
        this.dbIsInit = true
        resolve(true)
      }
      request.onupgradeneeded = (event: any) => {
        this.db = event.target.result
        this.dbIsInit = true
        if (
          !(this.db as IDBDatabase).objectStoreNames.contains('tomorrow_logs')
        ) {
          ;(this.db as IDBDatabase).createObjectStore('tomorrow_logs', {
            keyPath: 'id',
            autoIncrement: true,
          })
        }
      }
    })
  }
  async addLog(data: TomorrowLog): Promise<boolean> {
    try {
      const request = (this.db as IDBDatabase)
        .transaction('tomorrow_logs', 'readwrite')
        .objectStore('tomorrow_logs')
        .add(data)
      return new Promise((resolve, reject) => {
        request.onerror = function () {
          reject(false)
        }
        request.onsuccess = function () {
          resolve(true)
        }
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      return Promise.resolve(false)
    }
  }
  private async delLogs(keys: number[]): Promise<void> {
    const _store = (this.db as IDBDatabase)
      .transaction('tomorrow_logs', 'readwrite')
      .objectStore('tomorrow_logs')
    keys.forEach((key) => {
      _store.delete(key)
    })
  }
  private async getLogs(time: number): Promise<TomorrowLog[]> {
    try {
      return new Promise<TomorrowLog[]>((resolve) => {
        const objectStore = (this.db as IDBDatabase)
          .transaction('tomorrow_logs', 'readonly')
          .objectStore('tomorrow_logs')
        const logsList: TomorrowLog[] = []
        objectStore.openCursor().onsuccess = (event: any) => {
          const cursor = event.target.result
          if (cursor) {
            if (cursor.value.expireDate <= time) {
              logsList.push(cursor.value)
            }
            cursor.continue()
          } else {
            resolve(logsList)
          }
        }
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      return Promise.resolve([])
    }
  }
  private async handleDelay(): Promise<void> {
    const dbLogs = await this.getLogs(
      Date.now() + this._instance._tomorrow._expireDate * 86400000
    )
    const logs = [...dbLogs, ...this.logsCache]
    if (logs.length > 0) {
      this._instance.report({
        appKey: this._instance._tomorrow._key,
        list: logs,
      })
      this.delLogs(
        dbLogs.map((item) => {
          return item?.id || -1
        })
      )
      this.logsCache = []
    }
  }
}

export { Store }
