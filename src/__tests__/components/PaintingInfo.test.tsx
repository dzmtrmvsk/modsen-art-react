import { render, screen, waitFor } from '@testing-library/react'
import PaintingInfo from '@/components/PaintingInfo'
import { usePaintings } from '@/hooks/usePainting'
import { useSavedIds } from '@/hooks/useSavedIds'
import BookmarkToggle from '@/components/BookMarkToggle'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

jest.mock('@/hooks/usePainting')
jest.mock('@/hooks/useSavedIds')
jest.mock('@/components/BookMarkToggle')

const mockUsePaintings = usePaintings as jest.Mock
const mockUseSavedIds = useSavedIds as jest.Mock
const mockBookmarkToggle = BookmarkToggle as jest.MockedFunction<typeof BookmarkToggle>

const sampleArtwork = {
  id: 1,
  title: 'Starry Night',
  artistName: 'Vincent van Gogh',
  imageSource: '/starry-night.jpg',
  createdDate: '1889',
  originLocation: 'Saint-Rémy-de-Provence, France',
  artworkDimensions: '73.7 cm × 92.1 cm',
  acquisitionInfo: 'Donated by anonymous patron',
  associatedGallery: 'Museum of Modern Art',
  displayedInGallery: true
}

describe('PaintingInfo Component', () => {
  beforeEach(() => {
    mockUseSavedIds.mockReturnValue({
      savedIds: [],
      toggle: jest.fn()
    })

    mockBookmarkToggle.mockImplementation(({ id }) => <div data-testid={`bookmark-${id}`} />)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const renderComponent = (artId: number = 1) => {
    return render(
      <MemoryRouter>
        <PaintingInfo artId={artId} />
      </MemoryRouter>
    )
  }

  it('should display loading state correctly', () => {
    mockUsePaintings.mockReturnValue({
      data: null,
      isLoading: true,
      error: null
    })

    renderComponent()

    expect(screen.getByTestId('loader')).toBeInTheDocument()
    expect(screen.getByText(/Searching for painting with id:/)).toBeInTheDocument()
  })

  it('should handle error state', async () => {
    mockUsePaintings.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('API error')
    })

    renderComponent()

    await waitFor(() => {
      expect(screen.getByTestId('no-results')).toBeInTheDocument()
      expect(screen.getByText(/id: 1/)).toBeInTheDocument()
    })
  })

  it('should display artwork details correctly', async () => {
    mockUsePaintings.mockReturnValue({
      data: { artworks: [sampleArtwork] },
      isLoading: false,
      error: null
    })

    renderComponent()

    await waitFor(() => {
      expect(screen.getByText(sampleArtwork.title)).toBeInTheDocument()
      expect(screen.getByText(sampleArtwork.artistName)).toBeInTheDocument()
      expect(screen.getByText(sampleArtwork.createdDate)).toBeInTheDocument()
      expect(screen.getByText(sampleArtwork.originLocation)).toBeInTheDocument()
      expect(screen.getByText(sampleArtwork.artworkDimensions)).toBeInTheDocument()
      expect(screen.getByText(sampleArtwork.acquisitionInfo)).toBeInTheDocument()
      expect(screen.getByText(sampleArtwork.associatedGallery)).toBeInTheDocument()
      expect(screen.getByText('Public')).toBeInTheDocument()
    })
  })

  it('should handle missing optional fields gracefully', async () => {
    const incompleteArtwork = {
      ...sampleArtwork,
      originLocation: null,
      associatedGallery: null,
      displayedInGallery: false
    }

    mockUsePaintings.mockReturnValue({
      data: { artworks: [incompleteArtwork] },
      isLoading: false,
      error: null
    })

    renderComponent()

    await waitFor(() => {
      expect(screen.getAllByText('Unknown')).toHaveLength(2)
      expect(screen.getByText('Private')).toBeInTheDocument()
    })
  })

  it('should render BookmarkToggle with correct props', async () => {
    mockUseSavedIds.mockReturnValue({
      savedIds: [1],
      toggle: jest.fn()
    })

    mockUsePaintings.mockReturnValue({
      data: { artworks: [sampleArtwork] },
      isLoading: false,
      error: null
    })

    renderComponent()

    await waitFor(() => {
      expect(mockBookmarkToggle).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
          isSelected: true,
          color: 'white'
        }),
        expect.anything()
      )
    })
  })

  it('should handle multiple artwork responses', async () => {
    mockUsePaintings.mockReturnValue({
      data: { artworks: [sampleArtwork, sampleArtwork] },
      isLoading: false,
      error: null
    })

    renderComponent()

    await waitFor(() => {
      expect(screen.getAllByTestId('painting-info-section')).toHaveLength(1)
      console.error = jest.fn()
      expect(console.error).not.toHaveBeenCalledWith(
        expect.stringContaining('Encountered two children with the same key')
      )
    })
  })
})
