import styles from './styles.module.scss'
import { useMemo, useState, useEffect } from 'react'
import { usePaintings } from '@/hooks/usePainting'
import { usePagination } from '@/hooks/usePagination'
import Loader from '@/components/Loader'
import { useDebounceValue } from '@/hooks/useDebounceValue'
import { getRandomPage } from '@/utils/pagination'
import PaintingsList from '@/components/PaintingsList/PaintingsList'
import { ART_API_IMAGE_PATHS } from '@/constants/apiParams'

const SpecialArts = () => {
  const page = useMemo(getRandomPage, [])
  const [searchPage, setSearchPage] = useState<number>(1)
  const debauncedSearchPage = useDebounceValue(searchPage, 400)
  const { data, isLoading } = usePaintings(
    'pagination',
    {
      limit: 3,
      page: debauncedSearchPage + page
    },
    ART_API_IMAGE_PATHS.MAJOR
  )
  const pagination = usePagination(searchPage, data?.pagination?.totalPages || 1, 4)

  const visibleArts = data?.artworks?.length > 0 ? data.artworks : null

  useEffect(() => {
    setSearchPage(pagination.currentPage)
  }, [pagination])

  return (
    <section className={styles.specialArts}>
      <div className={styles.specialArts__wrapper}>
        <div className={styles.specialArts__headerWrapper}>
          <h6 className={styles.specialArts__subHeading}>Topics for you</h6>
          <h3 className={styles.specialArts__heading}>Our special gallery</h3>
        </div>
        <div className={styles.specialArts__content}>
          {isLoading ? (
            <Loader text="Looking for the best paintings in the world for you..." />
          ) : (
            <PaintingsList artworks={visibleArts} pagination={pagination} type="detailed" />
          )}
        </div>
      </div>
    </section>
  )
}

export default SpecialArts
