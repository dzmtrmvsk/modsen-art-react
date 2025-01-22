import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import FavoriteArts from '@/components/FavoriteArts'
import { usePaintings } from '@/hooks/usePainting'
import { useSavedIds } from '@/hooks/useSavedIds'
import { IPainting } from '@/types/painting'

jest.mock('@/hooks/usePainting', () => ({
  usePaintings: jest.fn()
}))

jest.mock('@/hooks/useSavedIds', () => ({
  useSavedIds: jest.fn()
}))

jest.mock('@/components/Loader', () => {
  const MockLoader = () => <div>Loading your favorites paintings...</div>
  MockLoader.displayName = 'MockLoader'
  return MockLoader
})

jest.mock('@/components/PaintingsList/PaintingsList', () => ({
  __esModule: true,
  default: jest.fn(({ artworks }) => (
    <div data-testid="paintings-list">
      {artworks.map((art: IPainting) => (
        <div key={art.id}>{art.title}</div>
      ))}
    </div>
  ))
}))

jest.mock('react-router-dom', () => ({
  Link: ({
    to,
    className,
    children
  }: {
    to: string
    className: string
    children: React.ReactNode
  }) => (
    <a href={to} className={className}>
      {children}
    </a>
  )
}))

describe('FavoriteArts Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the loading state correctly', () => {
    ;(useSavedIds as jest.Mock).mockReturnValue({ savedIds: [1, 2, 3] })
    ;(usePaintings as jest.Mock).mockReturnValue({ data: null, isLoading: true })

    render(<FavoriteArts />)

    expect(screen.getByText('Loading your favorites paintings...')).toBeInTheDocument()
  })

  it('renders the favorites list when paintings are available', () => {
    ;(useSavedIds as jest.Mock).mockReturnValue({ savedIds: [1, 2] })
    ;(usePaintings as jest.Mock).mockReturnValue({
      data: {
        artworks: [
          { id: 1, title: 'Painting 1' },
          { id: 2, title: 'Painting 2' }
        ]
      },
      isLoading: false
    })

    render(<FavoriteArts />)

    expect(screen.getByText('Here Are Your')).toBeInTheDocument()
    expect(screen.getByText('Favorites')).toBeInTheDocument()
    expect(screen.getByTestId('paintings-list')).toBeInTheDocument()
    expect(screen.getByText('Painting 1')).toBeInTheDocument()
    expect(screen.getByText('Painting 2')).toBeInTheDocument()
  })

  it('renders the empty state when no paintings are available', () => {
    ;(useSavedIds as jest.Mock).mockReturnValue({ savedIds: [] })
    ;(usePaintings as jest.Mock).mockReturnValue({
      data: { artworks: [] },
      isLoading: false
    })

    render(<FavoriteArts />)

    expect(screen.getByText('Go to the main page and start learning art now')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
  })

  it('handles null data gracefully when no saved paintings exist', () => {
    ;(useSavedIds as jest.Mock).mockReturnValue({ savedIds: [] })
    ;(usePaintings as jest.Mock).mockReturnValue({ data: null, isLoading: false })

    render(<FavoriteArts />)

    expect(screen.getByText('Go to the main page and start learning art now')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
  })
})
