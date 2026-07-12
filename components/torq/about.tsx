import { Reveal } from './reveal'

const STATS = [
  { value: '3', label: 'Days of racing' },
  { value: '40+', label: 'Pro drivers & riders' },
  { value: '120', label: 'Machines on display' },
  { value: '50K', label: 'Expected attendees' },
]

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="font-display text-sm tracking-[0.3em] text-accent uppercase">
              About the festival
            </p>
            <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              Where engineering becomes{' '}
              <span className="text-primary">art</span>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                TOR&apos;Q is a premium motorsport festival built for those who
                see beauty in the burnout. Inspired by the grandeur of Formula
                One and the heritage of the Goodwood Festival of Speed, we bring
                together the world&apos;s finest drivers, riders and machines
                for three unforgettable days.
              </p>
              <p>
                From tire-shredding drift battles to gravity-defying stunt shows
                and a paddock of the rarest hypercars alive, every moment is
                choreographed like a performance — because to us, motorsport has
                always been an art form.
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
