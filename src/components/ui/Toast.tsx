import { AnimatePresence, motion } from 'framer-motion'

export function Toast({ message }: { message: string | null }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key={message}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 16, opacity: 0 }}
          className="pointer-events-none absolute inset-x-6 bottom-[112px] z-50 flex justify-center"
        >
          <span className="rounded-full bg-neutral-900 px-4 py-3 text-label-m text-neutral-0 shadow-float">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
