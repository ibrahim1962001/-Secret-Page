'use client'

import { useState, useEffect } from 'react'
import { Home, Image, Clock, Heart, Sparkles, Mail, Quote } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'home', label: 'الرئيسية', icon: Home },
  { id: 'quotes', label: 'اقتباسات', icon: Quote },
  { id: 'gallery', label: 'الذكريات', icon: Image },
  { id: 'reasons', label: 'بحبك', icon: Heart },
  { id: 'timeline', label: 'الحكاية', icon: Clock },
  { id: 'wishlist', label: 'أمنياتنا', icon: Sparkles },
  { id: 'letters', label: 'رسائل', icon: Mail },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState('home')
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Hide/show based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)

      // Update active section
      const sections = NAV_ITEMS.map((item) => {
        const element = document.getElementById(item.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          return { id: item.id, top: rect.top }
        }
        return { id: item.id, top: Infinity }
      })

      const current = sections.reduce((prev, curr) => {
        if (curr.top <= 200 && curr.top > prev.top - 200) {
          return curr
        }
        return prev
      }, sections[0])

      setActiveSection(current.id)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav 
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
      }`}
    >
      <div className="glass-strong rounded-2xl px-2 py-2 flex items-center gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative flex items-center gap-2 px-3 md:px-4 py-2.5 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {/* Active background */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-rose-dark rounded-xl" />
              )}
              
              <Icon className={`relative w-4 h-4 ${isActive ? 'text-primary-foreground' : ''}`} />
              <span className={`relative hidden md:inline text-sm font-medium ${isActive ? 'text-primary-foreground' : ''}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
