import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { PixelOverlay } from './PixelOverlay'

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
}

// Scroll-in reveal plus the per-element pixel dissolve. Everything wrapped in
// this gets both; chrome, rail, prompts and footer are deliberately left out.
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.2, delay, ease: 'easeOut' }}
    >
      {children}
      <PixelOverlay />
    </motion.div>
  )
}
