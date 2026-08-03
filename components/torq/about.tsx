import { Reveal } from './reveal'

const TITLE = "Where Horsepower Meets Culture"

const DESCRIPTION = `
TOR'Q is Africa's premier automotive festival, bringing together drifting,
burnout battles, superbikes, luxury vehicles, live music, fashion,
gaming, food and creator culture in one unforgettable experience.

More than an event, TOR'Q is a celebration of speed, style, engineering
and entertainment.
`

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="font-display text-sm tracking-[0.3em] text-accent uppercase">
              About the festival
            </p>
            <h2 className="font-display mt-4 text-4xl font-bold">
    Not Just an Event.
    <br />
    A Motorsport Experience.
</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
TOR'Q is where engineering meets artistry, and speed meets culture.

Created for enthusiasts, collectors, manufacturers and curious newcomers alike, TOR'Q brings together the machines, the people and the stories shaping Africa's motorsport movement.
</p>
              <p>
From tyre-smoking drift demonstrations and precision stunt riding to luxury automotive showcases, simulator championships and immersive brand experiences, every moment is designed to celebrate the beauty of performance.

In a world obsessed with speed, TOR'Q invites you to slow down, look closer and appreciate the engineering, craftsmanship and passion behind every machine.
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
