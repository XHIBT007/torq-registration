'use client'

import { useEffect, useState } from 'react'
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

  const [scrollProgress, setScrollProgress] =
    useState(0)

  /* ============================================================
     SCROLL TRACKING
     ============================================================ */

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll =
        window.innerHeight * 1.8

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
    const t = Math.min(
      1,
      Math.max(0, value),
    )

    return 1 - Math.pow(1 - t, 3)
  }

  const easeInOut = (value: number) => {
    const t = Math.min(
      1,
      Math.max(0, value),
    )

    return t < 0.5
      ? 4 * t * t * t
      : 1 -
          Math.pow(
            -2 * t + 2,
            3,
          ) /
            2
  }

  /* ============================================================
     LAYER 1
     
     OPENING TOR'Q LOGO
     ============================================================ */

  /*
   * Layer 1 owns the first part of the scroll.
   *
   * It moves upward and fades away.
   */
  const layerOneProgress = easeInOut(
    scrollProgress / 0.55,
  )

  const layerOneY =
    -100 * layerOneProgress

  const layerOneOpacity =
    Math.max(
      0,
      1 -
        easeOut(
          (scrollProgress - 0.05) /
            0.50,
        ),
    )

  /*
   * Welcome text disappears slightly
   * before the logo itself.
   */
  const welcomeOpacity =
    Math.max(
      0,
      1 -
        easeOut(
          scrollProgress / 0.25,
        ),
    )

  /*
   * Scroll instruction disappears
   * very early.
   */
  const scrollPromptOpacity =
    Math.max(
      0,
      1 -
        easeOut(
          scrollProgress / 0.16,
        ),
    )

  /* ============================================================
     LAYER 2
     
     MAIN WEBSITE
     ============================================================ */

  /*
   * Layer 2 starts appearing at 95%
   * of Layer 1's exit.
   *
   * Layer 2 DOES NOT MOVE here.
   */
  const layerTwoOpacity =
  easeOut(
    (scrollProgress - 0.49) /
      0.09,
  )

  /*
   * Main content remains completely
   * stationary during the handoff.
   */
  const layerTwoY = 0

  /*
   * Once Layer 2 is visible, normal
   * hero movement can begin.
   */
  const normalScrollProgress =
    easeOut(
      (scrollProgress - 0.70) /
        0.30,
    )

  const heroY =
    -70 * normalScrollProgress

  /* ============================================================
     BACKGROUND
     ============================================================ */

  /*
   * Background belongs to Layer 2.
   *
   * It begins appearing around the same
   * time Layer 2 starts fading in.
   */
  const backgroundOpacity =
  easeInOut(
    (scrollProgress - 0.44) /
      0.22,
  )

  /* ============================================================
     NAVBAR
     ============================================================ */

  const navbarOpacity =
    easeOut(
      (scrollProgress - 0.60) /
        0.20,
    )

  return (
    <section
      id="top"
      className="relative min-h-[180vh] overflow-hidden bg-black"
    >
      {/* ========================================================
          LAYER 2 BACKGROUND
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
          BLACK OPENING BACKGROUND
          ======================================================== */}

      <div
        className="pointer-events-none fixed inset-0 z-10 bg-black"
        style={{
          opacity:
            1 - backgroundOpacity,
        }}
      />

      {/* ========================================================
          LAYER 1 — OPENING
          ======================================================== */}

      <div
        className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center"
        style={{
          opacity: layerOneOpacity,
          transform: `translate3d(0, ${layerOneY}vh, 0)`,
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

          {/* TOR'Q LOGO */}

          <img
            src="/images/torq-logo.png"
            alt="TOR'Q"
            className="block w-full object-contain"
          />

          {/* Scroll instruction */}

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
          LAYER 2 — MAIN WEBSITE
          ======================================================== */}

      <div
        className="relative z-20 flex min-h-screen w-full items-center"
        style={{
          opacity: layerTwoOpacity,
          transform: `translate3d(0, ${heroY + layerTwoY}px, 0)`,
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 py-32 lg:px-10">

          <div className="max-w-4xl">

            {/* Date */}

            <div className="mb-6 inline-flex items-center rounded-full border border-red-500/40 bg-black/40 px-5 py-2 backdrop-blur-md">
              <span className="mr-2 h-2 w-2 rounded-full bg-red-500" />

              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white">
                Lagos • December 6, 2026
              </span>
            </div>

            {/* ==================================================
                MAIN HEADLINE
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
                CINEMATIC DESCRIPTION
                ================================================== */}

            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
              A cinematic celebration of speed,
              sound and precision where drifting
              legends, stunt riders, performance
              cars and motorsport culture collide
              for one unforgettable experience.
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
      </div>

      {/* ========================================================
          NAVBAR TRANSITION
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
