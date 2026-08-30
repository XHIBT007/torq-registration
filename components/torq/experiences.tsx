'use client'

import {
  ArrowUpRight,
  Bike,
  Car,
  Flame,
  Gamepad2,
  Music2,
} from 'lucide-react'
import {
  useEffect,
  useRef,
  useState,
} from 'react'

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
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const [progress, setProgress] = useState(0)
  const [distance, setDistance] = useState(0)

  useEffect(() => {
    let frame = 0

    const measure = () => {
      const track = trackRef.current

      if (!track) return

      /*
       * Measure how far the track actually needs
       * to travel horizontally.
       */
      const trackWidth = track.scrollWidth

      const viewportWidth = window.innerWidth

      const horizontalDistance = Math.max(
        0,
        trackWidth -
          viewportWidth +
          viewportWidth * 0.08,
      )

      setDistance(horizontalDistance)
    }

    const update = () => {
      frame = 0

      const section = sectionRef.current

      if (!section) return

      const rect =
        section.getBoundingClientRect()

      /*
       * The section remains a normal vertical section.
       *
       * We simply calculate where the user is
       * within it.
       */
      const sectionHeight =
        section.offsetHeight

      const viewportHeight =
        window.innerHeight

      const scrollable =
        sectionHeight -
        viewportHeight

      if (scrollable <= 0) {
        setProgress(0)
        return
      }

      const travelled =
        Math.max(
          0,
          Math.min(
            scrollable,
            -rect.top,
          ),
        )

      setProgress(
        travelled / scrollable,
      )
    }

    const handleScroll = () => {
      if (!frame) {
        frame =
          window.requestAnimationFrame(
            update,
          )
      }
    }

    const handleResize = () => {
      measure()
      update()
    }

    measure()
    update()

    window.addEventListener(
      'scroll',
      handleScroll,
      {
        passive: true,
      },
    )

    window.addEventListener(
      'resize',
      handleResize,
    )

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll,
      )

      window.removeEventListener(
        'resize',
        handleResize,
      )

      if (frame) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [])

  /*
   * Continuous horizontal movement.
   *
   * Nothing here locks the page or intercepts
   * the user's scrolling.
   */
  const translateX =
    progress * distance

  return (
    <section
      ref={sectionRef}
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

      {/* ========================================================
          ATMOSPHERE
          ======================================================== */}

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

      {/* ========================================================
          CONTENT
          ======================================================== */}

      <div className="relative">

        {/* ======================================================
            HEADER
            ====================================================== */}

        <div
          className="
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
                  text-white/30
                "
              >
                {String(
                  EXPERIENCES.length,
                ).padStart(2, '0')}
                {' '}
                Experiences
              </p>
            </div>

          </div>
        </div>

        {/* ======================================================
            HORIZONTAL JOURNEY
            ====================================================== */}

        <div
          className="
            relative
            mt-14
            overflow-hidden
            md:mt-20
          "
        >

          {/* DESKTOP TRACK */}

          <div
            ref={trackRef}
            className="
              hidden
              md:block
            "
            style={{
              transform:
                `translate3d(${-translateX}px, 0, 0)`,
            }}
          >
            <div
              className="
                flex
                gap-6
                pl-[8vw]
                pr-[8vw]
              "
            >

              {EXPERIENCES.map(
                (experience, index) => {
                  const Icon =
                    ICONS[index] ?? Flame

                  return (
                    <article
                      key={
                        experience.number
                      }
                      className="
                        group
                        relative
                        h-[430px]
                        w-[58vw]
                        max-w-[820px]
                        shrink-0
                        overflow-hidden
                        rounded-2xl
                        border
                        border-white/10
                        bg-neutral-950
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

                      {/* OVERLAYS */}

                      <div
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-r
                          from-black
                          via-black/60
                          to-transparent
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
                          p-8
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
                              text-white/[0.07]
                            "
                          >
                            {
                              experience.number
                            }
                          </span>
                        </div>

                        {/* BOTTOM */}

                        <div
                          className="
                            max-w-xl
                          "
                        >

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
                              lg:text-5xl
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
                            bottom-8
                            right-8
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

          {/* ====================================================
              MOBILE
              ==================================================== */}

          <div
            className="
              flex
              gap-4
              overflow-x-auto
              px-6
              pb-3
              md:hidden
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >

            {EXPERIENCES.map(
              (experience, index) => {
                const Icon =
                  ICONS[index] ?? Flame

                return (
                  <article
                    key={
                      experience.number
                    }
                    className="
                      relative
                      h-[390px]
                      w-[82vw]
                      shrink-0
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/10
                      bg-neutral-950
                    "
                  >

                    <div
                      className="
                        absolute
                        inset-0
                        bg-cover
                        bg-center
                        opacity-45
                      "
                      style={{
                        backgroundImage:
                          `url(${experience.image})`,
                      }}
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black
                        via-black/50
                        to-transparent
                      "
                    />

                    <div
                      className="
                        relative
                        flex
                        h-full
                        flex-col
                        justify-between
                        p-6
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                        "
                      >
                        <div
                          className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/20
                            bg-white/5
                          "
                        >
                          <Icon size={18} />
                        </div>

                        <span
                          className="
                            text-5xl
                            font-black
                            text-white/[0.07]
                          "
                        >
                          {
                            experience.number
                          }
                        </span>
                      </div>

                      <div>

                        <p
                          className="
                            mb-3
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.3em]
                            text-red-500
                          "
                        >
                          {
                            experience.category
                          }
                        </p>

                        <h3
                          className="
                            text-3xl
                            font-black
                            uppercase
                            leading-none
                          "
                        >
                          {
                            experience.title
                          }
                        </h3>

                        <p
                          className="
                            mt-4
                            text-sm
                            leading-6
                            text-white/55
                          "
                        >
                          {
                            experience.description
                          }
                        </p>

                      </div>

                    </div>

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

        {/* ======================================================
            BOTTOM LABEL
            ====================================================== */}

        <div
          className="
            mx-auto
            mt-8
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

          <p
            className="
              shrink-0
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.35em]
              text-white/25
            "
          >
            Scroll to explore
          </p>

          <div
            className="
              h-px
              flex-1
              bg-white/10
            "
          />
        </div>

      </div>
    </section>
  )
}
