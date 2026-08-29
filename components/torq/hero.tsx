'use client'

import { Button } from '@/components/ui/button'
import { EVENT } from '@/lib/torq-data'
import { ChevronDown, MapPin, Ticket } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Countdown } from './countdown'
import { useRegistration } from './registration'

export function Hero() {
  const { open } = useRegistration()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll,
      )
  }, [])

  return (
    <section
      id="top"
      className="group relative flex min-h-screen items-center overflow-hidden bg-black"
    >
      {/* ============================================================ */}
      {/* CINEMATIC BACKGROUND                                         */}
      {/* ============================================================ */}

      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/images/hero-drift-red-mustang.webp"
          alt="TOR'Q Motorsport"
          className={`
            h-full w-full object-cover
            scale-[1.08]
            transition-transform duration-[8000ms] ease-out
            group-hover:scale-[1.12]
          `}
        />

        {/* Dark cinematic grade */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

        {/* Subtle red atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(220,38,38,0.12),transparent_45%)]" />

        {/* Film grain */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%22.7%22/%3E%3C/svg%3E")',
          }}
        />

        {/* Racing scan line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px animate-[scan_7s_linear_infinite] bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
      </div>

      {/* ============================================================ */}
      {/* CONTENT                                                       */}
      {/* ============================================================ */}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32">
        <div className="max-w-3xl">

          {/* Location / Date */}
          <div
            className="
              mb-6 inline-flex items-center rounded-full
              border border-red-500/40
              bg-black/40 px-5 py-2
              backdrop-blur-md
              animate-[fadeUp_0.8s_ease-out_both]
            "
          >
            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-red-500" />

            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white">
              Lagos • December 6, 2026
            </span>
          </div>

          {/* ======================================================== */}
          {/* MAIN HEADING                                              */}
          {/* ======================================================== */}

          <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-tight text-white md:text-7xl lg:text-8xl">

            <span
              className="
                block
                animate-[heroWord_0.9s_cubic-bezier(.22,1,.36,1)_both]
              "
              style={{
                animationDelay: '150ms',
              }}
            >
              AFRICA&apos;S BIGGEST
            </span>

            <span
              className="
                block text-red-500
                animate-[heroWord_0.9s_cubic-bezier(.22,1,.36,1)_both]
              "
              style={{
                animationDelay: '280ms',
              }}
            >
              MOTORSPORT
            </span>

            <span
              className="
                block
                animate-[heroWord_0.9s_cubic-bezier(.22,1,.36,1)_both]
              "
              style={{
                animationDelay: '410ms',
              }}
            >
              SPECTACLE
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mt-8 max-w-2xl text-lg leading-8 text-gray-300
              animate-[fadeUp_0.9s_ease-out_both]
            "
            style={{
              animationDelay: '650ms',
            }}
          >
            A cinematic celebration of speed, sound and precision where
            drifting legends, stunt riders, performance cars and motorsport
            culture collide for one unforgettable experience.
          </p>

          {/* CTA */}
          <div
            className="
              mt-10 flex flex-col gap-5
              sm:flex-row sm:items-center
              animate-[fadeUp_0.9s_ease-out_both]
            "
            style={{
              animationDelay: '800ms',
            }}
          >
            <Button
              size="lg"
              onClick={open}
              className="
                h-14 rounded-full
                bg-red-600 px-8
                text-base font-bold text-white
                transition-all duration-300
                hover:scale-105 hover:bg-red-500
                hover:shadow-[0_0_35px_rgba(220,38,38,0.35)]
              "
            >
              <Ticket className="mr-2 h-5 w-5" />
              REGISTER NOW
            </Button>

            <div className="flex items-center gap-2 text-base text-white/80">
              <MapPin className="h-5 w-5 text-red-500" />
              {EVENT.location}
            </div>
          </div>

          {/* ======================================================== */}
          {/* STATISTICS                                                */}
          {/* ======================================================== */}

          <div
            className="
              mt-14 grid grid-cols-3 gap-8
              border-t border-white/10 pt-8
              animate-[fadeUp_1s_ease-out_both]
            "
            style={{
              animationDelay: '950ms',
            }}
          >
            <HeroStat
              value="100+"
              label="Performance Cars"
              delay="1050ms"
            />

            <HeroStat
              value="5,000+"
              label="Attendees"
              delay="1150ms"
            />

            <HeroStat
              value="1"
              label="Epic Experience"
              delay="1250ms"
            />
          </div>

          {/* ======================================================== */}
          {/* COUNTDOWN                                                  */}
          {/* ======================================================== */}

          <div
            className="
              mt-14
              animate-[fadeUp_1s_ease-out_both]
            "
            style={{
              animationDelay: '1350ms',
            }}
          >
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/50">
              Lights Out In
            </p>

            <Countdown date={EVENT.date} />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SCROLL INDICATOR                                             */}
      {/* ============================================================ */}

      <a
        href="#about"
        aria-label="Scroll to About"
        className={`
          absolute bottom-8 left-1/2 z-20
          -translate-x-1/2
          transition-all duration-700
          ${
            scrolled
              ? 'translate-y-4 opacity-0'
              : 'translate-y-0 opacity-100'
          }
        `}
      >
        <div className="flex flex-col items-center gap-2 text-white/50">
          <span className="text-[9px] font-semibold uppercase tracking-[0.3em]">
            Scroll
          </span>

          <ChevronDown className="h-6 w-6 animate-[scrollPulse_1.8s_ease-in-out_infinite]" />
        </div>
      </a>
    </section>
  )
}

/* ====================================================================== */
/* HERO STAT                                                              */
/* ====================================================================== */

function HeroStat({
  value,
  label,
  delay,
}: {
  value: string
  label: string
  delay: string
}) {
  return (
    <div
      className="animate-[fadeUp_0.8s_ease-out_both]"
      style={{
        animationDelay: delay,
      }}
    >
      <p className="text-3xl font-black text-white sm:text-4xl">
        {value}
      </p>

      <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/60 sm:text-xs sm:tracking-[0.25em]">
        {label}
      </p>
    </div>
  )
}
