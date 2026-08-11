"use client"

import {
  ArrowUpRight,
  Car,
  Gamepad2,
  Music2,
  Bike,
  Flame,
} from "lucide-react"

const EXPERIENCES = [
  {
    number: "01",
    title: "DRIFT & BURNOUT",
    category: "MOTORSPORT",
    description:
      "Smoke. Sound. Sideways precision. Watch fearless drivers push performance machines to their limits in one of TOR'Q's most explosive spectacles.",
    icon: Flame,
    label: "RAW POWER",
  },
  {
    number: "02",
    title: "POWER BIKE STUNTS",
    category: "LIVE ACTION",
    description:
      "Two wheels. No limits. Precision riding, fearless stunts and incredible control delivered by some of the most daring riders on two wheels.",
    icon: Bike,
    label: "TWO-WHEEL ACTION",
  },
  {
    number: "03",
    title: "CARS ON THE RUNWAY",
    category: "AUTOMOTIVE ART",
    description:
      "Where automotive engineering becomes art. Performance cars, rare machines and automotive icons take centre stage in a runway built for them.",
    icon: Car,
    label: "AUTOMOTIVE ARTISTRY",
  },
  {
    number: "04",
    title: "MOTORSPORT THEATRE",
    category: "THE SPECTACLE",
    description:
      "An immersive arena where motorsport, storytelling, sound and technology come together to turn machines into unforgettable moments.",
    icon: Flame,
    label: "IMMERSIVE",
  },
  {
    number: "05",
    title: "SIM RACING",
    category: "DIGITAL MOTORSPORT",
    description:
      "Take the wheel and compete. TOR'Q brings competitive sim racing into the festival, connecting virtual drivers with the real world of motorsport.",
    icon: Gamepad2,
    label: "COMPETE",
  },
  {
    number: "06",
    title: "THE TOR'Q RAVE",
    category: "MUSIC & CULTURE",
    description:
      "When the engines stop, the energy doesn't. Music, lights, creators and car culture collide in one unforgettable celebration.",
    icon: Music2,
    label: "AFTER DARK",
  },
]

export function Experiences() {
  return (
    <section
      id="experiences"
      className="relative overflow-hidden bg-black py-24 text-white md:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-red-500">
              THE TOR'Q EXPERIENCE
            </p>

            <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.04em] md:text-7xl">
              More than
              <br />
              <span className="text-red-500">motorsport.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/50 md:text-right">
            Six experiences. One destination. Speed, machines, music,
            technology and culture collide to create a spectacle unlike
            anything else.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {EXPERIENCES.map((experience) => {
            const Icon = experience.icon

            return (
              <article
                key={experience.number}
                className="group relative min-h-[390px] overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-7 transition-all duration-500 hover:border-red-500/50 md:min-h-[420px]"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Number */}
                <div className="absolute right-5 top-2 select-none text-[120px] font-black leading-none text-white/[0.025] transition-transform duration-700 group-hover:scale-110">
                  {experience.number}
                </div>

                {/* Icon */}
                <div className="relative mb-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-all duration-300 group-hover:border-red-500 group-hover:bg-red-500">
                  <Icon size={21} strokeWidth={1.7} />
                </div>

                {/* Content */}
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

                  <h3 className="mb-5 text-3xl font-black uppercase tracking-tight md:text-4xl">
                    {experience.title}
                  </h3>

                  <p className="max-w-lg text-sm leading-7 text-white/50">
                    {experience.description}
                  </p>
                </div>

                {/* Explore button */}
                <div className="absolute bottom-7 right-7 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-red-500 group-hover:bg-red-500">
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:rotate-45"
                  />
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-500 transition-all duration-500 group-hover:w-full" />
              </article>
            )
          })}
        </div>

        {/* Closing statement */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="max-w-3xl text-xl font-medium leading-8 text-white/60 md:text-2xl">
            Come for the cars.
            <span className="text-white"> Stay for the experience.</span>
            <span className="text-red-500"> Leave with a story.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
