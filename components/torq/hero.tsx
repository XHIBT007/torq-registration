'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { EVENT } from '@/lib/torq-data'
import { ChevronDown, MapPin, Ticket } from 'lucide-react'
import { Countdown } from './countdown'
import { useRegistration } from './registration'

export function Hero() {
  const { open } = useRegistration()

  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    const update = () => {
      const maxScroll = Math.min(
        window.innerHeight * 0.75,
        650,
      )

      const progress = Math.min(
        1,
        Math.max(0, window.scrollY / maxScroll),
      )

      setScrollProgress(progress)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    update()

    window.addEventListener('scroll', onScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  /*
   * Logo transition
   *
   * 0 = large centred logo
   * 1 = small navbar logo
   */

  const logoScale =
    1.0 - scrollProgress * 0.72

  const logoTop =
    50 - scrollProgress * 43

  const logoLeft =
    50 - scrollProgress * 45

  const contentOpacity = Math.min(
    1,
    Math.max(
      0,
      (scrollProgress - 0.12) / 0.45,
    ),
  )

  const contentY =
    30 - contentOpacity * 30

  const welcomeOpacity =
    1 - Math.min(1, scrollProgress * 3)

  const scrollIndicatorOpacity =
    1 - Math.min(1, scrollProgress * 4)

  return (
    <section
      id="top"
      className="relative min-h-[140vh] overflow-hidden bg-black"
    >
      {/* ====================================================== */}
      {/* HERO BACKGROUND                                        */}
      {/* ====================================================== */}

      <div className="absolute inset-0 h-screen overflow-hidden">
        <img
          src="/images/hero-drift-red-mustang.webp"
          alt="TOR'Q Motorsport"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
      </div>

      {/* ====================================================== */}
      {/* CINEMATIC LOGO                                          */}
      {/* ====================================================== */}

      <div
        className="pointer-events-none fixed z-[60] w-[min(72vw,620px)]"
        style={{
          top: `${logoTop}%`,
          left: `${logoLeft}%`,
          transform: `translate(-50%, -50%) scale(${logoScale})`,
          transformOrigin: 'center center',
        }}
      >
        <img
          src="/images/torq-logo.png"
          alt="TOR'Q — Artistry in Motorsport"
          className="h-auto w-full object-contain"
        />
      </div>

      {/* ====================================================== */}
      {/* HERO CONTENT                                            */}
      {/* ====================================================== */}

      <div className="relative z-10 flex min-h-screen items-center">
        <div
          className="mx-auto w-full max-w-7xl px-6 pb-24 pt-32 lg:px-10"
          style={{
            opacity: contentOpacity,
            transform: `translateY(${contentY}px)`,
          }}
        >
          <div className="max-w-3xl">

            {/* Location / Date */}
            <div className="mb-6 inline-flex items-center rounded-full border border-red-500/40 bg-black/40 px-5 py-2 backdrop-blur-md">
              <span className="mr-2 h-2 w-2 rounded-full bg-red-500" />

              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white">
                Lagos • December 6, 2026
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-tight text-white md:text-7xl lg:text-8xl">
              <span className="block">
                AFRICA&apos;S BIGGEST
              </span>

              <span className="block text-red-500">
                MOTORSPORT
              </span>

              <span className="block">
                SPECTACLE
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-300">
              A cinematic celebration of speed, sound and precision where
              drifting legends, stunt riders, performance cars and motorsport
              culture collide for one unforgettable experience.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
              <Button
                size="lg"
                onClick={open}
                className="h-14 rounded-full bg-red-600 px-8 text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-red-500"
              >
                <Ticket className="mr-2 h-5 w-5" />
                REGISTER NOW
              </Button>

              <div className="flex items-center gap-2 text-base text-white/80">
                <MapPin className="h-5 w-5 text-red-500" />
                {EVENT.location}
              </div>
            </div>

            {/* Statistics */}
            <div className="mt-14 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
              <div>
                <p className="text-4xl font-black text-white">
                  100+
                </p>

                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/60">
                  Performance Cars
                </p>
              </div>

              <div>
                <p className="text-4xl font-black text-white">
                  5,000+
                </p>

                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/60">
                  Attendees
                </p>
              </div>

              <div>
                <p className="text-4xl font-black text-white">
                  1
                </p>

                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/60">
                  Epic Experience
                </p>
              </div>
            </div>

            {/* Countdown */}
            <div className="mt-14">
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/50">
                Lights Out In
              </p>

              <Countdown date={EVENT.date} />
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================== */}
      {/* WELCOME MESSAGE                                        */}
      {/* ====================================================== */}

      <div
        className="pointer-events-none fixed left-1/2 top-[29%] z-[61] -translate-x-1/2 text-center"
        style={{
          opacity: welcomeOpacity,
        }}
      >
        <p className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.5em] text-white/70 sm:text-xs">
          Welcome to
        </p>
      </div>

      {/* ====================================================== */}
      {/* SCROLL INDICATOR                                       */}
      {/* ====================================================== */}

      <a
        href="#about"
        aria-label="Scroll to About"
        className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 text-white/60 transition-opacity duration-300 hover:text-white"
        style={{
          opacity: scrollIndicatorOpacity,
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] font-semibold uppercase tracking-[0.35em]">
            Scroll
          </span>

          <ChevronDown className="h-7 w-7 animate-bounce" />
        </div>
      </a>
    </section>
  )
}
