import styles from './styles.module.scss'
import { IPainting } from 'src/types/painting'
import PaintingsContainer from '@/components/PaintingsContainer'
import { Pagination } from '@/components/Pagination'
import { PaginationState } from '@/hooks/usePagination'

interface PaintingMiniListProps {
  artworks: IPainting[]
  pagination?: PaginationState
}

const PaintingMiniList = ({ artworks, pagination }: PaintingMiniListProps) => {
  return (
    <div className={styles.paintingMiniList}>
      <div className={styles.paintingMiniList__wrapper}>
        <PaintingsContainer paintings={artworks} type="compact" />
        {pagination?.visiblePages && <Pagination pagination={pagination} />}
      </div>
    </div>
  )
}

export default PaintingMiniList
