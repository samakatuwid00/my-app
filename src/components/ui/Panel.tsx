import type { ElementType, ReactNode } from 'react'

type PanelProps = {
  as?: ElementType
  children: ReactNode
  className?: string
  interactive?: boolean
}

export function Panel({ as: Tag = 'div', children, className = '', interactive = false }: PanelProps) {
  const hover = interactive ? 'transition-colors duration-200 hover:border-line-strong' : ''

  return (
    <Tag className={`rounded-panel border border-line bg-panel ${hover} ${className}`}>{children}</Tag>
  )
}
