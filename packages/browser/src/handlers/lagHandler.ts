import type { TomorrowBrowser } from '../client'
import type { LagHandlerOpts } from '../../types/client'
export function initLagHandler(
  instance: TomorrowBrowser,
  opts?: LagHandlerOpts
): void {
  const threshold = opts?.threshold || 20
  const second = opts?.second || 3
  let lastTime = performance.now()
  let frame = 0
  let lastFameTime = performance.now()
  let records: number[] = []
  const animationFrame = (() => {
    return (
      window.requestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60)
      }
    )
  })()
  const loop = () => {
    const now = performance.now()
    const fs = now - lastFameTime
    lastFameTime = now
    let fps = Math.round(1000 / fs)
    frame++
    if (now > 1000 + lastTime) {
      fps = Math.round((frame * 1000) / (now - lastTime))
      if (fps < threshold) {
        records.push(fps)
      }
      if (records.length > second) {
        instance.emitEvent({
          time: new Date().getTime(),
          url: window.location.href,
          type: 'lag',
        })
        records = []
      }
      frame = 0
      lastTime = now
    }
    animationFrame(loop)
  }
  loop()
}
