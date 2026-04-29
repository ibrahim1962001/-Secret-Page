'use client'

import { useEffect, useState } from 'react'

interface Heart {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  opacity: number
  symbol: string
}

const HEART_SYMBOLS = ['♥', '♡', '❤', '💗', '✦', '✧']

export function FloatingHearts({ 
  count = 12, 
  subtle = false,
  colorful = false 
}: { 
  count?: number
  subtle?: boolean
  colorful?: boolean 
}) {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const newHearts: Heart[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: subtle ? Math.random() * 10 + 6 : Math.random() * 18 + 10,
      duration: Math.random() * 12 + 15,
      delay: Math.random() * 10,
      opacity: subtle ? Math.random() * 0.15 + 0.05 : Math.random() * 0.3 + 0.1,
      symbol: colorful 
        ? HEART_SYMBOLS[Math.floor(Math.random() * HEART_SYMBOLS.length)] 
        : '♥',
    }))
    setHearts(newHearts)
  }, [count, subtle, colorful])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart absolute bottom-0 text-primary"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity,
          }}
        >
          {heart.symbol}
        </div>
      ))}
    </div>
  )
}
