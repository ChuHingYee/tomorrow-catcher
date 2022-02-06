import { getGlobalTomorrow } from '@tomorrow-catcher/browser'
import type Vue from 'vue2'
import type { VueConstructor } from 'vue2'
import type { VueConfig } from '../../types/client'
function initHandler(
  vue: VueConstructor,
  beforeUpload?: VueConfig['beforeUpload']
) {
  const prev = vue.config.errorHandler
  vue.config.errorHandler = function (err: Error, vm: Vue, info: string) {
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
      tomorrow.emitTraceEvent(err, customInfo)
    }
    if (typeof prev === 'function') {
      prev.call(vue, err, vm, info)
    }
  }
}

export { initHandler }
