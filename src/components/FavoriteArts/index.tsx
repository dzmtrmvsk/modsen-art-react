import styles from './styles.module.scss'
import bookmarkLargeSrc from '@/assets/icons/bookmark-large.svg'
import PaintingsList from '@/components/PaintingsList/PaintingsList'
import { usePaintings } from '@/hooks/usePainting'
import { useSavedIds } from '@/hooks/useSavedIds'
import PageTitle from '@/components/PageTitle'
import { Link } from 'react-router-dom'
import { ART_API_IMAGE_PATHS } from '@/constants/apiParams'
import Loader from '@/components/Loader'

const FavoriteArts = () => {
  const { savedIds } = useSavedIds()
  const { data, isLoading } = usePaintings('list', { ids: savedIds }, ART_API_IMAGE_PATHS.LIGHT)
  const visibleArts = data?.artworks?.length > 0 ? data.artworks : null

  if (isLoading) {
    return (
      <section className={styles.favorites}>
        <Loader text="Loading your favorites paintings..." />
      </section>
    )
  }

  return (
    <section className={styles.favorites}>
      <div className={styles.favoritesWrapper}>
        <div className={styles.favorites__headingWrapper}>
          <PageTitle className={styles.favorites__header}>
            Here Are Your <br />
          </PageTitle>
          <div className={styles.favorites__subHeaderWrapper}>
            <img src={bookmarkLargeSrc} alt="bookmark" />{' '}
            <h2 className={styles.favorites__subHeader}>Favorites</h2>
          </div>
        </div>
        <div className={styles.favorites__content}>
          {visibleArts ? (
            <>
              <div className={styles.favorites__descriptionWrapper}>
                <h6 className={styles.favorites__subDescription}>Saved by you</h6>
                <h3 className={styles.favorites__description}>Your favorites list</h3>
              </div>
              <PaintingsList artworks={visibleArts} type="compact" />
            </>
          ) : (
            <div className={styles.favorites__notFoundWrapper}>
              <p className={styles.favorites__notFoundText}>
                Go to the main page and start learning art now
              </p>
              <Link to="/" className={styles.favorites__link}>
                Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default FavoriteArts
