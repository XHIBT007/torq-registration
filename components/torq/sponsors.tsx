'use client'

import { ArrowUpRight } from 'lucide-react'
import { Reveal } from './reveal'
import { SPONSORS } from '@/lib/torq-data'

export function Sponsors() {
  const row = [...SPONSORS, ...SPONSORS]

  return (
    <section
      id="sponsors"
      className="relative overflow-hidden border-y border-white/10 bg-black py-24 text-white md:py-32"
    >
      {/* ========================================================== */}
      {/* ATMOSPHERE                                                   */}
      {/* ========================================================== */}

      <div className="pointer-events-none absolute left-1/2 top-0 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-red-600/[0.05] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">

        {/* ======================================================== */}
        {/* HEADING                                                    */}
        {/* ======================================================== */}

        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.45em] text-red-500">
              The Partners
            </p>

            <h2 className="mt-6 font-display text-5xl font-black uppercase leading-[0.9] tracking-tight text-white md:text-7xl">
              Powered By
              <br />
              <span className="text-red-500">
                The Best.
              </span>
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-white/55 md:text-xl">
              TOR&apos;Q is made possible by brands that believe in
              performance, culture, innovation and unforgettable
              experiences.
            </p>
          </div>
        </Reveal>

        {/* ======================================================== */}
        {/* SPONSOR MARQUEE                                            */}
        {/* ======================================================== */}

        <Reveal delay={180}>
          <div className="relative mt-16 overflow-hidden">

            {/* Fade edges */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-28 bg-gradient-to-r from-black via-black/80 to-transparent" />

            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-28 bg-gradient-to-l from-black via-black/80 to-transparent" />

            {/* Moving track */}
            <div className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]">
              {row.map((name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="
                    group flex h-32 w-60 shrink-0
                    items-center justify-center
                    rounded-2xl
                    border border-white/10
                    bg-white/[0.02]
                    px-8
                    transition-all duration-500
                    hover:-translate-y-1
                    hover:border-red-500/40
                    hover:bg-white/[0.04]
                  "
                >
                  <span
                    className="
                      text-center text-lg font-bold
                      uppercase tracking-[0.18em]
                      text-white/50
                      transition-all duration-500
                      group-hover:text-white
                      group-hover:scale-105
                    "
                  >
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ======================================================== */}
        {/* PARTNERSHIP STATEMENT                                     */}
        {/* ======================================================== */}

        <Reveal delay={250}>
          <div className="mt-20 border-t border-white/10 pt-10">

            <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">

              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/35">
                  Interested in partnering with TOR&apos;Q?
                </p>

                <p className="mt-3 max-w-xl text-xl font-semibold text-white/80 md:text-2xl">
                  Put your brand where performance becomes culture.
                </p>
              </div>

              <a
                href="#contact"
                className="
                  group inline-flex items-center gap-3
                  rounded-full
                  border border-white/15
                  bg-white/[0.03]
                  px-6 py-3
                  text-sm font-bold
                  uppercase tracking-wide
                  text-white
                  transition-all duration-500
                  hover:border-red-500
                  hover:bg-red-500
                  hover:text-white
                "
              >
                Become a partner

                <span
                  className="
                    flex h-7 w-7 items-center justify-center
                    rounded-full
                    border border-white/20
                    transition-all duration-500
                    group-hover:rotate-[-8deg]
                    group-hover:border-white/40
                  "
                >
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-500 group-hover:rotate-45"
                  />
                </span>
              </a>

            </div>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
