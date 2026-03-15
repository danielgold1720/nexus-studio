'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, ArrowUpRight } from 'lucide-react'
import { news } from '@/lib/data'

export function Showreel() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const togglePlay = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section ref={sectionRef} className="py-32 lg:py-48 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span className="text-sm text-gray-500 tracking-[0.2em] uppercase mb-6 block">Showreel 2024</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">Selected Works</h2>
        </motion.div>

        <motion.div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900 mb-32" style={{ scale, opacity }}>
          <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" poster="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80" loop muted={isMuted} playsInline>
            <source src="/video/showreel.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30" />
          <button onClick={togglePlay} className="absolute inset-0 flex items-center justify-center group">
            <div className="w-24 h-24 rounded-full border-2 border-white/50 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-all duration-500">
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </div>
          </button>
          <button onClick={() => setIsMuted(!isMuted)} className="absolute bottom-6 right-6 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-4">
            <span className="text-sm text-gray-500 tracking-[0.2em] uppercase mb-6 block">News & Insights</span>
            <h3 className="text-3xl md:text-4xl font-light tracking-tight">Latest from the studio</h3>
          </div>
          <div className="lg:col-span-8 space-y-8">
            {news.map((item, index) => (
              <motion.article key={item.title} className="group flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 border-t border-white/10 cursor-pointer" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6 }}>
                <div className="flex-grow">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">{item.category}</span>
                    <span className="text-xs text-white/30">{new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h4 className="text-xl font-light group-hover:text-gray-400 transition-colors">{item.title}</h4>
                  <p className="text-gray-400 mt-2 max-w-xl">{item.excerpt}</p>
                </div>
                <ArrowUpRight className="w-6 h-6 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}