import type { BrowserConfig, OriginLog } from '@tomorrow-catcher/browser'
import type { VueConstructor } from 'vue2'
import type { App } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import type VueRouter3 from 'vue-router3'
import type { Router } from 'vue-router'

export type ErrorForm = 'errorHandler' | 'router'

export interface VueConfig extends Omit<BrowserConfig, 'sdkVersion'> {
  vue: VueConstructor | App
  beforeUpload?: (
    err: any,
    form: ErrorForm,
    vm?: Vue | ComponentPublicInstance | null,
    info?: string
  ) => OriginLog['customInfo']
  router?: Router | VueRouter3
}
