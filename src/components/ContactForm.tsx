import { useState } from 'react'
import type { FormEvent } from 'react'
import { submitContactForm } from '../services/contactApi'
import type { ContactPayload } from '../types/portfolio'

const EMPTY_FORM: ContactPayload = { fullName: '', email: '', subject: '', message: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FieldName = keyof ContactPayload
type FieldErrors = Partial<Record<FieldName, string>>
type SubmitState = 'idle' | 'sending' | 'sent' | 'failed'

const FIELD_CLASS =
  'w-full rounded-panel border border-control bg-surface px-3 py-2 text-sm text-text transition-colors duration-200 placeholder:text-text-3 focus:border-accent focus:outline-none'

const FIELDS = [
  { name: 'fullName' as const, label: 'Name', type: 'text', autoComplete: 'name', placeholder: 'Juan Dela Cruz' },
  { name: 'email' as const, label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'you@example.com' },
  {
    name: 'subject' as const,
    label: 'Subject',
    type: 'text',
    autoComplete: 'off',
    placeholder: 'Records management system',
    fullWidth: true,
  },
]

function validate(values: ContactPayload): FieldErrors {
  const errors: FieldErrors = {}

  if (!values.fullName.trim()) errors.fullName = 'Name is required.'
  if (!values.email.trim()) errors.email = 'Email is required.'
  else if (!EMAIL_PATTERN.test(values.email)) errors.email = 'Enter a valid email address.'
  if (!values.subject.trim()) errors.subject = 'Subject is required.'
  if (!values.message.trim()) errors.message = 'Message is required.'

  return errors
}

function FieldError({ name, message }: { name: FieldName; message?: string }) {
  if (!message) return null

  return (
    <p id={`${name}-error`} className="mt-1 text-[11px] text-accent-2">
      {message}
    </p>
  )
}

export function ContactForm() {
  const [values, setValues] = useState<ContactPayload>(EMPTY_FORM)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [state, setState] = useState<SubmitState>('idle')
  const [failureMessage, setFailureMessage] = useState('')

  function setField(name: FieldName, value: string) {
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }))
  }

  function handleBlur(name: FieldName) {
    setErrors((current) => ({ ...current, [name]: validate(values)[name] }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setState('sending')
    try {
      await submitContactForm(values)
      setValues(EMPTY_FORM)
      setState('sent')
    } catch (error) {
      setFailureMessage(error instanceof Error ? error.message : 'Something went wrong.')
      setState('failed')
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.name} className={`min-w-0 ${field.fullWidth ? 'sm:col-span-2' : ''}`}>
            <label htmlFor={field.name} className="label mb-1 block">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              value={values[field.name]}
              placeholder={field.placeholder}
              onChange={(event) => setField(field.name, event.target.value)}
              onBlur={() => handleBlur(field.name)}
              aria-invalid={Boolean(errors[field.name])}
              aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
              className={FIELD_CLASS}
            />
            <FieldError name={field.name} message={errors[field.name]} />
          </div>
        ))}
      </div>

      <div className="min-w-0">
        <label htmlFor="message" className="label mb-1 block">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={values.message}
          placeholder="What are you building?"
          onChange={(event) => setField('message', event.target.value)}
          onBlur={() => handleBlur('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`${FIELD_CLASS} resize-y`}
        />
        <FieldError name="message" message={errors.message} />
      </div>

      {state === 'sent' && (
        <p role="status" className="rounded-panel border border-line px-3 py-2 text-xs text-accent">
          Message sent. A reply will arrive at the address you provided.
        </p>
      )}
      {state === 'failed' && (
        <p role="status" className="rounded-panel border border-line px-3 py-2 text-xs text-accent-2">
          {failureMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-panel border border-control px-4 py-2 text-sm text-text transition-colors duration-200 hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:text-text-3 sm:w-auto sm:self-start"
      >
        <span aria-hidden="true" className="text-accent">
          $
        </span>
        {state === 'sending' ? 'sending…' : 'send message'}
      </button>
    </form>
  )
}
