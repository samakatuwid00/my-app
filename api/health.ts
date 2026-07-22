import type { VercelRequest, VercelResponse } from '@vercel/node'

// Diagnostic only: reports whether the function runtime boots and whether the
// assistant's key is visible to it. Never returns the key itself.
export default function handler(_request: VercelRequest, response: VercelResponse) {
  response.setHeader('Cache-Control', 'no-store')
  response.status(200).json({
    ok: true,
    node: process.version,
    hasGroqKey: Boolean(process.env.GROQ_API_KEY),
  })
}
