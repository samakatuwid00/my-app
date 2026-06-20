import type { ContactPayload } from '../types/portfolio'

const API_BASE_URL = import.meta.env.VITE_LARAVEL_API_URL ?? ''

export async function submitContactForm(payload: ContactPayload) {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Unable to submit the contact form.')
  }

  return response.json().catch(() => ({}))
}
