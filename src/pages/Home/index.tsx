import MuseumSearch from '@/components/MuseumSearch'
import PageLayout from '@/components/PageLayout'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import ErrorFallback from '@/components/ErrorFallback'
import SpecialArts from '@/components/SpecialArts'

const HomePage = () => {
  return (
    <PageLayout>
      <ErrorBoundary fallback={(error) => <ErrorFallback error={error} />}>
        <MuseumSearch />
      </ErrorBoundary>
      <ErrorBoundary fallback={(error) => <ErrorFallback error={error} />}>
        <SpecialArts />
      </ErrorBoundary>
    </PageLayout>
  )
}

export default HomePage
