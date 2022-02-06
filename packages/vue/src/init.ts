import { init as initTomorrow } from '@tomorrow-catcher/browser'
import pkg from '../package.json'
import { isVue2, isVue3 } from 'vue-demi'
import {
  initHandler as initHandlerVue2,
  initRouterHandler as initRouterHandler2,
} from './vue2'
import {
  initHandler as initHandlerVue3,
  initRouterHandler as initRouterHandler3,
} from './vue3'
import type VueRouter3 from 'vue-router3'
import type { Router } from 'vue-router'
import type { VueConfig } from '../types'
import type { VueConstructor } from 'vue2'
import type { App } from 'vue'
const _version = `${pkg.name}-${pkg.version}`
function init(config: VueConfig) {
  const { vue, router, beforeUpload, ...rest } = config
  if (!vue) {
    return
  }
  initTomorrow({
    ...rest,
    sdkVersion: `${_version}/${vue.version}`,
  })
  if (isVue2) {
    initHandlerVue2(vue as VueConstructor, beforeUpload)
    router && initRouterHandler2(router as VueRouter3, beforeUpload)
  } else if (isVue3) {
    initHandlerVue3(vue as App, beforeUpload)
    router && initRouterHandler3(router as Router, beforeUpload)
  }
}

export { init }
