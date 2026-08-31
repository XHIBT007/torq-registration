'use client'

import { Reveal } from './reveal'

const STATS = [
  {
    value: '100+',
    label: 'Performance Cars',
  },
  {
    value: '50+',
    label: 'Drivers & Riders',
  },
  {
    value: '3',
    label: 'Days of Action',
  },
  {
    value: '1',
    label: 'Epic Experience',
  },
]

export function About() {
  return (
    <section
      id="about"
      className="
        relative
        overflow-hidden
        py-24
        sm:py-32
      "
    >

      {/* ============================================================
          ATMOSPHERE
          ============================================================ */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-red-600/[0.04]
          blur-[120px]
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >

        <div
          className="
            grid
            items-center
            gap-14
            lg:grid-cols-2
            lg:gap-20
          "
        >

          {/* ========================================================
              CONTENT
              ======================================================== */}

          <div>

            <Reveal>
              <p
                className="
                  font-display
                  text-sm
                  uppercase
                  tracking-[0.3em]
                  text-accent
                "
              >
                Africa&apos;s Biggest Motorsport Experience
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2
                className="
                  font-display
                  mt-4
                  text-4xl
                  font-bold
                  leading-[0.95]
                  tracking-tight
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Not Just an Event.
                <br />

                <span className="text-red-500">
                  A Motorsport Experience.
                </span>
              </h2>
            </Reveal>

            <div
              className="
                mt-7
                space-y-4
                text-base
                leading-relaxed
                text-muted-foreground
              "
            >

              <Reveal delay={200}>
                <p>
                  TOR&apos;Q is Africa&apos;s biggest
                  motorsport experience, bringing together
                  drifting, burnouts, stunt riding, performance
                  automobiles, motorsport simulators, music,
                  food, fashion and creator culture into one
                  unforgettable destination.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <p>
                  Designed for enthusiasts, creators and the
                  simply curious, TOR&apos;Q transforms
                  motorsport into a shared cultural experience
                  where machines become art, performance becomes
                  expression and every arena tells a different
                  story.
                </p>
              </Reveal>

            </div>

            {/* ======================================================
                STATS
                ====================================================== */}

            <dl
              className="
                mt-12
                grid
                grid-cols-2
                gap-x-6
                gap-y-8
                sm:grid-cols-4
              "
            >

              {STATS.map(
                (stat, index) => (
                  <Reveal
                    key={stat.label}
                    delay={
                      400 +
                      index * 100
                    }
                  >
                    <div className="group">

                      <dt
                        className="
                          font-display
                          text-3xl
                          font-bold
                          text-foreground
                          transition-transform
                          duration-500
                          group-hover:-translate-y-1
                          sm:text-4xl
                        "
                      >
                        {stat.value}
                      </dt>

                      <dd
                        className="
                          mt-2
                          text-[10px]
                          uppercase
                          tracking-[0.18em]
                          text-muted-foreground
                          sm:text-xs
                        "
                      >
                        {stat.label}
                      </dd>

                    </div>
                  </Reveal>
                ),
              )}

            </dl>

          </div>

          {/* ========================================================
              IMAGE
              ======================================================== */}

          <Reveal delay={250}>
            <div
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-black
              "
            >

              {/* IMAGE */}

              <div
                className="
                  relative
                  aspect-[4/5]
                  overflow-hidden
                "
              >

                <img
                  src="/images/about.png"
                  alt="Performance car and driver silhouette illuminated by a golden beam of light"
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-[7000ms]
                    ease-out
                    group-hover:scale-105
                  "
                />

                {/* CINEMATIC OVERLAY */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black
                    via-black/10
                    to-transparent
                  "
                />

                {/* IMAGE HIGHLIGHT */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.10),transparent_35%)]
                    opacity-70
                  "
                />

                {/* RED EDGE GLOW */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0
                    h-32
                    bg-gradient-to-t
                    from-red-600/10
                    to-transparent
                    opacity-0
                    transition-opacity
                    duration-700
                    group-hover:opacity-100
                  "
                />

              </div>

              {/* ====================================================
                  CAPTION
                  ==================================================== */}

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  p-6
                  md:p-8
                "
              >

                <div
                  className="
                    translate-y-2
                    transition-transform
                    duration-500
                    group-hover:translate-y-0
                  "
                >

                  <p
                    className="
                      font-display
                      text-lg
                      font-semibold
                      tracking-wide
                      text-white
                    "
                  >
                    Artistry in Motorsport
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-white/50
                    "
                  >
                    Where performance becomes expression.
                  </p>

                </div>

              </div>

              {/* CORNER DETAIL */}

              <div
                className="
                  absolute
                  right-5
                  top-5
                  flex
                  size-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-black/30
                  text-xs
                  text-white/60
                  backdrop-blur-sm
                  transition-all
                  duration-500
                  group-hover:border-red-500/60
                  group-hover:text-red-500
                "
              >
                ↗
              </div>

            </div>
          </Reveal>

        </div>
      </div>
    </section>
  )
}
