import PageLayout from '@/components/PageLayout'
import PaintingMiniList from '@/components/PaintingMiniList/PaintingMiniList'
import { usePaintings } from '@/hooks/usePainting'

import { useSavedIds } from '@/hooks/useSavedIds'

const FavoritesPage = () => {
  const { savedIds } = useSavedIds()
  const { data } = usePaintings('list', { ids: savedIds })
  return (
    <PageLayout>
      <PaintingMiniList artworks={data.artworks} />
    </PageLayout>
  )
}
export default FavoritesPage
