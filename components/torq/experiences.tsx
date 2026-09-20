'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Bike,
  Car,
  Flame,
  Gamepad2,
  Music2,
} from 'lucide-react'

import { EXPERIENCES } from '@/lib/torq-data'

const ICONS = [
  Flame,
  Bike,
  Car,
  Flame,
  Gamepad2,
  Music2,
]

export function Experiences() {
  const railRef = useRef<HTMLDivElement>(null)

  const cardRefs = useRef<(HTMLElement | null)[]>([])

  const [activeIndex, setActiveIndex] = useState(0)

  /* ================================================================
     ACTIVE CARD DETECTION
     ================================================================ */

  useEffect(() => {
    const rail = railRef.current

    if (!rail) return

    const observer = new IntersectionObserver(
      (entries) => {
        let strongestIndex = activeIndex
        let strongestRatio = 0

        entries.forEach((entry) => {
          const index = cardRefs.current.findIndex(
            (element) => element === entry.target,
          )

          if (
            index !== -1 &&
            entry.isIntersecting &&
            entry.intersectionRatio > strongestRatio
          ) {
            strongestRatio = entry.intersectionRatio
            strongestIndex = index
          }
        })

        if (strongestRatio > 0.55) {
          setActiveIndex(strongestIndex)
        }
      },
      {
        root: rail,
        threshold: [0.55, 0.7, 0.85],
      },
    )

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [activeIndex])

  return (
    <section
      id="experiences"
      className="
        relative
        overflow-hidden
        bg-black
        py-24
        text-white
        md:py-32
      "
    >
      {/* ==========================================================
          ATMOSPHERE
          ========================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[460px]
          w-[680px]
          -translate-x-1/2
          rounded-full
          bg-red-600/[0.045]
          blur-[130px]
        "
      />

      {/* ==========================================================
          INTRO
          ========================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex items-end justify-between gap-8">
          <div className="max-w-3xl">
            <p
              className="
                mb-5
                text-xs
                font-bold
                uppercase
                tracking-[0.32em]
                text-red-500
                sm:text-sm
              "
            >
              The TOR&apos;Q Experience
            </p>

            <h2
              className="
                text-5xl
                font-black
                uppercase
                leading-[0.88]
                tracking-[-0.04em]
                sm:text-6xl
                md:text-7xl
              "
            >
              More than
              <br />

              <span className="text-red-500">
                motorsport.
              </span>
            </h2>

            <p
              className="
                mt-7
                max-w-xl
                text-base
                leading-7
                text-white/45
                md:text-lg
              "
            >
              {EXPERIENCES.length} experiences.
              One destination. Step into the world of
              TOR&apos;Q.
            </p>
          </div>

          {/* DESKTOP COUNTER */}

          <div className="hidden shrink-0 text-right md:block">
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-white/25
              "
            >
              Explore
            </p>

            <p
              className="
                mt-2
                text-sm
                font-bold
                uppercase
                tracking-wider
                text-white/50
              "
            >
              {String(activeIndex + 1).padStart(2, '0')}

              <span className="text-white/20">
                {' '}
                /{' '}
                {String(EXPERIENCES.length).padStart(2, '0')}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* ==========================================================
          EXPERIENCE RAIL
          ========================================================== */}

      <div className="relative mt-14 md:mt-20">
        {/* EDGE FADES */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-10
            hidden
            h-full
            w-24
            bg-gradient-to-r
            from-black
            to-transparent
            md:block
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            z-10
            hidden
            h-full
            w-24
            bg-gradient-to-l
            from-black
            to-transparent
            md:block
          "
        />

        <div
          ref={railRef}
          className="
            torq-scroll-rail
            overflow-x-auto
            overscroll-x-contain
            overscroll-y-none
            px-6
            pb-5
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            md:px-[8vw]
          "
        >
          <div className="flex w-max snap-x snap-mandatory gap-4 sm:gap-5 md:gap-6">
            {EXPERIENCES.map((experience, index) => {
              const Icon = ICONS[index] ?? Flame
              const isActive = index === activeIndex

              return (
                <article
                  key={`${experience.number}-${index}`}
                  ref={(element) => {
                    cardRefs.current[index] = element
                  }}
                  className={`
                    group
                    relative
                    h-[430px]
                    w-[82vw]
                    max-w-[380px]
                    shrink-0
                    snap-center
                    overflow-hidden
                    rounded-2xl
                    border
                    bg-neutral-950

                    sm:h-[460px]
                    sm:w-[66vw]
                    sm:max-w-[500px]

                    md:h-[500px]
                    md:w-[62vw]
                    md:max-w-[780px]

                    transition-[transform,opacity,border-color]
                    duration-500
                    ease-out
                    motion-reduce:transition-none

                    ${
                      isActive
                        ? 'scale-100 border-white/20 opacity-100'
                        : 'scale-[0.985] border-white/10 opacity-65 md:scale-[0.975]'
                    }
                  `}
                >
                  {/* ==================================================
                      IMAGE
                      ================================================== */}

                  <div
                    aria-hidden="true"
                    className="
                      absolute
                      inset-0
                      bg-cover
                      bg-center
                      opacity-50
                      transition-transform
                      duration-700
                      ease-out
                      motion-reduce:transition-none
                      group-hover:scale-[1.025]
                    "
                    style={{
                      backgroundImage: `url(${experience.image})`,
                    }}
                  />

                  {/* ==================================================
                      IMAGE TREATMENT
                      ================================================== */}

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-r
                      from-black
                      via-black/65
                      to-black/15
                    "
                  />

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black
                      via-black/10
                      to-transparent
                    "
                  />

                  {/* ==================================================
                      CARD CONTENT
                      ================================================== */}

                  <div
                    className="
                      relative
                      flex
                      h-full
                      flex-col
                      justify-between
                      p-6
                      sm:p-7
                      md:p-9
                    "
                  >
                    {/* TOP */}

                    <div className="flex items-start justify-between gap-6">
                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/15
                          bg-white/[0.06]
                          backdrop-blur-md
                          transition-colors
                          duration-300
                          motion-reduce:transition-none
                          group-hover:border-white/30
                          group-hover:bg-white/[0.1]
                        "
                      >
                        <Icon
                          className="h-5 w-5"
                          strokeWidth={1.7}
                        />
                      </div>

                      <span
                        aria-hidden="true"
                        className="
                          text-6xl
                          font-black
                          leading-none
                          tracking-[-0.06em]
                          text-white/[0.055]
                          sm:text-7xl
                        "
                      >
                        {experience.number}
                      </span>
                    </div>

                    {/* MAIN CONTENT */}

                    <div className="max-w-2xl">
                      <div className="mb-4 flex items-center gap-3">
                        <span
                          className="
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.3em]
                            text-red-500
                            sm:text-[10px]
                          "
                        >
                          {experience.category}
                        </span>

                        <span
                          aria-hidden="true"
                          className="
                            h-1
                            w-1
                            shrink-0
                            rounded-full
                            bg-white/25
                          "
                        />

                        <span
                          className="
                            truncate
                            text-[9px]
                            uppercase
                            tracking-[0.2em]
                            text-white/40
                          "
                        >
                          {experience.label}
                        </span>
                      </div>

                      <h3
                        className="
                          max-w-xl
                          text-4xl
                          font-black
                          uppercase
                          leading-[0.92]
                          tracking-[-0.035em]
                          sm:text-5xl
                        "
                      >
                        {experience.title}
                      </h3>

                      <p
                        className="
                          mt-5
                          max-w-xl
                          text-sm
                          leading-6
                          text-white/55
                          sm:text-base
                          sm:leading-7
                        "
                      >
                        {experience.description}
                      </p>
                    </div>

                    {/* CARD ACTION */}

                    <div
                      aria-hidden="true"
                      className="
                        absolute
                        bottom-6
                        right-6
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/20
                        bg-white/[0.04]
                        backdrop-blur-md
                        transition-all
                        duration-300
                        motion-reduce:transition-none
                        group-hover:border-white/35
                        group-hover:bg-white/[0.12]
                        sm:bottom-7
                        sm:right-7
                        md:bottom-9
                        md:right-9
                      "
                    >
                      <ArrowUpRight
                        className="
                          h-4
                          w-4
                          transition-transform
                          duration-300
                          motion-reduce:transition-none
                          group-hover:rotate-45
                        "
                      />
                    </div>
                  </div>

                  {/* ==================================================
                      ACTIVE EDGE
                      ================================================== */}

                  <div
                    aria-hidden="true"
                    className={`
                      pointer-events-none
                      absolute
                      bottom-0
                      left-0
                      h-[2px]
                      bg-red-500
                      transition-[width,opacity]
                      duration-500
                      motion-reduce:transition-none

                      ${
                        isActive
                          ? 'w-full opacity-100'
                          : 'w-1/4 opacity-25'
                      }
                    `}
                  />
                </article>
              )
            })}
          </div>
        </div>
      </div>

      {/* ==========================================================
          MOVEMENT CUE
          ========================================================== */}

      <div
        className="
          mx-auto
          mt-5
          flex
          max-w-7xl
          items-center
          gap-4
          px-6
          md:mt-7
          md:px-10
        "
      >
        <div className="h-px flex-1 bg-white/10" />

        <div className="flex shrink-0 items-center gap-3">
          <span
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.3em]
              text-white/30
              sm:text-[10px]
            "
          >
            Swipe to explore
          </span>

          <ArrowRight
            aria-hidden="true"
            className="h-3.5 w-3.5 text-red-500"
          />
        </div>

        <div className="h-px flex-1 bg-white/10" />
      </div>
    </section>
  )
}
