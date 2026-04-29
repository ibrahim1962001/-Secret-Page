'use client'

import { useState, useCallback } from 'react'
import { FloatingHearts } from './floating-hearts'
import { setUnlocked } from '@/lib/store'
import { Heart, Sparkles } from 'lucide-react'

interface LockScreenProps {
  onUnlock: () => void
  correctPassword?: string
}

export function LockScreen({ onUnlock, correctPassword = 'love' }: LockScreenProps) {
  const [password, setPassword] = useState('')
  const [isShaking, setIsShaking] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isUnlocking, setIsUnlocking] = useState(false)

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (isShaking || isUnlocking) return

    if (password.toLowerCase() === correctPassword.toLowerCase()) {
      setIsUnlocking(true)
      setUnlocked(true)
      setTimeout(() => {
        onUnlock()
      }, 800)
    } else {
      setIsShaking(true)
      setErrorMessage('مش ليك يا حبيبي')
      setTimeout(() => {
        setIsShaking(false)
        setPassword('')
      }, 600)
    }
  }, [password, correctPassword, isShaking, isUnlocking, onUnlock])

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center overflow-hidden">
      <FloatingHearts count={15} colorful />
      
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      </div>
      
      {/* Content */}
      <div className={`relative z-10 w-full max-w-md mx-6 transition-all duration-700 ${isUnlocking ? 'scale-95 opacity-0 blur-sm' : ''}`}>
        <div className="glass-strong rounded-3xl p-10 md:p-12">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center pulse-glow">
                <Heart className="w-10 h-10 text-primary fill-primary/30" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-accent" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-serif gradient-text mb-3 text-balance">
              مكاننا السري
            </h1>
            <p className="text-muted-foreground text-sm">
              مكان خاص لقلبين بيحبوا بعض
            </p>
          </div>

          {/* Password Input */}
          <form onSubmit={handleSubmit} className={`${isShaking ? 'shake' : ''}`}>
            <div className="mb-6">
              <label className="block text-muted-foreground text-xs mb-3 text-center tracking-wide uppercase">
                كلمة السر
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setErrorMessage('')
                }}
                placeholder="..."
                className="w-full bg-muted/50 border border-border rounded-2xl px-6 py-4 text-foreground text-center placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 focus:bg-muted/70 transition-all text-lg tracking-widest"
                dir="rtl"
                autoFocus
              />
            </div>

            {/* Error Message */}
            <div className="h-6 mb-6 text-center">
              {errorMessage && (
                <p className="text-destructive text-sm">{errorMessage}</p>
              )}
            </div>

            {/* Unlock Button */}
            <button
              type="submit"
              disabled={isUnlocking}
              className="w-full bg-gradient-to-r from-primary to-rose-dark hover:from-primary/90 hover:to-rose-dark/90 text-primary-foreground font-medium py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 card-hover"
            >
              <Heart className="w-5 h-5" />
              <span>ادخل</span>
            </button>
          </form>

          {/* Hint */}
          <p className="text-center text-muted-foreground/40 text-xs mt-8">
            تلميح: الكلمة اللي بتوصف احساسنا
          </p>
        </div>
      </div>
    </div>
  )
}
