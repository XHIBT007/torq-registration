'use client'

import { Button } from '@/components/ui/button'
import { EVENT } from '@/lib/torq-data'
import { ChevronDown, MapPin, Ticket } from 'lucide-react'
import { Countdown } from './countdown'
import { useRegistration } from './registration'

export function Hero() {
  const { open } = useRegistration()

  return (
    <section
      id="top"
      className="group relative flex min-h-screen items-center overflow-hidden bg-black"
    >
      {/* ================================================================ */}
      {/* CINEMATIC BACKGROUND                                             */}
      {/* ================================================================ */}

      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/images/hero-drift-red-mustang.webp"
          alt="TOR'Q Motorsport"
          className="
            h-full
            w-full
            object-cover
            animate-slow-zoom
            motion-reduce:animate-none
          "
        />

        {/* Main darkness */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Cinematic horizontal gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-transparent" />

        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

        {/* Subtle red atmosphere */}
        <div
          className="
            pointer-events-none
            absolute
            -right-32
            top-1/3
            h-[500px]
            w-[500px]
            rounded-full
            bg-red-600/10
            blur-[140px]
            animate-pulse
            motion-reduce:animate-none
          "
        />
      </div>

      {/* ================================================================ */}
      {/* CONTENT                                                          */}
      {/* ================================================================ */}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 lg:px-10">
        <div className="max-w-4xl">

          {/* Location / Date */}
          <div
            className="
              animate-fade-up
              mb-6
              inline-flex
              items-center
              rounded-full
              border
              border-red-500/40
              bg-black/40
              px-5
              py-2
              backdrop-blur-md
              motion-reduce:animate-none
            "
            style={{
              animationDelay: '100ms',
            }}
          >
            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-red-500 motion-reduce:animate-none" />

            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white">
              Lagos • December 6, 2026
            </span>
          </div>

          {/* ============================================================ */}
          {/* MAIN HEADING                                                 */}
          {/* ============================================================ */}

          <h1
            className="
              animate-fade-up
              text-5xl
              font-black
              uppercase
              leading-[0.88]
              tracking-[-0.04em]
              text-white
              motion-reduce:animate-none
              md:text-7xl
              lg:text-[clamp(5rem,8vw,8rem)]
            "
            style={{
              animationDelay: '220ms',
            }}
          >
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

          {/* ============================================================ */}
          {/* DESCRIPTION                                                  */}
          {/* ============================================================ */}

          <p
            className="
              animate-fade-up
              mt-8
              max-w-2xl
              text-lg
              leading-8
              text-gray-300
              motion-reduce:animate-none
              md:text-xl
            "
            style={{
              animationDelay: '360ms',
            }}
          >
            A cinematic celebration of speed, sound and precision where
            drifting legends, stunt riders, performance cars and motorsport
            culture collide for one unforgettable experience.
          </p>

          {/* ============================================================ */}
          {/* CTA                                                          */}
          {/* ============================================================ */}

          <div
            className="
              animate-fade-up
              mt-10
              flex
              flex-col
              gap-5
              motion-reduce:animate-none
              sm:flex-row
              sm:items-center
            "
            style={{
              animationDelay: '500ms',
            }}
          >
            <Button
              size="lg"
              onClick={open}
              className="
                group/cta
                h-14
                rounded-full
                bg-red-600
                px-8
                text-base
                font-bold
                text-white
                transition-all
                duration-300
                hover:scale-105
                hover:bg-red-500
                hover:shadow-[0_0_35px_rgba(220,38,38,0.35)]
              "
            >
              <Ticket className="mr-2 h-5 w-5 transition-transform duration-300 group-hover/cta:rotate-[-8deg] group-hover/cta:scale-110" />

              REGISTER NOW
            </Button>

            <div className="flex items-center gap-2 text-base text-white/80">
              <MapPin className="h-5 w-5 text-red-500" />

              {EVENT.location}
            </div>
          </div>

          {/* ============================================================ */}
          {/* STATISTICS                                                   */}
          {/* ============================================================ */}

          <div
            className="
              animate-fade-up
              mt-14
              grid
              grid-cols-3
              gap-6
              border-t
              border-white/10
              pt-8
              motion-reduce:animate-none
              sm:gap-8
            "
            style={{
              animationDelay: '640ms',
            }}
          >
            <HeroStat
              value="100+"
              label="Performance Cars"
              delay="700ms"
            />

            <HeroStat
              value="5,000+"
              label="Attendees"
              delay="800ms"
            />

            <HeroStat
              value="1"
              label="Epic Experience"
              delay="900ms"
            />
          </div>

          {/* ============================================================ */}
          {/* COUNTDOWN                                                    */}
          {/* ============================================================ */}

          <div
            className="
              animate-fade-up
              mt-14
              motion-reduce:animate-none
            "
            style={{
              animationDelay: '820ms',
            }}
          >
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/50">
              Lights Out In
            </p>

            <Countdown date={EVENT.date} />
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* SCROLL INDICATOR                                                 */}
      {/* ================================================================ */}

      <a
        href="#about"
        aria-label="Scroll to About"
        className="
          group/scroll
          absolute
          bottom-8
          left-1/2
          z-20
          -translate-x-1/2
          text-white/50
          transition-colors
          duration-300
          hover:text-white
        "
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] font-semibold uppercase tracking-[0.35em] opacity-0 transition-opacity duration-300 group-hover/scroll:opacity-100">
            Scroll
          </span>

          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5 transition-colors duration-300 group-hover/scroll:border-red-500/60">
            <span className="h-2 w-1 rounded-full bg-red-500 animate-bounce motion-reduce:animate-none" />
          </div>
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
      className="
        animate-fade-up
        motion-reduce:animate-none
      "
      style={{
        animationDelay: delay,
      }}
    >
      <p className="text-3xl font-black tracking-tight text-white sm:text-4xl">
        {value}
      </p>

      <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/50 sm:text-xs sm:tracking-[0.25em]">
        {label}
      </p>
    </div>
  )
}
