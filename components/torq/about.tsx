'use client'

import { useEffect, useRef, useState } from 'react'
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
  const imageRef = useRef<HTMLDivElement>(null)
  const [imageVisible, setImageVisible] = useState(false)

  useEffect(() => {
    const element = imageRef.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.2,
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Subtle section atmosphere */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.04] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ======================================================== */}
          {/* CONTENT                                                   */}
          {/* ======================================================== */}

          <Reveal>
            <p className="font-display text-sm tracking-[0.3em] text-accent uppercase">
              Africa&apos;s Biggest Motorsport Experience
            </p>

            <h2 className="font-display mt-4 text-4xl font-bold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
              Not Just an Event.
              <br />
              <span className="text-red-500">
                A Motorsport Experience.
              </span>
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <Reveal delay={100}>
                <p>
                  TOR&apos;Q is Africa&apos;s premier motorsport festival,
                  bringing together drifting, burnouts, stunt riding, luxury
                  automobiles, motorsport simulators, music, food, fashion and
                  creator culture into one unforgettable destination.
                </p>
              </Reveal>

              <Reveal delay={180}>
                <p>
                  Designed to inspire enthusiasts and newcomers alike, TOR&apos;Q
                  transforms motorsport into a shared cultural experience—where
                  every arena tells a different story and every visitor becomes
                  part of the spectacle.
                </p>
              </Reveal>
            </div>

            {/* ====================================================== */}
            {/* STATS                                                    */}
            {/* ====================================================== */}

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              {STATS.map((stat, index) => (
                <Reveal
                  key={stat.label}
                  delay={260 + index * 100}
                >
                  <div className="group">
                    <dt className="font-display text-3xl font-bold text-foreground transition-transform duration-500 group-hover:-translate-y-1 sm:text-4xl">
                      {stat.value}
                    </dt>

                    <dd className="mt-1 text-xs tracking-wide text-muted-foreground uppercase">
                      {stat.label}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </Reveal>

          {/* ======================================================== */}
          {/* IMAGE                                                     */}
          {/* ======================================================== */}

          <Reveal delay={180}>
            <div
              ref={imageRef}
              className="relative overflow-hidden rounded-lg border border-border"
            >
              <div
                className={`
                  relative aspect-[4/5] overflow-hidden
                  transition-all duration-[1400ms]
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  ${
                    imageVisible
                      ? 'scale-100 opacity-100'
                      : 'scale-[1.08] opacity-0'
                  }
                `}
              >
                <img
                  src="/images/about.png"
                  alt="A race car and driver silhouette lit by a single golden beam of light"
                  className={`
                    h-full w-full object-cover
                    transition-transform duration-[8000ms]
                    ease-out
                    ${
                      imageVisible
                        ? 'scale-100'
                        : 'scale-110'
                    }
                  `}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />

                {/* Subtle image highlight */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.08),transparent_35%)]" />
              </div>

              {/* ==================================================== */}
              {/* IMAGE CAPTION                                          */}
              {/* ==================================================== */}

              <div
                className={`
                  absolute bottom-6 left-6 right-6
                  transition-all duration-1000 delay-500
                  ${
                    imageVisible
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-5 opacity-0'
                  }
                `}
              >
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
