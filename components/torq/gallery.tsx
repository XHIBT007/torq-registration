import { GALLERY } from "@/lib/torq-data"
import { Reveal } from "./reveal"

export function Gallery() {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-black py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">

        {/* SECTION INTRO */}
        <Reveal className="mb-16 md:mb-20">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.35em] text-red-500">
              The Gallery
            </p>

            <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-tight text-white md:text-7xl lg:text-8xl">
              THE MACHINES.
              <br />
              <span className="text-red-500">THE MOMENTS.</span>
              <br />
              THE CULTURE.
            </h2>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl">
              A visual archive of speed, engineering, adrenaline and the
              people who make TOR&apos;Q more than just a motorsport event.
            </p>
          </div>
        </Reveal>

        {/* GALLERY GRID */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {GALLERY.map((img, index) => {
            const featured =
              index === 0 || index === 3 || index === 6

            return (
              <Reveal
                key={img.src}
                delay={index * 70}
                className={
                  featured
                    ? "md:col-span-8"
                    : "md:col-span-4"
                }
              >
                <div className="group relative aspect-[4/3] overflow-hidden border border-white/10 bg-zinc-950 md:aspect-[16/10]">

                  {/* IMAGE */}
                  <img
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                  />

                  {/* DARK OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 transition duration-500 group-hover:opacity-90" />

                  {/* IMAGE NUMBER */}
                  <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center border border-white/20 bg-black/50 text-xs font-bold text-white backdrop-blur-sm">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* BOTTOM CONTENT */}
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-7">
                    <div>
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
                        TOR&apos;Q
                      </p>

                      <p className="text-sm font-bold uppercase tracking-wide text-white md:text-base">
                        {img.alt}
                      </p>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 text-lg text-white transition duration-300 group-hover:border-red-500 group-hover:bg-red-500">
                      ↗
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* BOTTOM STATEMENT */}
        <Reveal className="mt-20 border-t border-white/10 pt-10 md:mt-28 md:flex md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-zinc-500">
              Artistry in Motorsport
            </p>

            <h3 className="mt-4 max-w-2xl text-3xl font-black uppercase leading-tight text-white md:text-5xl">
              Every machine has a story.
              <br />
              <span className="text-red-500">
                TOR&apos;Q tells it.
              </span>
            </h3>
          </div>

          <p className="mt-6 max-w-sm text-sm leading-6 text-zinc-500 md:mt-0">
            From the roar of the engine to the details in the build,
            this is where performance becomes culture.
          </p>
        </Reveal>

      </div>
    </section>
  )
}
