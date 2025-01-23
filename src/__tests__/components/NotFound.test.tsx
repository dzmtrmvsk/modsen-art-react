import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NotFound from '@/components/NotFound'
import { MemoryRouter } from 'react-router-dom'

describe('NotFound Component', () => {
  it('renders correctly with proper details', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    )

    const heading = screen.getByText('Looks like you are lost')
    expect(heading).toBeInTheDocument()

    const description = screen.getByText('The page you are looking for is not available!')
    expect(description).toBeInTheDocument()

    const link = screen.getByText('Go Home') as HTMLAnchorElement
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })

  it('contains all necessary style classes', () => {
    const { container } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    )

    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('page404')

    const containerElement = container.querySelector('.page404__container')
    expect(containerElement).toBeInTheDocument()
    expect(containerElement).toHaveClass('page404__container')

    const imageContainer = container.querySelector('.page404__imageContainer')
    expect(imageContainer).toBeInTheDocument()
    expect(imageContainer).toHaveClass('page404__imageContainer')

    const content = container.querySelector('.page404__content')
    expect(content).toBeInTheDocument()
    expect(content).toHaveClass('page404__content')
  })

  it('the "Go Home" link navigates to the home page', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    )

    const link = screen.getByText('Go Home') as HTMLAnchorElement
    expect(link.getAttribute('href')).toBe('/')
  })
})
