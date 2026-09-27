import { useState } from 'react'
import type { FormEvent } from 'react'
import { submitContactForm } from '../services/contactApi'
import type { ContactPayload } from '../types/portfolio'

const EMPTY_FORM: ContactPayload = { fullName: '', email: '', subject: '', message: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FieldName = keyof ContactPayload
type FieldErrors = Partial<Record<FieldName, string>>
type SubmitState = 'idle' | 'sending' | 'sent' | 'failed'

const FIELDS = [
  { name: 'fullName' as const, label: 'Name', type: 'text', autoComplete: 'name' },
  { name: 'email' as const, label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'subject' as const, label: 'Subject', type: 'text', autoComplete: 'off' },
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

// role="alert" so a screen reader hears the problem the moment it appears,
// not only when the field is next focused.
function FieldError({ name, message }: { name: FieldName; message?: string }) {
  if (!message) return null

  return (
    <p id={`${name}-error`} className="field-error" role="alert">
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
    <form onSubmit={handleSubmit} noValidate>
      {FIELDS.map((field) => (
        <div key={field.name} className="form-item">
          <label>
            <span className="ui">{field.label}</span>
            <span className="field">
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                value={values[field.name]}
                onChange={(event) => setField(field.name, event.target.value)}
                onBlur={() => handleBlur(field.name)}
                aria-invalid={Boolean(errors[field.name])}
                aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
              />
            </span>
          </label>
          <FieldError name={field.name} message={errors[field.name]} />
        </div>
      ))}

      <div className="form-item">
        <label>
          <span className="ui">What should the system do?</span>
          <span className="field">
            <textarea
              id="message"
              name="message"
              rows={4}
              value={values.message}
              onChange={(event) => setField('message', event.target.value)}
              onBlur={() => handleBlur('message')}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
          </span>
        </label>
        <FieldError name="message" message={errors.message} />
      </div>

      {state === 'sent' && (
        <p role="status" className="form-note">
          Message sent. A reply will arrive at the address you provided.
        </p>
      )}
      {state === 'failed' && (
        <p role="alert" className="form-note">
          {failureMessage}
        </p>
      )}

      <div>
        <button type="submit" disabled={state === 'sending'} className="btn solid">
          {state === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  )
}
