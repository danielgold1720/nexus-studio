'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUp } from 'lucide-react'

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 px-6 lg:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <Link href="/" className="text-lg font-medium tracking-tight">Nexus</Link>
            <span className="text-sm text-gray-500">© {currentYear} Nexus Studio. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-gray-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Careers</Link>
          </div>
          <motion.button onClick={scrollToTop} className="group flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors" whileHover={{ y: -2 }}>
            Back to top
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors">
              <ArrowUp className="w-4 h-4" />
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  )
}