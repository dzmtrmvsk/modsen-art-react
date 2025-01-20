import { ROUTE_CONFIG } from '@/routes'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import PaintingItem from '@/components/PaintingItem'
import { useSavedIds } from '@/hooks/useSavedIds'
import { IPainting } from 'src/types/painting'

import styles from './styles.module.scss'

export interface PaintingsContainerProps {
  paintings: IPainting[]
}

const PaintingsMiniContainer = ({ paintings }: PaintingsContainerProps) => {
  const navigate = useNavigate()
  const { savedIds, toggle } = useSavedIds()

  const handleCardClick = useCallback(
    (id: number) => {
      navigate(ROUTE_CONFIG.info.generatePath(id))
    },
    [navigate]
  )

  return (
    <div className={styles.list}>
      <div className={styles.list__wrapper}>
        {paintings?.map((p) => (
          <PaintingItem
            key={p.id}
            painting={p}
            isMarkedAsFavorite={(id) => savedIds.includes(id)}
            onPaintingClick={handleCardClick}
            toggleFavorites={toggle}
            type="compact"
          />
        ))}
      </div>
    </div>
  )
}

export default PaintingsMiniContainer
