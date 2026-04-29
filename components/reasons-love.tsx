'use client'

import { useState } from 'react'
import { Heart, Plus, ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react'

export interface Reason {
  id: string
  text: string
}

interface ReasonsLoveProps {
  reasons: Reason[]
  onAddReason: (reason: Reason) => void
}

export function ReasonsLove({ reasons, onAddReason }: ReasonsLoveProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [newReason, setNewReason] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)

  const goToNext = () => {
    if (reasons.length === 0) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % reasons.length)
      setIsAnimating(false)
    }, 200)
  }

  const goToPrev = () => {
    if (reasons.length === 0) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + reasons.length) % reasons.length)
      setIsAnimating(false)
    }, 200)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newReason.trim()) return

    onAddReason({
      id: Date.now().toString(),
      text: newReason.trim(),
    })

    setNewReason('')
    setShowForm(false)
  }

  return (
    <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
      
      {/* Header */}
      <div className="text-center mb-10 relative">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
          <Heart className="w-7 h-7 text-primary fill-primary/30" />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif gradient-text mb-3">ليه بحبك</h2>
        <p className="text-muted-foreground text-sm">كل سبب بيخليني أحبك أكتر</p>
      </div>

      {reasons.length > 0 ? (
        <div className="relative">
          {/* Counter */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm">
              <Sparkles className="w-4 h-4" />
              <span>السبب رقم {currentIndex + 1} من {reasons.length}</span>
            </span>
          </div>

          {/* Reason display */}
          <div className={`min-h-[140px] flex items-center justify-center transition-all duration-200 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <p className="text-xl md:text-2xl text-center text-foreground leading-relaxed px-4 md:px-12 font-serif text-balance">
              &ldquo;{reasons[currentIndex]?.text}&rdquo;
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-8 mt-10">
            <button
              onClick={goToPrev}
              className="w-12 h-12 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots indicator */}
            <div className="flex gap-2">
              {reasons.slice(0, Math.min(5, reasons.length)).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex % Math.min(5, reasons.length) 
                      ? 'bg-primary w-6' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
              {reasons.length > 5 && (
                <span className="text-muted-foreground/50 text-xs self-center">+{reasons.length - 5}</span>
              )}
            </div>

            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-muted-foreground/40" />
          </div>
          <p className="text-muted-foreground mb-2">مفيش أسباب لسه</p>
          <p className="text-muted-foreground/60 text-sm">أضف أول سبب بيخليك تحب!</p>
        </div>
      )}

      {/* Add Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full mt-10 bg-muted/20 hover:bg-muted/40 border border-dashed border-border hover:border-primary/30 rounded-2xl p-5 flex items-center justify-center gap-3 text-muted-foreground hover:text-primary transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">أضف سبب جديد</span>
        </button>
      )}

      {/* Add Form */}
      {showForm && (
        <div className="mt-10 bg-muted/20 rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium gradient-text">سبب جديد</h3>
            <button
              onClick={() => setShowForm(false)}
              className="w-10 h-10 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs text-muted-foreground mb-2 uppercase tracking-wide">السبب</label>
              <textarea
                value={newReason}
                onChange={(e) => setNewReason(e.target.value)}
                placeholder="بحبك عشان..."
                rows={3}
                className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary/50 resize-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-rose-dark text-primary-foreground py-4 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5" />
              أضف السبب
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
