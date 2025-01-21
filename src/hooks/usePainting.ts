import { useEffect, useState, useCallback, useMemo } from 'react'
import {
  fetchPaintingsByIds,
  searchPaintings,
  paginateFetchPaintings
} from '@/utils/paintingsFetch'
import { IPaintingListPagination } from 'src/types/painting'

/**
 * usePaintings
 * A custom React hook for working with paintings.
 *
 * @param mode The mode of the hook: 'list', 'search', 'pagination'.
 * @param params The parameters of the request, depending on the selected mode.
 * @param imageFormat The desired image format for the paintings.
 * @returns An object with data, loading state, error, and a refetch function.
 */
const usePaintings = (
  mode: 'list' | 'search' | 'pagination',
  params: { id?: number[]; ids?: number[]; query?: string; limit?: number; page?: number } = {},
  imageFormat: string
): {
  data: IPaintingListPagination
  isLoading: boolean
  error: Error | null
} => {
  const [data, setData] = useState<IPaintingListPagination>({} as IPaintingListPagination)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const stableParams = useMemo(() => params, [JSON.stringify(params)])

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      let result
      switch (mode) {
        case 'list':
          if (!stableParams.ids?.length) {
            throw new Error('IDs are required for painting list fetch.')
          }
          result = await fetchPaintingsByIds(stableParams.ids, imageFormat)
          break

        case 'search':
          result = await searchPaintings(
            stableParams.query || '',
            stableParams.limit || 10,
            stableParams.page || 1,
            imageFormat
          )
          break

        case 'pagination':
          result = await paginateFetchPaintings(
            stableParams.limit || 9,
            stableParams.page || 1,
            imageFormat
          )
          break

        default:
          throw new Error(`Unsupported mode: ${mode}`)
      }
      setData(result)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }, [mode, stableParams, imageFormat])

  useEffect(() => {
    if ((mode === 'search' && stableParams.query) || mode === 'list' || mode === 'pagination') {
      fetchData()
    }
  }, [fetchData])

  return { data, isLoading, error }
}

export { usePaintings }
