'use client'

import { useEffect, useState } from 'react'

interface Heart {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  opacity: number
}

export function FloatingHearts({ count = 15, subtle = false }: { count?: number; subtle?: boolean }) {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const newHearts: Heart[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: subtle ? Math.random() * 12 + 8 : Math.random() * 20 + 10,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 10,
      opacity: subtle ? Math.random() * 0.2 + 0.1 : Math.random() * 0.4 + 0.2,
    }))
    setHearts(newHearts)
  }, [count, subtle])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute floating-heart text-primary"
          style={{
            left: `${heart.left}%`,
            bottom: '-20px',
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity,
          }}
        >
          ♥
        </div>
      ))}
    </div>
  )
}
