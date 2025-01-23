import styles from './styles.module.scss'
import { useMemo } from 'react'
import { usePaintings } from '@/hooks/usePainting'
import { useSavedIds } from '@/hooks/useSavedIds'
import { ART_API_IMAGE_PATHS } from '@/constants/apiParams'
import Loader from '@/components/Loader'
import NoResultsMessage from '@/components/NoResultsMessage'
import BookmarkToggle from '@/components/BookMarkToggle'

interface PaintingInfoProps {
  artId: number
}

const PaintingInfo = ({ artId }: PaintingInfoProps) => {
  const { data, isLoading, error } = usePaintings(
    'list',
    { ids: [artId] },
    ART_API_IMAGE_PATHS.SINGLE
  )
  const artwork = useMemo(() => data?.artworks?.[0] || null, [data?.artworks])
  const { savedIds, toggle } = useSavedIds()

  if (isLoading) {
    return (
      <section className={styles.paintingInfo__loading}>
        <Loader text={'Searching for painting with id:' + artId} />
      </section>
    )
  }

  if (error || (!artwork && !isLoading)) {
    return (
      <section className={styles.paintingInfo__notFound}>
        <NoResultsMessage query={'id: ' + artId} />
      </section>
    )
  }

  return (
    <section className={styles.paintingInfo} data-testid="painting-info-section">
      <div className={styles.paintingInfo__imageWrapper}>
        <img className={styles.paintingInfo__image} src={artwork.imageSource} alt={artwork.title} />
        <div className={styles.paintingInfo__favoriteButton}>
          <BookmarkToggle
            isSelected={savedIds.includes(artwork.id)}
            onToggle={toggle}
            id={artwork.id}
            color="white"
          />
        </div>
      </div>
      <div className={styles.paintingInfo__infoWrapper}>
        <div className={styles.paintingInfo__mainInfo}>
          <h2 className={styles.paintingInfo__title}>{artwork.title}</h2>
          <h3 className={styles.paintingInfo__artist}>{artwork.artistName}</h3>
          <h5 className={styles.paintingInfo__date}>{artwork.createdDate}</h5>
        </div>
        <div className={styles.paintingInfo__additionalWrapper}>
          <h2 className={styles.paintingInfo__overview}>Overview</h2>
          <p className={styles.paintingInfo__param}>
            <span className={styles.paintingInfo__paramTitle}>Place Of Origin:</span>
            <span className={styles.paintingInfo__paramValue}>
              {artwork.originLocation ?? 'Unknown'}
            </span>
          </p>
          <p className={styles.paintingInfo__param}>
            <span className={styles.paintingInfo__paramTitle}>Dimensions:</span>
            <span className={styles.paintingInfo__paramValue}>{artwork.artworkDimensions}</span>
          </p>
          <p className={styles.paintingInfo__param}>
            <span className={styles.paintingInfo__paramTitle}>Credit Line:</span>
            <span className={styles.paintingInfo__paramValue}>{artwork.acquisitionInfo}</span>
          </p>
          <p className={styles.paintingInfo__param}>
            <span className={styles.paintingInfo__paramTitle}>Gallery:</span>
            <span className={styles.paintingInfo__paramValue}>
              {artwork.associatedGallery ?? 'Unknown'}
            </span>
          </p>
          <p className={styles.paintingInfo__param}>
            {artwork.displayedInGallery ? 'Public' : 'Private'}
          </p>
        </div>
      </div>
    </section>
  )
}

export default PaintingInfo
