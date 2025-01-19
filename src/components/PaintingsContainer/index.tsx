import { ROUTE_CONFIG } from '@/routes'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import PaintingItem, { PaintingProps } from '@/components/PaintingItem'
import { useSavedIds } from '@/hooks/useSavedIds'
import { IPainting } from 'src/types/painting'

import styles from './styles.module.scss'

type PaintingsContainerProps = Pick<PaintingProps, 'type'> & {
  paintings: IPainting[]
}

const PaintingsContainer = ({ paintings, ...props }: PaintingsContainerProps) => {
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
            {...props}
          />
        ))}
      </div>
    </div>
  )
}

export default PaintingsContainer
