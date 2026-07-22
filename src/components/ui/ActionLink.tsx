import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

type OwnProps<T extends ElementType> = {
  as?: T
  children: ReactNode
  external?: boolean
  className?: string
}

type ActionLinkProps<T extends ElementType> = OwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof OwnProps<T>>

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
      className={`group inline-flex items-center gap-2 text-sm text-accent transition-colors duration-200 hover:text-text ${className}`}
    >
      <span aria-hidden="true">&gt;</span>
      <span className="underline-offset-4 group-hover:underline">{children}</span>
    </Tag>
  )
}
