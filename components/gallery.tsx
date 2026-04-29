'use client'

import { useState, useRef } from 'react'
import { Plus, X, ChevronLeft, ChevronRight } from 'lucide-react'
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
    <section id="gallery" className="min-h-screen px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">Our Gallery</h2>
          <p className="text-muted-foreground">Moments we&apos;ll treasure forever</p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="break-inside-avoid glass rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-auto">
                <img
                  src={photo.url}
                  alt={photo.caption || 'Memory'}
                  className="w-full h-auto object-cover"
                  style={{ 
                    minHeight: index % 3 === 0 ? '280px' : index % 3 === 1 ? '200px' : '240px',
                    maxHeight: '400px'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-foreground text-sm">{photo.caption}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Add Photo Card */}
          <div
            onClick={handleAddClick}
            className="break-inside-avoid glass rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-[1.02] hover:border-primary flex items-center justify-center fade-in"
            style={{ minHeight: '200px' }}
          >
            <div className="flex flex-col items-center gap-3 text-muted-foreground group-hover:text-primary transition-colors">
              <Plus className="w-10 h-10" />
              <span className="text-sm">Add Photo</span>
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
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 bg-background/95 backdrop-blur-lg z-50 flex items-center justify-center fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              closeLightbox()
            }}
            className="absolute top-6 right-6 text-foreground/60 hover:text-foreground transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
            className="absolute left-4 md:left-8 text-foreground/60 hover:text-foreground transition-colors z-10 glass rounded-full p-2"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            className="absolute right-4 md:right-8 text-foreground/60 hover:text-foreground transition-colors z-10 glass rounded-full p-2"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div 
            className="max-w-[90vw] max-h-[80vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[lightboxIndex].url}
              alt={photos[lightboxIndex].caption || 'Memory'}
              className="max-w-full max-h-[70vh] object-contain rounded-2xl"
            />
            {photos[lightboxIndex].caption && (
              <p className="mt-4 text-foreground text-center text-lg">
                {photos[lightboxIndex].caption}
              </p>
            )}
            <p className="mt-2 text-muted-foreground text-sm">
              {lightboxIndex + 1} / {photos.length}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
