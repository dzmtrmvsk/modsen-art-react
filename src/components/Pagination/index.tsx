import { PaginationState } from '@/hooks/usePagination'

import styles from './styles.module.scss'

interface PaginationProps {
  pagination: PaginationState
}

export function Pagination({ pagination }: PaginationProps) {
  if (pagination.visiblePages.length === 0) {
    return null
  }
  return (
    <div className={styles.pagination}>
      {pagination.hasPrevious && (
        <div className={styles.pagination__group}>
          <button
            type="button"
            className={styles.pagination__button}
            onClick={() => pagination.previousPage()}>
            &#60;
          </button>
        </div>
      )}
      <div className={styles.pagination__group}>
        {pagination.visiblePages.map((p) => (
          <button
            type="button"
            key={p}
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
            onClick={() => pagination.nextPage()}
            type="button">
            &#62;
          </button>
        </div>
      )}
    </div>
  )
}
