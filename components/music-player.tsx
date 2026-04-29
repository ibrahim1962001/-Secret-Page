'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, SkipBack, SkipForward, Music2 } from 'lucide-react'
import type { Song } from '@/lib/store'

interface MusicPlayerProps {
  songs: Song[]
}

export function MusicPlayer({ songs }: MusicPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isMinimized, setIsMinimized] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentSong = songs[currentIndex]

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error("Playback failed:", err)
          setIsPlaying(false)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentIndex])

  const onTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime
      const duration = audioRef.current.duration
      if (duration) {
        setProgress((current / duration) * 100)
      }
    }
  }

  const onEnded = () => {
    handleNext()
  }

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

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-105 transition-transform"
      >
        <Music2 className="w-6 h-6 text-primary-foreground" />
        {isPlaying && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-background" />
        )}
      </button>
    )
  }

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-sm">
      <audio
        ref={audioRef}
        src={currentSong?.url}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      />
      
      <div className="glass-strong rounded-2xl p-4">
        <div className="flex items-center gap-4">
          {/* Album Art / Icon */}
          <button 
            onClick={() => setIsMinimized(true)}
            className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
          >
            <Music2 className="w-6 h-6 text-primary" />
          </button>

          {/* Song Info */}
          <div className="flex-1 min-w-0">
            <p className="text-foreground font-medium truncate text-sm">{currentSong?.name}</p>
            <p className="text-muted-foreground text-xs truncate">{currentSong?.artist}</p>
            
            {/* Progress Bar */}
            <div className="mt-2 h-1 bg-muted/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Equalizer */}
          <div className={`flex items-end gap-0.5 h-4 ${isPlaying ? '' : 'opacity-30'}`}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-0.5 bg-primary rounded-full equalizer-bar"
                style={{ 
                  animationDelay: `${i * 0.1}s`, 
                  animationPlayState: isPlaying ? 'running' : 'paused' 
                }}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1">
            <button 
              onClick={handlePrevious} 
              className="w-9 h-9 rounded-full hover:bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button 
              onClick={handlePlayPause} 
              className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 translate-x-0.5" />
              )}
            </button>

            <button 
              onClick={handleNext} 
              className="w-9 h-9 rounded-full hover:bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
