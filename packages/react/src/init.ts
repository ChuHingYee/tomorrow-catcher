import { init as initTomorrow } from '@tomorrow-catcher/browser'
import react from 'react'
import pkg from '../package.json'
import type { ReactConfig } from '../types'
const _version = `${pkg.name}-${pkg.version}`
function init(config: ReactConfig) {
  initTomorrow({
    ...config,
    sdkVersion: `${_version}/${react.version}`,
  })
}

export { init }
