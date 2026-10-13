import { ArrowDown, MapPin } from 'lucide-react'

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

      <div className="mx-auto grid min-h-[440px] max-w-7xl items-center gap-10 px-6 py-16 md:min-h-[500px] md:grid-cols-[1.1fr_0.9fr] md:gap-12 md:px-10 md:py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.32em] text-red-300 sm:text-xs">
            Lagos roots · One special Ibadan edition
          </p>
          <h2 id="ibadan-edition-title" className="text-3xl font-black uppercase leading-[0.95] tracking-[-0.035em] sm:text-4xl md:text-6xl">
            TOR’Q comes to the city of brown roofs for one special December experience.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
            Born from TOR’Q’s story in Lagos, the motorsport, culture and entertainment experience makes a one-time visit to Ibadan this December.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold uppercase tracking-[0.12em] text-white sm:text-sm">
            <span>December 6, 2026</span>
            <span className="inline-flex items-center gap-2 text-white/85"><MapPin className="h-4 w-4 text-red-300" />Ibadan, Nigeria · Venue to be announced</span>
          </div>
          <a href="#experiences" className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-red-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400">
            Explore the experience <ArrowDown className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <figure className="overflow-hidden rounded-xl border border-white/20 shadow-2xl shadow-black/40">
            <img
              src="/images/torq-23-crowd.jpg"
              alt="TOR’Q crowd gathered around a live stage performance"
              className="aspect-[4/3] w-full object-cover"
            />
          </figure>
          <figure className="mt-8 overflow-hidden rounded-xl border border-white/20 shadow-2xl shadow-black/40 sm:mt-12">
            <img
              src="/images/torq-23-bikes.jpg"
              alt="Motorcycle riders at a previous TOR’Q event"
              className="aspect-[4/3] w-full object-cover"
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
