type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
      <p className="mb-3 text-sm font-semibold uppercase text-teal-600 dark:text-teal-300">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold text-zinc-950 md:text-4xl dark:text-white">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-zinc-600 dark:text-zinc-300">
          {description}
        </p>
      ) : null}
    </div>
  )
}
