import styles from './styles.module.scss'
import { IPainting } from 'src/types/painting'
import PaintingsMiniContainer from '@/components/PaintingsMiniContainer'
import { Pagination } from '@/components/Pagination'
import { PaginationState } from '@/hooks/usePagination'
import PaintingsDetailedContainer from '@/components/PaintingsDetailedContainer'

interface PaintingMiniListProps {
  artworks: IPainting[]
  pagination?: PaginationState
  type: 'compact' | 'detailed'
}

const PaintingsList = ({ artworks, pagination, type }: PaintingMiniListProps) => {
  if (artworks?.length === 0) {
    return null
  }

  return (
    <div className={styles.paintingList}>
      <div className={styles.paintingList__wrapper}>
        {type === 'compact' ? (
          <PaintingsMiniContainer paintings={artworks} />
        ) : (
          <PaintingsDetailedContainer paintings={artworks} />
        )}
        {pagination?.visiblePages && (
          <div className={styles.paintingList__pagination}>
            <Pagination pagination={pagination} />
          </div>
        )}
      </div>
    </div>
  )
}

export default PaintingsList
