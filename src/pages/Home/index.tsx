import { Suspense, lazy } from 'react'
import PageLayout from '@/components/PageLayout'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import ErrorFallback from '@/components/ErrorFallback'
import Loader from '@/components/Loader'

const MuseumSearch = lazy(() => import('@/components/MuseumSearch'))
const SpecialArts = lazy(() => import('@/components/SpecialArts'))
const ForYouArts = lazy(() => import('@/components/ForYouArts'))

const HomePage = () => {
  return (
    <PageLayout>
      <ErrorBoundary fallback={(error) => <ErrorFallback error={error} />}>
        <Suspense fallback={<Loader />}>
          <MuseumSearch />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={(error) => <ErrorFallback error={error} />}>
        <Suspense fallback={<Loader />}>
          <SpecialArts />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={(error) => <ErrorFallback error={error} />}>
        <Suspense fallback={<Loader />}>
          <ForYouArts />
        </Suspense>
      </ErrorBoundary>
    </PageLayout>
  )
}

export default HomePage
