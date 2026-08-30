'use client'

import {
  ChevronDown,
  MapPin,
  Ticket,
} from 'lucide-react'
import {
  useEffect,
  useRef,
  useState,
} from 'react'

import { Button } from '@/components/ui/button'
import { EVENT } from '@/lib/torq-data'
import { Countdown } from './countdown'
import { useRegistration } from './registration'

export function Hero() {
  const { open } = useRegistration()

  const sectionRef =
    useRef<HTMLElement>(null)

  const [scrollProgress, setScrollProgress] =
    useState(0)

  useEffect(() => {
    let raf = 0

    const updateProgress = () => {
      raf = 0

      const section =
        sectionRef.current

      if (!section) return

      const rect =
        section.getBoundingClientRect()

      const scrollDistance =
        section.offsetHeight -
        window.innerHeight

      if (scrollDistance <= 0) {
        setScrollProgress(0)
        return
      }

      const progress =
        Math.min(
          1,
          Math.max(
            0,
            -rect.top /
              scrollDistance,
          ),
        )

      setScrollProgress(progress)
    }

    const onScroll = () => {
      if (!raf) {
        raf =
          window.requestAnimationFrame(
            updateProgress,
          )
      }
    }

    updateProgress()

    window.addEventListener(
      'scroll',
      onScroll,
      { passive: true },
    )

    window.addEventListener(
      'resize',
      updateProgress,
    )

    return () => {
      window.removeEventListener(
        'scroll',
        onScroll,
      )

      window.removeEventListener(
        'resize',
        updateProgress,
      )

      if (raf) {
        window.cancelAnimationFrame(
          raf,
        )
      }
    }
  }, [])

  /* ============================================================
     ANIMATION HELPERS
     ============================================================ */

  const clamp = (value: number) =>
    Math.min(
      1,
      Math.max(0, value),
    )

  const easeOut = (value: number) => {
    const t = clamp(value)

    return (
      1 -
      Math.pow(1 - t, 3)
    )
  }

  const easeInOut = (value: number) => {
    const t = clamp(value)

    return t < 0.5
      ? 4 * t * t * t
      : 1 -
          Math.pow(
            -2 * t + 2,
            3,
          ) /
            2
  }

  /* ============================================================
     LAYER 1 — TOR'Q OPENING
     ============================================================ */

  const logoMovement =
    easeInOut(
      scrollProgress / 0.95,
    )

  /*
   * Slightly less aggressive vertical
   * movement than the previous version.
   */
  const logoY =
    -64 * logoMovement

  /*
   * Logo begins fading while it is
   * moving upward.
   */
  const logoOpacity =
    1 -
    easeOut(
      (scrollProgress - 0.45) /
        0.50,
    )

  /*
   * "Welcome to" disappears a little
   * earlier than the logo.
   */
  const welcomeOpacity =
    1 -
    easeOut(
      scrollProgress / 0.28,
    )

  /*
   * Scroll instruction disappears early.
   */
  const scrollHintOpacity =
    1 -
    easeOut(
      scrollProgress / 0.20,
    )

  /* ============================================================
     LAYER 2 — MAIN HERO
     ============================================================ */

  const layerTwoOpacity =
    easeInOut(
      (scrollProgress - 0.52) /
        0.43,
    )

  /*
   * Background follows Layer 2.
   */
  const backgroundOpacity =
    easeOut(
      (scrollProgress - 0.45) /
        0.50,
    )

  return (
    <section
      ref={sectionRef}
      id="top"
      className="
        relative
        h-[150vh]
        bg-black
      "
    >

      {/* ======================================================
          CINEMATIC STAGE
          ====================================================== */}

      <div
        className="
          sticky
          top-0
          h-screen
          overflow-hidden
          bg-black
        "
      >

        {/* ====================================================
            BLACK BASE
            ==================================================== */}

        <div
          className="
            absolute
            inset-0
            bg-black
          "
        />

        {/* ====================================================
            BACKGROUND
            ==================================================== */}

        <div
          className="
            absolute
            inset-0
          "
          style={{
            opacity:
              backgroundOpacity,
          }}
        >
          <img
            src="/images/hero-drift-red-mustang.webp"
            alt=""
            aria-hidden="true"
            className="
              h-full
              w-full
              object-cover
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-black/65
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-black
              via-black/65
              to-transparent
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black
              via-black/15
              to-black/40
            "
          />
        </div>

        {/* ====================================================
            LAYER 2 — MAIN HERO
            ==================================================== */}

        <div
          className="
            absolute
            inset-0
            z-10
          "
          style={{
            opacity:
              layerTwoOpacity,
          }}
        >
          <div
            className="
              mx-auto
              flex
              h-full
              w-full
              max-w-7xl
              items-start
              px-6
              pb-6
              pt-[88px]
              sm:px-8
              sm:pt-28
              lg:items-center
              lg:px-10
              lg:pt-0
            "
          >
            <div
              className="
                w-full
                max-w-5xl
              "
            >

              {/* HEADLINE */}

              <h1
                className="
                  max-w-5xl
                  font-black
                  uppercase
                  leading-[0.86]
                  tracking-[-0.045em]
                  text-white
                  text-[3rem]
                  sm:text-6xl
                  md:text-7xl
                  lg:text-[6.5rem]
                "
              >
                <span className="block">
                  AFRICA&apos;S BIGGEST
                </span>

                <span className="block text-red-500">
                  MOTORSPORT
                </span>

                <span className="block">
                  SPECTACLE
                </span>
              </h1>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-5
                  max-w-2xl
                  text-[14px]
                  leading-[1.55]
                  text-white/70
                  sm:mt-7
                  sm:text-lg
                  sm:leading-8
                  md:text-xl
                "
              >
                A cinematic celebration of speed,
                sound and precision where drifting
                legends, stunt riders, performance cars
                and motorsport culture collide for one
                unforgettable experience.
              </p>

              {/* CTA */}

              <div
                className="
                  mt-6
                  flex
                  flex-col
                  gap-4
                  sm:mt-8
                  sm:flex-row
                  sm:items-center
                "
              >
                <Button
                  size="lg"
                  onClick={open}
                  className="
                    h-12
                    w-full
                    rounded-full
                    bg-red-600
                    px-7
                    text-sm
                    font-bold
                    text-white
                    hover:bg-red-500
                    sm:h-14
                    sm:w-auto
                    sm:px-8
                    sm:text-base
                  "
                >
                  <Ticket className="mr-2 h-5 w-5" />
                  REGISTER NOW
                </Button>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-white/70
                    sm:text-base
                  "
                >
                  <MapPin
                    className="
                      h-5
                      w-5
                      text-red-500
                    "
                  />

                  {EVENT.location}
                </div>
              </div>

              {/* STATS */}

              <div
                className="
                  mt-7
                  grid
                  grid-cols-4
                  gap-3
                  border-t
                  border-white/10
                  pt-6
                  sm:mt-9
                  sm:gap-6
                  sm:pt-7
                "
              >
                <HeroStat
                  value="100+"
                  label="Performance Cars"
                />

                <HeroStat
                  value="50+"
                  label="Drivers & Riders"
                />

                <HeroStat
                  value="3"
                  label="Days of Action"
                />

                <HeroStat
                  value="1"
                  label="Epic Experience"
                />
              </div>

              {/* COUNTDOWN */}

              <div
                className="
                  mt-6
                  sm:mt-9
                "
              >
                <p
                  className="
                    mb-3
                    text-[9px]
                    uppercase
                    tracking-[0.35em]
                    text-white/40
                    sm:mb-4
                    sm:text-[10px]
                  "
                >
                  Lights Out In
                </p>

                <Countdown
                  date={EVENT.date}
                />
              </div>

            </div>
          </div>
        </div>

        {/* ====================================================
            LAYER 1 — OPENING
            ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-30
            flex
            items-center
            justify-center
            px-6
            sm:px-8
          "
          style={{
            opacity:
              logoOpacity,

            transform:
              `translate3d(0, ${logoY}vh, 0)`,
          }}
        >

          {/* ==================================================
              RESPONSIVE OPENING GROUP
              ================================================== */}

          <div
            className="
              flex
              w-full
              max-w-[680px]
              flex-col
              items-center
              justify-center
              text-center

              /*
               * Keep the complete opening safely
               * inside the viewport on desktop.
               */
              max-h-[72vh]
            "
          >

            {/* ==================================================
                WELCOME TO
                ================================================== */}

            <p
              className="
                mb-5
                shrink-0
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.48em]
                text-white/50

                sm:mb-6
                sm:text-xs
                sm:tracking-[0.55em]
              "
              style={{
                opacity:
                  welcomeOpacity,
              }}
            >
              Welcome to
            </p>

            {/* ==================================================
                LOGO
                ================================================== */}

            <div
              className="
                flex
                w-full
                items-center
                justify-center
                overflow-visible
              "
            >
              <img
                src="/images/torq-logo.png"
                alt="TOR'Q"
                className="
                  block
                  h-auto
                  w-[78vw]
                  max-w-[620px]
                  object-contain

                  sm:w-[72vw]
                  sm:max-w-[660px]

                  lg:w-[56vw]
                  lg:max-w-[680px]

                  xl:w-[52vw]
                  xl:max-w-[700px]
                "
              />
            </div>

            {/* ==================================================
                SCROLL INSTRUCTION
                ================================================== */}

            <div
              className="
                mt-8
                flex
                shrink-0
                flex-col
                items-center
                gap-2

                sm:mt-10

                lg:mt-12
              "
              style={{
                opacity:
                  scrollHintOpacity,
              }}
            >

              <span
                className="
                  whitespace-nowrap
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-white/45

                  sm:text-[10px]
                  sm:tracking-[0.35em]
                "
              >
                Scroll down to experience TOR&apos;Q
              </span>

              <div
                className="
                  flex
                  flex-col
                  items-center
                "
              >
                <div
                  className="
                    h-7
                    w-px
                    bg-gradient-to-b
                    from-white/50
                    to-transparent
                  "
                />

                <ChevronDown
                  className="
                    mt-1
                    h-4
                    w-4
                    animate-bounce
                    text-white/50
                  "
                />
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

/* ================================================================
   HERO STAT
   ================================================================ */

function HeroStat({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <div className="min-w-0">

      <p
        className="
          text-2xl
          font-black
          leading-none
          text-white
          sm:text-4xl
        "
      >
        {value}
      </p>

      <p
        className="
          mt-2
          max-w-[120px]
          text-[7px]
          uppercase
          tracking-[0.18em]
          text-white/45
          sm:text-[10px]
          sm:tracking-[0.2em]
        "
      >
        {label}
      </p>

    </div>
  )
}
