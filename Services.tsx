'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Target, Compass, Layout, Code, Play, BookOpen, Zap, ArrowRight } from 'lucide-react'
import { services } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const iconMap: { [key: string]: React.ElementType } = { Target, Compass, Layout, Code, Play, BookOpen, Zap }

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.service-item', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="py-32 lg:py-48 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <span className="text-sm text-gray-500 tracking-[0.2em] uppercase mb-6 block">Services</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-6">Capabilities</h2>
            <p className="text-gray-400 leading-relaxed">We offer end-to-end creative services, from initial strategy through to production.</p>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-0">
              {services.map((service, index) => {
                const Icon = iconMap[service.icon]
                const isActive = activeIndex === index
                return (
                  <motion.div key={service.title} className="service-item group border-t border-white/10 last:border-b" onMouseEnter={() => setActiveIndex(index)} onMouseLeave={() => setActiveIndex(null)}>
                    <div className="py-8 lg:py-12 flex items-start gap-6 lg:gap-12 cursor-pointer">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-500">
                        <Icon className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl lg:text-3xl font-light tracking-tight group-hover:text-white transition-colors">{service.title}</h3>
                          <ArrowRight className="w-6 h-6 text-gray-500 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                        </div>
                        <motion.div initial={false} animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                          <p className="text-gray-400 leading-relaxed max-w-xl pb-4">{service.description}</p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}