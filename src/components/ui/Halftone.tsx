import { Picture, type PictureSource } from './Picture'

// A screenshot under the dot screen. The grayscale, the dots, and the hover
// that clears them all live in site.css (.ht); this only supplies the frame.
export function Halftone({ source, alt, className = '' }: { source: PictureSource; alt: string; className?: string }) {
  return (
    <div className={className ? `ht ${className}` : 'ht'}>
      <Picture source={source} alt={alt} sizes="(max-width: 960px) 100vw, 600px" />
    </div>
  )
}
