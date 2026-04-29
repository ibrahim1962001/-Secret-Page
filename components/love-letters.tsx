'use client'

import { useState } from 'react'
import { Mail, Plus, X, Send, Trash2, PenLine } from 'lucide-react'

export interface LoveLetter {
  id: string
  title: string
  content: string
  date: string
  from: string
}

interface LoveLettersProps {
  letters: LoveLetter[]
  onAddLetter: (letter: LoveLetter) => void
  onDeleteLetter: (id: string) => void
}

export function LoveLetters({ letters, onAddLetter, onDeleteLetter }: LoveLettersProps) {
  const [showForm, setShowForm] = useState(false)
  const [selectedLetter, setSelectedLetter] = useState<LoveLetter | null>(null)
  const [newLetter, setNewLetter] = useState({
    title: '',
    content: '',
    from: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newLetter.title.trim() || !newLetter.content.trim()) return

    onAddLetter({
      id: Date.now().toString(),
      title: newLetter.title.trim(),
      content: newLetter.content.trim(),
      from: newLetter.from.trim() || 'مجهول',
      date: new Date().toISOString().split('T')[0],
    })

    setNewLetter({ title: '', content: '', from: '' })
    setShowForm(false)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="glass rounded-3xl p-8 md:p-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
          <Mail className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif gradient-text mb-3">رسائل حب</h2>
        <p className="text-muted-foreground text-sm">كلمات من القلب للقلب</p>
      </div>

      {/* Letters Grid */}
      <div className="grid gap-4 mb-8">
        {letters.map((letter, index) => (
          <button
            key={letter.id}
            onClick={() => setSelectedLetter(letter)}
            className="group bg-muted/20 hover:bg-muted/40 rounded-2xl p-6 text-right transition-all duration-300 card-hover border border-transparent hover:border-primary/20 fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <PenLine className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                {formatDate(letter.date)}
              </span>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
              {letter.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
              {letter.content}
            </p>
            <p className="text-primary/70 text-xs mt-4">من: {letter.from}</p>
          </button>
        ))}
      </div>

      {/* Empty state */}
      {letters.length === 0 && !showForm && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-muted-foreground/40" />
          </div>
          <p className="text-muted-foreground mb-2">مفيش رسائل لسه</p>
          <p className="text-muted-foreground/60 text-sm">اكتب أول رسالة حب!</p>
        </div>
      )}

      {/* Add Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-muted/20 hover:bg-muted/40 border border-dashed border-border hover:border-primary/30 rounded-2xl p-5 flex items-center justify-center gap-3 text-muted-foreground hover:text-primary transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">اكتب رسالة جديدة</span>
        </button>
      )}

      {/* Add Form */}
      {showForm && (
        <div className="bg-muted/20 rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium gradient-text">رسالة جديدة</h3>
            <button
              onClick={() => setShowForm(false)}
              className="w-10 h-10 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-muted-foreground mb-2 uppercase tracking-wide">العنوان</label>
              <input
                type="text"
                value={newLetter.title}
                onChange={(e) => setNewLetter({ ...newLetter, title: e.target.value })}
                placeholder="عنوان الرسالة"
                className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-2 uppercase tracking-wide">الرسالة</label>
              <textarea
                value={newLetter.content}
                onChange={(e) => setNewLetter({ ...newLetter, content: e.target.value })}
                placeholder="اكتب رسالتك هنا..."
                rows={5}
                className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary/50 resize-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-2 uppercase tracking-wide">من (اختياري)</label>
              <input
                type="text"
                value={newLetter.from}
                onChange={(e) => setNewLetter({ ...newLetter, from: e.target.value })}
                placeholder="اسمك أو لقبك"
                className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-rose-dark text-primary-foreground py-4 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              إرسال الرسالة
            </button>
          </form>
        </div>
      )}

      {/* Letter Modal */}
      {selectedLetter && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" 
          onClick={() => setSelectedLetter(null)}
        >
          <div 
            className="glass-strong rounded-3xl p-8 md:p-10 w-full max-w-lg" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                {formatDate(selectedLetter.date)}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onDeleteLetter(selectedLetter.id)
                    setSelectedLetter(null)
                  }}
                  className="w-10 h-10 rounded-full bg-muted/50 hover:bg-destructive/20 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedLetter(null)}
                  className="w-10 h-10 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <h2 className="text-2xl font-serif gradient-text mb-6">{selectedLetter.title}</h2>

            <div className="mb-8">
              <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed text-base">
                {selectedLetter.content}
              </p>
            </div>

            <div className="flex items-center gap-2 text-primary/80">
              <span className="text-sm">-</span>
              <span className="text-sm font-medium">{selectedLetter.from}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
