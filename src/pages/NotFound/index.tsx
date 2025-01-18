import { Link } from 'react-router-dom'
import PageLayout from '@/components/PageLayout'

import styles from './styles.module.scss'

const NotFoundPage = () => {
  return (
    <PageLayout>
      <section className={styles.page404}>
        <div className={styles.page404__container}>
          <div className={styles.page404__row}>
            <div className={styles.page404__col}>
              <div className={styles.page404__colInner}>
                <div className={styles.page404__imageContainer} />
                <div className={styles.page404__content}>
                  <h3 className={styles.page404__subtitle}>Looks like you are lost</h3>
                  <p className={styles.page404__description}>
                    The page you are looking for is not available!
                  </p>
                  <Link to="/" className={styles.page404__link}>
                    Go to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

export default NotFoundPage
