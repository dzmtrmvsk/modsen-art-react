import { PaginationState } from '@/hooks/usePagination'
import styles from './styles.module.scss'

interface PaginationProps {
  pagination: PaginationState
}

export function Pagination({ pagination }: PaginationProps) {
  if (pagination.visiblePages.length === 0) {
    return null
  }

  const validPages = pagination.visiblePages.filter((p) => Number.isInteger(p) && p > 0)

  return (
    <div className={styles.pagination} data-testid="pagination">
      {pagination.hasPrevious && (
        <div className={styles.pagination__group}>
          <button
            type="button"
            aria-label="Previous page"
            className={styles.pagination__button}
            onClick={() => pagination.previousPage()}>
            &#60;
          </button>
        </div>
      )}

      <div className={styles.pagination__group}>
        {validPages.map((p) => (
          <button
            type="button"
            key={p}
            aria-label={`Page ${p}`}
            className={styles.pagination__button}
            data-current={p === pagination.currentPage}
            onClick={() => pagination.goToPage(p)}>
            {p}
          </button>
        ))}
      </div>

      {pagination.hasNext && (
        <div className={styles.pagination__group}>
          <button
            className={styles.pagination__button}
            aria-label="Next page"
            onClick={() => pagination.nextPage()}
            type="button">
            &#62;
          </button>
        </div>
      )}
    </div>
  )
}
