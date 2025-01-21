import { MouseEventHandler } from 'react'
import bookmarkSrc from '@/assets/icons/bookmark.svg'

import styles from './styles.module.scss'

interface BookmarkToggleProps {
  isSelected?: boolean
  onToggle: (id: number) => void
  id: number
  color?: 'white' | 'standard'
}

const BookmarkToggle = ({
  isSelected = false,
  onToggle,
  id,
  color = 'standard'
}: BookmarkToggleProps) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    onToggle(id)
  }

  const buttonClass = `${styles.bookmarkButton} ${
    color === 'white' ? styles['bookmarkButton--white'] : ''
  }`

  return (
    <button className={buttonClass} aria-pressed={isSelected} onClick={handleClick} type="button">
      <img className={styles.bookmarkButton__icon} src={bookmarkSrc} alt="Save to favorites" />
    </button>
  )
}

export default BookmarkToggle
