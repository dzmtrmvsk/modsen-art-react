const createPageRange = (
  firstPage: number,
  lastPage: number,
  activePage: number,
  maxVisiblePages: number
): number[] => {
  if (
    maxVisiblePages <= 0 ||
    firstPage > lastPage ||
    activePage < firstPage ||
    activePage > lastPage
  ) {
    throw new Error('Invalid pagination configuration.')
  }

  const pageRange: number[] = []
  const halfRange = Math.floor(maxVisiblePages / 2)

  let rangeStart = Math.max(firstPage, activePage - halfRange)
  let rangeEnd = Math.min(lastPage, activePage + halfRange)
  if (rangeEnd - rangeStart + 1 < maxVisiblePages) {
    if (rangeStart === firstPage) {
      rangeEnd = Math.min(lastPage, rangeStart + maxVisiblePages - 1)
    } else if (rangeEnd === lastPage) {
      rangeStart = Math.max(firstPage, rangeEnd - maxVisiblePages + 1)
    }
  }

  for (let page = rangeStart; page <= rangeEnd; page++) {
    pageRange.push(page)
  }

  return pageRange
}

export { createPageRange }
