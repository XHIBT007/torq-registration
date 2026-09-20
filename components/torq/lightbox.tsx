'use client'

import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface LightboxProps {
  images: {
    src: string
    alt: string
  }[]
  activeIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({
  images,
  activeIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const previousOverflowRef = useRef<string>('')
  const previousActiveElementRef = useRef<HTMLElement | null>(null)

  const current = images[activeIndex]

  useEffect(() => {
    if (!current) return

    previousActiveElementRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    previousOverflowRef.current = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const previousActiveElement = previousActiveElementRef.current

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          event.preventDefault()
          onClose()
          break

        case 'ArrowRight':
          event.preventDefault()
          onNavigate((activeIndex + 1) % images.length)
          break

        case 'ArrowLeft':
          event.preventDefault()
          onNavigate(
            (activeIndex - 1 + images.length) % images.length,
          )
          break

        default:
          break
      }
    }

    window.addEventListener('keydown', onKeyDown)

    requestAnimationFrame(() => {
      closeButtonRef.current?.focus()
    })

    return () => {
      window.removeEventListener('keydown', onKeyDown)

      document.body.style.overflow = previousOverflowRef.current

      requestAnimationFrame(() => {
        previousActiveElement?.focus?.()
      })
    }
  }, [
    activeIndex,
    current,
    images.length,
    onClose,
    onNavigate,
  ])

  if (!current) return null

  const goPrevious = () => {
    onNavigate(
      (activeIndex - 1 + images.length) % images.length,
    )
  }

  const goNext = () => {
    onNavigate((activeIndex + 1) % images.length)
  }

  const displayIndex = String(activeIndex + 1).padStart(2, '0')
  const displayTotal = String(images.length).padStart(2, '0')

  return (
    <div
      className="torq-modal-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-black/95 px-3 py-4 backdrop-blur-md sm:px-6 sm:py-6"
      role="dialog"
      aria-modal="true"
      aria-label="TOR’Q image viewer"
      onClick={onClose}
    >
      {/* Close */}
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] text-white/90 backdrop-blur-md transition-all duration-200 hover:border-white/30 hover:bg-white/[0.15] focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-black sm:right-6 sm:top-6"
        aria-label="Close image viewer"
      >
        <X className="h-5 w-5" strokeWidth={1.8} />
      </button>

      {/* Previous */}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          goPrevious()
        }}
        className="absolute left-2 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] text-white/90 backdrop-blur-md transition-all duration-200 hover:border-white/30 hover:bg-white/[0.15] focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-black sm:left-6 md:h-14 md:w-14"
        aria-label="Previous image"
      >
        <ChevronLeft
          className="h-6 w-6 md:h-7 md:w-7"
          strokeWidth={1.7}
        />
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          goNext()
        }}
        className="absolute right-2 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] text-white/90 backdrop-blur-md transition-all duration-200 hover:border-white/30 hover:bg-white/[0.15] focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-black sm:right-6 md:h-14 md:w-14"
        aria-label="Next image"
      >
        <ChevronRight
          className="h-6 w-6 md:h-7 md:w-7"
          strokeWidth={1.7}
        />
      </button>

      {/* Media shell */}
      <div
        key={activeIndex}
        onClick={(event) => event.stopPropagation()}
        className="relative flex max-h-[calc(100dvh-32px)] w-full max-w-[1500px] flex-col items-center justify-center animate-in fade-in zoom-in-[0.98] duration-200 sm:max-h-[calc(100dvh-48px)]"
      >
        {/* Image */}
        <div className="relative flex max-h-[calc(100dvh-120px)] max-w-[calc(100vw-24px)] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-2xl sm:max-h-[calc(100dvh-140px)] sm:max-w-[calc(100vw-96px)]">
          <img
            src={current.src || '/placeholder.svg'}
            alt={current.alt}
            className="block max-h-[calc(100dvh-120px)] max-w-full object-contain sm:max-h-[calc(100dvh-140px)]"
            draggable={false}
          />
        </div>

        {/* Caption / metadata */}
        <div className="mt-3 flex w-full max-w-3xl items-center justify-between gap-4 px-2 sm:mt-4">
          <p className="min-w-0 flex-1 truncate text-xs font-medium uppercase tracking-[0.16em] text-white/60 sm:text-sm">
            {current.alt}
          </p>

          <div
            className="shrink-0 text-xs font-medium tabular-nums tracking-[0.16em] text-white/40"
            aria-label={`Image ${activeIndex + 1} of ${images.length}`}
          >
            {displayIndex}
            <span className="mx-1.5 text-white/20">/</span>
            {displayTotal}
          </div>
        </div>
      </div>
    </div>
  )
}
