import styles from './styles.module.scss'
import { IPainting } from 'src/types/painting'

const SORT_OPTIONS = {
  NONE: 0,
  ASC: 1,
  DESC: 2
} as const

interface SortButtonsProps {
  sortField: keyof IPainting | null
  sortOrder: number
  handleSort: (field: keyof IPainting) => void
}

const SORT_FIELDS: (keyof IPainting)[] = ['title', 'artistName', 'displayedInGallery']
const FIELD_LABELS = ['Title', 'Artist', 'Availability']

const SortButtons = ({ sortField, sortOrder, handleSort }: SortButtonsProps) => {
  return (
    <div className={styles.sortButtons}>
      <p className={styles.sortButtons__title}>Filter your results by:</p>
      <div className={styles.sortButtons__container}>
        {SORT_FIELDS.map((field, index) => (
          <button
            key={field}
            className={`${styles.sortButtons__button} ${
              sortField === field && styles['sortButtons__button--active']
            }`}
            onClick={() => handleSort(field)}
            type="button">
            {FIELD_LABELS[index]}{' '}
            {sortField === field &&
              (sortOrder === SORT_OPTIONS.ASC ? '↑' : sortOrder === SORT_OPTIONS.DESC ? '↓' : '')}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SortButtons
