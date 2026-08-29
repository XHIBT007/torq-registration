import { ArrowUpRight, Ticket } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { EVENT } from '@/lib/torq-data'

import { TorqLogo } from './logo'
import { Reveal } from './reveal'
import { useRegistration } from './registration'

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export function Footer() {
  const { open } = useRegistration()

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black text-white">

      {/* ====================================================== */}
      {/* ATMOSPHERE                                               */}
      {/* ====================================================== */}

      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-red-600/[0.06] blur-[140px]" />

      {/* ====================================================== */}
      {/* MAIN FOOTER                                              */}
      {/* ====================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        {/* ==================================================== */}
        {/* BIG CLOSING STATEMENT                                 */}
        {/* ==================================================== */}

        <Reveal>
          <div className="border-b border-white/10 pb-16 md:pb-20">

            <p className="mb-5 text-xs font-bold uppercase tracking-[0.4em] text-red-500">
              TOR&apos;Q Motorsport
            </p>

            <h2 className="max-w-5xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.04em] sm:text-6xl md:text-8xl">
              See you
              <br />
              <span className="text-red-500">
                at the grid.
              </span>
            </h2>

            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

              <p className="max-w-lg text-base leading-7 text-white/45 md:text-lg">
                {EVENT.tagline}. {EVENT.dateLabel} · {EVENT.location}.
              </p>

              <Button
                size="lg"
                onClick={open}
                className="
                  group h-13 w-fit
                  rounded-full
                  bg-red-600
                  px-7
                  text-sm font-bold uppercase
                  tracking-[0.15em]
                  text-white
                  transition-all duration-500
                  hover:scale-105
                  hover:bg-red-500
                  hover:shadow-[0_0_35px_rgba(239,68,68,0.3)]
                "
              >
                <Ticket className="size-4" />

                Register Now

                <ArrowUpRight
                  className="
                    size-4
                    transition-transform duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </Button>

            </div>
          </div>
        </Reveal>

        {/* ==================================================== */}
        {/* FOOTER GRID                                           */}
        {/* ==================================================== */}

        <div className="grid gap-12 py-12 md:grid-cols-12 md:gap-8">

          {/* BRAND */}
          <Reveal
            delay={100}
            className="md:col-span-5"
          >
            <TorqLogo className="text-4xl" />

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/40">
              A cinematic celebration of speed, sound, precision and
              motorsport culture.
            </p>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-white/25">
              Artistry in Motorsport
            </p>
          </Reveal>

          {/* NAVIGATION */}
          <Reveal
            delay={180}
            className="md:col-span-4"
          >
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-white/30">
              Navigate
            </p>

            <nav className="grid grid-cols-2 gap-x-8 gap-y-4">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="
                    group flex items-center gap-2
                    text-sm font-medium
                    text-white/55
                    transition-colors duration-300
                    hover:text-white
                  "
                >
                  <span>{link.label}</span>

                  <ArrowUpRight
                    className="
                      size-3
                      text-red-500
                      opacity-0
                      transition-all duration-300
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                      group-hover:opacity-100
                    "
                  />
                </a>
              ))}
            </nav>
          </Reveal>

          {/* EVENT */}
          <Reveal
            delay={260}
            className="md:col-span-3"
          >
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-white/30">
              Event
            </p>

            <div className="space-y-3 text-sm">
              <p className="font-semibold text-white">
                {EVENT.dateLabel}
              </p>

              <p className="text-white/45">
                {EVENT.location}
              </p>
            </div>

            <a
              href="#contact"
              className="
                group mt-6 inline-flex items-center gap-2
                text-sm font-semibold
                text-white/60
                transition-colors duration-300
                hover:text-white
              "
            >
              Contact the team

              <ArrowUpRight
                className="
                  size-4 text-red-500
                  transition-transform duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </a>
          </Reveal>
        </div>

        {/* ==================================================== */}
        {/* BOTTOM BAR                                            */}
        {/* ==================================================== */}

        <Reveal delay={300}>
          <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/25 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © {new Date().getFullYear()} TOR&apos;Q Motorsport.
              All rights reserved.
            </p>

            <p className="uppercase tracking-[0.2em]">
              Formula One meets the Festival of Speed.
            </p>

          </div>
        </Reveal>

      </div>
    </footer>
  )
}
