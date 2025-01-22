import { render, screen, fireEvent } from '@testing-library/react'
import BurgerMenuButton from '@/components/BurgerMenuButton'
import { useBurgerMenuContext } from '@/contexts/BurgerMenuContext'
import '@testing-library/jest-dom'

jest.mock('@/contexts/BurgerMenuContext', () => ({
  useBurgerMenuContext: jest.fn()
}))

describe('BurgerMenuButton', () => {
  const toggleMenuMock = jest.fn()

  const setup = (isMenuOpened: boolean) => {
    ;(useBurgerMenuContext as jest.Mock).mockReturnValue({
      toggleMenu: toggleMenuMock,
      isMenuOpened
    })

    return render(<BurgerMenuButton />)
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the button with the correct default attributes', () => {
    setup(false)

    const button = screen.getByRole('button', { name: /open menu/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveAttribute('data-open', 'false')
  })

  it('renders the correct aria-label when the menu is closed', () => {
    setup(false)

    const button = screen.getByRole('button', { name: /open menu/i })
    expect(button).toHaveAttribute('aria-label', 'Open menu')
  })

  it('renders the correct aria-label when the menu is opened', () => {
    setup(true)

    const button = screen.getByRole('button', { name: /close menu/i })
    expect(button).toHaveAttribute('aria-label', 'Close menu')
  })

  it('calls toggleMenu when clicked', () => {
    setup(false)

    const button = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(button)

    expect(toggleMenuMock).toHaveBeenCalledTimes(1)
  })

  it('renders the correct number of bars', () => {
    setup(false)

    const bars = screen.getAllByRole('presentation')
    expect(bars).toHaveLength(3)
    bars.forEach((bar) => {
      expect(bar).toHaveClass('bar')
    })
  })
})
