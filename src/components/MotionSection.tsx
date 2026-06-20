import { motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'

type MotionSectionProps = PropsWithChildren<{
  id: string
  className?: string
}>

export function MotionSection({ id, className = '', children }: MotionSectionProps) {
  return (
    <motion.section
      id={id}
      className={`scroll-mt-24 px-5 py-20 sm:px-6 lg:px-8 ${className}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  )
}
