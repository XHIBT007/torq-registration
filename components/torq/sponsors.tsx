import { SPONSORS } from '@/lib/torq-data'

export function Sponsors() {
  const row = [...SPONSORS, ...SPONSORS]

  return (
    <section
      id="sponsors"
      className="relative overflow-hidden border-y border-white/10 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.45em] text-red-500">
            The Partners
          </p>

          <h2 className="mt-6 font-display text-5xl font-black uppercase leading-[0.9] tracking-tight text-white md:text-7xl">
            Powered By
            <br />
            <span className="text-red-500">The Best.</span>
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-white/55 md:text-xl">
            TOR&apos;Q is made possible by brands that believe in
            performance, culture, innovation and unforgettable
            experiences.
          </p>
        </div>

        {/* Sponsor marquee */}
        <div className="relative mt-16 overflow-hidden">
          
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-black to-transparent" />

          <div className="flex w-max animate-marquee gap-6">
            {row.map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex h-36 w-64 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] px-8 transition-all duration-300 hover:border-red-500/40 hover:bg-white/[0.04]"
              >
                <span className="text-center text-xl font-bold uppercase tracking-[0.2em] text-white/70">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership CTA */}
        <div className="mt-20 border-t border-white/10 pt-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/35">
            Interested in partnering with TOR&apos;Q?
          </p>

          <a
            href="#contact"
            className="mt-5 inline-flex items-center gap-3 text-lg font-bold uppercase tracking-wide text-white transition-colors hover:text-red-500"
          >
            Become a partner
            <span className="text-red-500">↗</span>
          </a>
        </div>

      </div>
    </section>
  )
}
