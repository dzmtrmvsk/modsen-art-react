import { render, screen, fireEvent } from '@testing-library/react'
import ErrorFallback from '@/components/ErrorFallback'
import '@testing-library/jest-dom'

describe('ErrorFallback', () => {
  const error = new Error('Test Error')
  const resetErrorBoundaryMock = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the fallback UI with error details', () => {
    render(<ErrorFallback error={error} />)

    expect(screen.getByText('Oops, something went wrong!')).toBeInTheDocument()
    expect(
      screen.getByText(
        'We are sorry for the inconvenience. Our team has been notified, and we are working to restore this module as soon as possible.'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('See error details')).toBeInTheDocument()
  })

  it('shows error details when expanded', () => {
    render(<ErrorFallback error={error} />)
    fireEvent.click(screen.getByText('See error details'))
    expect(screen.getByText('Test Error')).toBeInTheDocument()
  })

  it('renders the reset button when resetErrorBoundary is provided', () => {
    render(<ErrorFallback error={error} resetErrorBoundary={resetErrorBoundaryMock} />)
    const button = screen.getByRole('button', { name: /try again/i })
    expect(button).toBeInTheDocument()

    fireEvent.click(button)
    expect(resetErrorBoundaryMock).toHaveBeenCalledTimes(1)
  })

  it('does not render the reset button when resetErrorBoundary is not provided', () => {
    render(<ErrorFallback error={error} />)
    expect(screen.queryByRole('button', { name: /try again/i })).not.toBeInTheDocument()
  })
})
