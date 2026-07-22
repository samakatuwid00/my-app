import { MapPin, Mail, Phone } from 'lucide-react'
import { Prompt } from '../components/ui/Prompt'
import { BrandIcon } from '../components/BrandIcon'
import type { BrandName } from '../components/BrandIcon'
import { ContactForm } from '../components/ContactForm'
import { Reveal } from '../components/Reveal'
import { GITHUB_HANDLE, GITHUB_URL, site } from '../data/site'

type ContactRow = {
  label: string
  value: string
  href?: string
  brand?: BrandName
  icon?: typeof Mail
}

const CONTACT_ROWS: ContactRow[] = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { label: 'Phone', value: site.phone, href: `tel:${site.phone.replace(/[^+\d]/g, '')}`, icon: Phone },
  { label: 'Location', value: site.location, icon: MapPin },
  { label: 'GitHub', value: GITHUB_HANDLE, href: GITHUB_URL, brand: 'github' },
  {
    label: 'LinkedIn',
    value: 'roger-abay-30394441b',
    href: 'https://linkedin.com/in/roger-abay-30394441b',
    brand: 'linkedin',
  },
  { label: 'Facebook', value: 'niko.0y', href: 'https://www.facebook.com/niko.0y', brand: 'facebook' },
]

const ROW_CLASS =
  'flex h-full items-start gap-3 rounded-panel border border-line bg-panel px-3 py-2.5 transition-colors duration-200'

function ContactRow({ row }: { row: ContactRow }) {
  const Icon = row.icon ?? Mail
  const isExternal = row.href?.startsWith('http') ?? false

  // Label above value, never side by side: a fixed label column clipped
  // "LinkedIn" and forced the email to truncate on narrow panes.
  const body = (
    <>
      <span className="mt-0.5 shrink-0 text-text-3">
        {row.brand ? <BrandIcon name={row.brand} size={15} /> : <Icon size={15} />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="label block">{row.label}</span>
        <span className="mt-0.5 block break-words text-[13px] text-text-2">{row.value}</span>
      </span>
    </>
  )

  if (!row.href) {
    return <div className={ROW_CLASS}>{body}</div>
  }

  return (
    <a
      href={row.href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      className={`${ROW_CLASS} hover:border-line-strong`}
    >
      {body}
    </a>
  )
}

export function Contact() {
  return (
    <>
      <Prompt command="contact --info" />

      <div className="grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start">
        <Reveal>
          <h2 className="max-w-[26ch] text-base font-semibold leading-snug text-text">{site.contact.heading}</h2>
          <p className="prose-body mt-2 max-w-[60ch] text-xs">{site.contact.paragraph}</p>

          <ul className="mt-5 grid gap-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {CONTACT_ROWS.map((row) => (
              <li key={row.label}>
                <ContactRow row={row} />
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.05} dissolve>
          <div className="rounded-panel border border-line bg-panel p-4 lg:p-5">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </>
  )
}
