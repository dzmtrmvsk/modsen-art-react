import PageLayout from '@/components/PageLayout'
import { lazy, Suspense } from 'react'
import Loader from '@/components/Loader'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import ErrorFallback from '@/components/ErrorFallback'

const FavoriteArts = lazy(() => import('@/components/FavoriteArts'))

const FavoritesPage = () => {
  return (
    <PageLayout>
      <ErrorBoundary fallback={(error) => <ErrorFallback error={error} />}>
        <Suspense fallback={<Loader />}>
          <FavoriteArts />
        </Suspense>
      </ErrorBoundary>
    </PageLayout>
  )
}

export default FavoritesPage
