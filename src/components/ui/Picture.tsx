export type PictureSource = {
  // Partial, not Record<string, string>: a format is only present if the import
  // query asked for it, and typing every key as `string` made the fallback in
  // ProjectCard's prefetch look dead to the type checker while it was live at
  // runtime.
  sources: Partial<Record<string, string>>
  img: { src: string; w: number; h: number }
}

// Smallest-to-largest is wrong for <source>: the browser takes the first type it
// can decode, so the most efficient format has to come first. The import query's
// key order is not a guarantee — `format=webp;avif` would reverse it — so the
// order is enforced here instead of asserted in a comment.
const FORMAT_ORDER = ['avif', 'webp']

function orderedSources(sources: PictureSource['sources']) {
  return Object.entries(sources)
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .sort(([a], [b]) => {
      const rank = (format: string) => {
        const index = FORMAT_ORDER.indexOf(format)
        return index === -1 ? FORMAT_ORDER.length : index
      }
      return rank(a) - rank(b)
    })
}

type PictureProps = {
  source: PictureSource
  alt: string
  className?: string
  /** Passed through to the fallback <img>; every candidate shares the ratio. */
  sizes?: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
  /** True for decoration — drops the image out of the accessibility tree. */
  hidden?: boolean
}

// Wraps a vite-imagetools `as=picture` import. Sources are emitted in
// FORMAT_ORDER and the browser takes the first type it understands, so the
// fallback <img> is only fetched by something that reads none of them.
//
// `width`/`height` come from the imagetools metadata rather than being guessed:
// they give the box an intrinsic ratio before the bytes arrive, which is what
// stops the project modal from jumping when its preview finally paints.
export function Picture({
  source,
  alt,
  className = '',
  sizes,
  loading = 'lazy',
  fetchPriority = 'auto',
  hidden = false,
}: PictureProps) {
  const { sources, img } = source

  return (
    <picture>
      {orderedSources(sources).map(([format, srcSet]) => (
        <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />
      ))}
      <img
        src={img.src}
        width={img.w}
        height={img.h}
        alt={hidden ? '' : alt}
        aria-hidden={hidden || undefined}
        sizes={sizes}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        className={className}
      />
    </picture>
  )
}
