/// <reference types="vite/client" />

// vite-imagetools 10 ships no client types, so the `?…&as=picture` imports are
// declared here. One wildcard is all TS allows in a module pattern, so the match
// is on the suffix every one of those imports ends with.
declare module '*as=picture' {
  const picture: {
    /**
     * Keyed by format — `avif` and `webp` here — each a full srcset string.
     * Partial because a format is only present if the query asked for it.
     */
    sources: Partial<Record<string, string>>
    /** Largest variant in the fallback format, with its intrinsic size. */
    img: { src: string; w: number; h: number }
  }
  export default picture
}

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_FORM_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
