'use client'

import { useState } from 'react'
import { Settings, X, Palette, Users, Calendar, Lock } from 'lucide-react'
import type { AppSettings } from '@/lib/store'

interface SettingsPanelProps {
  settings: AppSettings
  onSettingsChange: (settings: AppSettings) => void
}

const THEMES: { id: AppSettings['theme']; name: string; color: string }[] = [
  { id: 'midnight-blue', name: 'روز جولد', color: '#e8b4b8' },
  { id: 'pastel-pink', name: 'وردي فاتح', color: '#f4a7b9' },
  { id: 'warm-gold', name: 'ذهبي دافئ', color: '#d4a574' },
]

export function SettingsPanel({ settings, onSettingsChange }: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [localSettings, setLocalSettings] = useState(settings)

  const handleOpen = () => {
    setLocalSettings(settings)
    setIsOpen(true)
  }

  const handleSave = () => {
    onSettingsChange(localSettings)
    setIsOpen(false)
  }

  const handleThemeChange = (theme: AppSettings['theme']) => {
    setLocalSettings({ ...localSettings, theme })
    document.documentElement.className = document.documentElement.className
      .replace(/theme-\S+/g, '')
    if (theme !== 'midnight-blue') {
      document.documentElement.classList.add(`theme-${theme}`)
    }
  }

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={handleOpen}
        className="fixed top-6 left-6 z-50 w-12 h-12 rounded-full bg-muted/30 backdrop-blur-xl border border-border hover:border-primary/30 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300"
      >
        <Settings className="w-5 h-5" />
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" 
          onClick={() => setIsOpen(false)}
        >
          <div
            className="glass-strong rounded-3xl p-8 w-full max-w-md max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif gradient-text">الإعدادات</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-8">
              {/* Theme Switcher */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="w-4 h-4 text-primary" />
                  <label className="text-xs text-muted-foreground uppercase tracking-wide">الثيم</label>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeChange(theme.id)}
                      className={`relative p-4 rounded-xl border transition-all duration-300 ${
                        localSettings.theme === theme.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/30 bg-muted/20'
                      }`}
                    >
                      <div 
                        className="w-8 h-8 rounded-full mx-auto mb-2"
                        style={{ backgroundColor: theme.color }}
                      />
                      <span className="text-xs text-foreground block text-center">{theme.name}</span>
                      {localSettings.theme === theme.id && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Couple Names */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-primary" />
                  <label className="text-xs text-muted-foreground uppercase tracking-wide">أسماءكم</label>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={localSettings.coupleName1}
                    onChange={(e) => setLocalSettings({ ...localSettings, coupleName1: e.target.value })}
                    placeholder="الاسم الأول"
                    className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  <input
                    type="text"
                    value={localSettings.coupleName2}
                    onChange={(e) => setLocalSettings({ ...localSettings, coupleName2: e.target.value })}
                    placeholder="الاسم الثاني"
                    className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>

              {/* Anniversary Date */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4 text-primary" />
                  <label className="text-xs text-muted-foreground uppercase tracking-wide">تاريخ الذكرى</label>
                </div>
                <input
                  type="date"
                  value={localSettings.anniversaryDate}
                  onChange={(e) => setLocalSettings({ ...localSettings, anniversaryDate: e.target.value })}
                  className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3.5 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              {/* Password Change */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="w-4 h-4 text-primary" />
                  <label className="text-xs text-muted-foreground uppercase tracking-wide">كلمة السر</label>
                </div>
                <input
                  type="text"
                  value={localSettings.password || ''}
                  onChange={(e) => setLocalSettings({ ...localSettings, password: e.target.value })}
                  placeholder="كلمة السر الجديدة"
                  className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors"
                />
                <p className="text-xs text-muted-foreground/60 mt-2">الكلمة اللي بتفتح بيها الموقع</p>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-primary to-rose-dark text-primary-foreground py-4 rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                حفظ التغييرات
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
