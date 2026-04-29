'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react'
import type { Song } from '@/lib/store'

interface MusicPlayerProps {
  songs: Song[]
}

export function MusicPlayer({ songs }: MusicPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const currentSong = songs[currentIndex]

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext()
            return 0
          }
          return prev + (100 / currentSong.duration)
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isPlaying, currentIndex, currentSong.duration])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? songs.length - 1 : currentIndex - 1)
    setProgress(0)
  }

  const handleNext = () => {
    setCurrentIndex(currentIndex === songs.length - 1 ? 0 : currentIndex + 1)
    setProgress(0)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div className="glass-strong border-t border-glass-border px-4 py-3 md:py-4 pulse-glow">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          {/* Album Art / Icon */}
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Music className="w-6 h-6 text-primary" />
          </div>

          {/* Song Info */}
          <div className="flex-1 min-w-0">
            <p className="text-foreground font-medium truncate">{currentSong.name}</p>
            <p className="text-muted-foreground text-sm truncate">{currentSong.artist}</p>
          </div>

          {/* Equalizer */}
          <div className="hidden md:flex items-end gap-1 h-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`w-1 bg-primary rounded-full equalizer-bar ${
                  isPlaying ? '' : 'h-1'
                }`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationPlayState: isPlaying ? 'running' : 'paused',
                }}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevious}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={handlePlayPause}
              className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>

            <button
              onClick={handleNext}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mt-2">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
