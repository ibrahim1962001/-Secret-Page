'use client'

import { useState, useRef } from 'react'
import { Plus, X, ChevronLeft, ChevronRight, Image, Camera } from 'lucide-react'
import type { Photo } from '@/lib/store'

interface GalleryProps {
  photos: Photo[]
  onAddPhoto: (photo: Photo) => void
}

export function Gallery({ photos, onAddPhoto }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const newPhoto: Photo = {
          id: Date.now().toString(),
          url: event.target?.result as string,
          caption: file.name.replace(/\.[^/.]+$/, ''),
        }
        onAddPhoto(newPhoto)
      }
      reader.readAsDataURL(file)
    }
    if (e.target) {
      e.target.value = ''
    }
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
  }

  const goToPrevious = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? photos.length - 1 : lightboxIndex - 1)
    }
  }

  const goToNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === photos.length - 1 ? 0 : lightboxIndex + 1)
    }
  }

  return (
    <div className="glass rounded-3xl p-8 md:p-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
          <Image className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif gradient-text mb-3">ذكرياتنا</h2>
        <p className="text-muted-foreground text-sm">لحظات هنفضل نفتكرها للأبد</p>
      </div>

      {/* Masonry Grid */}
      <div className="columns-2 md:columns-3 gap-4">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => openLightbox(index)}
            className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] mb-4 fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative aspect-square bg-muted">
              <img
                src={photo.url}
                alt={photo.caption || 'ذكرى'}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = `https://picsum.photos/400/400?random=${photo.id}`
                }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-white text-sm font-medium">{photo.caption}</span>
                </div>
              </div>
              
              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/30 transition-all duration-300" />
            </div>
          </div>
        ))}

        {/* Add Photo Card */}
        <div
          onClick={handleAddClick}
          className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 mb-4 border-2 border-dashed border-border hover:border-primary/50 bg-muted/20 hover:bg-muted/40"
        >
          <div className="aspect-square flex flex-col items-center justify-center gap-4 text-muted-foreground group-hover:text-primary transition-colors">
            <div className="w-16 h-16 rounded-full bg-muted/50 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
              <Camera className="w-7 h-7" />
            </div>
            <span className="text-sm font-medium">إضافة صورة</span>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/98 flex items-center justify-center" 
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              closeLightbox()
            }}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            className="absolute left-4 md:left-8 text-white/60 hover:text-white transition-colors z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
            className="absolute right-4 md:right-8 text-white/60 hover:text-white transition-colors z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-[85vh] mx-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={photos[lightboxIndex].url}
              alt={photos[lightboxIndex].caption || 'ذكرى'}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = `https://picsum.photos/800/600?random=${photos[lightboxIndex].id}`
              }}
            />
            
            {/* Caption */}
            <div className="text-center mt-6">
              {photos[lightboxIndex].caption && (
                <p className="text-white text-lg font-medium mb-2">
                  {photos[lightboxIndex].caption}
                </p>
              )}
              <p className="text-white/40 text-sm">
                {lightboxIndex + 1} / {photos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
