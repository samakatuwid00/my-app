import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

type OwnProps<T extends ElementType> = {
  as?: T
  children: ReactNode
  external?: boolean
  className?: string
}

type ActionLinkProps<T extends ElementType> = OwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof OwnProps<T>>

// `py-1 lg:py-0`: 20px of link is a hard tap target on a phone, and the padding
// comes off again at lg, where the pane budget is measured to the pixel.
const LINK_CLASS =
  'group inline-flex items-center gap-2 py-1 text-sm text-accent transition-colors duration-200 hover:text-text lg:py-0'

export function ActionLink<T extends ElementType = 'a'>({
  as,
  children,
  external = false,
  className = '',
  ...rest
}: ActionLinkProps<T>) {
  const Tag = as ?? 'a'
  const externalProps = external ? { target: '_blank', rel: 'noreferrer' } : {}

  return (
    <Tag
      {...externalProps}
      {...rest}
      className={`${LINK_CLASS} ${className}`}
    >
      <span aria-hidden="true">&gt;</span>
      <span className="underline-offset-4 group-hover:underline">{children}</span>
    </Tag>
  )
}
