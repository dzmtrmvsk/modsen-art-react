import { render, screen, waitFor } from '@testing-library/react'
import SpecialArts from '@/components/SpecialArts'
import { usePaintings } from '@/hooks/usePainting'
import { usePagination } from '@/hooks/usePagination'
import { useDebounceValue } from '@/hooks/useDebounceValue'
import { getRandomPage } from '@/utils/pagination'
import { MemoryRouter } from 'react-router-dom'
import { ART_API_IMAGE_PATHS } from '@/constants/apiParams'
import '@testing-library/jest-dom'
import { IPainting } from '@/types/painting'

jest.mock('@/hooks/usePainting', () => ({
  usePaintings: jest.fn(() => ({
    data: null,
    isLoading: true
  }))
}))

jest.mock('@/hooks/usePagination')
jest.mock('@/hooks/useDebounceValue')
jest.mock('@/utils/pagination')

const mockUsePaintings = usePaintings as jest.Mock
const mockUsePagination = usePagination as jest.Mock
const mockUseDebounceValue = useDebounceValue as jest.Mock
const mockGetRandomPage = getRandomPage as jest.Mock

const mockPaintings: IPainting[] = [
  {
    id: 1,
    imageSource: '/images/mona-lisa.jpg',
    title: 'Mona Lisa',
    artistName: 'Leonardo da Vinci',
    displayedInGallery: true,
    originLocation: 'Florence, Italy',
    createdDate: '1503-1519',
    artworkDimensions: '77 x 53 cm',
    associatedGallery: 'Louvre Museum',
    acquisitionInfo: 'Acquired by Francis I of France'
  },
  {
    id: 2,
    imageSource: '/images/mona-lisa.jpg',
    title: 'Girl with a Pearl Earring',
    artistName: 'Leonardo da Vinci',
    displayedInGallery: true,
    originLocation: 'Florence, Italy',
    createdDate: '1503-1519',
    artworkDimensions: '77 x 53 cm',
    associatedGallery: 'Louvre Museum',
    acquisitionInfo: 'Acquired by Francis I of France'
  }
]

describe('SpecialArts Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    mockUseDebounceValue.mockImplementation((val) => val)
    mockGetRandomPage.mockReturnValue(5)
    mockUsePagination.mockReturnValue({
      currentPage: 1,
      totalPages: 3,
      visiblePages: [1, 2, 3],
      setCurrentPage: jest.fn(),
      nextPage: jest.fn(),
      previousPage: jest.fn()
    })
  })

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <SpecialArts />
      </MemoryRouter>
    )
  }

  it('should display initial loader', () => {
    renderComponent()
    expect(screen.getByTestId('loader')).toBeInTheDocument()
    expect(screen.getByText(/Looking for the best paintings/)).toBeInTheDocument()
  })

  it('should render paintings list with correct data', async () => {
    mockUsePaintings.mockImplementation(() => ({
      data: { artworks: mockPaintings, pagination: { totalPages: 3 } },
      isLoading: false
    }))

    renderComponent()

    await waitFor(() => {
      expect(screen.getByTestId('paintings-list')).toBeInTheDocument()
    })

    expect(screen.getAllByTestId('painting-item')).toHaveLength(2)
    expect(screen.getByText('Mona Lisa')).toBeInTheDocument()
    expect(screen.getByText('Girl with a Pearl Earring')).toBeInTheDocument()
  })

  it('should handle empty state gracefully', async () => {
    mockUsePaintings.mockImplementation(() => ({
      data: { artworks: [], pagination: { totalPages: 0 } },
      isLoading: false
    }))

    renderComponent()

    await waitFor(() => {
      expect(screen.queryByTestId('paintings-list')).not.toBeInTheDocument()
    })
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument()
  })

  it('should use correct pagination parameters', async () => {
    mockUsePaintings.mockImplementation((_, { page }) => ({
      data: {
        artworks: mockPaintings,
        pagination: { totalPages: 3, currentPage: page }
      },
      isLoading: false
    }))

    renderComponent()

    await waitFor(() => {
      expect(mockUsePaintings).toHaveBeenCalledWith(
        'pagination',
        expect.objectContaining({
          limit: 3,
          page: expect.any(Number)
        }),
        ART_API_IMAGE_PATHS.MAJOR
      )
    })
  })

  it('should update page with debounce', async () => {
    mockUseDebounceValue.mockImplementation((val) => val + 5)
    mockGetRandomPage.mockReturnValue(5)
    mockUsePaintings.mockImplementation(() => ({
      data: { artworks: mockPaintings, pagination: { totalPages: 3 } },
      isLoading: false
    }))

    renderComponent()
    await waitFor(() => {
      expect(mockUsePaintings).toHaveBeenCalledWith(
        'pagination',
        expect.objectContaining({
          limit: 3,
          page: 11
        }),
        ART_API_IMAGE_PATHS.MAJOR
      )
    })
  })

  it('should generate random page on mount', () => {
    renderComponent()
    expect(mockGetRandomPage).toHaveBeenCalledTimes(1)
  })

  it('should display pagination only when needed', async () => {
    mockUsePaintings.mockImplementation(() => ({
      data: {
        artworks: mockPaintings,
        pagination: { totalPages: 3 }
      },
      isLoading: false
    }))

    renderComponent()

    await waitFor(() => {
      expect(screen.getByTestId('pagination')).toBeInTheDocument()
    })
  })
})
