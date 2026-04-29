'use client'

import { useEffect, useState } from 'react'
import { Heart, Sparkles } from 'lucide-react'

interface CountdownProps {
  anniversaryDate: string
  coupleName1: string
  coupleName2: string
}

interface TimeElapsed {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeElapsed(startDate: Date): TimeElapsed {
  const now = new Date()
  const start = new Date(startDate)
  
  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  let days = now.getDate() - start.getDate()
  let hours = now.getHours() - start.getHours()
  let minutes = now.getMinutes() - start.getMinutes()
  let seconds = now.getSeconds() - start.getSeconds()

  if (seconds < 0) {
    seconds += 60
    minutes--
  }
  if (minutes < 0) {
    minutes += 60
    hours--
  }
  if (hours < 0) {
    hours += 24
    days--
  }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    days += prevMonth.getDate()
    months--
  }
  if (months < 0) {
    months += 12
    years--
  }

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    hours: Math.max(0, hours),
    minutes: Math.max(0, minutes),
    seconds: Math.max(0, seconds),
  }
}

export function Countdown({ anniversaryDate, coupleName1, coupleName2 }: CountdownProps) {
  const [timeElapsed, setTimeElapsed] = useState<TimeElapsed>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const updateTime = () => {
      setTimeElapsed(calculateTimeElapsed(new Date(anniversaryDate)))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [anniversaryDate])

  const getArabicPlural = (value: number, unit: string) => {
    if (unit === 'سنة') {
      if (value === 1) return 'سنة'
      if (value === 2) return 'سنتين'
      if (value >= 3 && value <= 10) return 'سنوات'
      return 'سنة'
    }
    if (unit === 'شهر') {
      if (value === 1) return 'شهر'
      if (value === 2) return 'شهرين'
      if (value >= 3 && value <= 10) return 'شهور'
      return 'شهر'
    }
    if (unit === 'يوم') {
      if (value === 1) return 'يوم'
      if (value === 2) return 'يومين'
      if (value >= 3 && value <= 10) return 'أيام'
      return 'يوم'
    }
    if (unit === 'ساعة') {
      if (value === 1) return 'ساعة'
      if (value === 2) return 'ساعتين'
      if (value >= 3 && value <= 10) return 'ساعات'
      return 'ساعة'
    }
    if (unit === 'دقيقة') {
      if (value === 1) return 'دقيقة'
      if (value === 2) return 'دقيقتين'
      if (value >= 3 && value <= 10) return 'دقائق'
      return 'دقيقة'
    }
    if (unit === 'ثانية') {
      if (value === 1) return 'ثانية'
      if (value === 2) return 'ثانيتين'
      if (value >= 3 && value <= 10) return 'ثواني'
      return 'ثانية'
    }
    return unit
  }

  const timeUnits = [
    { label: getArabicPlural(timeElapsed.years, 'سنة'), value: timeElapsed.years },
    { label: getArabicPlural(timeElapsed.months, 'شهر'), value: timeElapsed.months },
    { label: getArabicPlural(timeElapsed.days, 'يوم'), value: timeElapsed.days },
    { label: getArabicPlural(timeElapsed.hours, 'ساعة'), value: timeElapsed.hours },
    { label: getArabicPlural(timeElapsed.minutes, 'دقيقة'), value: timeElapsed.minutes },
    { label: getArabicPlural(timeElapsed.seconds, 'ثانية'), value: timeElapsed.seconds },
  ]

  return (
    <div className="relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent rounded-3xl" />
      
      <div className="glass rounded-3xl p-8 md:p-14 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-6 left-6 text-primary/20">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="absolute bottom-6 right-6 text-primary/20">
          <Heart className="w-8 h-8" />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
            <Heart className="w-5 h-5 text-primary fill-primary/30" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif gradient-text mb-4 text-balance">
            {coupleName1} و {coupleName2}
          </h2>
          
          <p className="text-muted-foreground text-sm">
            مع بعض من {new Date(anniversaryDate).toLocaleDateString('ar-EG', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Time counter label */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 text-primary/80 text-sm bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
            <Sparkles className="w-4 h-4" />
            <span>وقتنا مع بعض</span>
          </span>
        </div>

        {/* Time grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {timeUnits.map((unit, index) => (
            <div 
              key={index} 
              className="group relative bg-muted/30 hover:bg-muted/50 rounded-2xl p-4 md:p-6 text-center transition-all duration-300 card-hover border border-transparent hover:border-primary/10"
            >
              {/* Number */}
              <div className="relative mb-2">
                <span className="text-3xl md:text-5xl font-light text-foreground tabular-nums">
                  {String(unit.value).padStart(2, '0')}
                </span>
              </div>
              
              {/* Label */}
              <p className="text-xs md:text-sm text-muted-foreground">
                {unit.label}
              </p>
              
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
