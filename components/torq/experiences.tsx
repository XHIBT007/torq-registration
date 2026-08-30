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
  const [horizontalDistance, setHorizontalDistance] =
    useState(0)

  /* ============================================================
     SCROLL ENGINE
     ============================================================ */

  useEffect(() => {
    let animationFrame = 0

    const measure = () => {
      const track = trackRef.current

      if (!track) return

      /*
       * Measure the actual width of the experience track.
       *
       * This prevents us from guessing with arbitrary vw values.
       */
      const distance = Math.max(
        0,
        track.scrollWidth -
          window.innerWidth +
          window.innerWidth * 0.18,
      )

      setHorizontalDistance(distance)
    }

    const update = () => {
      animationFrame = 0

      const section = sectionRef.current

      if (!section) return

      const rect = section.getBoundingClientRect()

      const scrollDistance =
        section.offsetHeight -
        window.innerHeight

      if (scrollDistance <= 0) {
        setProgress(0)
        return
      }

      /*
       * How far the user has travelled through
       * the pinned Experiences section.
       */
      const travelled = Math.max(
        0,
        Math.min(
          scrollDistance,
          -rect.top,
        ),
      )

      const nextProgress =
        travelled / scrollDistance

      setProgress(nextProgress)
    }

    const handleScroll = () => {
      if (!animationFrame) {
        animationFrame =
          window.requestAnimationFrame(update)
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
      { passive: true },
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

      if (animationFrame) {
        window.cancelAnimationFrame(
          animationFrame,
        )
      }
    }
  }, [])

  /* ============================================================
     CONTINUOUS HORIZONTAL MOVEMENT
     ============================================================ */

  const translateX =
    progress * horizontalDistance

  /*
   * Continuous position of the "focus".
   *
   * This is deliberately NOT rounded.
   *
   * Rounding this value was one of the things
   * making the journey feel like it was stopping.
   */
  const activePosition =
    progress *
    Math.max(
      0,
      EXPERIENCES.length - 1,
    )

  return (
    <section
      ref={sectionRef}
      id="experiences"
      className="
        relative
        h-[300vh]
        bg-black
        text-white
      "
    >
      <div className="sticky top-0 h-screen overflow-hidden">

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

        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            right-0
            h-[400px]
            w-[400px]
            rounded-full
            bg-red-600/[0.04]
            blur-[120px]
          "
        />

        {/* ======================================================
            SECTION HEADER
            ====================================================== */}

        <div
          className="
            absolute
            left-0
            right-0
            top-0
            z-20
            mx-auto
            max-w-7xl
            px-6
            pt-14
            md:px-10
            md:pt-20
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
                  mb-4
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
            </div>

            {/* Counter */}

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
                Journey
              </p>

              <p
                className="
                  mt-1
                  text-2xl
                  font-black
                "
              >
                {String(
                  Math.min(
                    EXPERIENCES.length,
                    Math.floor(
                      activePosition + 1.5,
                    ),
                  ),
                ).padStart(2, '0')}

                <span
                  className="
                    text-white/20
                  "
                >
                  {' '}
                  /{' '}
                  {String(
                    EXPERIENCES.length,
                  ).padStart(2, '0')}
                </span>
              </p>
            </div>

          </div>
        </div>

        {/* ======================================================
            DESKTOP HORIZONTAL TRACK
            ====================================================== */}

        <div
          ref={trackRef}
          className="
            absolute
            left-0
            top-[57%]
            hidden
            -translate-y-1/2
            md:block
          "
          style={{
            transform:
              `translate3d(${-translateX}px, -50%, 0)`,
          }}
        >
          <div
            className="
              flex
              items-center
              gap-6
              pl-[8vw]
              pr-[18vw]
            "
          >

            {EXPERIENCES.map(
              (experience, index) => {
                const Icon =
                  ICONS[index] ?? Flame

                /*
                 * Continuous distance from the current
                 * scroll position.
                 */
                const distance =
                  Math.abs(
                    activePosition - index,
                  )

                /*
                 * Very subtle visual emphasis.
                 *
                 * The movement itself NEVER depends on this.
                 */
                const scale = Math.max(
                  0.94,
                  1 -
                    distance * 0.035,
                )

                const opacity = Math.max(
                  0.5,
                  1 -
                    distance * 0.2,
                )

                const isNearActive =
                  distance < 0.5

                return (
                  <article
                    key={experience.number}
                    className="
                      group
                      relative
                      h-[390px]
                      w-[58vw]
                      max-w-[820px]
                      shrink-0
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/10
                      bg-neutral-950
                      transition-[opacity,transform]
                      duration-300
                      ease-out
                    "
                    style={{
                      transform:
                        `scale(${scale})`,
                      opacity,
                    }}
                  >

                    {/* ==================================================
                        IMAGE
                        ================================================== */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-cover
                        bg-center
                        opacity-40
                        transition-all
                        duration-700
                        group-hover:scale-105
                        group-hover:opacity-55
                      "
                      style={{
                        backgroundImage:
                          `url(${experience.image})`,
                      }}
                    />

                    {/* ==================================================
                        GRADIENT
                        ================================================== */}

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

                    {/* ==================================================
                        CONTENT
                        ================================================== */}

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
                            text-white/[0.06]
                          "
                        >
                          {experience.number}
                        </span>
                      </div>

                      {/* BOTTOM */}

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
                            {experience.category}
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
                            {experience.label}
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
                          {experience.title}
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
                          {experience.description}
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

                    {/* ==================================================
                        ACTIVE ACCENT
                        ================================================== */}

                    <div
                      className="
                        absolute
                        bottom-0
                        left-0
                        h-[2px]
                        bg-red-500
                        transition-opacity
                        duration-300
                      "
                      style={{
                        opacity:
                          isNearActive
                            ? 1
                            : 0,
                      }}
                    />

                  </article>
                )
              },
            )}

          </div>
        </div>

        {/* ======================================================
            MOBILE HORIZONTAL JOURNEY
            ====================================================== */}

        <div
          className="
            absolute
            left-0
            right-0
            top-[52%]
            -translate-y-1/2
            md:hidden
          "
        >
          <div
            className="
              flex
              snap-x
              snap-mandatory
              gap-4
              overflow-x-auto
              px-6
              pb-4
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
                    key={experience.number}
                    className="
                      relative
                      h-[370px]
                      w-[82vw]
                      shrink-0
                      snap-center
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
                        opacity-40
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
                        via-black/55
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
                          {experience.number}
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
                          {experience.category}
                        </p>

                        <h3
                          className="
                            text-3xl
                            font-black
                            uppercase
                            leading-none
                          "
                        >
                          {experience.title}
                        </h3>

                        <p
                          className="
                            mt-4
                            text-sm
                            leading-6
                            text-white/55
                          "
                        >
                          {experience.description}
                        </p>

                      </div>

                    </div>

                  </article>
                )
              },
            )}

          </div>
        </div>

        {/* ======================================================
            PROGRESS BAR
            ====================================================== */}

        <div
          className="
            absolute
            bottom-9
            left-6
            right-6
            z-20
            md:left-10
            md:right-10
          "
        >

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <span
              className="
                text-[9px]
                font-bold
                tracking-[0.25em]
                text-white/40
              "
            >
              01
            </span>

            <div
              className="
                relative
                h-px
                flex-1
                overflow-hidden
                bg-white/10
              "
            >
              <div
                className="
                  absolute
                  inset-y-0
                  left-0
                  bg-red-500
                "
                style={{
                  width:
                    `${progress * 100}%`,
                }}
              />
            </div>

            <span
              className="
                text-[9px]
                font-bold
                tracking-[0.25em]
                text-white/40
              "
            >
              {String(
                EXPERIENCES.length,
              ).padStart(2, '0')}
            </span>

          </div>

          <p
            className="
              mt-3
              text-center
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.35em]
              text-white/25
              md:text-[9px]
            "
          >
            Scroll to explore
          </p>

        </div>

      </div>
    </section>
  )
}
