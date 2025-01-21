/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useCallback } from 'react'
import { CompactPaintingProps } from '../CompactPainting'
import BookmarkToggle from '../BookMarkToggle'

import styles from './styles.module.scss'

const DetailedPainting = ({
  painting,
  isMarkedAsFavorite,
  onPaintingClick,
  toggleFavorites
}: CompactPaintingProps) => {
  const onCardInteraction = useCallback(() => {
    if (painting) {
      onPaintingClick(painting.id)
    }
  }, [painting, onPaintingClick])

  const toggleFavoriteStatus = useCallback(() => {
    if (painting) {
      toggleFavorites(painting.id)
    }
  }, [painting, toggleFavorites])

  const preventPropagation = useCallback((e: React.MouseEvent) => e.stopPropagation(), [])

  if (!painting) {
    return <div className={styles.detailedPainting__empty}>No painting available</div>
  }

  return (
    <div className={styles.detailedPainting} onClick={onCardInteraction}>
      <div className={styles.detailedPainting__thumbnailWrapper}>
        <img
          className={styles.detailedPainting__thumbnail}
          src={painting.imageSource}
          alt={painting.title}
        />
      </div>
      <div className={styles.detailedPainting__detailsWrapper}>
        <div className={styles.detailedPainting__information}>
          <h3 className={styles.detailedPainting__paintingTitle}>{painting.title}</h3>
          <p className={styles.detailedPainting__artistName}>{painting.artistName}</p>
          <p className={styles.detailedPainting__visibility}>
            {painting.displayedInGallery ? 'Public' : 'Private'}
          </p>
        </div>
        <div className={styles.detailedPainting__actionsWrapper} onClick={preventPropagation}>
          <BookmarkToggle
            isSelected={isMarkedAsFavorite(painting.id)}
            onToggle={toggleFavoriteStatus}
            id={painting.id}
          />
        </div>
      </div>
    </div>
  )
}

export default DetailedPainting
