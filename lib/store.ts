'use client'

export interface AppSettings {
  coupleName1: string
  coupleName2: string
  anniversaryDate: string
  theme: 'midnight-blue' | 'pastel-pink' | 'warm-gold'
  password?: string
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
  duration: number
  url: string
}

export interface Wish {
  id: string
  text: string
  completed: boolean
  emoji: string
}

export interface Reason {
  id: string
  text: string
}

export interface LoveLetter {
  id: string
  title: string
  content: string
  date: string
  from: string
}

export interface VideoMemory {
  id: string
  url: string
  title: string
  date: string
  thumbnail?: string
}

export interface VoiceMessage {
  id: string
  audioUrl: string
  duration: number
  date: string
  from: string
  title?: string
}

const DEFAULT_SETTINGS: AppSettings = {
  coupleName1: 'حبيبي',
  coupleName2: 'حبيبتي',
  anniversaryDate: '2023-02-14',
  theme: 'midnight-blue',
  password: 'love',
}

const DEFAULT_MILESTONES: Milestone[] = [
  {
    id: '1',
    date: '2023-02-14',
    title: 'أول لقاء',
    description: 'اليوم اللي عيونا اتقابلت فيه وكل حاجة اتغيرت',
    emoji: '✨',
  },
  {
    id: '2',
    date: '2023-03-21',
    title: 'أول خروجة',
    description: 'قهوة وضحك وبداية حكاية حلوة',
    emoji: '☕',
  },
  {
    id: '3',
    date: '2023-06-15',
    title: 'أول سفرية',
    description: 'مغامرات على البحر وذكريات للأبد',
    emoji: '🌊',
  },
]

const DEFAULT_SONGS: Song[] = [
  { 
    id: '1', 
    name: 'أنت عمري', 
    artist: 'أم كلثوم', 
    duration: 263,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' 
  },
  { 
    id: '2', 
    name: 'حبيبي', 
    artist: 'عمرو دياب', 
    duration: 270,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  { 
    id: '3', 
    name: 'أحلى ما شفت', 
    artist: 'محمد حماقي', 
    duration: 281,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
]

const DEFAULT_PHOTOS: Photo[] = [
  { id: '1', url: '/photos/photo-1.jpg', caption: 'أول مغامرة' },
  { id: '2', url: '/photos/photo-2.jpg', caption: 'خروجات القهوة' },
  { id: '3', url: '/photos/photo-3.jpg', caption: 'مشي وقت الغروب' },
  { id: '4', url: '/photos/photo-4.jpg', caption: 'رقص تحت المطر' },
  { id: '5', url: '/photos/photo-5.jpg', caption: 'ليالي دافية' },
  { id: '6', url: '/photos/photo-6.jpg', caption: 'أيام البحر' },
]

const DEFAULT_WISHES: Wish[] = [
  { id: '1', text: 'نسافر لباريس', completed: false, emoji: '✈️' },
  { id: '2', text: 'نتفرج على غروب الشمس على البحر', completed: true, emoji: '🌅' },
  { id: '3', text: 'نتعلم رقص السالسا', completed: false, emoji: '💃' },
]

const DEFAULT_REASONS: Reason[] = [
  { id: '1', text: 'بحبك عشان ضحكتك بتنور الدنيا' },
  { id: '2', text: 'بحبك عشان بتفهمني من غير ما أتكلم' },
  { id: '3', text: 'بحبك عشان معاك حاسس إني في بيتي' },
  { id: '4', text: 'بحبك عشان بتسمعني حتى لو مش موافق' },
  { id: '5', text: 'بحبك عشان قلبك طيب زي الملايكة' },
]

const DEFAULT_LETTERS: LoveLetter[] = [
  {
    id: '1',
    title: 'أول رسالة حب',
    content: 'مش عارف أقولك قد إيه أنت مهم في حياتي. كل يوم معاك هو هدية. بحبك أوي وعمري ما هقدر أوصف الإحساس ده.',
    date: '2023-02-14',
    from: 'حبيبك',
  },
]

const DEFAULT_VIDEOS: VideoMemory[] = [
  {
    id: '1',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: 'أول فيديو لينا',
    date: '2023-03-15',
  },
]

const DEFAULT_VOICE_MESSAGES: VoiceMessage[] = []

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
  if (typeof window === 'undefined') return DEFAULT_SONGS
  const stored = localStorage.getItem('secret-place-songs')
  return stored ? JSON.parse(stored) : DEFAULT_SONGS
}

export function saveSongs(songs: Song[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('secret-place-songs', JSON.stringify(songs))
}

export function isUnlocked(): boolean {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem('secret-place-unlocked') === 'true'
}

export function setUnlocked(value: boolean): void {
  if (typeof window === 'undefined') return
  sessionStorage.setItem('secret-place-unlocked', value ? 'true' : 'false')
}

// Wishes
export function getWishes(): Wish[] {
  if (typeof window === 'undefined') return DEFAULT_WISHES
  const stored = localStorage.getItem('secret-place-wishes')
  return stored ? JSON.parse(stored) : DEFAULT_WISHES
}

export function saveWishes(wishes: Wish[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('secret-place-wishes', JSON.stringify(wishes))
}

// Reasons
export function getReasons(): Reason[] {
  if (typeof window === 'undefined') return DEFAULT_REASONS
  const stored = localStorage.getItem('secret-place-reasons')
  return stored ? JSON.parse(stored) : DEFAULT_REASONS
}

export function saveReasons(reasons: Reason[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('secret-place-reasons', JSON.stringify(reasons))
}

// Love Letters
export function getLetters(): LoveLetter[] {
  if (typeof window === 'undefined') return DEFAULT_LETTERS
  const stored = localStorage.getItem('secret-place-letters')
  return stored ? JSON.parse(stored) : DEFAULT_LETTERS
}

export function saveLetters(letters: LoveLetter[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('secret-place-letters', JSON.stringify(letters))
}

// Video Memories
export function getVideos(): VideoMemory[] {
  if (typeof window === 'undefined') return DEFAULT_VIDEOS
  const stored = localStorage.getItem('secret-place-videos')
  return stored ? JSON.parse(stored) : DEFAULT_VIDEOS
}

export function saveVideos(videos: VideoMemory[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('secret-place-videos', JSON.stringify(videos))
}

// Voice Messages
export function getVoiceMessages(): VoiceMessage[] {
  if (typeof window === 'undefined') return DEFAULT_VOICE_MESSAGES
  const stored = localStorage.getItem('secret-place-voice-messages')
  return stored ? JSON.parse(stored) : DEFAULT_VOICE_MESSAGES
}

export function saveVoiceMessages(messages: VoiceMessage[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('secret-place-voice-messages', JSON.stringify(messages))
}
