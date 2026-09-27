import { useEffect } from 'react'

// The title index.html ships with, read once so every route can fall back to it.
const DEFAULT_TITLE = typeof document === 'undefined' ? '' : document.title

// Sets the tab title while the calling view is mounted and restores the default
// when it leaves, so the home page never keeps a case study's title.
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ?? DEFAULT_TITLE
    return () => {
      document.title = DEFAULT_TITLE
    }
  }, [title])
}
