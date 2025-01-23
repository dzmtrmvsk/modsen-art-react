import { render, screen } from '@testing-library/react'
import ForYouArts from '@/components/ForYouArts'
import { MemoryRouter } from 'react-router-dom'
import { usePaintings } from '@/hooks/usePainting'
import '@testing-library/jest-dom'

jest.mock('@/hooks/usePainting', () => ({
  usePaintings: jest.fn(() => ({
    data: null,
    isLoading: true
  }))
}))

jest.mock('@/utils/pagination', () => ({
  getRandomPage: jest.fn(() => 1)
}))

const mockPaintings = [
  {
    id: 1,
    title: 'Starry Night',
    artist: 'Vincent van Gogh',
    imageUrl: '/starry-night.jpg'
  },
  {
    id: 2,
    title: 'Mona Lisa',
    artist: 'Leonardo da Vinci',
    imageUrl: '/mona-lisa.jpg'
  }
]

describe('ForYouArts Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <ForYouArts />
      </MemoryRouter>
    )
  }

  it('should show loader during initial loading', () => {
    renderComponent()
    expect(screen.getByTestId('loader')).toBeInTheDocument()
    expect(screen.getByText('Selecting even more paintings for you...')).toBeInTheDocument()
  })

  it('should display paintings list when data is loaded', () => {
    ;(usePaintings as jest.Mock).mockImplementation(() => ({
      data: { artworks: mockPaintings },
      isLoading: false
    }))

    renderComponent()

    expect(screen.getByTestId('paintings-list')).toBeInTheDocument()
    expect(screen.getAllByTestId('painting-item')).toHaveLength(mockPaintings.length)
    expect(screen.getByText('Other works for you')).toBeInTheDocument()
  })

  it('should handle empty state gracefully', () => {
    ;(usePaintings as jest.Mock).mockImplementation(() => ({
      data: { artworks: [] },
      isLoading: false
    }))

    renderComponent()

    expect(screen.queryByTestId('paintings-list')).not.toBeInTheDocument()
    expect(screen.queryAllByTestId('painting-item')).toHaveLength(0)
  })
})
