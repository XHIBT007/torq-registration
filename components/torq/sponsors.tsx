import Image from "next/image"
import { SPONSORS } from "@/lib/torq-data"

export function Sponsors() {
  const row = [...SPONSORS, ...SPONSORS]

  return (
    <section
      id="sponsors"
      className="relative overflow-hidden border-y border-white/10 bg-black py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-red-500">
            The Partners
          </p>

          <h2 className="font-display text-4xl font-black uppercase leading-none tracking-tight text-white md:text-6xl">
            POWERED BY
            <br />
            <span className="text-red-500">THE BEST.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/50 md:text-lg">
            TOR&apos;Q is made possible by brands that believe in
            performance, culture, innovation and unforgettable experiences.
          </p>
        </div>

        {/* Sponsor marquee */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-black to-transparent md:w-40" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-black to-transparent md:w-40" />

          <div className="flex w-max animate-marquee items-center gap-6">
            {row.map((sponsor, index) => (
              <div
                key={`${sponsor}-${index}`}
                className="group flex h-28 w-48 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-8 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] md:h-36 md:w-64"
              >
                <span className="text-center text-sm font-bold uppercase tracking-[0.2em] text-white/50 transition-colors duration-300 group-hover:text-white md:text-base">
                  {sponsor}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-16 border-t border-white/10 pt-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/30">
            Interested in partnering with TOR&apos;Q?
          </p>

          <a
            href="#contact"
            className="mt-3 inline-block text-sm font-bold uppercase tracking-widest text-white transition-colors hover:text-red-500"
          >
            Become a partner →
          </a>
        </div>
      </div>
    </section>
  )
}
