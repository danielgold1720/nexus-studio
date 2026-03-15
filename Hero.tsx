'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  // Animated canvas background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let time = 0
    let animationId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const draw = () => {
      time += 0.005

      // Create animated gradient
      const gradient = ctx.createRadialGradient(
        canvas.width * (0.5 + Math.sin(time) * 0.2),
        canvas.height * (0.3 + Math.cos(time * 0.7) * 0.1),
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.8
      )

      // Purple to blue gradient
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.15)')   // Indigo
      gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.08)') // Purple
      gradient.addColorStop(1, 'rgba(10, 10, 10, 0)')        // Transparent

      // Clear and draw
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // Text reveal animation
  useEffect(() => {
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
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#0a0a0a]">
      {/* Animated canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ filter: 'blur(80px)' }}
      />

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
           