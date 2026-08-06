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
      {/* Background image */}
      <div className="absolute inset-0">
        <img
  src="/images/hero-drift-red-mustang.webp"
  alt="A Ford Mustang drifting in a cloud of tire smoke"
  className="animate-slow-zoom h-full w-full object-cover"
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
<div className="mb-6 inline-flex items-center rounded-full border border-red-500/40 bg-black/40 px-5 py-2 backdrop-blur">
  <span className="mr-2 h-2 w-2 rounded-full bg-red-500"></span>
  <span className="text-sm font-semibold tracking-[0.2em] text-white uppercase">
    Lagos • December 2026
  </span>
</div>
<h1 className="animate-fade-up mt-6 text-5xl font-black uppercase leading-[0.9] md:text-7xl lg:text-8xl">
  <span className="bg-gradient-to-r from-white via-white to-red-500 bg-clip-text text-transparent">
    AFRICA'S BIGGEST
  </span>

  <br />

  <span className="text-red-500">
    MOTORSPORT
  </span>

  <br />

  <span className="text-white">
    SPECTACLE
  </span>
</h1>
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
              className="h-14 rounded-full bg-red-600 px-8 text-base font-bold transition-all duration-300 hover:scale-105 hover:bg-red-500"
            >
              <Ticket className="size-4" />
              GET TICKETS
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 text-accent" />
              {EVENT.location}
            </div>
          </div>
           <div className="mt-10 flex flex-wrap gap-8 text-white">
  <div>
    <p className="text-3xl font-bold">100+</p>
    <p className="text-sm text-white/70 uppercase">Performance Cars</p>
  </div>

  <div>
    <p className="text-3xl font-bold">5,000+</p>
    <p className="text-sm text-white/70 uppercase">Attendees</p>
  </div>

  <div>
    <p className="text-3xl font-bold">1</p>
    <p className="text-sm text-white/70 uppercase">Epic Experience</p>
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
