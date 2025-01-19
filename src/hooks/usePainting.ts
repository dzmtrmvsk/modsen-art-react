import { useEffect, useState, useCallback } from 'react'
import { fetchPainting, fetchPaintingsByIds, searchPaintings } from '@/utils/paintingsFetch'
import { IPainting } from 'src/types/painting'

/**
 * usePaintings
 *  A custom React hook to for working with paintings.
 * Supports three modes: loading a single painting, a list of paintings, or searching for paintings.
 *
 * @param mode The mode of the hook: 'single', 'list', 'search'.
 * @param params The parameters of the request, depending on the selected mode.
 * @returns An object with data, loading state, error, and a function to refetch the request.
 */

export function usePaintings(
  mode: 'single' | 'list' | 'search',
  params: { id?: number; ids?: number[]; query?: string; limit?: number; page?: number } = {}
): {
  data: IPainting | IPainting[] | null
  isLoading: boolean
  error: Error | null
  refetch: () => void
} {
  const [data, setData] = useState<IPainting | IPainting[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(() => {
    setIsLoading(true)
    setError(null)

    let fetchPromise: Promise<any>

    switch (mode) {
      case 'single':
        if (!params.id) {
          throw new Error('ID is required for single painting fetch.')
        }
        fetchPromise = fetchPainting(params.id)
        break

      case 'list':
        if (!params.ids || params.ids.length === 0) {
          throw new Error('IDs are required for painting list fetch.')
        }
        fetchPromise = fetchPaintingsByIds(params.ids)
        break

      case 'search':
        fetchPromise = searchPaintings(params.query || '', params.limit || 10, params.page || 1)
        break

      default:
        throw new Error(`Unsupported mode: ${mode}`)
    }

    fetchPromise
      .then((result) => {
        setData(result)
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err)
        setIsLoading(false)
      })
  }, [mode, params])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, isLoading, error, refetch: fetchData }
}
