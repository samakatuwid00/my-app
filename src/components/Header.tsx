import { Menu, Moon, Sun, X } from 'lucide-react'
import { useState } from 'react'
import { useDarkMode } from '../hooks/useDarkMode'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/75">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3 font-semibold text-zinc-950 dark:text-white">
          <span className="grid size-9 place-items-center rounded-lg bg-zinc-950 text-sm text-white dark:bg-white dark:text-zinc-950">
            YN
          </span>
          <span>Your Name</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="grid size-10 place-items-center rounded-lg border border-zinc-200 bg-white text-zinc-700 transition hover:border-teal-300 hover:text-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:border-teal-300"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg border border-zinc-200 bg-white text-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 md:hidden dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
            onClick={() => setIsMenuOpen((currentState) => !currentState)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {isMenuOpen ? (
        <div className="border-t border-zinc-200 bg-white px-5 py-4 md:hidden dark:border-white/10 dark:bg-zinc-950">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
