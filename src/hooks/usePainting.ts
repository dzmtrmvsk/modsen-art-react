import { useEffect, useState, useCallback, useMemo } from 'react'
import { fetchPaintingsByIds, searchPaintings } from '@/utils/paintingsFetch'
import { IPaintingListPagination } from 'src/types/painting'

/**
 * usePaintings
 * A custom React hook for working with paintings.
 * Always returns an array of paintings.
 *
 * @param mode The mode of the hook: 'single', 'list', 'search'.
 * @param params The parameters of the request, depending on the selected mode.
 * @returns An object with data (array of paintings), loading state, error, and a function to refetch the request.
 */
const usePaintings = (
  mode: 'single' | 'list' | 'search',
  params: { id?: number[]; ids?: number[]; query?: string; limit?: number; page?: number } = {}
): {
  data: IPaintingListPagination
  isLoading: boolean
  error: Error | null
  refetch: () => void
} => {
  const [data, setData] = useState<IPaintingListPagination>({} as IPaintingListPagination)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const stableParams = useMemo(() => params, [JSON.stringify(params)])

  const fetchData = useCallback(() => {
    setIsLoading(true)
    setError(null)

    let fetchPromise: Promise<any>

    switch (mode) {
      case 'single':
        if (!stableParams.id) {
          setIsLoading(false)
          setError(new Error('ID is required for single painting fetch.'))
          return
        }
        fetchPromise = fetchPaintingsByIds(stableParams.id)
        break

      case 'list':
        if (!stableParams.ids || stableParams.ids.length === 0) {
          setIsLoading(false)
          setError(new Error('IDs are required for painting list fetch.'))
          return
        }
        fetchPromise = fetchPaintingsByIds(stableParams.ids)
        break

      case 'search':
        fetchPromise = searchPaintings(
          stableParams.query || '',
          stableParams.limit || 10,
          stableParams.page || 1
        )
        break

      default:
        setIsLoading(false)
        setError(new Error(`Unsupported mode: ${mode}`))
        return
    }

    fetchPromise
      .then((result) => {
        if (mode === 'search') {
          setData(result)
          setIsLoading(false)
        }
      })
      .catch((err) => {
        setError(err)
        setIsLoading(false)
      })
  }, [mode, stableParams])

  useEffect(() => {
    if (mode === 'search' && params.query !== '') {
      fetchData()
    }
  }, [fetchData])

  return { data, isLoading, error, refetch: fetchData }
}

export { usePaintings }
