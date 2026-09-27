import type { CSSProperties, PropsWithChildren } from 'react'

type BandProps = PropsWithChildren<{
  id?: string
  tone: 'dark' | 'light'
  flush?: boolean
  className?: string
  as?: 'section' | 'div' | 'footer'
  style?: CSSProperties
}>

// A full-width stripe in one ink. data-band is what the header reads to match it.
export function Band({ id, tone, flush, className, as: Tag = 'section', style, children }: BandProps) {
  return (
    <Tag id={id} data-band={tone} className={`band ${tone}${flush ? ' flush' : ''}${className ? ` ${className}` : ''}`} style={style}>
      {children}
    </Tag>
  )
}
