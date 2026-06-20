export function PhotoPlaceholder() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-white/70 bg-gradient-to-br from-zinc-100 via-white to-teal-50 shadow-2xl shadow-zinc-900/10 dark:border-white/10 dark:from-zinc-900 dark:via-zinc-800 dark:to-teal-950">
      <div className="absolute inset-x-8 top-10 h-44 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-100 dark:from-zinc-700 dark:to-zinc-600" />
      <div className="absolute inset-x-6 bottom-0 h-64 rounded-t-[6rem] bg-gradient-to-br from-zinc-950 via-zinc-800 to-teal-800 dark:from-zinc-200 dark:via-zinc-300 dark:to-teal-200" />
      <div className="absolute inset-x-0 bottom-0 bg-white/75 p-5 backdrop-blur-md dark:bg-zinc-950/75">
        <p className="text-sm font-semibold text-zinc-950 dark:text-white">Professional photo placeholder</p>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">Replace with your developer portrait.</p>
      </div>
    </div>
  )
}
