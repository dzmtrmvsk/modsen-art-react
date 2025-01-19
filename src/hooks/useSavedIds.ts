import { useCallback, useMemo, useState } from 'react'
import { usePaintings } from './usePainting'
import { IPainting } from '../types/painting'

/**
 * useFavorites
 * Custom hook for managing favorite paintings.
 * Fetches favorite paintings data and provides utilities for managing the favorite list.
 *
 * @returns An object with favorite paintings, utility functions, and state info.
 */

const useSavedIds = () => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([])
  const { data: favorites, isLoading, error, refetch } = usePaintings('list', { ids: favoriteIds })

  const addFavorite = useCallback(
    (id: number) => {
      if (!favoriteIds.includes(id)) {
        setFavoriteIds((prevIds) => [...prevIds, id])
      }
    },
    [favoriteIds]
  )
  const removeFavorite = useCallback((id: number) => {
    setFavoriteIds((prevIds) => prevIds.filter((favoriteId) => favoriteId !== id))
  }, [])

  const clearFavorites = useCallback(() => {
    setFavoriteIds([])
  }, [])

  const actions = useMemo(
    () => ({
      add: addFavorite,
      remove: removeFavorite,
      clear: clearFavorites
    }),
    [addFavorite, removeFavorite, clearFavorites]
  )

  return {
    favorites: favorites || ([] as IPainting[]),
    favoriteIds,
    isLoading,
    error,
    refetch,
    ...actions
  }
}

export { useSavedIds }
