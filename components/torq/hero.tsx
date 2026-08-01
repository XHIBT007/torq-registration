'use client'

import { Button } from '@/components/ui/button'
import { EVENT } from '@/lib/torq-data'
import { ChevronDown, MapPin, Ticket } from 'lucide-react'
import { Countdown } from './countdown'
import { useRegistration } from './registration'
import Image from 'next/image'
export function Hero() {
  const { open } = useRegistration()

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
  src="/images/hero-drift-red-mustang.webp"
  alt="TOR'Q Burnout"
  fill
  priority
  className="animate-slow-zoom object-cover"
/>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/50 px-4 py-1.5 backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-primary" />
            <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              {EVENT.dateLabel}
            </span>
          </div>

          <h1
            className="animate-fade-up font-display mt-6 text-7xl font-bold tracking-tight text-balance sm:text-8xl lg:text-[9rem]"
            style={{ animationDelay: '80ms' }}
          >
            TOR<span className="text-primary">&apos;</span>Q
          </h1>

          <p
            className="animate-fade-up text-gold-shimmer font-display mt-2 text-2xl font-medium tracking-[0.25em] uppercase sm:text-3xl"
            style={{ animationDelay: '160ms' }}
          >
            {EVENT.tagline}
          </p>

          <p
            className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            style={{ animationDelay: '240ms' }}
          >
            A cinematic celebration of speed, sound and precision — where drift
            kings, stunt riders and hypercars share one legendary stage.
          </p>

          <div
            className="animate-fade-up mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            style={{ animationDelay: '320ms' }}
          >
            <Button
              size="lg"
              onClick={open}
              className="h-12 px-7 text-base"
            >
              <Ticket className="size-4" />
              Register Now
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 text-accent" />
              {EVENT.location}
            </div>
          </div>

          <div
            className="animate-fade-up mt-12"
            style={{ animationDelay: '400ms' }}
          >
            <p className="mb-3 text-xs tracking-[0.25em] text-muted-foreground uppercase">
              Lights out in
            </p>
            <Countdown date={EVENT.date} />
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronDown className="size-6 animate-bounce" />
      </a>
    </section>
  )
}
