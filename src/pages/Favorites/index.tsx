import PageLayout from '@/components/PageLayout'
import PaintingsList from '@/components/PaintingsList/PaintingsList'
import { usePaintings } from '@/hooks/usePainting'

import { useSavedIds } from '@/hooks/useSavedIds'

const FavoritesPage = () => {
  const { savedIds } = useSavedIds()
  const { data } = usePaintings('list', { ids: savedIds })
  return (
    <PageLayout>
      <PaintingsList artworks={data?.artworks} type="compact" />
    </PageLayout>
  )
}
export default FavoritesPage
