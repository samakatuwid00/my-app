import type { CSSProperties, ReactNode } from 'react'
import { Picture, type PictureSource } from '../ui/Picture'
import { Figure } from './Figure'
import type { FigureName } from './figures'

type ScreenFrameProps = {
  source: PictureSource
  alt: string
  sizes: string
  /** A schematic drawn over the screenshot; hover (or a tap) shows the real screen. */
  figure?: FigureName
  loading?: 'eager' | 'lazy'
  className?: string
  /** Carries view-transition-name while a transition to this project's case study runs. */
  style?: CSSProperties
  children?: ReactNode
}

// A screenshot under the dot screen, in grayscale until it is hovered.
export function ScreenFrame({ source, alt, sizes, figure, loading = 'lazy', className = '', style, children }: ScreenFrameProps) {
  return (
    <div className={`sf${className ? ` ${className}` : ''}`} style={style} data-fig={figure ? '' : undefined}>
      <Picture source={source} alt={alt} sizes={sizes} loading={loading} />
      {figure && (
        <>
          <div className="scrim" />
          <Figure name={figure} />
        </>
      )}
      {children}
    </div>
  )
}
