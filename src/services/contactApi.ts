import type { ContactPayload } from '../types/portfolio'

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/abaygherjr07@gmail.com'

export async function submitContactForm(payload: ContactPayload) {
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
      _template: 'table',
    }),
  })

  if (!response.ok) {
    throw new Error('Unable to submit the contact form.')
  }

  return response.json()
}
