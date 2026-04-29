'use client'

import { useState, useCallback } from 'react'
import { FloatingHearts } from './floating-hearts'
import { setUnlocked } from '@/lib/store'

interface LockScreenProps {
  onUnlock: () => void
}

const CORRECT_PIN = '1234'

export function LockScreen({ onUnlock }: LockScreenProps) {
  const [pin, setPin] = useState<string[]>([])
  const [isShaking, setIsShaking] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isUnlocking, setIsUnlocking] = useState(false)

  const handlePinClick = useCallback((digit: string) => {
    if (pin.length >= 4 || isShaking || isUnlocking) return

    const newPin = [...pin, digit]
    setPin(newPin)
    setErrorMessage('')

    if (newPin.length === 4) {
      const enteredPin = newPin.join('')
      if (enteredPin === CORRECT_PIN) {
        setIsUnlocking(true)
        setUnlocked(true)
        setTimeout(() => {
          onUnlock()
        }, 500)
      } else {
        setIsShaking(true)
        setErrorMessage('Not for you 🤍')
        setTimeout(() => {
          setIsShaking(false)
          setPin([])
        }, 500)
      }
    }
  }, [pin, isShaking, isUnlocking, onUnlock])

  const handleDelete = useCallback(() => {
    if (pin.length > 0 && !isShaking && !isUnlocking) {
      setPin(pin.slice(0, -1))
      setErrorMessage('')
    }
  }, [pin, isShaking, isUnlocking])

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <FloatingHearts count={20} />
      
      <div 
        className={`glass rounded-3xl p-8 md:p-12 w-[90%] max-w-sm flex flex-col items-center gap-8 fade-in ${isShaking ? 'shake' : ''} ${isUnlocking ? 'opacity-0 scale-95 transition-all duration-500' : ''}`}
      >
        <div className="text-center">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-2 text-balance">
            Our Secret Place 🤍
          </h1>
          <p className="text-muted-foreground text-sm">Enter the code to continue</p>
        </div>

        {/* PIN Circles */}
        <div className="flex gap-4">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full border-2 border-primary transition-all duration-300 ${
                pin.length > index 
                  ? 'bg-primary scale-110' 
                  : 'bg-transparent'
              }`}
            />
          ))}
        </div>

        {/* Error Message */}
        <div className="h-6">
          {errorMessage && (
            <p className="text-primary text-sm fade-in">{errorMessage}</p>
          )}
        </div>

        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'].map((digit, index) => (
            <button
              key={index}
              onClick={() => {
                if (digit === 'del') {
                  handleDelete()
                } else if (digit !== '') {
                  handlePinClick(digit)
                }
              }}
              disabled={digit === '' || isShaking || isUnlocking}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-medium transition-all duration-200 ${
                digit === '' 
                  ? 'invisible' 
                  : digit === 'del'
                  ? 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  : 'glass hover:bg-primary/20 hover:border-primary text-foreground active:scale-95'
              }`}
            >
              {digit === 'del' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                </svg>
              ) : (
                digit
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
