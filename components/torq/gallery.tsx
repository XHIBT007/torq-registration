import { GALLERY } from '@/lib/torq-data'
import { Reveal } from './reveal'

export function Gallery() {
  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="font-display text-sm tracking-[0.3em] text-accent uppercase">
              Previous event
            </p>
            <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              Moments from the grid
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Silverstone · 2025 Edition
          </p>
        </Reveal>

        <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 sm:auto-rows-[240px] lg:grid-cols-4">
          {GALLERY.map((img, i) => (
            <Reveal
              key={img.src}
              delay={i * 60}
              className={
                i === 0 || i === 3
                  ? 'col-span-2 row-span-1 lg:col-span-2'
                  : 'col-span-1'
              }
            >
              <div className="group relative h-full overflow-hidden rounded-lg border border-border">
                <img
                  src={img.src || '/placeholder.svg'}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/0 transition-colors duration-500 group-hover:bg-background/20" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
