'use client'

import {
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  ChevronDown,
  MapPin,
  Ticket,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { EVENT } from '@/lib/torq-data'
import { Countdown } from './countdown'
import { useRegistration } from './registration'

export function Hero() {
  const { open } = useRegistration()

  const sectionRef =
    useRef<HTMLElement>(null)

  const [progress, setProgress] =
    useState(0)

  /* ============================================================
     SCROLL PROGRESS
     ============================================================ */

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0

      const section =
        sectionRef.current

      if (!section) return

      const rect =
        section.getBoundingClientRect()

      const scrollDistance =
        section.offsetHeight -
        window.innerHeight

      if (scrollDistance <= 0) {
        setProgress(0)
        return
      }

      const travelled =
        Math.min(
          scrollDistance,
          Math.max(0, -rect.top),
        )

      setProgress(
        travelled / scrollDistance,
      )
    }

    const onScroll = () => {
      if (!raf) {
        raf = window.requestAnimationFrame(
          update,
        )
      }
    }

    update()

    window.addEventListener(
      'scroll',
      onScroll,
      { passive: true },
    )

    window.addEventListener(
      'resize',
      update,
    )

    return () => {
      window.removeEventListener(
        'scroll',
        onScroll,
      )

      window.removeEventListener(
        'resize',
        update,
      )

      if (raf) {
        window.cancelAnimationFrame(raf)
      }
    }
  }, [])

  /* ============================================================
     EASING
     ============================================================ */

  const clamp = (
    value: number,
  ) =>
    Math.min(
      1,
      Math.max(0, value),
    )

  const easeOut = (
    value: number,
  ) => {
    const t = clamp(value)

    return 1 -
      Math.pow(
        1 - t,
        3,
      )
  }

  const easeInOut = (
    value: number,
  ) => {
    const t = clamp(value)

    return t < 0.5
      ? 4 *
          t *
          t *
          t
      : 1 -
          Math.pow(
            -2 * t + 2,
            3,
          ) /
            2
  }

  /* ============================================================
     OPENING TIMELINE
     
     0.00 → 0.95
     ONLY LAYER 1 MOVES
     ============================================================ */

  const layerOneProgress =
    easeInOut(
      progress / 0.95,
    )

  /*
   * Logo travels upward.
   */
  const logoY =
    -100 *
    layerOneProgress

  /*
   * Logo begins fading slightly after
   * it starts moving.
   */
  const logoOpacity =
    1 -
    easeOut(
      (progress - 0.08) /
        0.87,
    )

  /*
   * Welcome disappears earlier.
   */
  const welcomeOpacity =
    1 -
    easeOut(
      progress / 0.25,
    )

  /*
   * Scroll instruction disappears
   * almost immediately.
   */
  const scrollPromptOpacity =
    1 -
    easeOut(
      progress / 0.18,
    )

  /* ============================================================
     LAYER 2 REVEAL
     
     BEGINS AT 95%
     ============================================================ */

  const layerTwoProgress =
    easeOut(
      (progress - 0.88) /
        0.12,
    )

  /*
   * Layer 2 is one complete composition.
   *
   * Background + headline + copy +
   * CTA + stats + countdown all fade
   * together.
   */
  const layerTwoOpacity =
    layerTwoProgress

  /* ============================================================
     BACKGROUND
     ============================================================ */

  const backgroundOpacity =
    layerTwoProgress

  /* ============================================================
     NAVBAR
     
     We let the existing Navbar handle
     its own scroll state.
     ============================================================ */

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-[145vh] bg-black"
    >
      {/* ========================================================
          STICKY STAGE
          ======================================================== */}

      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ======================================================
            BACKGROUND
            ====================================================== */}

        <div
          className="absolute inset-0 bg-black"
          style={{
            opacity: 1,
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            opacity:
              backgroundOpacity,
          }}
        >
          <img
            src="/images/hero-drift-red-mustang.webp"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/30" />
        </div>

        {/* ======================================================
            LAYER 2
             
            THE COMPLETE WEBSITE HERO
            ====================================================== */}

        <div
          className="absolute inset-0 z-10"
          style={{
            opacity:
              layerTwoOpacity,
          }}
        >
          <div className="mx-auto flex h-full w-full max-w-7xl items-center px-6 py-28 lg:px-10">

            <div className="w-full max-w-5xl">

              {/* DATE */}

              <div className="mb-6 inline-flex items-center rounded-full border border-red-500/40 bg-black/40 px-5 py-2 backdrop-blur-md">
                <span className="mr-2 h-2 w-2 rounded-full bg-red-500" />

                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white sm:text-sm">
                  Lagos • December 6, 2026
                </span>
              </div>

              {/* ==================================================
                  MAIN HEADLINE
                  ================================================== */}

              <h1 className="text-[3.2rem] font-black uppercase leading-[0.88] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl lg:text-[6.5rem]">

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
                  CINEMATIC COPY
                  ================================================== */}

              <p className="mt-7 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8 md:text-xl">
                A cinematic celebration of
                speed, sound and precision where
                drifting legends, stunt riders,
                performance cars and motorsport
                culture collide for one
                unforgettable experience.
              </p>

              {/* ==================================================
                  CTA
                  ================================================== */}

              <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">

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

              <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-white/10 pt-7 sm:grid-cols-4">

                <div>
                  <p className="text-3xl font-black text-white sm:text-4xl">
                    100+
                  </p>

                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/45">
                    Performance Cars
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-black text-white sm:text-4xl">
                    50+
                  </p>

                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/45">
                    Drivers & Riders
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-black text-white sm:text-4xl">
                    3
                  </p>

                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/45">
                    Days of Action
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-black text-white sm:text-4xl">
                    1
                  </p>

                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/45">
                    Epic Experience
                  </p>
                </div>

              </div>

              {/* ==================================================
                  COUNTDOWN
                  ================================================== */}

              <div className="mt-10">

                <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-white/40">
                  Lights Out In
                </p>

                <Countdown
                  date={EVENT.date}
                />

              </div>

            </div>
          </div>
        </div>

        {/* ======================================================
            LAYER 1
             
            OPENING TOR'Q
            ====================================================== */}

        <div
          className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
          style={{
            opacity:
              logoOpacity,
            transform:
              `translate3d(0, ${logoY}vh, 0)`,
          }}
        >
          <div className="flex w-[88vw] max-w-[720px] -translate-y-[3vh] flex-col items-center text-center">

            {/* WELCOME */}

            <p
              className="mb-6 text-[11px] font-semibold uppercase tracking-[0.55em] text-white/50 sm:text-xs"
              style={{
                opacity:
                  welcomeOpacity,
              }}
            >
              Welcome to
            </p>

            {/* LOGO */}

            <img
              src="/images/torq-logo.png"
              alt="TOR'Q"
              className="block w-full object-contain"
            />

            {/* SCROLL PROMPT */}

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

      </div>
    </section>
  )
}
