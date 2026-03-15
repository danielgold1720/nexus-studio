'use client'

import { useState, useEffect } from 'react'
import { Loader } from '@/components/ui/Loader'
import { Navigation } from '@/components/ui/Navigation'
import { SoundToggle } from '@/components/ui/SoundToggle'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Studio } from '@/components/sections/Studio'
import { Services } from '@/components/sections/Services'
import { Showreel } from '@/components/sections/Showreel'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isLoading])

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <Navigation />
      <SoundToggle />
      <main>
        <Hero />
        <Projects />
        <Studio />
        <Services />
        <Showreel />
        <Contact />
        <Footer />
      </main>
    </>
  )
}