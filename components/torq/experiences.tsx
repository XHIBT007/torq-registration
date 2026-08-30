'use client'

import {
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
      {/* ======================================================
          ATMOSPHERE
          ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[500px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-red-600/[0.06]
          blur-[140px]
        "
      />

      {/* ======================================================
          HEADER
          ====================================================== */}

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-6
          md:px-10
        "
      >
        <div
          className="
            flex
            items-end
            justify-between
            gap-8
          "
        >
          <div>
            <p
              className="
                mb-5
                text-xs
                font-bold
                uppercase
                tracking-[0.4em]
                text-red-500
              "
            >
              The TOR&apos;Q Experience
            </p>

            <h2
              className="
                text-4xl
                font-black
                uppercase
                leading-[0.88]
                tracking-[-0.04em]
                sm:text-5xl
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
                mt-6
                max-w-xl
                text-base
                leading-7
                text-white/45
                md:text-lg
              "
            >
              Six experiences. One destination.
              Move through the world of TOR&apos;Q.
            </p>
          </div>

          <div
            className="
              hidden
              text-right
              md:block
            "
          >
            <p
              className="
                text-[10px]
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
              {String(
                EXPERIENCES.length,
              ).padStart(2, '0')}{' '}
              Experiences
            </p>
          </div>
        </div>
      </div>

      {/* ======================================================
          INDEPENDENT HORIZONTAL JOURNEY
          ====================================================== */}

      <div className="relative mt-16 md:mt-20">

        {/* LEFT FADE */}

        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-10
            h-full
            w-16
            bg-gradient-to-r
            from-black
            to-transparent
            md:w-28
          "
        />

        {/* RIGHT FADE */}

        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            z-10
            h-full
            w-16
            bg-gradient-to-l
            from-black
            to-transparent
            md:w-28
          "
        />

        {/* ==================================================
            SCROLLABLE RAIL
            ================================================== */}

        <div
          className="
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
          <div
            className="
              flex
              w-max
              gap-5
            "
          >
            {EXPERIENCES.map(
              (
                experience,
                index,
              ) => {
                const Icon =
                  ICONS[index] ??
                  Flame

                return (
                  <article
                    key={
                      `${experience.number}-${index}`
                    }
                    className="
                      group
                      relative
                      h-[390px]
                      w-[82vw]
                      shrink-0
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/10
                      bg-neutral-950
                      sm:h-[420px]
                      sm:w-[70vw]
                      md:h-[430px]
                      md:w-[58vw]
                      md:max-w-[860px]
                    "
                  >

                    {/* IMAGE */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-cover
                        bg-center
                        opacity-45
                        transition-all
                        duration-700
                        group-hover:scale-105
                        group-hover:opacity-60
                      "
                      style={{
                        backgroundImage:
                          `url(${experience.image})`,
                      }}
                    />

                    {/* GRADIENTS */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-black
                        via-black/65
                        to-black/10
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black
                        via-transparent
                        to-transparent
                      "
                    />

                    {/* CONTENT */}

                    <div
                      className="
                        relative
                        flex
                        h-full
                        flex-col
                        justify-between
                        p-7
                        sm:p-8
                        lg:p-10
                      "
                    >

                      {/* TOP */}

                      <div
                        className="
                          flex
                          items-start
                          justify-between
                        "
                      >
                        <div
                          className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/20
                            bg-white/5
                          "
                        >
                          <Icon
                            size={21}
                            strokeWidth={1.7}
                          />
                        </div>

                        <span
                          className="
                            text-7xl
                            font-black
                            leading-none
                            text-white/[0.06]
                          "
                        >
                          {
                            experience.number
                          }
                        </span>
                      </div>

                      {/* CONTENT */}

                      <div className="max-w-xl">

                        <div
                          className="
                            mb-4
                            flex
                            items-center
                            gap-3
                          "
                        >
                          <span
                            className="
                              text-[10px]
                              font-bold
                              uppercase
                              tracking-[0.3em]
                              text-red-500
                            "
                          >
                            {
                              experience.category
                            }
                          </span>

                          <span
                            className="
                              h-1
                              w-1
                              rounded-full
                              bg-white/30
                            "
                          />

                          <span
                            className="
                              text-[9px]
                              uppercase
                              tracking-[0.2em]
                              text-white/40
                            "
                          >
                            {
                              experience.label
                            }
                          </span>
                        </div>

                        <h3
                          className="
                            text-4xl
                            font-black
                            uppercase
                            leading-none
                            tracking-tight
                            sm:text-5xl
                          "
                        >
                          {
                            experience.title
                          }
                        </h3>

                        <p
                          className="
                            mt-5
                            max-w-lg
                            text-sm
                            leading-7
                            text-white/55
                          "
                        >
                          {
                            experience.description
                          }
                        </p>

                      </div>

                      {/* ARROW */}

                      <div
                        className="
                          absolute
                          bottom-7
                          right-7
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/20
                          transition-all
                          duration-500
                          group-hover:border-red-500
                          group-hover:bg-red-500
                          sm:bottom-8
                          sm:right-8
                        "
                      >
                        <ArrowUpRight
                          size={18}
                          className="
                            transition-transform
                            duration-500
                            group-hover:rotate-45
                          "
                        />
                      </div>
                    </div>

                    {/* RED ACCENT */}

                    <div
                      className="
                        absolute
                        bottom-0
                        left-0
                        h-[2px]
                        w-full
                        bg-red-500
                      "
                    />

                  </article>
                )
              },
            )}

          </div>
        </div>

      </div>

      {/* ======================================================
          HORIZONTAL SCROLL CUE
          ====================================================== */}

      <div
        className="
          mx-auto
          mt-7
          flex
          max-w-7xl
          items-center
          gap-4
          px-6
          md:px-10
        "
      >
        <div
          className="
            h-px
            flex-1
            bg-white/10
          "
        />

        <div
          className="
            flex
            shrink-0
            items-center
            gap-3
          "
        >
          <span
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.35em]
              text-white/25
            "
          >
            Swipe / Scroll horizontally
          </span>

          <ArrowUpRight
            size={13}
            className="
              rotate-45
              text-red-500
            "
          />
        </div>

        <div
          className="
            h-px
            flex-1
            bg-white/10
          "
        />
      </div>

    </section>
  )
}
