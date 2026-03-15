'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current, { y: 100, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 85%' }
      })
    })
    return () => ctx.revert()
  }, [])

  const isEven = index % 2 === 0

  return (
    <div ref={cardRef} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
      <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
        <Link href={`/case/${project.id}`} className="block group">
          <div className="project-card relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-900">
            <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
            <div className="project-card-content">
              <span className="inline-flex items-center gap-2 text-sm font-medium">
                View Case Study <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </Link>
      </div>

      <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-6`}>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="font-mono">{String(index + 1).padStart(2, '0')}</span>
          <span className="w-12 h-px bg-white/20" />
          <span>{project.category}</span>
          <span className="text-white/20">/</span>
          <span>{project.year}</span>
        </div>

        <Link href={`/case/${project.id}`}>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight hover:text-gray-400 transition-colors">
            {project.title}
          </h3>
        </Link>

        <p className="text-lg text-gray-400 leading-relaxed max-w-lg">{project.concept}</p>

        <div className="flex flex-wrap gap-2">
          {project.services.slice(0, 3).map((service) => (
            <span key={service} className="px-4 py-2 text-sm border border-white/10 rounded-full text-gray-400">
              {service}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Projects() {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headerRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' }
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="work" className="py-32 lg:py-48 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="mb-24 lg:mb-32">
          <span className="text-sm text-gray-500 tracking-[0.2em] uppercase mb-4 block">Selected Work</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight max-w-3xl">
            Featured projects that define our craft
          </h2>
        </div>

        <div className="space-y-32 lg:space-y-48">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}