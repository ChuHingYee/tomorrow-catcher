import { getGlobalTomorrow } from '@tomorrow-catcher/browser'
import type { App } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import type { VueConfig } from '../../types/client'
function initHandler(vue: App, beforeUpload?: VueConfig['beforeUpload']) {
  const prev = vue.config.errorHandler
  vue.config.errorHandler = function (
    err: unknown,
    vm: ComponentPublicInstance | null,
    info: string
  ) {
    const tomorrow = getGlobalTomorrow()
    if (tomorrow) {
      let customInfo = {
        from: 'errorHandler',
      }
      if (beforeUpload) {
        customInfo = {
          ...customInfo,
          ...beforeUpload(err, 'errorHandler', vm, info),
        }
      }
      tomorrow.emitTraceEvent(err as Error, customInfo)
    }
    if (typeof prev === 'function') {
      prev.call(vue, err, vm, info)
    }
  }
}

export { initHandler }
