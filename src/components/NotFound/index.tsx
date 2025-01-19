import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import Container from '@/components/Container'

const NotFound = () => {
  return (
    <section className={styles.page404}>
      <Container className={styles.page404__container}>
        <div className={styles.page404__imageContainer} />
        <div className={styles.page404__content}>
          <h3 className={styles.page404__subtitle}>Looks like you are lost</h3>
          <p className={styles.page404__description}>
            The page you are looking for is not available!
          </p>
          <Link to="/" className={styles.page404__link}>
            Go Home
          </Link>
        </div>
      </Container>
    </section>
  )
}

export default NotFound
