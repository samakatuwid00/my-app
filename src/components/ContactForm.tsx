import { Send } from 'lucide-react'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { submitContactForm } from '../services/contactApi'
import type { ContactPayload } from '../types/portfolio'

const initialForm: ContactPayload = {
  fullName: '',
  email: '',
  subject: '',
  message: '',
}

export function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')

    try {
      await submitContactForm(form)
      setForm(initialForm)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  function updateField(field: keyof ContactPayload, value: string) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4" aria-label="Contact form">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Full Name
          <input
            required
            value={form.fullName}
            onChange={(event) => updateField('fullName', event.target.value)}
            className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-zinc-950 outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:ring-teal-500/20"
            placeholder="Your full name"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Email Address
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-zinc-950 outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:ring-teal-500/20"
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
        Subject
        <input
          required
          value={form.subject}
          onChange={(event) => updateField('subject', event.target.value)}
          className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-zinc-950 outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:ring-teal-500/20"
          placeholder="Project inquiry"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
        Message
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(event) => updateField('message', event.target.value)}
          className="resize-none rounded-lg border border-zinc-200 bg-white px-4 py-3 text-zinc-950 outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:ring-teal-500/20"
          placeholder="Tell me about your system, API, or dashboard requirements."
        />
      </label>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-teal-200"
      >
        <Send size={18} />
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
      <div className="min-h-6 text-sm" role="status" aria-live="polite">
        {status === 'success' ? <p className="text-teal-700 dark:text-teal-300">Message sent successfully.</p> : null}
        {status === 'error' ? (
          <p className="text-rose-600 dark:text-rose-300">Unable to send right now. Check the Laravel API endpoint.</p>
        ) : null}
      </div>
    </form>
  )
}
