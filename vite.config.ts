import { defineConfig, loadEnv } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'

// In production Vercel serves api/ask.ts. This runs the same handler behind the
// Vite dev server so `npm run dev` exercises the real function — no Vercel CLI,
// no login. Dev only: `apply: 'serve'` keeps it out of the build.
function askDevServer(env: Record<string, string>): Plugin {
  return {
    name: 'ask-dev-server',
    apply: 'serve',
    configureServer(server) {
      if (env.GROQ_API_KEY) process.env.GROQ_API_KEY = env.GROQ_API_KEY

      server.middlewares.use('/api/ask', async (request, response) => {
        const chunks: Buffer[] = []
        for await (const chunk of request) chunks.push(chunk as Buffer)
        const raw = Buffer.concat(chunks).toString()

        let body: unknown
        try {
          body = raw ? JSON.parse(raw) : undefined
        } catch {
          response.statusCode = 400
          response.setHeader('Content-Type', 'application/json')
          response.end(JSON.stringify({ error: 'Malformed request.' }))
          return
        }

        // Shim the two Vercel helpers the handler uses.
        const shim = {
          setHeader: (key: string, value: string) => response.setHeader(key, value),
          status(code: number) {
            response.statusCode = code
            return this
          },
          json(payload: unknown) {
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify(payload))
            return this
          },
        }

        try {
          const module = await server.ssrLoadModule('/api/ask.ts')
          await module.default({ method: request.method, headers: request.headers, body }, shim)
        } catch (error) {
          server.config.logger.error(`ask-dev-server: ${error}`)
          response.statusCode = 500
          response.setHeader('Content-Type', 'application/json')
          response.end(JSON.stringify({ error: 'The assistant is unavailable right now.' }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss(), imagetools(), askDevServer(env)],
    build: {
      // Images must stay files. The default 4096-byte inline limit turns the
      // small AVIF variants — a 192px award thumbnail lands near 6KB, some
      // srcset candidates land under 4 — into base64 inside the JS bundle,
      // which grows the one asset that blocks rendering and defeats the point
      // of generating the variant at all.
      assetsInlineLimit: 0,
    },
  }
})
