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
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-drift-red-mustang.webp"
          alt="Ford Mustang drifting"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-6 py-24">
        <div className="max-w-3xl">

          <div className="mb-6 inline-flex items-center rounded-full border border-red-500/40 bg-black/40 px-5 py-2 backdrop-blur">
            <span className="mr-2 h-2 w-2 rounded-full bg-red-500"></span>

            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white">
              Lagos • December 2026
            </span>
          </div>

          <h1 className="text-5xl font-black uppercase leading-[0.9] text-white md:text-7xl lg:text-8xl">

            <span className="block">
              AFRICA'S BIGGEST
            </span>

            <span className="block text-red-500">
              MOTORSPORT
            </span>

            <span className="block">
              SPECTACLE
            </span>

          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-gray-300">
            A cinematic celebration of speed, sound and precision where
            drift legends, stunt riders, supercars and automotive culture
            collide for one unforgettable weekend.
          </p>

          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">

            <Button
              size="lg"
              onClick={open}
              className="h-14 rounded-full bg-red-600 px-8 text-base font-bold hover:bg-red-500"
            >
              <Ticket className="mr-2 h-4 w-4" />
              GET TICKETS
            </Button>

            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="h-5 w-5 text-red-500" />
              {EVENT.location}
            </div>

          </div>
                    <div className="mt-12 flex flex-wrap gap-10 text-white">

            <div>
              <p className="text-4xl font-black">100+</p>
              <p className="mt-1 text-sm uppercase tracking-widest text-white/70">
                Performance Cars
              </p>
            </div>

            <div>
              <p className="text-4xl font-black">5,000+</p>
              <p className="mt-1 text-sm uppercase tracking-widest text-white/70">
                Attendees
              </p>
            </div>

            <div>
              <p className="text-4xl font-black">1</p>
              <p className="mt-1 text-sm uppercase tracking-widest text-white/70">
                Epic Experience
              </p>
            </div>

          </div>

          <div className="mt-14">

            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/60">
              Lights Out In
            </p>

            <Countdown date={EVENT.date} />

          </div>

        </div>
      </div>
            <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-white/70 transition hover:text-white"
      >
        <ChevronDown className="h-8 w-8 animate-bounce" />
      </a>
    </section>
  )
}
