import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Container from '@/components/Container'

jest.mock('@/components/Container/styles.module.scss', () => ({
  container: 'mock-container'
}))

describe('Container Component', () => {
  it('renders children inside the container', () => {
    render(
      <Container>
        <p>Test Content</p>
      </Container>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies default container styles', () => {
    render(<Container>Test Content</Container>)

    const container = screen.getByText('Test Content').closest('div')
    expect(container).toHaveClass('mock-container')
  })

  it('applies additional className when provided', () => {
    render(
      <Container className="custom-class">
        <p>Test Content</p>
      </Container>
    )

    const container = screen.getByText('Test Content').closest('div')
    expect(container).toHaveClass('mock-container custom-class')
  })
})
