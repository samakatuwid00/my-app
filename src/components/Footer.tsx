import { Mail } from 'lucide-react'

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/', logo: 'https://cdn.simpleicons.org/github/181717' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', logo: 'https://cdn.simpleicons.org/linkedin/0A66C2' },
  { label: 'Facebook', href: 'https://www.facebook.com/', logo: 'https://cdn.simpleicons.org/facebook/0866FF' },
  { label: 'Email', href: 'mailto:hello@example.com', icon: Mail },
]

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white px-5 py-10 dark:border-white/10 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <a href="#home" className="flex items-center gap-3 font-semibold text-zinc-950 dark:text-white">
            <span className="grid size-9 place-items-center rounded-lg bg-zinc-950 text-sm text-white dark:bg-white dark:text-zinc-950">
              YN
            </span>
            <span>Your Name</span>
          </a>
          <p className="mt-3 max-w-md text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Full Stack Laravel and React developer building reliable enterprise systems.
          </p>
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex gap-2">
            {socialLinks.map((link) => {
              const Icon = link.icon

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  aria-label={link.label}
                  className="grid size-10 place-items-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition hover:border-teal-300 hover:text-teal-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:border-teal-300 dark:hover:text-teal-200"
                >
                  {Icon ? (
                    <Icon size={18} />
                  ) : (
                    <img src={link.logo} alt="" className="size-[18px]" loading="lazy" />
                  )}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
