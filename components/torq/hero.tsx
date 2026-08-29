'use client'

import { Button } from '@/components/ui/button'
import { EVENT } from '@/lib/torq-data'
import { ChevronDown, MapPin, Ticket } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Countdown } from './countdown'
import { useRegistration } from './registration'

export function Hero() {
  const { open } = useRegistration()
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    const update = () => {
      const maxScroll = window.innerHeight * 0.75
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

    return () =>
      window.removeEventListener('scroll', onScroll)
  }, [])

  /*
   * HERO LOGO
   *
   * Starts huge and centred.
   * Moves vertically upward as the user scrolls.
   * Slowly scales down.
   * Fades completely away.
   */
  const logoY = scrollProgress * -28
  const logoScale = 1 - scrollProgress * 0.18
  const logoOpacity = Math.max(
    0,
    1 - scrollProgress * 1.35,
  )

  /*
   * BACKGROUND
   *
   * Starts completely black.
   * Gradually reveals the hero image.
   */
  const backgroundOpacity =
    Math.min(1, scrollProgress * 1.8)

  /*
   * HERO CONTENT
   *
   * Appears after the initial logo movement begins.
   */
  const contentOpacity = Math.min(
    1,
    Math.max(0, (scrollProgress - 0.16) / 0.5),
  )

  const contentY =
    Math.max(0, 24 - scrollProgress * 45)

  return (
    <section
      id="top"
      className="relative min-h-[125vh] overflow-hidden bg-black"
    >
      {/* ====================================================== */}
      {/* BACKGROUND IMAGE                                       */}
      {/* ====================================================== */}

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: backgroundOpacity,
          transition: 'opacity 120ms linear',
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

      {/* ====================================================== */}
      {/* INITIAL BLACK OVERLAY                                  */}
      {/* ====================================================== */}

      <div
        className="pointer-events-none absolute inset-0 bg-black"
        style={{
          opacity: Math.max(
            0,
            1 - scrollProgress * 1.8,
          ),
        }}
      />

      {/* ====================================================== */}
{/* HERO LOGO                                              */}
{/* ====================================================== */}

<div
  className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
  style={{
    opacity: logoOpacity,
    transform: `translate3d(0, ${scrollProgress * -28}vh, 0)`,
  }}
>
  <div className="flex w-[88vw] max-w-[720px] -translate-y-[3vh] flex-col items-center text-center">
    <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.55em] text-white/50 sm:text-xs">
      Welcome to
    </p>

    <img
      src="/images/torq-logo.png"
      alt="TOR'Q"
      className="block w-full object-contain"
    />
  </div>
</div>

      {/* ====================================================== */}
      {/* HERO CONTENT                                           */}
      {/* ====================================================== */}

      <div
        className="relative z-20 mx-auto flex min-h-screen w-full max-w-7xl items-end px-6 pb-24 pt-40 md:px-10 md:pb-32"
        style={{
          opacity: contentOpacity,
          transform: `translate3d(0, ${contentY}px, 0)`,
        }}
      >
        <div className="max-w-4xl">

          {/* Date */}
          <div className="mb-6 inline-flex items-center rounded-full border border-red-500/40 bg-black/40 px-5 py-2 backdrop-blur-md">
            <span className="mr-2 h-2 w-2 rounded-full bg-red-500" />

            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white sm:text-sm">
              Lagos • December 6, 2026
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl font-black uppercase leading-[0.88] tracking-[-0.04em] text-white sm:text-6xl md:text-8xl lg:text-[7rem]">
            Africa&apos;s Biggest
            <br />
            <span className="text-red-500">
              Motorsport
            </span>
            <br />
            Spectacle
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-2xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
            A cinematic celebration of speed, sound and
            precision where drifting legends, stunt riders,
            performance cars and motorsport culture collide
            for one unforgettable experience.
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center">
            <Button
              size="lg"
              onClick={open}
              className="h-14 rounded-full bg-red-600 px-8 text-base font-bold text-white transition-transform duration-300 hover:scale-[1.03] hover:bg-red-500"
            >
              <Ticket className="mr-2 h-5 w-5" />
              REGISTER NOW
            </Button>

            <div className="flex items-center gap-2 text-base text-white/70">
              <MapPin className="h-5 w-5 text-red-500" />
              {EVENT.location}
            </div>
          </div>

          {/* ================================================== */}
          {/* STATS                                               */}
          {/* ================================================== */}

          <div className="mt-14 grid grid-cols-3 gap-5 border-t border-white/10 pt-8 sm:gap-8">
            <div>
              <p className="text-3xl font-black text-white sm:text-4xl">
                100+
              </p>

              <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-white/50 sm:text-xs">
                Performance Cars
              </p>
            </div>

            <div>
              <p className="text-3xl font-black text-white sm:text-4xl">
                5,000+
              </p>

              <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-white/50 sm:text-xs">
                Attendees
              </p>
            </div>

            <div>
              <p className="text-3xl font-black text-white sm:text-4xl">
                1
              </p>

              <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-white/50 sm:text-xs">
                Epic Experience
              </p>
            </div>
          </div>

          {/* ================================================== */}
          {/* COUNTDOWN                                           */}
          {/* ================================================== */}

          <div className="mt-12">
            <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-white/40 sm:text-xs">
              Lights Out In
            </p>

            <Countdown date={EVENT.date} />
          </div>
        </div>
      </div>

      {/* ====================================================== */}
      {/* SCROLL INDICATOR                                      */}
      {/* ====================================================== */}

      <div
        className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 transition-opacity duration-500"
        style={{
          opacity: Math.max(
            0,
            1 - scrollProgress * 4,
          ),
        }}
      >
        <a
          href="#about"
          aria-label="Scroll to About"
          className="flex flex-col items-center gap-2 text-white/50 transition-colors hover:text-white"
        >
          <span className="text-[9px] uppercase tracking-[0.35em]">
            Scroll
          </span>

          <ChevronDown className="h-6 w-6 animate-bounce" />
        </a>
      </div>
    </section>
  )
}
