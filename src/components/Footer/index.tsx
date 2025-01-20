import styles from './styles.module.scss'
import Container from '@/components/Container'
import GalleryLogo from '@/components/GalleryLogo'
import ModsenLogo from '@/components/ModsenLogo'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container className={styles.footer__wrapper}>
        <GalleryLogo type="dark" />
        <ModsenLogo />
      </Container>
    </footer>
  )
}

export default Footer
