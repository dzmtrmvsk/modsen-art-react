import { useEffect, useRef } from 'react'
import { useBurgerMenuContext } from '@/contexts/BurgerMenuContext'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import Container from '@/components/Container'
import NavBar from '@/components/NavBar'
import GalleryLogo from '@/components/GalleryLogo'
import BurgerMenuButton from '@/components/BurgerMenuButton'

import styles from './styles.module.scss'

export function Header() {
  const headerRef = useRef<HTMLDivElement>(null)
  const { closeMenu, isMenuOpened } = useBurgerMenuContext()

  useEffect(() => {
    closeMenu()
  }, [closeMenu])

  useOutsideClick(headerRef, () => {
    closeMenu()
  })

  return (
    <header className={styles.header} ref={headerRef}>
      <Container>
        <div className={styles.header__wrapper}>
          <GalleryLogo className={styles.header__logo} type="light" />
          <div
            className={`${styles.header__navigation} ${isMenuOpened ? styles['header__navigation--mobile'] : ''}`}
            data-opened={isMenuOpened}>
            <NavBar />
          </div>
          <div className={styles.header__menuButton}>
            <BurgerMenuButton />
          </div>
        </div>
      </Container>
    </header>
  )
}
