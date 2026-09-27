import type { CSSProperties } from 'react'
import { Picture, type PictureSource } from './Picture'

// A screenshot under the dot screen. The grayscale, the dots, and the hover
// that clears them all live in site.css (.ht); this only supplies the frame.
// `style` carries the shared-element view-transition-name when there is one.
export function Halftone({
  source,
  alt,
  className = '',
  sizes = '(max-width: 960px) 100vw, 600px',
  style,
  loading,
  fetchPriority,
}: {
  source: PictureSource
  alt: string
  className?: string
  sizes?: string
  style?: CSSProperties
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
}) {
  return (
    <div className={className ? `ht ${className}` : 'ht'} style={style}>
      <Picture source={source} alt={alt} sizes={sizes} loading={loading} fetchPriority={fetchPriority} />
    </div>
  )
}
