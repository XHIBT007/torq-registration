import { ArrowDown, MapPin } from 'lucide-react'

import { Reveal } from './reveal'

export function IbadanEdition() {
  return (
    <section
      aria-labelledby="ibadan-edition-title"
      className="relative isolate overflow-hidden border-y border-white/10 bg-neutral-950 text-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/ibadan-aerial.jpg')" }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/75 to-black/55" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-black/25 via-transparent to-black/55" />

      <div className="mx-auto flex min-h-[440px] max-w-7xl items-center px-6 py-16 md:min-h-[500px] md:px-10 md:py-20">
        <div className="max-w-3xl">
          <Reveal>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.32em] text-red-300 sm:text-xs">
              Lagos roots · One special Ibadan edition
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h2 id="ibadan-edition-title" className="text-3xl font-black uppercase leading-[0.95] tracking-[-0.035em] sm:text-4xl md:text-6xl">
              TOR’Q comes to the city of brown roofs for one special December experience.
            </h2>
          </Reveal>
          <Reveal delay={170}>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
              Born from TOR’Q’s story in Lagos, the motorsport, culture and entertainment experience makes a one-time visit to Ibadan this December.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold uppercase tracking-[0.12em] text-white sm:text-sm">
              <span>December 6, 2026</span>
              <span className="inline-flex items-center gap-2 text-white/85"><MapPin className="h-4 w-4 text-red-300" />Ibadan, Nigeria · Venue to be announced</span>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <a href="#experiences" className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-red-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400">
              Explore the experience <ArrowDown className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

      </div>
    </section>
  )
}
