import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CompactPainting, CompactPaintingProps } from '@/components/CompactPainting'
import BookmarkToggle from '@/components/BookMarkToggle'

jest.mock('@/components/BookMarkToggle', () => ({
  __esModule: true,
  default: jest.fn(({ isSelected, onToggle }) => (
    <button data-testid="bookmark-toggle" onClick={onToggle} type="button">
      {isSelected ? 'Unmark Favorite' : 'Mark Favorite'}
    </button>
  ))
}))

const mockProps: CompactPaintingProps = {
  painting: {
    id: 1,
    imageSource: '/test-image.jpg',
    title: 'Test Title',
    artistName: 'Test Artist',
    displayedInGallery: true,
    originLocation: 'Florence, Italy',
    createdDate: '1503-1519',
    artworkDimensions: '77 x 53 cm',
    associatedGallery: 'Louvre Museum',
    acquisitionInfo: 'Acquired by Francis I of France'
  },
  isMarkedAsFavorite: jest.fn().mockReturnValue(false),
  onPaintingClick: jest.fn(),
  toggleFavorites: jest.fn()
}

describe('CompactPainting Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the component with correct details', () => {
    render(<CompactPainting {...mockProps} />)

    expect(screen.getByAltText('Test Title')).toHaveAttribute('src', '/test-image.jpg')
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Artist')).toBeInTheDocument()
    expect(screen.getByText('Public')).toBeInTheDocument()
  })

  it('handles image error and displays placeholder', () => {
    render(<CompactPainting {...mockProps} />)

    const image = screen.getByAltText('Test Title')
    fireEvent.error(image)

    expect(image).toHaveAttribute('src', '/images/placeholder.svg')
  })

  it('calls onPaintingClick when the card is clicked', () => {
    render(<CompactPainting {...mockProps} />)

    const card = screen.getByText('Test Title').closest('.paintingCard__wrapper')
    fireEvent.click(card!)

    expect(mockProps.onPaintingClick).toHaveBeenCalledWith(1)
  })

  it('prevents event propagation when bookmark toggle is clicked', () => {
    render(<CompactPainting {...mockProps} />)

    const bookmarkButton = screen.getByTestId('bookmark-toggle')
    fireEvent.click(bookmarkButton)

    expect(mockProps.toggleFavorites).toHaveBeenCalledWith(1)
    expect(mockProps.onPaintingClick).not.toHaveBeenCalled()
  })

  it('renders BookmarkToggle with correct props', () => {
    render(<CompactPainting {...mockProps} />)

    expect(BookmarkToggle).toHaveBeenCalledWith(
      expect.objectContaining({
        isSelected: false,
        onToggle: expect.any(Function),
        id: 1
      }),
      {}
    )
  })

  it('updates isFavorite correctly when isMarkedAsFavorite changes', () => {
    const { rerender } = render(<CompactPainting {...mockProps} />)

    expect(screen.getByTestId('bookmark-toggle')).toHaveTextContent('Mark Favorite')

    const newProps = {
      ...mockProps,
      isMarkedAsFavorite: jest.fn().mockReturnValue(true)
    }

    rerender(<CompactPainting {...newProps} />)
    expect(screen.getByTestId('bookmark-toggle')).toHaveTextContent('Unmark Favorite')
  })
})
