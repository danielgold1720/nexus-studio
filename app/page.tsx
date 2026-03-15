'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="loader">
        <span className="text-sm tracking-[0.2em] uppercase text-gray-500">Nexus Studio</span>
        <div className="w-48 h-px bg-gray-800 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-white animate-pulse w-full" />
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <p className="text-sm text-gray-500 tracking-[0.3em] uppercase mb-8">Creative Digital Studio</p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.9] mb-8">
          We Craft Digital<br />Experiences
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
          We are a multidisciplinary studio at the intersection of art, design, and technology.
        </p>
        <button className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors">
          View Work
        </button>
      </div>
    </main>
  )
}