import styles from './styles.module.scss'
import { useMemo } from 'react'
import { getRandomPage } from '@/utils/pagination'
import { usePaintings } from '@/hooks/usePainting'
import Loader from '@/components/Loader'
import PaintingsList from '@/components/PaintingsList/PaintingsList'

const ForYouArts = () => {
  const page = useMemo(getRandomPage, [])
  const { data, isLoading } = usePaintings('pagination', {
    limit: 9,
    page
  })
  const visibleArts = data?.artworks?.length > 0 ? data.artworks : null

  return (
    <section className={styles.forYou}>
      <div className={styles.forYou__wrapper}>
        <div className={styles.forYou__headerWrapper}>
          <h6 className={styles.forYou__subHeading}>Here some more</h6>
          <h3 className={styles.forYou__heading}>Other works for you</h3>
        </div>
        <div className={styles.forYou__content}>
          {isLoading ? <Loader /> : <PaintingsList artworks={visibleArts} type="compact" />}
        </div>
      </div>
    </section>
  )
}

export default ForYouArts
