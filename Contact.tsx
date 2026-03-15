'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { contact } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formState, setFormState] = useState({ name: '', email: '', company: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-content', { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      })
    })
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({ name: '', email: '', company: '', message: '' })
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <section ref={sectionRef} id="contact" className="py-32 lg:py-48 px-6 lg:px-12 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="contact-content">
          <div className="text-center mb-24">
            <motion.span className="text-sm text-gray-500 tracking-[0.2em] uppercase mb-6 block" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Get in Touch</motion.span>
            <motion.h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight mb-8" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              Let's create<br /><span className="text-gray-600">something extraordinary</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="space-y-12">
              <div>
                <h3 className="text-sm text-gray-500 tracking-[0.2em] uppercase mb-6">Start a Project</h3>
                <a href={`mailto:${contact.email}`} className="group flex items-center gap-4 text-2xl md:text-3xl font-light hover:text-gray-400 transition-colors">
                  <Mail className="w-6 h-6" /> {contact.email} <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 tracking-[0.2em] uppercase mb-6">Call Us</h3>
                <a href={`tel:${contact.phone}`} className="group flex items-center gap-4 text-2xl md:text-3xl font-light hover:text-gray-400 transition-colors">
                  <Phone className="w-6 h-6" /> {contact.phone} <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 tracking-[0.2em] uppercase mb-6">Offices</h3>
                <div className="space-y-6">
                  {contact.offices.map((office) => (
                    <div key={office.city} className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 mt-1 text-gray-500" />
                      <div>
                        <div className="font-medium">{office.city}</div>
                        <div className="text-gray-400">{office.address}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-black rounded-lg p-8 lg:p-12">
              <h3 className="text-2xl font-light mb-8">Send us a message</h3>
              {isSubmitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h4 className="text-xl font-medium mb-2">Message Sent!</h4>
                  <p className="text-gray-400">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {['name', 'email', 'company'].map((field) => (
                    <div key={field}>
                      <label htmlFor={field} className="block text-sm text-gray-500 mb-2 capitalize">{field}</label>
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        id={field}
                        value={formState[field as keyof typeof formState]}
                        onChange={(e) => setFormState({ ...formState, [field]: e.target.value })}
                        required={field !== 'company'}
                        className="w-full bg-transparent border-b border-white/20 py-3 focus:border-white focus:outline-none transition-colors"
                        placeholder={field === 'company' ? 'Your company (optional)' : `Your ${field}`}
                      />
                    </div>
                  ))}
                  <div>
                    <label htmlFor="message" className="block text-sm text-gray-500 mb-2">Message</label>
                    <textarea id="message" value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} required rows={4} className="w-full bg-transparent border-b border-white/20 py-3 focus:border-white focus:outline-none transition-colors resize-none" placeholder="Tell us about your project..." />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors disabled:opacity-50">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}