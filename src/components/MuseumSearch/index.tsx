import styles from './styles.module.scss'
import { useMemo, useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { IPainting } from 'src/types/painting'
import SearchLine from '@/components/SearchLine'
import { useDebounceValue } from '@/hooks/useDebounceValue'
import { usePaintings } from '@/hooks/usePainting'
import Loader from '@/components/Loader'
import PageTitle from '@/components/PageTitle'
import { usePagination } from '@/hooks/usePagination'
import SortButtons from '@/components/SortButtons'
import PaintingList from '@/components/PaintingsList/PaintingsList'
import NoResultsMessage from '@/components/NoResultsMessage/index'
import { ART_API_IMAGE_PATHS } from '@/constants/apiParams'

const SORT_OPTIONS = {
  NONE: 0,
  ASC: 1,
  DESC: 2
} as const

const schema = yup.object({
  query: yup.string().max(100, 'Search query is too long.').required()
})

type FormData = yup.InferType<typeof schema>

const MuseumSearch = () => {
  const { handleSubmit, control, watch } = useForm<FormData>({
    defaultValues: { query: '' },
    resolver: yupResolver(schema)
  })
  const [searchPage, setSearchPage] = useState<number>(1)
  const debauncedSearchPage = useDebounceValue(searchPage, 500)

  const searchValue = watch('query')
  const throttledQuery = useDebounceValue(searchValue, 600)

  const { data, isLoading } = usePaintings(
    'search',
    {
      query: throttledQuery,
      page: debauncedSearchPage,
      limit: 9
    },
    ART_API_IMAGE_PATHS.LIGHT
  )
  const arts = useMemo(() => data.artworks || [], [data.artworks])

  const pagination = usePagination(1, data.pagination?.totalPages || 1, 6)

  useEffect(() => {
    setSearchPage(pagination.currentPage)
  }, [pagination])

  const [sortField, setSortField] = useState<keyof IPainting | null>(null)
  const [sortOrder, setSortOrder] = useState<number>(SORT_OPTIONS.NONE)

  const sortedArtworks = useMemo(() => {
    if (!sortField) {
      return arts
    }

    return [...arts].sort((a, b) => {
      const valueA = String(a[sortField] || '').toLowerCase()
      const valueB = String(b[sortField] || '').toLowerCase()

      if (sortOrder === SORT_OPTIONS.ASC) {
        return valueA.localeCompare(valueB)
      } else if (sortOrder === SORT_OPTIONS.DESC) {
        return valueB.localeCompare(valueA)
      }

      return 0
    })
  }, [arts, sortField, sortOrder])

  const handleSort = (field: keyof IPainting) => {
    setSortField((prevField) => {
      if (prevField === field) {
        setSortOrder((prevOrder) => {
          if (prevOrder === SORT_OPTIONS.ASC) {
            return SORT_OPTIONS.DESC
          } else if (prevOrder === SORT_OPTIONS.DESC) {
            return SORT_OPTIONS.NONE
          } else {
            return SORT_OPTIONS.ASC
          }
        })
        return prevField
      } else {
        setSortOrder(SORT_OPTIONS.ASC)
        return field
      }
    })
  }

  const onSearch = handleSubmit(() => {})

  return (
    <section className={styles.museumSearch}>
      <div className={styles.museumSearch__heading}>
        <PageTitle className={styles.museumSearch__title}>
          Let&apos;s find some <span className={styles.museumSearch__highlight}>art</span>
        </PageTitle>
        <p className={styles.museumSearch__title}>here</p>
      </div>
      <form className={styles.museumSearch__form} onSubmit={onSearch}>
        <Controller
          name="query"
          control={control}
          render={({ field }) => <SearchLine {...field} />}
        />
      </form>
      {isLoading ? (
        <div className={styles.museumSearch__loader}>
          <Loader />
        </div>
      ) : (
        throttledQuery && (
          <>
            {sortedArtworks.length !== 0 ? (
              <div className={styles.museumSearch__resultWrapper}>
                <SortButtons sortField={sortField} sortOrder={sortOrder} handleSort={handleSort} />
                <PaintingList artworks={sortedArtworks} pagination={pagination} type="compact" />
              </div>
            ) : (
              <NoResultsMessage query={throttledQuery} />
            )}
          </>
        )
      )}
    </section>
  )
}

export default MuseumSearch
