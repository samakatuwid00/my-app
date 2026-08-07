import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

type BackButtonProps = {
  to: string
  label: string
  className?: string
}

export function BackButton({ to, label, className = '' }: BackButtonProps) {
  return (
    <Link
      to={to}
      aria-label={label}
      className={`group inline-flex items-center gap-2 py-1 text-sm text-accent transition-colors duration-200 hover:text-text lg:py-0 ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="underline-offset-4 group-hover:underline">{label}</span>
    </Link>
  )
}
