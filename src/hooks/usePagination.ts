import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPageRange } from '@/utils/pagination'

export type PaginationState = {
  startPage: number
  endPage: number
  currentPage: number
  hasPrevious: boolean
  hasNext: boolean
  visiblePages: number[]
  goToPage: (page: number) => void
  nextPage: () => void
  previousPage: () => void
  goToFirst: () => void
  goToLast: () => void
}

/**
 * usePaginationHook
 * A custom hook to manage pagination logic.
 *
 * @param initialPage The starting page number.
 * @param totalPageCount The total number of pages available.
 * @param maxVisiblePages The maximum number of pages to display in the range.
 * @returns An object containing pagination details and actions.
 */
export function usePaginationHook(
  initialPage: number,
  totalPageCount: number,
  maxVisiblePages: number
): PaginationState {
  const [currentPage, setCurrentPage] = useState<number>(initialPage)
  const [visiblePages, setVisiblePages] = useState<number[]>([])

  const memoizedVisiblePages = useMemo(() => visiblePages, [visiblePages])

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPageCount) {
        setCurrentPage(page)
      }
    },
    [totalPageCount]
  )

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev < totalPageCount ? prev + 1 : prev))
  }, [totalPageCount])

  const previousPage = useCallback(() => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
  }, [])

  const goToFirst = useCallback(() => {
    setCurrentPage(1)
  }, [])

  const goToLast = useCallback(() => {
    setCurrentPage(totalPageCount)
  }, [totalPageCount])

  useEffect(() => {
    const updatedPages = createPageRange(1, totalPageCount, currentPage, maxVisiblePages)
    setVisiblePages(updatedPages)
  }, [currentPage, totalPageCount, maxVisiblePages])

  return {
    startPage: 1,
    endPage: totalPageCount,
    currentPage,
    hasPrevious: currentPage > 1,
    hasNext: currentPage < totalPageCount,
    visiblePages: memoizedVisiblePages,
    goToPage,
    nextPage,
    previousPage,
    goToFirst,
    goToLast
  }
}
