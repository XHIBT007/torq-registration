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
      className="relative flex min-h-screen items-center overflow-hidden bg-black"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-drift-red-mustang.webp"
          alt="TOR'Q Motorsport"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32">
        <div className="max-w-3xl">

          {/* Location / Date */}
          <div className="mb-6 inline-flex items-center rounded-full border border-red-500/40 bg-black/40 px-5 py-2 backdrop-blur-md">
            <span className="mr-2 h-2 w-2 rounded-full bg-red-500" />

            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white">
              Lagos • December 2026
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
            culture collide for one unforgettable weekend.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
            <Button
              size="lg"
              onClick={open}
              className="h-14 rounded-full bg-red-600 px-8 text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-red-500"
            >
              <Ticket className="mr-2 h-5 w-5" />
              GET TICKETS
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

      {/* Scroll indicator */}
      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-white/60 transition hover:text-white"
      >
        <ChevronDown className="h-8 w-8 animate-bounce" />
      </a>
    </section>
  )
}
