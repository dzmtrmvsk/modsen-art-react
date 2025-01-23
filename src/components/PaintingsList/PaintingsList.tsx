import styles from './styles.module.scss'
import { IPainting } from 'src/types/painting'
import PaintingsMiniContainer from '@/components/PaintingsMiniContainer'
import PaintingsDetailedContainer from '@/components/PaintingsDetailedContainer'

interface PaintingMiniListProps {
  artworks: IPainting[]
  type: 'compact' | 'detailed'
}

const PaintingsList = ({ artworks, type }: PaintingMiniListProps) => {
  if (artworks?.length === 0) {
    return null
  }

  return (
    <div className={styles.paintingList} data-testid="paintings-list">
      <div className={styles.paintingList__wrapper}>
        {type === 'compact' ? (
          <PaintingsMiniContainer paintings={artworks} />
        ) : (
          <PaintingsDetailedContainer paintings={artworks} />
        )}
      </div>
    </div>
  )
}

export default PaintingsList
