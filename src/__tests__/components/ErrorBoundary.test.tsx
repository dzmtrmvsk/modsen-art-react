import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import '@testing-library/jest-dom'

describe('ErrorBoundary', () => {
  const ThrowingComponent = ({ throwError }: { throwError: boolean }) => {
    if (throwError) {
      throw new Error('Test Error')
    }
    return <div>Safe Component</div>
  }

  const fallbackMock = jest.fn((error: Error | null) => <div>Fallback UI: {error?.message}</div>)
  const onErrorMock = jest.fn()

  let consoleErrorMock: jest.SpyInstance

  beforeAll(() => {
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterAll(() => {
    consoleErrorMock.mockRestore()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders children without error', () => {
    render(
      <ErrorBoundary fallback={fallbackMock}>
        <ThrowingComponent throwError={false} />
      </ErrorBoundary>
    )
    expect(screen.getByText('Safe Component')).toBeInTheDocument()
  })

  it('renders fallback UI when an error is thrown', () => {
    render(
      <ErrorBoundary fallback={fallbackMock} onError={onErrorMock}>
        <ThrowingComponent throwError />
      </ErrorBoundary>
    )
    expect(fallbackMock).toHaveBeenCalledWith(expect.any(Error))
    expect(screen.getByText('Fallback UI: Test Error')).toBeInTheDocument()
  })

  it('calls onError callback with error details', () => {
    render(
      <ErrorBoundary fallback={fallbackMock} onError={onErrorMock}>
        <ThrowingComponent throwError />
      </ErrorBoundary>
    )
    expect(onErrorMock).toHaveBeenCalledWith(expect.any(Error), expect.any(Object))
  })
})
