import type { ContactPayload } from '../types/portfolio'

// Form ID only — Formspree endpoints are public by design, so this is safe to
// inline in the bundle. Never put a secret behind a VITE_ prefix.
const FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID
const FORM_ENDPOINT = `https://formspree.io/f/${FORM_ID}`

export async function submitContactForm(payload: ContactPayload) {
  if (!FORM_ID) {
    throw new Error('The contact form is not configured.')
  }

  const response = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: payload.fullName,
      email: payload.email,
      subject: payload.subject,
      message: payload.message,
      _subject: `Portfolio inquiry: ${payload.subject}`,
    }),
  })

  if (!response.ok) {
    throw new Error('Unable to submit the contact form.')
  }

  return response.json()
}
