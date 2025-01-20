import { getSavedArtIds, addSavedArt, removeSavedArt } from '@/utils/sessionStorage'
import { useCallback, useMemo, useState } from 'react'

const useSavedIds = () => {
  const [savedIds, setSavedIds] = useState(getSavedArtIds())

  const toggleSaved = useCallback(
    (id) => {
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
