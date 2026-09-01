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

/*
|--------------------------------------------------------------------------
| TOR'Q CINEMATIC LOGO DISINTEGRATION
|--------------------------------------------------------------------------
|
| The component artwork was created around a 597 × 418 coordinate system.
|
| We therefore:
|
| 1. Keep a 597 × 418 virtual stage.
| 2. Place every PNG at its intended coordinate.
| 3. Scale the entire stage responsively.
| 4. Animate the individual components in 3D.
|
| This means the logo starts as ONE assembled object.
|
| There is NO transition from an intact logo to an exploded image.
|
|--------------------------------------------------------------------------
*/

const ART_WIDTH = 597
const ART_HEIGHT = 418

type Motion = {
  finalX: number
  finalY: number

  startX: number
  startY: number

  exitX: number
  exitY: number

  rotate: number

  width: number
  height: number
}

/*
|--------------------------------------------------------------------------
| COMPONENT DIMENSIONS
|--------------------------------------------------------------------------
|
| These are the actual PNG dimensions from the assets.
|
*/

const COMPONENTS: Record<
  string,
  Motion
> = {
  t: {
    finalX: 131,
    finalY: 145,

    startX: 112,
    startY: 150,

    exitX: 75,
    exitY: 125,

    rotate: -6,

    width: 148,
    height: 229,
  },

  turbine: {
    finalX: 214,
    finalY: 205,

    startX: 230,
    startY: 180,

    exitX: 205,
    exitY: 245,

    rotate: 8,

    width: 156,
    height: 190,
  },

  r: {
    finalX: 337,
    finalY: 188,

    startX: 360,
    startY: 170,

    exitX: 370,
    exitY: 130,

    rotate: -8,

    width: 108,
    height: 151,
  },

  rLower: {
    finalX: 350,
    finalY: 292,

    startX: 375,
    startY: 220,

    exitX: 390,
    exitY: 330,

    rotate: -10,

    width: 149,
    height: 132,
  },

  piston: {
    finalX: 425,
    finalY: 112,

    startX: 450,
    startY: 95,

    exitX: 470,
    exitY: 60,

    rotate: 12,

    width: 103,
    height: 107,
  },

  q: {
    finalX: 486,
    finalY: 230,

    startX: 535,
    startY: 195,

    exitX: 560,
    exitY: 255,

    rotate: 9,

    width: 175,
    height: 187,
  },

  qBase: {
    finalX: 495,
    finalY: 330,

    startX: 535,
    startY: 245,

    exitX: 550,
    exitY: 350,

    rotate: -8,

    width: 112,
    height: 32,
  },

  /*
   * The 26 wasn't in the original JSON.
   *
   * It belongs in the centre of the turbine.
   *
   * The turbine centre is approximately:
   *
   *       X = 214
   *       Y = 205
   *
   */

  number26: {
    finalX: 214,
    finalY: 205,

    startX: 210,
    startY: 195,

    exitX: 270,
    exitY: 115,

    rotate: 6,

    width: 111,
    height: 122,
  },
}

/* ----------------------------------------------------------------------
   EASING
---------------------------------------------------------------------- */

function clamp(
  value: number,
) {
  return Math.min(
    1,
    Math.max(
      0,
      value,
    ),
  )
}

function easeIn(
  value: number,
) {
  const t = clamp(value)

  return t * t * t
}

function easeOut(
  value: number,
) {
  const t = clamp(value)

  return (
    1 -
    Math.pow(
      1 - t,
      3,
    )
  )
}

function easeInOut(
  value: number,
) {
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

/* ----------------------------------------------------------------------
   HERO
---------------------------------------------------------------------- */

export function Hero() {
  const { open } =
    useRegistration()

  const sectionRef =
    useRef<HTMLElement>(null)

  const [progress, setProgress] =
    useState(0)

  /* --------------------------------------------------------------------
     SCROLL
  -------------------------------------------------------------------- */

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0

      const section =
        sectionRef.current

      if (!section) return

      const distance =
        section.offsetHeight -
        window.innerHeight

      if (distance <= 0) {
        return
      }

      const rect =
        section.getBoundingClientRect()

      const value =
        clamp(
          -rect.top /
            distance,
        )

      setProgress(value)
    }

    const handleScroll = () => {
      if (!raf) {
        raf =
          window.requestAnimationFrame(
            update,
          )
      }
    }

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
      update,
    )

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll,
      )

      window.removeEventListener(
        'resize',
        update,
      )

      if (raf) {
        window.cancelAnimationFrame(
          raf,
        )
      }
    }
  }, [])

  /* --------------------------------------------------------------------
     TIMELINE
  -------------------------------------------------------------------- */

  /*
   * 0 → 12%
   *
   * Absolutely still.
   *
   * The visitor sees the assembled logo.
   */

  const release =
    easeInOut(
      (progress - 0.12) /
        0.18,
    )

  /*
   * 20 → 52%
   *
   * Components begin moving.
   */

  const launch =
    easeIn(
      (progress - 0.20) /
        0.32,
    )

  /*
   * 30 → 100%
   *
   * Full 3D flight.
   */

  const flight =
    easeIn(
      (progress - 0.30) /
        0.70,
    )

  /*
   * Fade only during the FINAL part of the flight.
   */

  const fade =
    1 -
    easeInOut(
      (flight - 0.82) /
        0.18,
    )

  /* --------------------------------------------------------------------
     INTRO TEXT
  -------------------------------------------------------------------- */

  const welcomeOpacity =
    1 -
    easeOut(
      progress / 0.13,
    )

  const scrollOpacity =
    1 -
    easeOut(
      progress / 0.14,
    )

  /* --------------------------------------------------------------------
     BACKGROUND
  -------------------------------------------------------------------- */

  const backgroundOpacity =
    easeOut(
      (progress - 0.42) /
        0.45,
    )

  const contentOpacity =
    easeInOut(
      (progress - 0.55) /
        0.27,
    )

  /* --------------------------------------------------------------------
     RENDER
  -------------------------------------------------------------------- */

  return (
    <section
      ref={sectionRef}
      id="top"
      className="
        relative
        h-[165vh]
        bg-black
      "
    >

      {/* ================================================================
          STICKY HERO
      ================================================================ */}

      <div
        className="
          sticky
          top-0
          h-screen
          overflow-hidden
          bg-black
        "
        style={{
          perspective:
            '1800px',
        }}
      >

        {/* ==============================================================
            BACKGROUND
        ============================================================== */}

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
              via-black/10
              to-black/50
            "
          />

        </div>

        {/* ==============================================================
            HERO CONTENT
        ============================================================== */}

        <div
          className="
            absolute
            inset-0
            z-10
          "
          style={{
            opacity:
              contentOpacity,
          }}
        >

          <div
            className="
              mx-auto
              flex
              h-full
              w-full
              max-w-7xl
              items-center
              px-6
              sm:px-8
              lg:px-10
            "
          >

            <div
              className="
                w-full
                max-w-5xl
              "
            >

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
                A cinematic celebration of
                performance, sound and precision
                where drifting legends, stunt riders,
                performance cars and motorsport
                culture come together for one
                unforgettable experience.
              </p>

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

                  <Ticket
                    className="
                      mr-2
                      h-5
                      w-5
                    "
                  />

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
                  The Experience Begins In
                </p>

                <Countdown
                  date={EVENT.date}
                />

              </div>

            </div>

          </div>

        </div>

        {/* ==============================================================
            LOGO STAGE
        ============================================================== */}

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
            perspective:
              '1800px',
          }}
        >

          <div
            className="
              flex
              w-full
              flex-col
              items-center
              px-5
              sm:px-8
            "
          >

            {/* ========================================================
                WELCOME
            ======================================================== */}

            <p
              className="
                mb-5
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.48em]
                text-white/50
                sm:mb-6
                sm:text-xs
              "
              style={{
                opacity:
                  welcomeOpacity,
              }}
            >
              Welcome to
            </p>

            {/* ========================================================
                VIRTUAL 597 × 418 STAGE

                The stage scales as one unit.

                Individual PNGs retain their actual proportions.
            ======================================================== */}

            <div
              className="
                relative
                w-[92vw]
                max-w-[760px]
              "
              style={{
                aspectRatio:
                  `${ART_WIDTH}/${ART_HEIGHT}`,

                transformStyle:
                  'preserve-3d',
              }}
            >

              {/* ------------------------------------------------------
                  T
              ------------------------------------------------------ */}

              <MechanicalPiece
                src="/images/torq-components/t_section.png"
                data={COMPONENTS.t}
                release={release}
                launch={launch}
                flight={flight}
                opacity={fade}
                direction="left"
              />

              {/* ------------------------------------------------------
                  TURBINE
              ------------------------------------------------------ */}

              <MechanicalPiece
                src="/images/torq-components/turbine.png"
                data={COMPONENTS.turbine}
                release={release}
                launch={launch}
                flight={flight}
                opacity={fade}
                direction="left"
              />

              {/* ------------------------------------------------------
                  26
              ------------------------------------------------------ */}

              <MechanicalPiece
                src="/images/torq-components/torq-26-transparent.png"
                data={COMPONENTS.number26}
                release={release}
                launch={launch}
                flight={flight}
                opacity={fade}
                direction="up"
              />

              {/* ------------------------------------------------------
                  R
              ------------------------------------------------------ */}

              <MechanicalPiece
                src="/images/torq-components/r_section.png"
                data={COMPONENTS.r}
                release={release}
                launch={launch}
                flight={flight}
                opacity={fade}
                direction="right"
              />

              {/* ------------------------------------------------------
                  R LOWER
              ------------------------------------------------------ */}

              <MechanicalPiece
                src="/images/torq-components/r_lower.png"
                data={COMPONENTS.rLower}
                release={release}
                launch={launch}
                flight={flight}
                opacity={fade}
                direction="down"
              />

              {/* ------------------------------------------------------
                  PISTON
              ------------------------------------------------------ */}

              <MechanicalPiece
                src="/images/torq-components/piston.png"
                data={COMPONENTS.piston}
                release={release}
                launch={launch}
                flight={flight}
                opacity={fade}
                direction="up"
              />

              {/* ------------------------------------------------------
                  Q
              ------------------------------------------------------ */}

              <MechanicalPiece
                src="/images/torq-components/q_section.png"
                data={COMPONENTS.q}
                release={release}
                launch={launch}
                flight={flight}
                opacity={fade}
                direction="right"
              />

              {/* ------------------------------------------------------
                  Q BASE
              ------------------------------------------------------ */}

              <MechanicalPiece
                src="/images/torq-components/q_base.png"
                data={COMPONENTS.qBase}
                release={release}
                launch={launch}
                flight={flight}
                opacity={fade}
                direction="down"
              />

            </div>

            {/* ========================================================
                SCROLL CUE
            ======================================================== */}

            <div
              className="
                mt-8
                flex
                flex-col
                items-center
                gap-2
                sm:mt-10
              "
              style={{
                opacity:
                  scrollOpacity,
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

/* =========================================================================
   MECHANICAL PIECE
============================================================================ */

function MechanicalPiece({
  src,
  data,
  release,
  launch,
  flight,
  opacity,
  direction,
}: {
  src: string
  data: Motion
  release: number
  launch: number
  flight: number
  opacity: number
  direction:
    | 'left'
    | 'right'
    | 'up'
    | 'down'
}) {
  /*
   * ---------------------------------------------------------------
   * ASSEMBLED POSITION
   * ---------------------------------------------------------------
   *
   * Start from the exact final/assembled coordinate.
   */

  let x =
    data.finalX

  let y =
    data.finalY

  /*
   * ---------------------------------------------------------------
   * RELEASE
   * ---------------------------------------------------------------
   *
   * Small movement from the original logo position.
   */

  x +=
    (data.startX -
      data.finalX) *
    release

  y +=
    (data.startY -
      data.finalY) *
    release

  /*
   * ---------------------------------------------------------------
   * LAUNCH
   * ---------------------------------------------------------------
   *
   * Move toward the intended exit trajectory.
   */

  x +=
    (data.exitX -
      data.startX) *
    launch

  y +=
    (data.exitY -
      data.startY) *
    launch

  /*
   * ---------------------------------------------------------------
   * CONTINUOUS FLIGHT
   * ---------------------------------------------------------------
   *
   * This is the important part.
   *
   * The piece doesn't stop at the exit point.
   *
   * It continues travelling aggressively.
   */

  const flightDistance =
    1 +
    flight * 5.5

  const dx =
    data.exitX -
    data.finalX

  const dy =
    data.exitY -
    data.finalY

  x +=
    dx *
    flight *
    flightDistance

  y +=
    dy *
    flight *
    flightDistance

  /*
   * ---------------------------------------------------------------
   * ADD DIRECTIONAL IMPULSE
   * ---------------------------------------------------------------
   */

  const impulse =
    flight * flight * 170

  if (
    direction === 'left'
  ) {
    x -= impulse
  }

  if (
    direction === 'right'
  ) {
    x += impulse
  }

  if (
    direction === 'up'
  ) {
    y -= impulse
  }

  if (
    direction === 'down'
  ) {
    y += impulse
  }

  /*
   * ---------------------------------------------------------------
   * CAMERA DEPTH
   * ---------------------------------------------------------------
   *
   * Positive Z makes the component travel toward the viewer.
   */

  const z =
    launch * 450 +
    flight * 5000

  /*
   * ---------------------------------------------------------------
   * ROTATION
   * ---------------------------------------------------------------
   */

  const rotateX =
    data.rotate *
    flight *
    2.2

  const rotateY =
    -data.rotate *
    flight *
    3.0

  const rotateZ =
    data.rotate *
    (release * 0.25 +
      launch * 2 +
      flight * 8)

  /*
   * ---------------------------------------------------------------
   * SCALE
   * ---------------------------------------------------------------
   *
   * The closer the component comes to camera,
   * the larger it becomes.
   */

  const scale =
    1 +
    flight * 3.4

  /*
   * ---------------------------------------------------------------
   * BLUR
   * ---------------------------------------------------------------
   *
   * Very subtle at first.
   *
   * Stronger during the final camera rush.
   */

  const blur =
    flight * flight * 8

  /*
   * ---------------------------------------------------------------
   * Convert virtual 597 × 418 coordinates into percentages.
   * ---------------------------------------------------------------
   */

  const left =
    (x /
      ART_WIDTH) *
    100

  const top =
    (y /
      ART_HEIGHT) *
    100

  const width =
    (data.width /
      ART_WIDTH) *
    100

  const height =
    (data.height /
      ART_HEIGHT) *
    100

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      className="
        absolute
        select-none
        object-contain
      "
      style={{
        left: `${left}%`,
        top: `${top}%`,

        width: `${width}%`,
        height: `${height}%`,

        opacity,

        transformOrigin:
          'center center',

        transformStyle:
          'preserve-3d',

        backfaceVisibility:
          'visible',

        filter:
          blur > 0
            ? `blur(${blur}px)`
            : 'none',

        transform:
          `
            translate3d(
              -50%,
              -50%,
              ${z}px
            )
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            rotateZ(${rotateZ}deg)
            scale(${scale})
          `,

        willChange:
          'transform, opacity, filter',

        zIndex:
          Math.round(
            z,
          ),
      }}
    />
  )
}

/* =========================================================================
   HERO STAT
============================================================================ */

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
