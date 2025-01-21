import { getSavedArtIds, addSavedArt, removeSavedArt } from '@/utils/sessionStorage'
import { useCallback, useMemo, useState } from 'react'

interface UseSavedIdsResult {
  savedIds: number[]
  toggle: (id: number) => void
}

const useSavedIds = (): UseSavedIdsResult => {
  const [savedIds, setSavedIds] = useState<number[]>(getSavedArtIds())

  const toggleSaved = useCallback(
    (id: number): void => {
      if (savedIds.includes(id)) {
        removeSavedArt(id)
      } else {
        addSavedArt(id)
      }
      setSavedIds(getSavedArtIds())
    },
    [savedIds]
  )

  const actions = useMemo(
    () => ({
      toggle: toggleSaved
    }),
    [toggleSaved]
  )

  return {
    savedIds,
    ...actions
  }
}

export { useSavedIds }
