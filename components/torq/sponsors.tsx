import { SPONSORS } from '@/lib/torq-data'

export function Sponsors() {
  const row = [...SPONSORS, ...SPONSORS]
  return (
    <section className="relative border-y border-border/60 bg-card/30 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs tracking-[0.3em] text-muted-foreground uppercase">
          Proudly powered by our partners
        </p>
      </div>
      <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-16 pr-16">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-display text-2xl font-bold tracking-[0.15em] text-muted-foreground/70 transition-colors hover:text-foreground sm:text-3xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
