import { MouseEventHandler } from 'react'
import bookmarkSrc from '@/assets/icons/bookmark.svg'

import styles from './styles.module.scss'

interface BookmarkToggleProps {
  isSelected?: boolean
  onToggle: MouseEventHandler<HTMLButtonElement>
}

const BookmarkToggle = ({ isSelected = false, onToggle }: BookmarkToggleProps) => {
  return (
    <button
      className={styles.bookmarkButton}
      aria-pressed={isSelected}
      onClick={onToggle}
      type="button">
      <img className={styles.bookmarkButton__icon} src={bookmarkSrc} alt={'Save to favorites'} />
    </button>
  )
}

export default BookmarkToggle
