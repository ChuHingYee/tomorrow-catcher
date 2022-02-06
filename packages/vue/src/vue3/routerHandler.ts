import { getGlobalTomorrow } from '@tomorrow-catcher/browser'
import type { Router } from 'vue-router'
import type { VueConfig } from '../../types/client'
export function initRouterHandler(
  router: Router,
  beforeUpload?: VueConfig['beforeUpload']
) {
  if (!router) {
    // eslint-disable-next-line no-console
    console.warn('Vue-Router is not exist')
    return
  }
  router.onError((err) => {
    let customInfo = {
      from: 'router',
    }
    if (beforeUpload) {
      customInfo = {
        ...customInfo,
        ...beforeUpload(err, 'router'),
      }
    }
    const tomorrow = getGlobalTomorrow()
    if (tomorrow) {
      tomorrow.emitTraceEvent(err, customInfo)
    }
  })
}
