import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  const panelRef = useFocusTrap<HTMLDivElement>(isOpen, onClose)
  useLockBodyScroll(isOpen)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-canvas/95" onClick={onClose} />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-panel border border-line bg-panel"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-line px-4 py-3">
              <p id="modal-title" className="text-sm text-text">
                {title}
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid size-7 shrink-0 place-items-center rounded-panel border border-control text-text-2 transition-colors duration-200 hover:border-line-strong hover:text-text"
              >
                <X size={14} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>

            {footer && <div className="border-t border-line px-4 py-3">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
