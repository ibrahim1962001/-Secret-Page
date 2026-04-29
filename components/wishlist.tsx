'use client'

import { useState } from 'react'
import { Sparkles, Plus, Check, Trash2, X, Star } from 'lucide-react'

export interface Wish {
  id: string
  text: string
  completed: boolean
  emoji: string
}

interface WishlistProps {
  wishes: Wish[]
  onAddWish: (wish: Wish) => void
  onToggleWish: (id: string) => void
  onDeleteWish: (id: string) => void
}

const EMOJIS = ['✈️', '🏠', '🎬', '🍽️', '🎭', '🏖️', '🎪', '🎁', '💍', '👶', '🐕', '🌸']

export function Wishlist({ wishes, onAddWish, onToggleWish, onDeleteWish }: WishlistProps) {
  const [showForm, setShowForm] = useState(false)
  const [newWish, setNewWish] = useState('')
  const [selectedEmoji, setSelectedEmoji] = useState('✈️')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newWish.trim()) return

    onAddWish({
      id: Date.now().toString(),
      text: newWish.trim(),
      completed: false,
      emoji: selectedEmoji,
    })

    setNewWish('')
    setSelectedEmoji('✈️')
    setShowForm(false)
  }

  const completedCount = wishes.filter((w) => w.completed).length

  return (
    <div className="glass rounded-3xl p-8 md:p-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
          <Sparkles className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif gradient-text mb-3">أمنياتنا مع بعض</h2>
        <p className="text-muted-foreground text-sm">أحلام نفسنا نحققها سوا</p>
      </div>

      {/* Progress */}
      {wishes.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-muted-foreground">حققنا</span>
            <span className="text-primary font-medium">
              {completedCount} من {wishes.length}
            </span>
          </div>
          <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
              style={{ width: wishes.length > 0 ? `${(completedCount / wishes.length) * 100}%` : '0%' }}
            />
          </div>
        </div>
      )}

      {/* Wishes List */}
      <div className="space-y-3 mb-8">
        {wishes.map((wish, index) => (
          <div 
            key={wish.id} 
            className={`group bg-muted/20 hover:bg-muted/40 rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 card-hover fade-in ${
              wish.completed ? 'opacity-60' : ''
            }`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <button
              onClick={() => onToggleWish(wish.id)}
              className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                wish.completed
                  ? 'bg-primary border-primary text-primary-foreground'
                  : 'border-muted-foreground/50 hover:border-primary'
              }`}
            >
              {wish.completed && <Check className="w-4 h-4" />}
            </button>
            
            <span className="text-2xl shrink-0">{wish.emoji}</span>
            
            <span className={`flex-1 text-foreground ${wish.completed ? 'line-through' : ''}`}>
              {wish.text}
            </span>
            
            <button
              onClick={() => onDeleteWish(wish.id)}
              className="w-9 h-9 rounded-full bg-transparent hover:bg-destructive/10 flex items-center justify-center text-muted-foreground/50 hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {wishes.length === 0 && !showForm && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-muted-foreground/40" />
          </div>
          <p className="text-muted-foreground mb-2">مفيش أمنيات لسه</p>
          <p className="text-muted-foreground/60 text-sm">أضف أول أمنية تحبوا تحققوها!</p>
        </div>
      )}

      {/* Add Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-muted/20 hover:bg-muted/40 border border-dashed border-border hover:border-primary/30 rounded-2xl p-5 flex items-center justify-center gap-3 text-muted-foreground hover:text-primary transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">أضف أمنية جديدة</span>
        </button>
      )}

      {/* Add Form */}
      {showForm && (
        <div className="bg-muted/20 rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium gradient-text">أمنية جديدة</h3>
            <button
              onClick={() => setShowForm(false)}
              className="w-10 h-10 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs text-muted-foreground mb-2 uppercase tracking-wide">الأمنية</label>
              <input
                type="text"
                value={newWish}
                onChange={(e) => setNewWish(e.target.value)}
                placeholder="إيه اللي نفسكم تعملوه مع بعض؟"
                className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-3 uppercase tracking-wide">اختار إيموجي</label>
              <div className="flex flex-wrap gap-2">
                {EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setSelectedEmoji(emoji)}
                    className={`w-11 h-11 rounded-xl text-xl flex items-center justify-center transition-all ${
                      selectedEmoji === emoji
                        ? 'bg-primary/20 ring-2 ring-primary scale-110'
                        : 'bg-muted/50 hover:bg-muted'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-rose-dark text-primary-foreground py-4 rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              أضف الأمنية
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
