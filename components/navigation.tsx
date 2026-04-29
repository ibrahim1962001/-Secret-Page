'use client'

import { useState, useEffect } from 'react'
import { Home, Image, Clock } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'timeline', label: 'Timeline', icon: Clock },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
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

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 glass rounded-full px-2 py-2">
      <div className="flex items-center gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                activeSection === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden md:inline text-sm font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
