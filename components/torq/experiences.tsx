'use client'

import {
  ArrowUpRight,
  Car,
  Gamepad2,
  Music2,
  Bike,
  Flame,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { EXPERIENCES } from '@/lib/torq-data'
import { Reveal } from './reveal'

const ICONS = [
  Flame,
  Bike,
  Car,
  Flame,
  Gamepad2,
  Music2,
]

export function Experiences() {
  return (
    <section
      id="experiences"
      className="relative overflow-hidden bg-black py-24 text-white md:py-32"
    >
      {/* ============================================================ */}
      {/* ATMOSPHERE                                                     */}
      {/* ============================================================ */}

      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[140px]" />

      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-red-600/[0.04] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

        {/* ========================================================== */}
        {/* HEADER                                                       */}
        {/* ========================================================== */}

        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">

          <Reveal>
            <div className="max-w-3xl">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-red-500">
                THE TOR&apos;Q EXPERIENCE
              </p>

              <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.04em] md:text-7xl">
                More than
                <br />
                <span className="text-red-500">
                  motorsport.
                </span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <p className="max-w-sm text-sm leading-7 text-white/50 md:text-right">
              Six experiences. One destination. Speed, machines, music,
              technology and culture collide to create a spectacle unlike
              anything else.
            </p>
          </Reveal>
        </div>

        {/* ========================================================== */}
        {/* EXPERIENCE GRID                                             */}
        {/* ========================================================== */}

        <div className="grid gap-4 md:grid-cols-2">
          {EXPERIENCES.map((experience, index) => {
            const Icon = ICONS[index] ?? Flame

            return (
              <ExperienceCard
                key={experience.number}
                experience={experience}
                Icon={Icon}
                index={index}
              />
            )
          })}
        </div>

        {/* ========================================================== */}
        {/* CLOSING STATEMENT                                           */}
        {/* ========================================================== */}

        <Reveal delay={150}>
          <div className="mt-16 border-t border-white/10 pt-8">
            <p className="max-w-3xl text-xl font-medium leading-8 text-white/60 md:text-2xl">
              Come for the cars.
              <span className="text-white">
                {' '}
                Stay for the experience.
              </span>
              <span className="text-red-500">
                {' '}
                Leave with a story.
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ================================================================== */
/* EXPERIENCE CARD                                                    */
/* ================================================================== */

function ExperienceCard({
  experience,
  Icon,
  index,
}: {
  experience: (typeof EXPERIENCES)[number]
  Icon: typeof Flame
  index: number
}) {
  const cardRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = cardRef.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.18,
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <article
      ref={cardRef}
      className={`
        group relative min-h-[390px] overflow-hidden rounded-2xl
        border border-white/10 bg-neutral-950 p-7
        transition-all duration-1000
        ease-[cubic-bezier(0.22,1,0.36,1)]
        md:min-h-[420px]
        ${
          visible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-12 opacity-0'
        }
      `}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* ========================================================== */}
      {/* BACKGROUND IMAGE                                            */}
      {/* ========================================================== */}

      <div
        className={`
          absolute inset-0 bg-cover bg-center
          transition-all duration-[1400ms]
          ease-out
          ${
            visible
              ? 'scale-100 opacity-20'
              : 'scale-110 opacity-0'
          }
          group-hover:scale-105
          group-hover:opacity-30
        `}
        style={{
          backgroundImage: `url(${experience.image})`,
        }}
      />

      {/* Image darkening */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/95" />

      {/* ========================================================== */}
      {/* RED LIGHT SWEEP                                            */}
      {/* ========================================================== */}

      <div
        className="
          pointer-events-none absolute -left-1/2 top-0
          h-full w-1/3
          -skew-x-12
          bg-gradient-to-r
          from-transparent
          via-red-500/[0.08]
          to-transparent
          transition-transform duration-[1200ms]
          group-hover:translate-x-[500%]
        "
      />

      {/* ========================================================== */}
      {/* HOVER GLOW                                                  */}
      {/* ========================================================== */}

      <div
        className="
          pointer-events-none absolute inset-0
          bg-gradient-to-br
          from-red-600/10
          via-transparent
          to-transparent
          opacity-0
          transition-opacity duration-700
          group-hover:opacity-100
        "
      />

      {/* ========================================================== */}
      {/* NUMBER                                                      */}
      {/* ========================================================== */}

      <div
        className="
          absolute right-5 top-2 select-none
          text-[120px] font-black leading-none
          text-white/[0.025]
          transition-all duration-700
          group-hover:translate-x-[-8px]
          group-hover:text-red-500/[0.07]
        "
      >
        {experience.number}
      </div>

      {/* ========================================================== */}
      {/* ICON                                                        */}
      {/* ========================================================== */}

      <div
        className="
          relative mb-10 flex h-12 w-12
          items-center justify-center rounded-full
          border border-white/15 bg-white/5
          transition-all duration-500
          group-hover:rotate-[-8deg]
          group-hover:border-red-500
          group-hover:bg-red-500
          group-hover:shadow-[0_0_30px_rgba(239,68,68,0.25)]
        "
      >
        <Icon
          size={21}
          strokeWidth={1.7}
          className="transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* ========================================================== */}
      {/* CONTENT                                                     */}
      {/* ========================================================== */}

      <div className="relative max-w-xl">

        <div className="mb-4 flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
            {experience.category}
          </span>

          <span className="h-1 w-1 rounded-full bg-white/20" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">
            {experience.label}
          </span>
        </div>

        <h3 className="mb-5 text-3xl font-black uppercase tracking-tight transition-transform duration-500 group-hover:-translate-y-1 md:text-4xl">
          {experience.title}
        </h3>

        <p className="max-w-lg text-sm leading-7 text-white/50 transition-colors duration-500 group-hover:text-white/65">
          {experience.description}
        </p>
      </div>

      {/* ========================================================== */}
      {/* EXPLORE INDICATOR                                          */}
      {/* ========================================================== */}

      <div
        className="
          absolute bottom-7 right-7
          flex h-11 w-11 items-center justify-center
          rounded-full border border-white/15
          transition-all duration-500
          group-hover:border-red-500
          group-hover:bg-red-500
          group-hover:scale-110
        "
      >
        <ArrowUpRight
          size={18}
          className="
            transition-transform duration-500
            group-hover:rotate-45
          "
        />
      </div>

      {/* ========================================================== */}
      {/* BOTTOM ACCENT                                               */}
      {/* ========================================================== */}

      <div
        className="
          absolute bottom-0 left-0
          h-[2px] w-0
          bg-red-500
          shadow-[0_0_12px_rgba(239,68,68,0.7)]
          transition-all duration-700
          group-hover:w-full
        "
      />
    </article>
  )
}
