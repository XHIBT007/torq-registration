import { Reveal } from './reveal'

const TITLE = "Africa's Motorsport Festival"

const DESCRIPTION = `
TOR'Q is where horsepower meets culture.

Created for people who believe motorsport deserves more than a parking lot, TOR'Q brings together drifting, burnouts, stunt riding, supercars, sim racing, music, fashion, food and creator culture into one unforgettable destination.

Every arena is carefully designed to immerse guests in a different side of automotive passion—from tire smoke and precision driving to luxury vehicles and cutting-edge gaming.

More than an event, TOR'Q is creating a new culture for African motorsport.
`

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="font-display text-sm tracking-[0.3em] text-accent uppercase">
              Africa's Biggest Motorsport Experience
            </p>
            <h2 className="font-display mt-4 text-4xl font-bold">
    Not Just an Event.
    <br />
    A Motorsport Experience.
</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
TOR'Q is Africa's premier motorsport festival, bringing together drifting, burnouts, stunt riding, luxury automobiles, motorsport simulators, music, food, fashion and creator culture into one unforgettable destination.
</p>
              <p>
Designed to inspire enthusiasts and newcomers alike, TOR'Q transforms motorsport into a shared cultural experience—where every arena tells a different story and every visitor becomes part of the spectacle.
</p>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-xs tracking-wide text-muted-foreground uppercase">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-lg border border-border">
              <img
                src="/images/about.png"
                alt="A race car and driver silhouette lit by a single golden beam of light"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-display text-lg font-semibold tracking-wide">
                  Artistry in Motorsport
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Every session engineered for spectacle.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
