import styles from './styles.module.scss'
import Container from '@/components/Container'
import GalleryLogo from '@/components/GalleryLogo'
import ModsenLogo from '@/components/ModsenLogo'

const Footer = () => {
  return (
    <Container className={styles.footer}>
      <GalleryLogo type="dark" />
      <ModsenLogo />
    </Container>
  )
}

export default Footer
