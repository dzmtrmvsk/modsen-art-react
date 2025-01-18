import styles from './styles.module.scss'
import { useBurgerMenuContext } from '@/contexts/BurgerMenuContext'

export function BurgerMenuButton() {
  const { toggleMenu, isMenuOpened } = useBurgerMenuContext()

  return (
    <button
      type="button"
      className={styles.burgerMenu}
      data-open={isMenuOpened}
      onClick={toggleMenu}
      aria-label={isMenuOpened ? 'Close menu' : 'Open menu'}>
      <span className={styles.bar} />
      <span className={styles.bar} />
      <span className={styles.bar} />
    </button>
  )
}
