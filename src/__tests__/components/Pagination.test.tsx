import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { Pagination } from '@/components/Pagination'
import { PaginationState } from '@/hooks/usePagination'
import '@testing-library/jest-dom'

const mockPaginationBase: PaginationState = {
  startPage: 1,
  endPage: 5,
  currentPage: 3,
  hasPrevious: true,
  hasNext: true,
  visiblePages: [1, 2, 3, 4, 5],
  goToPage: jest.fn(),
  nextPage: jest.fn(),
  previousPage: jest.fn(),
  goToFirst: jest.fn(),
  goToLast: jest.fn()
}

describe('Pagination Component', () => {
  const renderPagination = (overrideProps: Partial<PaginationState> = {}) => {
    const paginationProps = { ...mockPaginationBase, ...overrideProps }
    return render(<Pagination pagination={paginationProps} />)
  }

  beforeEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('should not render when no visible pages', () => {
    renderPagination({ visiblePages: [] })
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument()
  })

  it('should render correct page numbers', () => {
    renderPagination()
    expect(screen.getAllByRole('button', { name: /\d/ })).toHaveLength(5)
  })

  it('should highlight current page', () => {
    renderPagination({ currentPage: 3 })
    const currentButton = screen.getByText('3')
    expect(currentButton).toHaveAttribute('data-current', 'true')
    expect(currentButton).toHaveClass('pagination__button')
  })

  it('should handle navigation buttons visibility', () => {
    const { rerender } = renderPagination()
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument()
    expect(screen.getByLabelText('Next page')).toBeInTheDocument()
    rerender(<Pagination pagination={{ ...mockPaginationBase, hasPrevious: false }} />)
    expect(screen.queryByLabelText('Previous page')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Next page')).toBeInTheDocument()
    rerender(<Pagination pagination={{ ...mockPaginationBase, hasNext: false }} />)
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument()
    expect(screen.queryByLabelText('Next page')).not.toBeInTheDocument()
  })

  it('should call pagination handlers', () => {
    renderPagination()

    fireEvent.click(screen.getByLabelText('Previous page'))
    expect(mockPaginationBase.previousPage).toHaveBeenCalledTimes(1)

    fireEvent.click(screen.getByLabelText('Next page'))
    expect(mockPaginationBase.nextPage).toHaveBeenCalledTimes(1)

    fireEvent.click(screen.getByText('2'))
    expect(mockPaginationBase.goToPage).toHaveBeenCalledWith(2)
  })

  it('should handle edge cases correctly', () => {
    const { unmount } = renderPagination({
      visiblePages: [1],
      currentPage: 1,
      hasPrevious: false,
      hasNext: false
    })
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.queryByLabelText('Previous page')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Next page')).not.toBeInTheDocument()
    unmount()

    renderPagination({
      visiblePages: [1, 2, 3],
      currentPage: 1,
      hasPrevious: false,
      hasNext: true
    })
    expect(screen.getByText('1')).toHaveAttribute('data-current', 'true')
    expect(screen.queryByLabelText('Previous page')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Next page')).toBeInTheDocument()
    cleanup()
    renderPagination({
      visiblePages: [3, 4, 5],
      currentPage: 5,
      hasPrevious: true,
      hasNext: false
    })
    expect(screen.getByText('5')).toHaveAttribute('data-current', 'true')
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument()
    expect(screen.queryByLabelText('Next page')).not.toBeInTheDocument()
  })

  it('should have unique keys for pages', () => {
    const { container } = renderPagination()
    const buttons = container.querySelectorAll('[data-testid="pagination"] button[data-key]')
    const keys = Array.from(buttons).map((button) => button.getAttribute('data-key'))
    expect(new Set(keys).size).toBe(keys.length)
  })

  it('should filter invalid pages', () => {
    renderPagination({
      visiblePages: [NaN, Infinity, -1, 2, 0, 2.5, 'invalid'] as unknown as number[]
    })
    expect(screen.queryByText('NaN')).not.toBeInTheDocument()
    expect(screen.queryByText('Infinity')).not.toBeInTheDocument()
    expect(screen.queryByText('-1')).not.toBeInTheDocument()
    expect(screen.queryByText('0')).not.toBeInTheDocument()
    expect(screen.queryByText('2.5')).not.toBeInTheDocument()
    expect(screen.queryByText('invalid')).not.toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })
})
