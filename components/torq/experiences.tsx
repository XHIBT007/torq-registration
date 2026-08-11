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
      "Smoke, sound and sideways precision. Watch some of the region's most fearless drivers push performance machines beyond the ordinary.",
    icon: Flame,
    size: "large",
  },
  {
    number: "02",
    title: "POWER BIKE STUNTS",
    category: "LIVE ACTION",
    description:
      "Two wheels. No limits. Precision riding, fearless stunts and raw energy brought to the heart of TOR'Q.",
    icon: Bike,
    size: "small",
  },
  {
    number: "03",
    title: "CARS ON THE RUNWAY",
    category: "AUTOMOTIVE ART",
    description:
      "A celebration of engineering, design and automotive beauty. Performance cars leave the showroom and take centre stage.",
    icon: Car,
    size: "large",
  },
  {
    number: "04",
    title: "MOTORSPORT THEATRE",
    category: "THE SPECTACLE",
    description:
      "An immersive arena where motorsport, storytelling, sound and technology come together to create something bigger than a race.",
    icon: Flame,
    size: "small",
  },
  {
    number: "05",
    title: "SIM RACING",
    category: "DIGITAL MOTORSPORT",
    description:
      "Take the wheel. Compete against the best. TOR'Q brings competitive sim racing into the motorsport experience.",
    icon: Gamepad2,
    size: "small",
  },
  {
    number: "06",
    title: "THE TOR'Q RAVE",
    category: "MUSIC & CULTURE",
    description:
      "When the engines stop, the energy doesn't. Music, lights, creators and car culture collide in one unforgettable celebration.",
    icon: Music2,
    size: "large",
  },
]

export function Experiences() {
  return (
    <section
      id="experiences"
      className="relative overflow-hidden bg-black py-24 text-white md:py-32"
    >
      {/* Ambient background */}
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
            Six experiences. One destination. TOR'Q brings speed, machines,
            music, technology and culture together to create a spectacle unlike
            anything else.
          </p>
        </div>

        {/* Experience grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {EXPERIENCES.map((experience) => {
            const Icon = experience.icon

            return (
              <article
                key={experience.number}
                className={`group relative min-h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-7 transition-all duration-500 hover:border-red-500/50 ${
                  experience.size === "large"
                    ? "md:min-h-[460px]"
                    : "md:min-h-[360px]"
                }`}
              >
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Large number */}
                <div className="absolute right-5 top-2 select-none text-[120px] font-black leading-none text-white/[0.025] transition-transform duration-700 group-hover:scale-110">
                  {experience.number}
                </div>

                {/* Icon */}
                <div className="relative mb-12 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-all duration-300 group-hover:border-red-500 group-hover:bg-red-500">
                  <Icon size={21} strokeWidth={1.7} />
                </div>

                {/* Content */}
                <div className="relative max-w-xl">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
                    {experience.category}
                  </p>

                  <h3 className="mb-5 text-3xl font-black uppercase tracking-tight md:text-4xl">
                    {experience.title}
                  </h3>

                  <p className="max-w-lg text-sm leading-7 text-white/50">
                    {experience.description}
                  </p>
                </div>

                {/* Explore */}
                <div className="absolute bottom-7 right-7 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-red-500 group-hover:bg-red-500">
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:rotate-45"
                  />
                </div>

                {/* Bottom line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-500 transition-all duration-500 group-hover:w-full" />
              </article>
            )
          })}
        </div>

        {/* Bottom statement */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-lg font-medium leading-8 text-white/70">
              Come for the cars.
              <span className="text-white"> Stay for the experience.</span>
              <span className="text-red-500"> Leave with a story.</span>
            </p>

            <a
              href="#top"
              className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
            >
              Back to top
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all group-hover:border-red-500 group-hover:bg-red-500">
                <ArrowUpRight size={15} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
