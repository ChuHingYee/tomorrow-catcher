import React from 'react'
import { getGlobalTomorrow } from '@tomorrow-catcher/browser'
import type { TomorrowLog } from '@tomorrow-catcher/browser'
export type ErrorBoundaryProps = {
  errorComponent?: React.ReactElement
  onMount?(): void
  onUnmount?(): void
  onError?(error: Error, errorInfo: string): void
  beforeUpload?(
    error: Error | null,
    errorInfo: string
  ): TomorrowLog['customInfo']
}
export type ErrorBoundaryState = {
  hasError: boolean
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  public componentDidCatch(error, errorInfo) {
    const { onError, beforeUpload } = this.props
    if (onError) {
      onError(error, errorInfo)
    }
    const tomorrow = getGlobalTomorrow()
    if (tomorrow) {
      let customInfo: TomorrowLog['customInfo'] = {
        from: 'errorBoundary',
        errorInfo,
      }
      if (beforeUpload) {
        customInfo = {
          ...customInfo,
          ...beforeUpload(error, errorInfo),
        }
      }
      tomorrow.emitTraceEvent(error, customInfo)
    }
  }

  public componentDidMount(): void {
    const { onMount } = this.props
    if (onMount) {
      onMount()
    }
  }

  public componentWillUnmount(): void {
    const { onUnmount } = this.props
    if (onUnmount) {
      onUnmount()
    }
  }

  render() {
    const { errorComponent } = this.props
    const { hasError } = this.state
    if (hasError) {
      return errorComponent ? errorComponent : <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}

export { ErrorBoundary }
