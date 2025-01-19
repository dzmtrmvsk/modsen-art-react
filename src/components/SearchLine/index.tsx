import { InputHTMLAttributes } from 'react'

import searchIconSrc from '@/assets/icons/search.svg'

import styles from './styles.module.scss'

const SearchLine = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className={styles.searchLine}>
      <input
        className={styles.searchLine__input}
        placeholder="Search art, artist, work..."
        {...props}
      />
      <img className={styles.searchLine__icon} src={searchIconSrc} alt="search icon" />
    </div>
  )
}

export default SearchLine
