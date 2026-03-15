'use client'

import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { useState } from 'react'

export function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <motion.button
      className="sound-toggle"
      onClick={() => setIsPlaying(!isPlaying)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div initial={false} animate={{ rotate: isPlaying ? 0 : 180 }} transition={{ duration: 0.3 }}>
        {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </motion.div>
    </motion.button>
  )
}