import styles from './styles.module.scss'
import { useBurgerMenuContext } from '@/contexts/BurgerMenuContext'

const BurgerMenuButton = () => {
  const { toggleMenu, isMenuOpened } = useBurgerMenuContext()

  return (
    <button
      type="button"
      className={styles.burgerMenu}
      data-open={isMenuOpened}
      onClick={toggleMenu}
      aria-label={isMenuOpened ? 'Close menu' : 'Open menu'}>
      <span className={styles.bar} role="presentation" />
      <span className={styles.bar} role="presentation" />
      <span className={styles.bar} role="presentation" />
    </button>
  )
}

export default BurgerMenuButton
