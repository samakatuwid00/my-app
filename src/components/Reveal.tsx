import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { PixelOverlay } from './PixelOverlay'

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
  /** Opt in to the pixel dissolve. Cards only — running it on every block reads as noise. */
  dissolve?: boolean
}

export function Reveal({ children, delay = 0, className = '', dissolve = false }: RevealProps) {
  return (
    <motion.div
      className={dissolve ? `relative ${className}` : className}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.2, delay, ease: 'easeOut' }}
    >
      {children}
      {dissolve && <PixelOverlay />}
    </motion.div>
  )
}
