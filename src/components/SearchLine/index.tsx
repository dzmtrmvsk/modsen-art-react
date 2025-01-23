import { forwardRef, InputHTMLAttributes } from 'react'
import searchIconSrc from '@/assets/icons/search.svg'
import styles from './styles.module.scss'

const SearchLine = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => {
    return (
      <div className={styles.searchLine}>
        <input
          data-testid="search-input"
          ref={ref}
          className={styles.searchLine__input}
          placeholder="Search art, artist, work..."
          {...props}
        />
        <img className={styles.searchLine__icon} src={searchIconSrc} alt="search icon" />
      </div>
    )
  }
)

SearchLine.displayName = 'SearchLine'

export default SearchLine
