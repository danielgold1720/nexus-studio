'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsExiting(true)
            setTimeout(onComplete, 800)
          }, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 bg-black z-[10000] flex items-center justify-center flex-col gap-8"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <span className="text-sm tracking-[0.2em] uppercase text-gray-500">Nexus Studio</span>
          </motion.div>
          
          <div className="w-48 h-px bg-gray-800 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          <motion.span className="text-xs text-gray-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            {Math.min(Math.round(progress), 100)}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}