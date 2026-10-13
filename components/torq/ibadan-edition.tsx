import { ArrowDown, MapPin } from 'lucide-react'

export function IbadanEdition() {
  return (
    <section
      aria-labelledby="ibadan-edition-title"
      className="relative overflow-hidden border-y border-white/10 bg-neutral-950 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(220,38,38,0.12),transparent_55%)]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-6 py-14 md:grid-cols-[1fr_0.9fr] md:items-center md:gap-12 md:px-10 md:py-20">
        <div>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.32em] text-red-400 sm:text-xs">
            Lagos roots · One special Ibadan edition
          </p>
          <h2 id="ibadan-edition-title" className="max-w-3xl text-3xl font-black uppercase leading-[0.95] tracking-[-0.035em] sm:text-4xl md:text-5xl">
            TOR’Q comes to Ibadan for one special December experience.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/60 sm:text-base sm:leading-7">
            Born from TOR’Q’s story in Lagos, the motorsport, culture and entertainment experience makes a one-time visit to Ibadan this December.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/75 sm:text-sm">
            <span>December 6, 2026</span>
            <span className="inline-flex items-center gap-2 text-white/50"><MapPin className="h-4 w-4 text-red-500" />Ibadan, Nigeria · Venue to be announced</span>
          </div>
          <a href="#experiences" className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-red-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
            Explore the experience <ArrowDown className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <figure className="overflow-hidden rounded-xl border border-white/10">
            <img src="/images/torq-originals/mustang-crowd.jpg" alt="A Mustang performing for the crowd at a previous TOR’Q event" className="aspect-[4/5] h-full w-full object-cover" />
          </figure>
          <figure className="mt-8 overflow-hidden rounded-xl border border-white/10 sm:mt-12">
            <img src="/images/torq-originals/cultural-performance.jpg" alt="A cultural performance at a previous TOR’Q event" className="aspect-[4/5] h-full w-full object-cover" />
          </figure>
        </div>
      </div>
    </section>
  )
}
