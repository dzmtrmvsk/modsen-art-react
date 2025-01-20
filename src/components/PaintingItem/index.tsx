import { CompactPainting, CompactPaintingProps } from '@/components/CompactPainting'
import DetailedPainting from '@/components/DetailedPainting'

export interface PaintingProps extends CompactPaintingProps {
  type?: 'compact' | 'detailed'
}

const PaintingItem = ({ type = 'compact', ...props }: PaintingProps) => {
  if (type === 'compact') {
    return <CompactPainting {...props} />
  }
  return <DetailedPainting {...props} />
}

export default PaintingItem
