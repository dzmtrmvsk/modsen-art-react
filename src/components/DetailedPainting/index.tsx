/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useCallback } from 'react'
import { CompactPaintingProps } from '../CompactPainting'
import BookmarkToggle from '../BookMarkToggle'

import styles from './styles.module.scss'

export function DetailedPainting({
  painting,
  isMarkedAsFavorite,
  onPaintingClick,
  addToFavorites,
  removeFromFavorites
}: CompactPaintingProps) {
  const onCardInteraction = useCallback(() => {
    onPaintingClick(painting.id)
  }, [painting, onPaintingClick])

  const toggleFavoriteStatus = useCallback(() => {
    const toggleAction = isMarkedAsFavorite(painting.id) ? removeFromFavorites : addToFavorites
    toggleAction(painting.id)
  }, [painting, isMarkedAsFavorite, addToFavorites, removeFromFavorites])

  const preventPropagation = useCallback((e: React.MouseEvent) => e.stopPropagation(), [])

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
          />
        </div>
      </div>
    </div>
  )
}
