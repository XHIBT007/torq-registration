'use client'

import {
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  ChevronDown,
  MapPin,
  Ticket,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { EVENT } from '@/lib/torq-data'
import { Countdown } from './countdown'
import { useRegistration } from './registration'

export function Hero() {
  const { open } = useRegistration()

  const sectionRef =
    useRef<HTMLElement>(null)

  const [progress, setProgress] =
    useState(0)

  /* ============================================================
     SCROLL PROGRESS
     ============================================================ */

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0

      const section =
        sectionRef.current

      if (!section) return

      const rect =
        section.getBoundingClientRect()

      const total =
        section.offsetHeight -
        window.innerHeight

      if (total <= 0) {
        setProgress(0)
        return
      }

      const travelled =
        Math.max(
          0,
          Math.min(
            total,
            -rect.top,
          ),
        )

      setProgress(
        travelled / total,
      )
    }

    const onScroll = () => {
      if (!frame) {
        frame =
          window.requestAnimationFrame(
            update,
          )
      }
    }

    update()

    window.addEventListener(
      'scroll',
      onScroll,
      { passive: true },
    )

    window.addEventListener(
      'resize',
      update,
    )

    return () => {
      window.removeEventListener(
        'scroll',
        onScroll,
      )

      window.removeEventListener(
        'resize',
        update,
      )

      if (frame) {
        window.cancelAnimationFrame(
          frame,
        )
      }
    }
  }, [])

  /* ============================================================
     HELPERS
     ============================================================ */

  const clamp = (
    value: number,
  ) =>
    Math.min(
      1,
      Math.max(0, value),
    )

  const easeOut = (
    value: number,
  ) => {
    const t = clamp(value)

    return 1 -
      Math.pow(
        1 - t,
        3,
      )
  }

  const easeInOut = (
    value: number,
  ) => {
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
     LAYER 1
     
     LOGO MOVES FIRST
     ============================================================ */

  const logoProgress =
    easeInOut(
      progress / 0.95,
    )

  const logoY =
    -105 * logoProgress

  /*
   * Logo remains strong at the beginning,
   * then fades during the second half.
   */
  const logoOpacity =
    1 -
    easeOut(
      (progress - 0.48) /
        0.47,
    )

  /*
   * "Welcome to" disappears before
   * the actual logo.
   */
  const welcomeOpacity =
    1 -
    easeOut(
      progress / 0.25,
    )

  /*
   * Scroll instruction disappears early.
   */
  const scrollPromptOpacity =
    1 -
    easeOut(
      progress / 0.18,
    )

  /* ============================================================
     LAYER 2
     
     BEGINS APPEARING WHILE LOGO IS STILL VISIBLE
     ============================================================ */

  const layerTwoOpacity =
    easeOut(
      (progress - 0.55) /
        0.40,
    )

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-[145vh] bg-black"
    >
      {/* ========================================================
          STICKY STAGE
          ======================================================== */}

      <div className="sticky top-0 h-screen overflow-hidden bg-black">

        {/* ======================================================
            BACKGROUND
            ====================================================== */}

        <div className="absolute inset-0 bg-black" />

        <div
          className="absolute inset-0 transition-none"
          style={{
            opacity:
              layerTwoOpacity,
          }}
        >
          <img
            src="/images/hero-drift-red-mustang.webp"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/65" />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-black/20" />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/50" />
        </div>

        {/* ======================================================
            LAYER 2 — MAIN WEBSITE
            ====================================================== */}

        <div
          className="absolute inset-0 z-10"
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
              pt-[92px]
              pb-8
              sm:px-8
              sm:pt-28
              lg:items-center
              lg:px-10
              lg:pt-0
            "
          >
            <div className="w-full max-w-5xl">

              {/* ==================================================
                  HEADLINE
                  ================================================== */}

              <h1
                className="
                  font-black
                  uppercase
                  leading-[0.88]
                  tracking-[-0.045em]
                  text-white

                  text-[3.05rem]

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

              {/* ==================================================
                  CINEMATIC COPY
                  ================================================== */}

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

              {/* ==================================================
                  CTA + LOCATION
                  ================================================== */}

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
                    transition-all
                    duration-300
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
                  <MapPin className="h-5 w-5 text-red-500" />

                  {EVENT.location}
                </div>
              </div>

              {/* ==================================================
                  STATS
                  ================================================== */}

              <div
                className="
                  mt-7
                  grid
                  grid-cols-2
                  gap-x-8
                  gap-y-5
                  border-t
                  border-white/10
                  pt-6

                  sm:mt-9
                  sm:grid-cols-4
                  sm:gap-y-0
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

              {/* ==================================================
                  COUNTDOWN
                  ================================================== */}

              <div className="mt-7 sm:mt-9">

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

        {/* ======================================================
            LAYER 1 — TOR'Q OPENING
            ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-30
            flex
            items-center
            justify-center
          "
          style={{
            opacity:
              logoOpacity,

            transform:
              `translate3d(0, ${logoY}vh, 0)`,
          }}
        >
          <div
            className="
              flex
              w-[86vw]
              max-w-[720px]
              -translate-y-[4vh]
              flex-col
              items-center
              text-center
            "
          >

            {/* WELCOME */}

            <p
              className="
                mb-6
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.55em]
                text-white/50

                sm:text-xs
              "
              style={{
                opacity:
                  welcomeOpacity,
              }}
            >
              Welcome to
            </p>

            {/* LOGO */}

            <img
              src="/images/torq-logo.png"
              alt="TOR'Q"
              className="
                block
                w-full
                object-contain
              "
            />

            {/* SCROLL PROMPT */}

            <div
              className="
                mt-10
                flex
                flex-col
                items-center
                gap-2

                sm:mt-12
              "
              style={{
                opacity:
                  scrollPromptOpacity,
              }}
            >
              <span
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.35em]
                  text-white/45

                  sm:text-[10px]
                "
              >
                Scroll down to experience TOR&apos;Q
              </span>

              <div className="flex flex-col items-center">
                <div className="h-7 w-px bg-gradient-to-b from-white/50 to-transparent" />

                <ChevronDown className="mt-1 h-4 w-4 animate-bounce text-white/50" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

/* ================================================================
   STAT
   ================================================================ */

function HeroStat({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <div>
      <p
        className="
          text-3xl
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
          max-w-[140px]
          text-[9px]
          uppercase
          tracking-[0.2em]
          text-white/45

          sm:text-[10px]
        "
      >
        {label}
      </p>
    </div>
  )
}
