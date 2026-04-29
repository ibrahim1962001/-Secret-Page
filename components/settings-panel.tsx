'use client'

import { useState } from 'react'
import { Settings, X } from 'lucide-react'
import type { AppSettings } from '@/lib/store'

interface SettingsPanelProps {
  settings: AppSettings
  onSettingsChange: (settings: AppSettings) => void
}

const THEMES: { id: AppSettings['theme']; name: string; preview: string }[] = [
  { id: 'midnight-blue', name: 'Midnight Blue', preview: 'bg-[#0a0a1a]' },
  { id: 'pastel-pink', name: 'Pastel Pink', preview: 'bg-[#1a0a14]' },
  { id: 'warm-gold', name: 'Warm Gold', preview: 'bg-[#1a1408]' },
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
    // Apply theme class immediately for preview
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
        className="fixed bottom-24 right-4 md:right-8 z-30 glass rounded-full p-3 text-muted-foreground hover:text-primary transition-colors"
        aria-label="Open Settings"
      >
        <Settings className="w-6 h-6" />
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50 flex justify-end fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="w-full max-w-sm h-full glass-strong border-l border-glass-border p-6 overflow-y-auto animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl text-foreground">Settings</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {/* Theme Switcher */}
              <div>
                <label className="block text-sm text-muted-foreground mb-4">Theme</label>
                <div className="flex flex-col gap-3">
                  {THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeChange(theme.id)}
                      className={`flex items-center gap-4 p-3 rounded-xl border transition-all duration-200 ${
                        localSettings.theme === theme.id
                          ? 'border-primary bg-primary/10'
                          : 'border-glass-border hover:border-primary/50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg ${theme.preview} border border-glass-border`} />
                      <span className="text-foreground">{theme.name}</span>
                      {localSettings.theme === theme.id && (
                        <span className="ml-auto text-primary text-sm">Active</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Couple Names */}
              <div>
                <label className="block text-sm text-muted-foreground mb-4">Your Names</label>
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    value={localSettings.coupleName1}
                    onChange={(e) => setLocalSettings({ ...localSettings, coupleName1: e.target.value })}
                    placeholder="First name"
                    className="w-full glass rounded-xl px-4 py-3 text-foreground bg-transparent placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                  />
                  <input
                    type="text"
                    value={localSettings.coupleName2}
                    onChange={(e) => setLocalSettings({ ...localSettings, coupleName2: e.target.value })}
                    placeholder="Second name"
                    className="w-full glass rounded-xl px-4 py-3 text-foreground bg-transparent placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Anniversary Date */}
              <div>
                <label className="block text-sm text-muted-foreground mb-4">Anniversary Date</label>
                <input
                  type="date"
                  value={localSettings.anniversaryDate}
                  onChange={(e) => setLocalSettings({ ...localSettings, anniversaryDate: e.target.value })}
                  className="w-full glass rounded-xl px-4 py-3 text-foreground bg-transparent focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className="w-full bg-primary text-primary-foreground rounded-xl px-6 py-3 font-medium hover:opacity-90 transition-opacity mt-4"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
