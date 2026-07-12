import { EXPERIENCES } from '@/lib/torq-data'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from './reveal'

export function Experiences() {
  return (
    <section id="experiences" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="font-display text-sm tracking-[0.3em] text-accent uppercase">
            Event experiences
          </p>
          <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Five arenas. One relentless pulse.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Move between worlds of motorsport, each curated to deliver its own
            adrenaline signature.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCES.map((exp, i) => (
            <Reveal
              key={exp.title}
              delay={i * 80}
              as="article"
              className={
                i === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-1' : ''
              }
            >
              <div className="group relative h-full min-h-[320px] overflow-hidden rounded-lg border border-border">
                <img
                  src={exp.image || '/placeholder.svg'}
                  alt={exp.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />

                <div className="relative flex h-full flex-col justify-end p-6">
                  <span className="mb-3 inline-flex w-fit items-center rounded-full border border-accent/40 bg-background/50 px-3 py-1 text-[10px] font-medium tracking-[0.2em] text-accent uppercase backdrop-blur-sm">
                    {exp.tag}
                  </span>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl font-bold tracking-wide">
                      {exp.title}
                    </h3>
                    <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {exp.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
