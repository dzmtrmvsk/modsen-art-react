import { Component, ReactNode, ErrorInfo } from 'react'

export interface ErrorBoundaryProps {
  fallback: (error: Error | null) => ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  public render(): ReactNode {
    const { hasError, error } = this.state
    const { fallback, children } = this.props

    if (hasError) {
      return fallback(error)
    }

    return children
  }
}
