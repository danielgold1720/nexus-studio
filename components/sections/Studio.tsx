'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { stats, values } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView || !ref.current) return
    const numericValue = parseInt(value.replace(/\D/g, ''))
    const hasPlus = value.includes('+')
    const hasPercent = value.includes('%')

    gsap.fromTo({ val: 0 }, { val: numericValue }, {
      val: numericValue, duration: 2, ease: 'power2.out',
      onUpdate: function() {
        if (ref.current) {
          const current = Math.round(this.targets()[0].val)
          ref.current.textContent = current + (hasPlus ? '+' : hasPercent ? '%' : '')
        }
      }
    })
  }, [isInView, value])

  return <span ref={ref}>0</span>
}

export function Studio() {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current, { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: textRef.current, start: 'top 80%' }
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="studio" className="py-32 lg:py-48 px-6 lg:px-12 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
          <div>
            <span className="text-sm text-gray-500 tracking-[0.2em] uppercase mb-6 block">The Studio</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
              Where creativity meets strategy
            </h2>
          </div>

          <div ref={textRef} className="space-y-6 text-lg text-gray-400 leading-relaxed">
            <p>Nexus Studio is a multidisciplinary creative studio founded on the belief that exceptional digital experiences emerge from the intersection of art, design, and technology.</p>
            <p>Our team brings together strategists, designers, developers, and storytellers united by an obsession with craft and a commitment to pushing boundaries.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-32 py-16 border-y border-white/10">
          {stats.map((stat, index) => (
            <motion.div key={stat.label} className="text-center lg:text-left" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6 }}>
              <div className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-2">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-sm text-gray-500 tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-16">
          <h3 className="text-2xl md:text-3xl font-light tracking-tight">Our Methodology</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {values.map((value, index) => (
              <motion.div key={value.title} className="group p-8 rounded-lg border border-white/10 hover:border-white/20 transition-colors duration-500 bg-black/50" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6 }}>
                <div className="flex items-start justify-between mb-6">
                  <span className="text-5xl font-light text-white/10 group-hover:text-white/20 transition-colors">{value.number}</span>
                </div>
                <h4 className="text-xl font-medium mb-4">{value.title}</h4>
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}