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
import {
  getSettings,
  saveSettings,
  getMilestones,
  saveMilestones,
  getPhotos,
  savePhotos,
  getSongs,
  isUnlocked,
  type AppSettings,
  type Photo,
  type Milestone,
} from '@/lib/store'

export default function SecretPlace() {
  const [unlocked, setUnlocked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [settings, setSettings] = useState<AppSettings | null>(null)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const songs = getSongs()

  useEffect(() => {
    // Load data from localStorage
    setSettings(getSettings())
    setPhotos(getPhotos())
    setMilestones(getMilestones())
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

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!unlocked) {
    return <LockScreen onUnlock={handleUnlock} />
  }

  if (!settings) return null

  return (
    <main className="min-h-screen bg-background pb-24">
      <FloatingHearts count={12} subtle />
      <Navigation />
      
      <Countdown
        anniversaryDate={settings.anniversaryDate}
        coupleName1={settings.coupleName1}
        coupleName2={settings.coupleName2}
      />
      
      <Gallery photos={photos} onAddPhoto={handleAddPhoto} />
      
      <Timeline milestones={milestones} onAddMilestone={handleAddMilestone} />
      
      <MusicPlayer songs={songs} />
      
      <SettingsPanel settings={settings} onSettingsChange={handleSettingsChange} />
    </main>
  )
}
