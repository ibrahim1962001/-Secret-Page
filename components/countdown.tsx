'use client'

import { useEffect, useState } from 'react'

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

  const timeUnits = [
    { label: 'Years', value: timeElapsed.years },
    { label: 'Months', value: timeElapsed.months },
    { label: 'Days', value: timeElapsed.days },
    { label: 'Hours', value: timeElapsed.hours },
    { label: 'Minutes', value: timeElapsed.minutes },
    { label: 'Seconds', value: timeElapsed.seconds },
  ]

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="text-center mb-12 fade-in">
        <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-4 text-balance">
          {coupleName1} & {coupleName2}
        </h1>
        <p className="text-muted-foreground text-lg">
          Together since {new Date(anniversaryDate).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      <div className="glass rounded-3xl p-6 md:p-10 w-full max-w-4xl fade-in" style={{ animationDelay: '0.2s' }}>
        <p className="text-center text-primary mb-6 text-lg font-medium">Time Together</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {timeUnits.map((unit, index) => (
            <div 
              key={unit.label} 
              className="text-center fade-in"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="glass rounded-2xl p-4 md:p-6 mb-2">
                <span className="text-3xl md:text-5xl font-serif text-foreground">
                  {String(unit.value).padStart(2, '0')}
                </span>
              </div>
              <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
