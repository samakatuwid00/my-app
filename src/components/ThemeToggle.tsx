import { Moon, Sun } from 'lucide-react'
import { useDarkMode } from '../hooks/useDarkMode'

export function ThemeToggle({ onToggled }: { onToggled: () => void }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  function handleToggle() {
    toggleDarkMode()
    onToggled()
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
      className="grid size-8 place-items-center rounded-panel border border-control text-text-2 transition-colors duration-200 hover:border-line-strong hover:text-text"
    >
      {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  )
}
