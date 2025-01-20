import { PropsWithChildren } from 'react'

import { ErrorBoundary } from '@/components/ErrorBoundary'
import ErrorFallback from '@/components/ErrorFallback'
import Container from '@/components/Container'
import Footer from '@/components/Footer'
import Header from '@/components/Header/Header'

import styles from './styles.module.scss'

const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.contentWrapper}>
        <ErrorBoundary fallback={(error) => <ErrorFallback error={error} />}>
          <Container className={styles.content}>{children}</Container>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}

export default PageLayout
