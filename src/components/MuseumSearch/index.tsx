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
import { Pagination } from '@/components/Pagination'

const SORT_OPTIONS = {
  NONE: 0,
  ASC: 1,
  DESC: 2
} as const

const schema = yup.object({
  query: yup
    .string()
    .min(2, 'Minimum 2 characters required')
    .max(90, 'Maximum length is 90 characters')
    .matches(
      /^[a-zA-Z0-9\s'-]*$/,
      'Only letters, numbers, spaces, hyphens and apostrophes are allowed'
    )
})

type FormData = yup.InferType<typeof schema>

const MuseumSearch = () => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: { query: '' },
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const [searchPage, setSearchPage] = useState<number>(1)
  const [sortedArtworks, setSortedArtworks] = useState<IPainting[]>([])
  const debouncedSearchPage = useDebounceValue(searchPage, 500)

  const searchValue = watch('query')
  const throttledQuery = useDebounceValue(searchValue, 600) || ''
  const isQueryValid = throttledQuery.length >= 2 && !errors.query

  const { data, isLoading } = usePaintings(
    'search',
    {
      query: isQueryValid ? throttledQuery : '',
      page: debouncedSearchPage,
      limit: 9
    },
    ART_API_IMAGE_PATHS.LIGHT
  )

  const arts = useMemo(() => data?.artworks || [], [data?.artworks])
  const pagination = usePagination(1, data?.pagination?.totalPages || 1, 6)

  useEffect(() => {
    setSearchPage(pagination.currentPage)
  }, [pagination.currentPage])

  const [sortField, setSortField] = useState<keyof IPainting | null>(null)
  const [sortOrder, setSortOrder] = useState<number>(SORT_OPTIONS.NONE)

  useEffect(() => {
    if (sortField) {
      const sorted = [...arts].sort((a, b) => {
        const valueA = String(a[sortField] || '').toLowerCase()
        const valueB = String(b[sortField] || '').toLowerCase()
        return sortOrder === SORT_OPTIONS.ASC
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA)
      })
      setSortedArtworks(sorted)
    } else {
      setSortedArtworks(arts)
    }
  }, [arts, sortField, sortOrder])

  useEffect(() => {
    if (!isQueryValid) {
      return
    }

    const totalPages = Math.ceil(arts.length / 9)
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    pagination.setVisiblePagesManually(pageNumbers)
    pagination.setCurrentPageManually(1)
    setSortedArtworks(arts)
  }, [throttledQuery])

  useEffect(() => {
    if (!searchValue) {
      setSortedArtworks([])
    }
  }, [searchValue])

  const handleSort = (field: keyof IPainting) => {
    setSortField((prev) => (prev === field ? prev : field))
    setSortOrder((prev) => {
      if (prev === SORT_OPTIONS.ASC) {
        return SORT_OPTIONS.DESC
      }
      if (prev === SORT_OPTIONS.DESC) {
        return SORT_OPTIONS.NONE
      }
      return SORT_OPTIONS.ASC
    })
  }

  const onSearch = handleSubmit((data) => data)

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
          render={({ field, fieldState: { error } }) => (
            <div className={styles.museumSearch__searchLineWrapper}>
              <SearchLine {...field} />
              {error && searchValue && (
                <span className={styles.museumSearch__errorController}>{error.message}</span>
              )}
            </div>
          )}
        />
      </form>
      <div className={styles.museumSearch__content}>
        {isLoading ? (
          <div className={styles.museumSearch__loader}>
            <Loader text="Search for results..." />
          </div>
        ) : (
          isQueryValid && (
            <>
              {sortedArtworks.length !== 0 ? (
                <div className={styles.museumSearch__resultWrapper}>
                  <SortButtons
                    sortField={sortField}
                    sortOrder={sortOrder}
                    handleSort={handleSort}
                  />
                  <PaintingList artworks={sortedArtworks} type="compact" />
                </div>
              ) : (
                searchValue === throttledQuery && (
                  <div className={styles.museumSearch__noResults}>
                    <NoResultsMessage query={throttledQuery} />
                  </div>
                )
              )}
            </>
          )
        )}
        {sortedArtworks.length > 0 && isQueryValid && (
          <div className={styles.museumSearch__pagination}>
            <Pagination pagination={pagination} />
          </div>
        )}
      </div>
    </section>
  )
}

export default MuseumSearch
