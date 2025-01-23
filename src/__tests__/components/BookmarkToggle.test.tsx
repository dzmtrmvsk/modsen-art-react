import { render, screen, fireEvent } from '@testing-library/react'
import BookmarkToggle, { BookmarkToggleProps } from '@/components/BookMarkToggle'

import '@testing-library/jest-dom'

jest.mock('@/assets/icons/bookmark.svg', () => 'mockBookmarkSrc')

describe('BookmarkToggle', () => {
  const onToggleMock = jest.fn()

  const setup = (props: Partial<BookmarkToggleProps> = {}) => {
    const defaultProps: BookmarkToggleProps = {
      isSelected: false,
      onToggle: onToggleMock,
      id: 1,
      color: 'standard',
      ...props
    }
    return render(<BookmarkToggle {...defaultProps} />)
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the button with the correct default styles', () => {
    setup()

    const button = screen.getByRole('button', { name: /save to favorites/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-pressed', 'false')
    expect(button).toHaveClass('bookmarkButton')
    expect(button).not.toHaveClass('bookmarkButton--white')

    const img = screen.getByRole('img', { name: /save to favorites/i })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'mockBookmarkSrc')
  })

  it('applies the white color class when color is "white"', () => {
    setup({ color: 'white' })

    const button = screen.getByRole('button', { name: /save to favorites/i })
    expect(button).toHaveClass('bookmarkButton--white')
  })

  it('renders the button as selected when isSelected is true', () => {
    setup({ isSelected: true })

    const button = screen.getByRole('button', { name: /save to favorites/i })
    expect(button).toHaveAttribute('aria-pressed', 'true')
  })

  it('calls the onToggle function with the correct ID when clicked', () => {
    setup()

    const button = screen.getByRole('button', { name: /save to favorites/i })
    fireEvent.click(button)

    expect(onToggleMock).toHaveBeenCalledTimes(1)
    expect(onToggleMock).toHaveBeenCalledWith(1)
  })

  it('prevents default event behavior when clicked', () => {
    const preventDefaultMock = jest.fn()
    setup()

    const button = screen.getByRole('button', { name: /save to favorites/i })
    fireEvent.click(button, { preventDefault: preventDefaultMock })

    expect(preventDefaultMock).not.toHaveBeenCalled()
    expect(onToggleMock).toHaveBeenCalled()
  })

  it('renders correctly with custom ID and onToggle function', () => {
    const customOnToggle = jest.fn()
    setup({ id: 99, onToggle: customOnToggle })

    const button = screen.getByRole('button', { name: /save to favorites/i })
    fireEvent.click(button)

    expect(customOnToggle).toHaveBeenCalledTimes(1)
    expect(customOnToggle).toHaveBeenCalledWith(99)
  })
})
