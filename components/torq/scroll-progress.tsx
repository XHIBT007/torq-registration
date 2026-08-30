'use client'

import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    const updateProgress = () => {
      frame = 0

      const scrollTop =
        window.scrollY

      const documentHeight =
        document.documentElement.scrollHeight

      const viewportHeight =
        window.innerHeight

      const scrollable =
        documentHeight -
        viewportHeight

      if (scrollable <= 0) {
        setProgress(0)
        return
      }

      const value =
        Math.min(
          1,
          Math.max(
            0,
            scrollTop / scrollable,
          ),
        )

      setProgress(value)
    }

    const handleScroll = () => {
      if (!frame) {
        frame =
          window.requestAnimationFrame(
            updateProgress,
          )
      }
    }

    const handleResize = () => {
      updateProgress()
    }

    updateProgress()

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true },
    )

    window.addEventListener(
      'resize',
      handleResize,
    )

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll,
      )

      window.removeEventListener(
        'resize',
        handleResize,
      )

      if (frame) {
        window.cancelAnimationFrame(
          frame,
        )
      }
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        inset-x-0
        top-0
        z-[100]
        h-[2px]
        bg-white/[0.04]
      "
    >
      <div
        className="
          h-full
          origin-left
          bg-red-500
          shadow-[0_0_10px_rgba(239,68,68,0.45)]
          will-change-transform
        "
        style={{
          transform:
            `scaleX(${progress})`,
        }}
      />
    </div>
  )
}
