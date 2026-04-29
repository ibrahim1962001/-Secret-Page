'use client'

export interface AppSettings {
  coupleName1: string
  coupleName2: string
  anniversaryDate: string
  theme: 'midnight-blue' | 'pastel-pink' | 'warm-gold'
}

export interface Photo {
  id: string
  url: string
  caption?: string
}

export interface Milestone {
  id: string
  date: string
  title: string
  description: string
  emoji?: string
}

export interface Song {
  id: string
  name: string
  artist: string
  duration: number // in seconds
}

const DEFAULT_SETTINGS: AppSettings = {
  coupleName1: 'Romeo',
  coupleName2: 'Juliet',
  anniversaryDate: '2023-02-14',
  theme: 'midnight-blue',
}

const DEFAULT_MILESTONES: Milestone[] = [
  {
    id: '1',
    date: '2023-02-14',
    title: 'First Meeting',
    description: 'The day our eyes first met and everything changed',
    emoji: '✨',
  },
  {
    id: '2',
    date: '2023-03-21',
    title: 'First Date',
    description: 'Coffee, laughter, and the beginning of forever',
    emoji: '☕',
  },
  {
    id: '3',
    date: '2023-06-15',
    title: 'First Trip Together',
    description: 'Adventures by the sea, memories for a lifetime',
    emoji: '🌊',
  },
]

const DEFAULT_SONGS: Song[] = [
  { id: '1', name: 'Perfect', artist: 'Ed Sheeran', duration: 263 },
  { id: '2', name: 'All of Me', artist: 'John Legend', duration: 270 },
  { id: '3', name: 'Thinking Out Loud', artist: 'Ed Sheeran', duration: 281 },
  { id: '4', name: 'A Thousand Years', artist: 'Christina Perri', duration: 285 },
]

const DEFAULT_PHOTOS: Photo[] = [
  { id: '1', url: '/photos/photo-1.jpg', caption: 'Our first adventure' },
  { id: '2', url: '/photos/photo-2.jpg', caption: 'Coffee dates' },
  { id: '3', url: '/photos/photo-3.jpg', caption: 'Sunset walks' },
  { id: '4', url: '/photos/photo-4.jpg', caption: 'Dancing in the rain' },
  { id: '5', url: '/photos/photo-5.jpg', caption: 'Cozy nights' },
  { id: '6', url: '/photos/photo-6.jpg', caption: 'Beach days' },
]

// Storage helpers
export function getSettings(): AppSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS
  const stored = localStorage.getItem('secret-place-settings')
  return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS
}

export function saveSettings(settings: AppSettings): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('secret-place-settings', JSON.stringify(settings))
}

export function getMilestones(): Milestone[] {
  if (typeof window === 'undefined') return DEFAULT_MILESTONES
  const stored = localStorage.getItem('secret-place-milestones')
  return stored ? JSON.parse(stored) : DEFAULT_MILESTONES
}

export function saveMilestones(milestones: Milestone[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('secret-place-milestones', JSON.stringify(milestones))
}

export function getPhotos(): Photo[] {
  if (typeof window === 'undefined') return DEFAULT_PHOTOS
  const stored = localStorage.getItem('secret-place-photos')
  return stored ? JSON.parse(stored) : DEFAULT_PHOTOS
}

export function savePhotos(photos: Photo[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('secret-place-photos', JSON.stringify(photos))
}

export function getSongs(): Song[] {
  return DEFAULT_SONGS
}

export function isUnlocked(): boolean {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem('secret-place-unlocked') === 'true'
}

export function setUnlocked(value: boolean): void {
  if (typeof window === 'undefined') return
  sessionStorage.setItem('secret-place-unlocked', value ? 'true' : 'false')
}
