'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, MapPin, Ticket } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { EVENT } from '@/lib/torq-data'
import { Countdown } from './countdown'
import { useRegistration } from './registration'

export function Hero() {
  const { open } = useRegistration()

  const [scrollProgress, setScrollProgress] = useState(0)

  /* ============================================================
     SCROLL TRACKING
     ============================================================ */

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = window.innerHeight * 1.8

      const progress = Math.min(
        1,
        Math.max(
          0,
          window.scrollY / maxScroll,
        ),
      )

      setScrollProgress(progress)
    }

    handleScroll()

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true },
    )

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll,
      )
    }
  }, [])

  /* ============================================================
     EASING
     ============================================================ */

  const easeOut = (value: number) => {
    const t = Math.min(1, Math.max(0, value))

    return 1 - Math.pow(1 - t, 3)
  }

  const easeInOut = (value: number) => {
    const t = Math.min(1, Math.max(0, value))

    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  /* ============================================================
     PHASE 1 — OPENING LOGO
     ============================================================ */

  /*
   * The logo begins moving first.
   *
   * Nothing else moves with it.
   */
  const logoProgress = easeInOut(
    scrollProgress / 0.55,
  )

  const logoOpacity = Math.max(
    0,
    1 -
      easeOut(
        (scrollProgress - 0.05) / 0.48,
      ),
  )

  const logoY =
    -42 * logoProgress

  const welcomeOpacity = Math.max(
    0,
    1 -
      easeOut(
        scrollProgress / 0.28,
      ),
  )

  /* ============================================================
     PHASE 2 — BACKGROUND
     ============================================================ */

  /*
   * Background intentionally appears slowly.
   *
   * This keeps the opening predominantly black.
   */
  const backgroundOpacity = easeInOut(
    (scrollProgress - 0.30) / 0.65,
  )

  /* ============================================================
     PHASE 3 — MAIN HERO CONTENT REVEAL
     ============================================================ */

  /*
   * Headline begins appearing while the logo
   * is finishing its exit.
   */
  const contentReveal = easeOut(
    (scrollProgress - 0.42) / 0.28,
  )

  const contentOpacity =
    contentReveal

  /*
   * IMPORTANT:
   *
   * The main hero does NOT move initially.
   *
   * Only after the logo is essentially gone
   * does the entire hero begin moving upward.
   */
  const contentMoveProgress = easeOut(
    (scrollProgress - 0.68) / 0.32,
  )

  const contentY =
    -70 * contentMoveProgress

  /* ============================================================
     SCROLL PROMPT
     ============================================================ */

  const scrollPromptOpacity = Math.max(
    0,
    1 -
      easeOut(
        scrollProgress / 0.18,
      ),
  )

  /* ============================================================
     NAVBAR
     ============================================================ */

  const navbarOpacity = easeOut(
    (scrollProgress - 0.55) / 0.25,
  )

  return (
    <section
      id="top"
      className="relative min-h-[135vh] overflow-hidden bg-black"
    >

      {/* ========================================================
          BACKGROUND
          ======================================================== */}

      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          opacity: backgroundOpacity,
        }}
      >
        <img
          src="/images/hero-drift-red-mustang.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
      </div>

      {/* ========================================================
          BLACK OPENING LAYER
          ======================================================== */}

      <div
        className="pointer-events-none fixed inset-0 z-10 bg-black"
        style={{
          opacity: Math.max(
            0,
            1 - backgroundOpacity,
          ),
        }}
      />

      {/* ========================================================
          OPENING TOR'Q LOGO
          ======================================================== */}

      <div
        className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center"
        style={{
          opacity: logoOpacity,
          transform: `translate3d(0, ${logoY}vh, 0)`,
        }}
      >
        <div className="flex w-[88vw] max-w-[720px] -translate-y-[3vh] flex-col items-center text-center">

          {/* Welcome */}
          <p
            className="mb-6 text-[11px] font-semibold uppercase tracking-[0.55em] text-white/50 sm:text-xs"
            style={{
              opacity: welcomeOpacity,
            }}
          >
            Welcome to
          </p>

          {/* TOR'Q Logo */}
          <img
            src="/images/torq-logo.png"
            alt="TOR'Q"
            className="block w-full object-contain"
          />

          {/* Scroll Instruction */}
          <div
            className="mt-12 flex flex-col items-center gap-3"
            style={{
              opacity:
                scrollPromptOpacity,
            }}
          >
            <span className="text-[9px] font-semibold uppercase tracking-[0.35em] text-white/45 sm:text-[10px]">
              Scroll down to experience TOR&apos;Q
            </span>

            <div className="flex flex-col items-center">
              <div className="h-8 w-px bg-gradient-to-b from-white/50 to-transparent" />

              <ChevronDown className="mt-1 h-4 w-4 animate-bounce text-white/50" />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          MAIN HERO CONTENT
          ======================================================== */}

      <div
        className="relative z-20 mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-32 lg:px-10"
        style={{
          opacity: contentOpacity,
          transform: `translate3d(0, ${contentY}px, 0)`,
        }}
      >
        <div className="max-w-4xl">

          {/* Date / Location */}

          <div className="mb-6 inline-flex items-center rounded-full border border-red-500/40 bg-black/40 px-5 py-2 backdrop-blur-md">
            <span className="mr-2 h-2 w-2 rounded-full bg-red-500" />

            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white">
              Lagos • December 6, 2026
            </span>
          </div>

          {/* ==================================================
              HEADLINE
              ================================================== */}

          <h1 className="text-5xl font-black uppercase leading-[0.88] tracking-[-0.04em] text-white md:text-7xl lg:text-[6.5rem]">

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

          {/* ==================================================
              DESCRIPTION
              ================================================== */}

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
            A cinematic celebration of speed, sound and precision
            where drifting legends, stunt riders, performance cars
            and motorsport culture collide for one unforgettable
            experience.
          </p>

          {/* ==================================================
              CTA
              ================================================== */}

          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">

            <Button
              size="lg"
              onClick={open}
              className="h-14 rounded-full bg-red-600 px-8 text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-red-500"
            >
              <Ticket className="mr-2 h-5 w-5" />
              REGISTER NOW
            </Button>

            <div className="flex items-center gap-2 text-base text-white/70">
              <MapPin className="h-5 w-5 text-red-500" />
              {EVENT.location}
            </div>

          </div>

          {/* ==================================================
              STATS
              ================================================== */}

          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-white/10 pt-8 sm:grid-cols-4">

            <div>
              <p className="text-3xl font-black text-white sm:text-4xl">
                100+
              </p>

              <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/45">
                Performance Cars
              </p>
            </div>

            <div>
              <p className="text-3xl font-black text-white sm:text-4xl">
                50+
              </p>

              <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/45">
                Drivers & Riders
              </p>
            </div>

            <div>
              <p className="text-3xl font-black text-white sm:text-4xl">
                3
              </p>

              <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/45">
                Days of Action
              </p>
            </div>

            <div>
              <p className="text-3xl font-black text-white sm:text-4xl">
                1
              </p>

              <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/45">
                Epic Experience
              </p>
            </div>

          </div>

          {/* ==================================================
              COUNTDOWN
              ================================================== */}

          <div className="mt-12">

            <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-white/40">
              Lights Out In
            </p>

            <Countdown date={EVENT.date} />

          </div>

        </div>
      </div>

      {/* ========================================================
          NAVBAR FADE
          ======================================================== */}

      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-20 bg-gradient-to-b from-black/80 to-transparent"
        style={{
          opacity: navbarOpacity,
        }}
      />

    </section>
  )
}
