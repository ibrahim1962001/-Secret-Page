'use client'

import { useState, useEffect } from 'react'
import { LockScreen } from '@/components/lock-screen'
import { Navigation } from '@/components/navigation'
import { Countdown } from '@/components/countdown'
import { Gallery } from '@/components/gallery'
import { Timeline } from '@/components/timeline'
import { MusicPlayer } from '@/components/music-player'
import { SettingsPanel } from '@/components/settings-panel'
import { FloatingHearts } from '@/components/floating-hearts'
import { LoveQuotes } from '@/components/love-quotes'
import { Wishlist } from '@/components/wishlist'
import { ReasonsLove } from '@/components/reasons-love'
import { LoveLetters } from '@/components/love-letters'
import {
  getSettings,
  saveSettings,
  getMilestones,
  saveMilestones,
  getPhotos,
  savePhotos,
  getSongs,
  getWishes,
  saveWishes,
  getReasons,
  saveReasons,
  getLetters,
  saveLetters,
  isUnlocked,
  type AppSettings,
  type Photo,
  type Milestone,
  type Wish,
  type Reason,
  type LoveLetter,
} from '@/lib/store'

export default function SecretPlace() {
  const [unlocked, setUnlocked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [settings, setSettings] = useState<AppSettings | null>(null)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [wishes, setWishes] = useState<Wish[]>([])
  const [reasons, setReasons] = useState<Reason[]>([])
  const [letters, setLetters] = useState<LoveLetter[]>([])
  const songs = getSongs()

  useEffect(() => {
    // Load data from localStorage
    setSettings(getSettings())
    setPhotos(getPhotos())
    setMilestones(getMilestones())
    setWishes(getWishes())
    setReasons(getReasons())
    setLetters(getLetters())
    setUnlocked(isUnlocked())
    setIsLoading(false)

    // Apply saved theme
    const savedSettings = getSettings()
    if (savedSettings.theme !== 'midnight-blue') {
      document.documentElement.classList.add(`theme-${savedSettings.theme}`)
    }
  }, [])

  const handleUnlock = () => {
    setUnlocked(true)
  }

  const handleSettingsChange = (newSettings: AppSettings) => {
    setSettings(newSettings)
    saveSettings(newSettings)
    
    // Apply theme
    document.documentElement.className = document.documentElement.className
      .replace(/theme-\S+/g, '')
    if (newSettings.theme !== 'midnight-blue') {
      document.documentElement.classList.add(`theme-${newSettings.theme}`)
    }
  }

  const handleAddPhoto = (photo: Photo) => {
    const newPhotos = [...photos, photo]
    setPhotos(newPhotos)
    savePhotos(newPhotos)
  }

  const handleAddMilestone = (milestone: Milestone) => {
    const newMilestones = [...milestones, milestone]
    setMilestones(newMilestones)
    saveMilestones(newMilestones)
  }

  // Wishes handlers
  const handleAddWish = (wish: Wish) => {
    const newWishes = [...wishes, wish]
    setWishes(newWishes)
    saveWishes(newWishes)
  }

  const handleToggleWish = (id: string) => {
    const newWishes = wishes.map((w) =>
      w.id === id ? { ...w, completed: !w.completed } : w
    )
    setWishes(newWishes)
    saveWishes(newWishes)
  }

  const handleDeleteWish = (id: string) => {
    const newWishes = wishes.filter((w) => w.id !== id)
    setWishes(newWishes)
    saveWishes(newWishes)
  }

  // Reasons handler
  const handleAddReason = (reason: Reason) => {
    const newReasons = [...reasons, reason]
    setReasons(newReasons)
    saveReasons(newReasons)
  }

  // Letters handlers
  const handleAddLetter = (letter: LoveLetter) => {
    const newLetters = [...letters, letter]
    setLetters(newLetters)
    saveLetters(newLetters)
  }

  const handleDeleteLetter = (id: string) => {
    const newLetters = letters.filter((l) => l.id !== id)
    setLetters(newLetters)
    saveLetters(newLetters)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-4xl text-primary animate-pulse">❤</div>
      </div>
    )
  }

  if (!unlocked) {
    return <LockScreen onUnlock={handleUnlock} correctPassword={settings?.password} />
  }

  if (!settings) return null

  return (
    <main className="min-h-screen bg-background relative pb-40">
      <FloatingHearts count={12} subtle />
      <SettingsPanel settings={settings} onSettingsChange={handleSettingsChange} />
      <Navigation />

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-16 space-y-16">
        <section id="home">
          <Countdown
            anniversaryDate={settings.anniversaryDate}
            coupleName1={settings.coupleName1}
            coupleName2={settings.coupleName2}
          />
        </section>

        <section id="quotes">
          <LoveQuotes />
        </section>

        <section id="gallery">
          <Gallery photos={photos} onAddPhoto={handleAddPhoto} />
        </section>

        <section id="reasons">
          <ReasonsLove reasons={reasons} onAddReason={handleAddReason} />
        </section>

        <section id="timeline">
          <Timeline milestones={milestones} onAddMilestone={handleAddMilestone} />
        </section>

        <section id="wishlist">
          <Wishlist
            wishes={wishes}
            onAddWish={handleAddWish}
            onToggleWish={handleToggleWish}
            onDeleteWish={handleDeleteWish}
          />
        </section>

        <section id="letters">
          <LoveLetters
            letters={letters}
            onAddLetter={handleAddLetter}
            onDeleteLetter={handleDeleteLetter}
          />
        </section>
      </div>

      <MusicPlayer songs={songs} />
    </main>
  )
}
