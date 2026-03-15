'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#studio', label: 'Studio' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }, [isOpen])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-6'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          <Link href="/" className="relative z-[110]">
            <span className="text-lg font-medium tracking-tight">Nexus</span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-[110] w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      <div className={`nav-overlay ${isOpen ? 'open' : ''}`}>
        <div className="h-full flex flex-col justify-center px-6 lg:px-24">
          <nav className="space-y-2">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -40 }}
                animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={link.href} onClick={() => setIsOpen(false)} className="flex items-center gap-6 py-4 group">
                  <span className="text-sm text-gray-500 font-mono">0{index + 1}</span>
                  <span className="text-5xl lg:text-7xl font-light tracking-tight group-hover:text-gray-500 transition-colors">
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            className="absolute bottom-12 left-6 lg:left-24 right-6 lg:right-24 flex justify-between items-end"
            initial={{ opacity: 0, y: 20 }}
            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="space-y-2 text-sm text-gray-500">
              <p>hello@nexusstudio.co</p>
              <p>+1 (555) 234-5678</p>
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
              <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
              <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
              <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}