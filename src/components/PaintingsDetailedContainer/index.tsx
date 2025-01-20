import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'
import { useSavedIds } from '@/hooks/useSavedIds'
import { useCallback } from 'react'
import { ROUTE_CONFIG } from '@/routes'
import PaintingItem from '@/components/PaintingItem'
import { PaintingsContainerProps } from '@/components/PaintingsMiniContainer'

const PaintingsDetailedContainer = ({ paintings }: PaintingsContainerProps) => {
  const navigate = useNavigate()
  const { savedIds, toggle } = useSavedIds()

  const handleCardClick = useCallback(
    (id: number) => {
      navigate(ROUTE_CONFIG.info.generatePath(id))
    },
    [navigate]
  )
  return (
    <div className={styles.detailedContainer}>
      <div className={styles.detailedContainer__wrapper}>
        {paintings?.map((p) => (
          <PaintingItem
            key={p.id}
            painting={p}
            isMarkedAsFavorite={(id) => savedIds.includes(id)}
            onPaintingClick={handleCardClick}
            toggleFavorites={toggle}
            type="detailed"
          />
        ))}
      </div>
    </div>
  )
}

export default PaintingsDetailedContainer
