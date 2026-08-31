'use client'

import { useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export function Lightbox({
  images,
  activeIndex,
  onClose,
  onNavigate,
}: {
  images: { src: string; alt: string }[]
  activeIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate((activeIndex + 1) % images.length)
      if (e.key === 'ArrowLeft') onNavigate((activeIndex - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [activeIndex, images.length, onClose, onNavigate])

  const current = images[activeIndex]

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-red-500 hover:bg-red-500"
        aria-label="Close"
      >
        <X size={18} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onNavigate((activeIndex - 1 + images.length) % images.length)
        }}
        className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-red-500 hover:bg-red-500 md:left-8"
        aria-label="Previous"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onNavigate((activeIndex + 1) % images.length)
        }}
        className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-red-500 hover:bg-red-500 md:right-8"
        aria-label="Next"
      >
        <ChevronRight size={22} />
      </button>

      <div
        key={activeIndex}
        onClick={(e) => e.stopPropagation()}
        className="mx-auto max-h-[80vh] max-w-[90vw] animate-in fade-in zoom-in-95 duration-300"
      >
        <img
          src={current.src || '/placeholder.svg'}
          alt={current.alt}
          className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain"
        />
        <p className="mt-4 text-center text-sm uppercase tracking-wide text-white/60">
          {current.alt}
        </p>
      </div>
    </div>
  )
}
