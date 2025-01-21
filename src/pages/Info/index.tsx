import PageLayout from '@/components/PageLayout'
import { Suspense, lazy } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import ErrorFallback from '@/components/ErrorFallback'
import Loader from '@/components/Loader'
import { useParams } from 'react-router-dom'

const PaintingInfo = lazy(() => import('@/components/PaintingInfo'))

const InfoPage = () => {
  const { itemId } = useParams()
  return (
    <PageLayout>
      <ErrorBoundary fallback={(error) => <ErrorFallback error={error} />}>
        <Suspense fallback={<Loader />}>
          <PaintingInfo artId={Number.parseInt(itemId as string)} />
        </Suspense>
      </ErrorBoundary>
    </PageLayout>
  )
}

export default InfoPage
