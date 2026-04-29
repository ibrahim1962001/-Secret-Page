'use client'

import { useState } from 'react'
import { Plus, X, Clock, Sparkles } from 'lucide-react'
import type { Milestone } from '@/lib/store'

interface TimelineProps {
  milestones: Milestone[]
  onAddMilestone: (milestone: Milestone) => void
}

export function Timeline({ milestones, onAddMilestone }: TimelineProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newMilestone, setNewMilestone] = useState({
    date: '',
    title: '',
    description: '',
    emoji: '',
  })

  const sortedMilestones = [...milestones].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMilestone.date && newMilestone.title && newMilestone.description) {
      onAddMilestone({
        id: Date.now().toString(),
        ...newMilestone,
      })
      setNewMilestone({ date: '', title: '', description: '', emoji: '' })
      setIsModalOpen(false)
    }
  }

  return (
    <div className="glass rounded-3xl p-8 md:p-10">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
          <Clock className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif gradient-text mb-3">حكايتنا</h2>
        <p className="text-muted-foreground text-sm">كل لحظة مهمة في رحلتنا</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute right-6 top-0 bottom-0 w-px">
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/30 to-transparent" />
        </div>

        {sortedMilestones.map((milestone, index) => (
          <div 
            key={milestone.id} 
            className="relative flex gap-6 mb-10 last:mb-0 fade-in" 
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            {/* Dot */}
            <div className="relative z-10 shrink-0">
              <div className="w-12 h-12 rounded-full bg-background border-2 border-primary/50 flex items-center justify-center text-xl">
                {milestone.emoji || '💕'}
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-md -z-10" />
            </div>

            {/* Card */}
            <div className="flex-1 group">
              <div className="bg-muted/30 hover:bg-muted/50 rounded-2xl p-6 transition-all duration-300 card-hover border border-transparent hover:border-primary/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{milestone.emoji || '💕'}</span>
                  <span className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                    {new Date(milestone.date).toLocaleDateString('ar-EG', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                  {milestone.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {sortedMilestones.length === 0 && (
          <div className="text-center py-12">
            <Sparkles className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">ابدأ بإضافة أول ذكرى في حكايتكم</p>
          </div>
        )}

        {/* Add Milestone Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-muted/30 hover:bg-muted/50 border border-border hover:border-primary/30 rounded-2xl px-8 py-4 flex items-center gap-3 text-muted-foreground hover:text-primary transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">إضافة ذكرى جديدة</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" 
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="glass-strong rounded-3xl p-8 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-serif gradient-text">ذكرى جديدة</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs text-muted-foreground mb-2 uppercase tracking-wide">التاريخ</label>
                <input
                  type="date"
                  value={newMilestone.date}
                  onChange={(e) => setNewMilestone({ ...newMilestone, date: e.target.value })}
                  className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3.5 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-muted-foreground mb-2 uppercase tracking-wide">العنوان</label>
                <input
                  type="text"
                  value={newMilestone.title}
                  onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                  placeholder="مثلا: أول يوم اتقابلنا"
                  className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-muted-foreground mb-2 uppercase tracking-wide">الوصف</label>
                <textarea
                  value={newMilestone.description}
                  onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                  placeholder="احكي الحكاية..."
                  rows={3}
                  className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-muted-foreground mb-2 uppercase tracking-wide">إيموجي (اختياري)</label>
                <input
                  type="text"
                  value={newMilestone.emoji}
                  onChange={(e) => setNewMilestone({ ...newMilestone, emoji: e.target.value })}
                  placeholder="مثلا: 💕"
                  maxLength={2}
                  className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors text-center text-2xl"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-rose-dark text-primary-foreground py-4 rounded-xl font-medium hover:opacity-90 transition-opacity mt-2"
              >
                إضافة للحكاية
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
