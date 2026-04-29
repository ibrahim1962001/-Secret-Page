'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
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
    <section id="timeline" className="min-h-screen px-4 py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">Our Timeline</h2>
          <p className="text-muted-foreground">Every moment that matters</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-primary/30 transform md:-translate-x-px" />

          {sortedMilestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className={`relative flex items-start gap-6 mb-8 fade-in ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 mt-6 z-10 pulse-glow" />

              {/* Card */}
              <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
              }`}>
                <div className="glass rounded-2xl p-6 hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{milestone.emoji || '💕'}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(milestone.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground text-sm">{milestone.description}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Add Milestone Button */}
          <div className="relative flex items-center justify-center mt-8 fade-in">
            <button
              onClick={() => setIsModalOpen(true)}
              className="glass rounded-full px-6 py-3 flex items-center gap-2 text-primary hover:bg-primary/10 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              <span>Add Milestone</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-lg z-50 flex items-center justify-center p-4 fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="glass rounded-3xl p-6 md:p-8 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl text-foreground">New Milestone</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Date</label>
                <input
                  type="date"
                  value={newMilestone.date}
                  onChange={(e) => setNewMilestone({ ...newMilestone, date: e.target.value })}
                  className="w-full glass rounded-xl px-4 py-3 text-foreground bg-transparent focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Title</label>
                <input
                  type="text"
                  value={newMilestone.title}
                  onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                  placeholder="e.g., Our First Kiss"
                  className="w-full glass rounded-xl px-4 py-3 text-foreground bg-transparent placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Description</label>
                <textarea
                  value={newMilestone.description}
                  onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                  placeholder="Tell the story..."
                  rows={3}
                  className="w-full glass rounded-xl px-4 py-3 text-foreground bg-transparent placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Emoji (optional)</label>
                <input
                  type="text"
                  value={newMilestone.emoji}
                  onChange={(e) => setNewMilestone({ ...newMilestone, emoji: e.target.value })}
                  placeholder="e.g., 💋"
                  maxLength={2}
                  className="w-full glass rounded-xl px-4 py-3 text-foreground bg-transparent placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full bg-primary text-primary-foreground rounded-xl px-6 py-3 font-medium hover:opacity-90 transition-opacity"
              >
                Add to Timeline
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
