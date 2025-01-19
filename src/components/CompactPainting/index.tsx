import { useMemo, useCallback, useState } from 'react'
import { IPainting } from 'src/types/painting'
import styles from './styles.module.scss'
import BookmarkToggle from '../BookMarkToggle'

interface CompactPaintingProps {
  painting: IPainting
  isMarkedAsFavorite: (id: number) => boolean
  onPaintingClick: (id: number) => void
  toggleFavorites: (id: number) => void
}

const placeholderImage = '/images/placeholder.svg'

const CompactPainting = ({
  painting,
  isMarkedAsFavorite,
  onPaintingClick,
  toggleFavorites
}: CompactPaintingProps) => {
  const { id, imageSource, title, artistName, displayedInGallery } = painting

  const [imageSrc, setImageSrc] = useState(imageSource)

  const isFavorite = useMemo(() => isMarkedAsFavorite(id), [id, isMarkedAsFavorite])

  const handleCardInteraction = useCallback(() => {
    onPaintingClick(id)
  }, [id, onPaintingClick])

  const toggleFavoriteStatus = useCallback(() => {
    toggleFavorites(id)
  }, [id, isFavorite, toggleFavorites])

  const stopPropagationHandler = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  const handleImageError = useCallback(() => {
    setImageSrc(placeholderImage)
  }, [])

  /* eslint-disable jsx-a11y/no-static-element-interactions */
  /* eslint-disable jsx-a11y/click-events-have-key-events */
  return (
    <div className={styles.paintingCard}>
      <div className={styles.paintingCard__wrapper} onClick={handleCardInteraction}>
        <div className={styles.paintingCard__infoWrapper}>
          <div className={styles.paintingCard__imageWrapper}>
            <img
              className={styles.paintingCard__artworkImage}
              src={imageSrc}
              alt={title}
              onError={handleImageError}
            />
          </div>
          <div className={styles.paintingCard__details}>
            <div className={styles.paintingCard__artInfo}>
              <h3 className={styles.paintingCard__title}>{title}</h3>
              <p className={styles.paintingCard__artistName}>{artistName}</p>
            </div>
            <p className={styles.paintingCard__galleryStatus}>
              {displayedInGallery ? 'Public' : 'Private'}
            </p>
          </div>
        </div>
        <div className={styles.paintingCard__actionsWrapper} onClick={stopPropagationHandler}>
          <BookmarkToggle isSelected={isFavorite} onToggle={toggleFavoriteStatus} />
        </div>
      </div>
    </div>
  )
}

export { CompactPaintingProps, CompactPainting }
