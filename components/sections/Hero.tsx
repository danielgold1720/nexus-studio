'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  useEffect(() => {
    // Simple text animation without GSAP for now
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.char')
      chars.forEach((char, index) => {
        setTimeout(() => {
          (char as HTMLElement).style.opacity = '1'
          ;(char as HTMLElement).style.transform = 'translateY(0)'
        }, 500 + index * 30)
      })
    }
  }, [])

  const title = 'We Craft Digital\nExperiences'

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 animate-pulse" />
      
      <motion.div className="relative z-10 text-center px-6 max-w-6xl mx-auto" style={{ opacity, y }}>
        <motion.p 
          className="text-sm md:text-base text-gray-500 tracking-[0.3em] uppercase mb-8" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Creative Digital Studio
        </motion.p>

        <h1 
          ref={titleRef} 
          className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tight leading-[0.9] mb-8"
        >
          {title.split('').map((char, index) => (
            <span 
              key={index} 
              className="char inline-block opacity-0 translate-y-10 transition-all duration-500"
              style={{ whiteSpace: char === '\n' ? 'pre' : undefined }}
            >
              {char === '\n' ? <br /> : char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        <motion.p 
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          We are a multidisciplinary studio at the intersection of art, design, and technology. Creating immersive experiences that move people.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <Link 
            href="#work" 
            className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
          >
            View Work
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </Link>
          <button className="group flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full font-medium hover:bg-white/5 transition-colors">
            Watch Showreel
          </button>
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-white/30" />
      </motion.div>
    </section>
  )
}