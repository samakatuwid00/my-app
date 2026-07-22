export function StatusDot({ label }: { label: string }) {
  return (
    <p className="flex items-center gap-2">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-2" />
      <span className="label">{label}</span>
    </p>
  )
}
