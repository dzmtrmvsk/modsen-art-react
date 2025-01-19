import { CompactPainting, CompactPaintingProps } from '@/components/CompactPainting'
import { DetailedPainting } from '@/components/DetailedPainting'

interface PaintingProps extends CompactPaintingProps {
  type?: 'compact' | 'detailed'
}

export function Painting({ type = 'compact', ...props }: PaintingProps) {
  if (type === 'compact') {
    return <CompactPainting {...props} />
  }
  return <DetailedPainting {...props} />
}
